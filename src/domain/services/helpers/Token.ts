import { configDotenv } from "dotenv";
configDotenv();

type SecondsOrTimeSpan = string | number;

interface IPayload {
    sub?: string,
    email?: string
}

interface IOptions {
    expiresIn?: SecondsOrTimeSpan,
    notBefore?: SecondsOrTimeSpan,
    mutatePayload?: boolean,
    allowInsecureKeySizes?: boolean
    allowInvalidAsymmetricKeyTypes?: boolean,
}

interface IToken {
    token?: string,
    payload?: IPayload,
    secret_key: string,
    options?: IOptions
}

export class Token implements IToken {
    token?: string;
    payload?: IPayload;
    secret_key: string;
    options?: IOptions;

    constructor() {
        this.secret_key = process.env.SECRET_KEY as string;
    }
}

