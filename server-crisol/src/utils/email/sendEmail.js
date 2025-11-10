import nodeMailer from "nodemailer";
import mailGenerator from '../templateMail/index.js';
import 'dotenv/config';

export const sendEmail = async ({ email, subject, templateGenerator}) => {
    
    const body = templateGenerator

    const transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
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