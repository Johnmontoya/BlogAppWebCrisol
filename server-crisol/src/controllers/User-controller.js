import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import UserService from "../services/User-service.js";
import { sendEmail } from "../utils/email/sendEmail.js";
import "dotenv/config";
import {
  accountVerificationTemplate,
  emailRecovery,
} from "../utils/email/emailMessage.js";

const uri = `${process.env.CLIENT_URL}`;

export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const isEmailExists = await UserService.getIsEmailExists(email);

    if (isEmailExists) {
      return res.status(400).json({
        valid: "success",
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
      otp: otpNumber,
    };

    const post = await UserService.registerUserService(userData);
    const user = await UserService.getIsEmailExists(email);

    if (post) {
      const subject = "Creacion de usuario";
      sendEmail({
        email,
        subject,
        username,
        url: uri,
        templateGenerator: accountVerificationTemplate(user, uri, otpNumber),
      });
    }

    return res.status(200).json({
      valid: "success",
      message: "Usuario registrado",
    });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    return res.status(500).json({
      valid: "error",
      message: "Ocurrió un error en el servidor al crear el usuario.",
      details: error.message,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await UserService.getUsers();

    if (users.length === 0) {
      return res.status(404).json({
        valid: "fail",
        message: "No hay usuarios registrados en la base de datos.",
      });
    }

    return res.status(200).json({
      valid: "success",
      results: users.length,
      users,
    });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return res.status(500).json({
      valid: "error",
      message: "Ocurrió un error en el servidor al obtener los usuarios.",
      details: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserService.getUserById(userId);

    if (!user) {
      return res.status(404).json({
        valid: "fail",
        message: "No hay usuario registrado en la base de datos.",
      });
    }

    return res.status(200).json({
      valid: "success",
      user,
    });
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    return res.status(500).json({
      valid: "error",
      message: "Ocurrió un error en el servidor al obtener el usuario.",
      details: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserService.getIsEmailExists(email);
    const secret = process.env.SECRET;

    if (!user) {
      return res.status(401).json({
        valid: "error",
        message: "Correo o contraseña incorrecta",
      });
    }

    if(user.accountVerified === false) {
      return res.status(400).json({
        valid: "fail",
        message: "Tu cuenta no ha sido verificada",
      });
    }

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          userId: user.id,
          role: user.role,
        },
        secret,
        { expiresIn: "24h" }
      );

      return res.status(200).header("token", token).json({
        valid: "success",
        userId: user.id,
        token: token,
      });
    } else {
      return res.status(400).json({
        valid: "error",
        message: "Correo o contraseña incorrecta",
      });
    }
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    return res.status(500).json({
      valid: "error",
      message: "Ocurrió un error en el servidor.",
      details: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const secret = process.env.SECRET;

    const user = await UserService.getIsEmailExists(email);

    if (!user) {
      return res.status(404).json({
        valid: "fail",
        message: "No hay usuario registrado en la base de datos.",
      });
    }
    
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "1d" });
    await user.updateOne({
      resetPasswordToken: token,
    });

    if (user) {
      const subject = "Recuperacion de contraseña";
      sendEmail({
        email,
        subject,
        username: user.username,
        url: uri,
        templateGenerator: emailRecovery(user, uri, token),
      });
    }

    return res.status(200).json({
      valid: "success",
      message: "Email enviado",
    });
  } catch (error) {
    console.error("Error el enviar el correo:", error);
    return res.status(500).json({
      valid: "error",
      message: "Ocurrió un error en el servidor.",
      details: error.message,
    });
  }
};

export const resetPassword = async(req, res) => {
  try {
    const {
      password, userId, token
    } = req.body;

    const pass = bcrypt.hashSync(password, 10);
    
    await UserService.updatePass(pass, userId, token);

    return res.status(200).json({
      valid: "success",
      message: "Contraseña cambiada",
    });

  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    return res.status(500).json({
      valid: "error",
      message: "Ocurrió un error en el servidor.",
      details: error.message,
    });
  }
}

export const changePassword = async(req, res) => {
  try {
    const {
      userId, password
    } = req.body;

    await UserService.changePass(userId, password);

    return res.status(200).json({
      valid: "success",
      message: "Contraseña cambiada",
    });

  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    return res.status(500).json({
      valid: "error",
      message: "Ocurrió un error en el servidor.",
      details: error.message,
    });
  }
}

export const deleteUser = async(req, res) => {
  try {
    const userId = req.params.id;
    const requester = req.token;

    // Security Gate: Protect against IDOR (Insecure Direct Object Reference)
    // Check if the user is deleting their own account OR if they are an Admin
    if (requester.userId !== userId && requester.role !== 'Admin') {
      return res.status(403).json({
        valid: "error",
        message: "No tienes permisos para eliminar este usuario"
      });
    }

    await UserService.deleteUser(userId);

    return res.status(200).json({
      valid: "success",
      message: "Cuenta eliminada",
    });

  } catch (error) {
    console.error("Error al borrar al usuario:", error);
    return res.status(500).json({
      valid: "error",
      message: "Ocurrió un error en el servidor.",
      details: error.message,
    });
  }
}

export const ChangeStateUser = async(req, res) => {
  try {
    const { userId, verified } = req.body;
    await UserService.changeUser(userId, verified);

    return res.status(200).json({
      valid: "success",
      message: "Cuenta verificada",
    });
  } catch (error) {
    console.error("Error al cambiar el estado:", error);
    return res.status(500).json({
      valid: "error",
      message: "Ocurrió un error en el servidor.",
      details: error.message,
    });
  }
}

export const VerifyUser = async(req, res) => {
  try {
    const { userId, otp } = req.body;
    const user = await UserService.getUserById(userId);
    
    if(user.otp.toString() !== otp) {
      return res.status(404).json({
      valid: "fail",
      message: "El codigo OTP no es valido",
    });
    }

    const accountVerified = !user.accountVerified;

    await UserService.changeUser(userId, accountVerified);

    return res.status(200).json({
      valid: "success",
      message: "Cuenta verificada",
    });

  } catch (error) {
    console.error("Error al verificar la cuenta", error);
    return res.status(500).json({
      valid: "error",
      message: "Ocurrió un error en el servidor.",
      details: error.message,
    });
  }
}
