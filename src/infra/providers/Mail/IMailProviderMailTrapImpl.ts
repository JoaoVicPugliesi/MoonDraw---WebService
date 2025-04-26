import nodemailer from 'nodemailer';
import { Mail } from '@domain/providers/Mail/Mail';
import { IMailProvider } from '@domain/providers/Mail/IMailProvider';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const USER: string = process.env.MAILTRAP_USER as string;
const PASS: string = process.env.MAILTRAP_PASS as string;

export class IMailProviderMailTrapImpl implements IMailProvider {
  private readonly transporter;
  private readonly user: string;
  private readonly pass: string;

  constructor() {
    this.user = USER;
    this.pass = PASS;
    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: this.user,
        pass: this.pass,
      },
    });
  }

  async sendMail(mail: Mail): Promise<SMTPTransport.SentMessageInfo> {
    const sent: SMTPTransport.SentMessageInfo = await this.transporter.sendMail({
      to: mail.to.email,
      from: mail.from.email,
      subject: mail.subject,
      text: mail.text,
      html: mail.body,
    });

    return sent;
  }
}
