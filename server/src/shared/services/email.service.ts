import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { appConfig } from '../configs/app.config';
@Injectable()
export class EmailService {
  async sendEmail(email: string, confirmUrl: string) {
    const mail = appConfig.getMailConfig();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: mail.user,
        pass: mail.password,
      },
    });

    const mailOptions = {
      from: 'webster@gmail.com',
      to: email,
      subject: 'Webster email verification',
      text: confirmUrl,
      html: `<p>You must follow this link to verify your email</p> <p>Press <a href="${confirmUrl}"> here </a> to verify your email. Thanks.</p>`,
    };

    return transport.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}
