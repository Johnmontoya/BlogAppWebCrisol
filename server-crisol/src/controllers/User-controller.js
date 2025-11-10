import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import UserService from "../services/User-service.js";
import { sendEmail } from "../utils/email/sendEmail.js";
import 'dotenv/config';
import { accountVerificationTemplate } from "../utils/email/emailMessage.js";

const uri = `${process.env.CLIENT_URL + process.env.API_URL}`;

export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const isEmailExists = await UserService.getIsEmailExists(email);

    if (isEmailExists) {
      return res.status(400).json({
        status: "success",
        message: "Email ya registrado",
      });
    }

    const otpNumber = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    let userData = {
      username: username,
      email: email,
      password: bcrypt.hashSync(password),
      otp: otpNumber
    };

    const post = await UserService.registerUserService(userData);
    const user = await UserService.getIsEmailExists(email);

    if(post) {
        const subject = "Creacion de usuario";
        sendEmail({
            email,
            subject,
            username,
            url: uri,
            templateGenerator: accountVerificationTemplate(user, uri, otpNumber)
        });
    }

    res.status(201).json({
      status: "success",
      message: "Usuario creado",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
