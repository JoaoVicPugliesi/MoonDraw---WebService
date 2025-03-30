import z from "zod";
import { ILoginUseCase } from "./ILoginUseCase";
import { RequestResponseAdapter } from "@adapters/ServerAdapter";
import { ILoginValidator } from "@application/validators/ILoginValidator";
import { ILoginDTO } from "./ILoginDTO";
import {
  InvalidUserNotFoundError,
  InvalidPasswordIsNotEqualError
} from "@application/handlers/ILoginHandlers";

export class ILoginController {
  constructor(private readonly iLoginUseCase: ILoginUseCase) {}

  async handle(adapter: RequestResponseAdapter) {
    const schema = ILoginValidator();

    try {
      const DTO: ILoginDTO = schema.parse(adapter.req.body);

      const logged: object = await this.iLoginUseCase.execute(DTO);

      if (logged instanceof InvalidUserNotFoundError)
        return adapter.res.status(404).send({ message: "User not found" });
      if (logged instanceof InvalidPasswordIsNotEqualError)
        return adapter.res.status(401).send({ message: "Non authorized" });

      return adapter.res.status(200).send({ user: logged });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return adapter.res.status(422).send({
          message: "Validation Error",
          errors: error.flatten().fieldErrors,
        });
      }

      if (error instanceof Error) {
        return adapter.res
          .status(500)
          .send({ message: "Server internal error" });
      }
    }
  }
}
