import nodeMailer from "nodemailer";
import mailGenerator from '../templateMail/index.js';
import 'dotenv/config';

export const sendEmail = async ({ email, subject, templateGenerator}) => {
    const body = templateGenerator

    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        secure: true,
        //host: process.env.GMAIL_HOST,
        //port: process.env.GMAIL_PORT,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD
        },
    });

    const template = mailGenerator.generate(body);

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject,
        html: template
    };

    await transporter.sendMail(mailOptions);
};