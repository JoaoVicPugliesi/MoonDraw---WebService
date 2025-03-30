import z from "zod";
import { RequestResponseAdapter } from "@adapters/ServerAdapter";
import { IConfirmMailUseCase } from "./IConfirmMailUseCase";
import { IConfirmMailDTO } from "./IConfirmMailDTO";
import { IConfirmMailValidator } from "@application/validators/IConfirmMailValidator";
import { InvalidUserNotFoundError } from "@application/handlers/IConfirmMailHandlers";

export class IConfirmMailController {
  constructor(private readonly iConfirmMailUseCase: IConfirmMailUseCase) {}

  async handle(adapter: RequestResponseAdapter) {
    const schema = IConfirmMailValidator();

    try {
      const DTO: IConfirmMailDTO = schema.parse(adapter.req.body);
      const confirmed: object | number = await this.iConfirmMailUseCase.execute(
        DTO
      );

      if (confirmed instanceof InvalidUserNotFoundError)
        return adapter.res.status(404).send({ message: "User Not Found" });

      return adapter.res.status(204).send();
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
