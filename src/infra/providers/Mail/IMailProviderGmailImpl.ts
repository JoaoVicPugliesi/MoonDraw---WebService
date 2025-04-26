import nodemailer from 'nodemailer';
import { Mail } from '@domain/providers/Mail/Mail';
import { IMailProvider } from '@domain/providers/Mail/IMailProvider';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const USER: string = process.env.GMAIL_USER as string;
const PASS: string = process.env.GMAIL_PASS as string;

export class IMailProviderGmailImpl implements IMailProvider {
  private readonly transporter;
  private readonly user: string;
  private readonly pass: string;

  constructor() {
    this.user = USER;
    this.pass = PASS;
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
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
