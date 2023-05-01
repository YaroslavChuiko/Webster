import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
@Injectable()
export class EmailService {
  async sendEmail(email: string, confirmUrl: string) {
    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '1a5b031371df27',
        pass: 'a2568051f186e2',
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
