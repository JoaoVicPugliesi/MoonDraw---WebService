import { Mail } from '../../externals/Mail';

export interface IMailProvider {
    sendMail(mail: Mail): Promise<void>;
}