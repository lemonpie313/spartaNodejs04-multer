import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const { EMAIL_SERVICE, USER, PASS } = process.env;

const transporter = nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
      user: USER,
      pass: PASS,
    },
  });

const mailOptions = {
  from : USER,
  to: 'lofi0613@gmail.com',
  subject: 'Nodemailer Test',
  text: '노드 패키지 nodemailer를 이용해 보낸 이메일임'
};

export { transporter, mailOptions }