import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { appConfig } from '../configs/app.config';
@Injectable()
export class EmailService {
  async sendEmail(email: string, confirmUrl: string) {
    const mailtrap = appConfig.getMailTrapConfig();
    console.log(mailtrap);
    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 25,
      auth: {
        user: mailtrap.user,
        pass: mailtrap.password,
      },
    });

    const mailOptions = {
      from: 'webster@gmail.com',
      to: email,
      subject: 'Test Email',
      text: confirmUrl,
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
