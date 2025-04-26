type IAddress = {
  email: string;
};

interface IMail {
  to: IAddress;
  from: IAddress;
  subject: string;
  text: string;
  body: string;
}

export class Mail implements IMail {
  to: IAddress;
  from: IAddress;
  subject: string;
  text: string;
  body: string;

  constructor({ to, from, subject, text, body }: IMail) {
    this.to = to;
    this.from = from;
    this.subject = subject;
    this.text = text;
    this.body = body;
  }
}
