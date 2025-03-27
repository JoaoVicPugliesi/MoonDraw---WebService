import z from "zod";
import { ICreateUserUseCase } from "./ICreateUserUseCase";
import { ICreateUserValidator } from "../../../validators/ICreateUserValidator";
import { ICreateUserDTO } from "./ICreateUserDTO";
import { User } from "../../../../domain/entities/User";
import { RequestResponseAdapter } from "../../../../adapters/ServerAdapter";

export class ICreateUserController {
  constructor(private readonly iCreateUserUseCase: ICreateUserUseCase) {}

  async handle(adapter: RequestResponseAdapter): Promise<void> {
    const schema = ICreateUserValidator();

    try {
      const DTO: ICreateUserDTO = schema.parse(adapter.req.body);
      const user: boolean | User =
        await this.iCreateUserUseCase.execute(DTO);

      if (typeof user === "boolean") {
        adapter.res.status(409).send({
          message: "Conflict: user with email provided already exists",
        });
      }

      adapter.res.status(201).send({ message: "User created successfully", user: user });

    } catch (error) {
      if (error instanceof z.ZodError) {
        adapter.res.status(422).send({
          message: "Validation Error",
          errors: error.flatten().fieldErrors,
        });
      }

      if (error instanceof Error) {
        adapter.res.status(500).send({
          message: "Intern Server Error",
        });
      }
    }
  }
}
