import { Mail } from "../../externals/Mail";

export interface ISendMail {
    sendMail(mail: Mail): Promise<void>;
}