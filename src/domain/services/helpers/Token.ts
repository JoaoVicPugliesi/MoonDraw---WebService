interface IPayload {
  subject?: string | Record<string, any>;
}

interface IOptions {
  subject?: string,
  expiresIn?: any;
  notBefore?: any;
  mutatePayload?: boolean;
  allowInsecureKeySizes?: boolean;
  allowInvalidAsymmetricKeyTypes?: boolean;
}

interface IToken {
  token?: string;
  payload?: IPayload;
  secret_key?: string;
  options?: IOptions;
}

export class Token implements IToken {
  token?: string;
  payload?: IPayload;
  secret_key?: string;
  options?: IOptions;
}
