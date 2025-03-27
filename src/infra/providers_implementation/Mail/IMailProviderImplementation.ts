import { Mail } from "../../../domain/providers/externals/Mail";
import nodemailer from 'nodemailer';
import { IMailProvider } from "../../../domain/providers/repositories/Mail/IMailProvider";

export class IMailProviderImpl implements IMailProvider {

    private readonly transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "658989baa6571e",
              pass: "a1700f739526a9"
            }
        });
    }

    async sendMail(mail: Mail): Promise<void> {
        await this.transporter.sendMail({
            to: mail.to.email,
            from: mail.from.email,
            subject: mail.subject,
            text: mail.text,
            html: mail.body
        });
    }
}