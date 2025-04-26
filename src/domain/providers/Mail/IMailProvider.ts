import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { Mail } from '@domain/providers/Mail/Mail';

export interface IMailProvider {
    sendMail(mail: Mail): Promise<SMTPTransport.SentMessageInfo>;
}