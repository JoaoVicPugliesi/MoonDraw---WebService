import z from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { ICreateUserUseCase } from "./ICreateUserUseCase";
import { ICreateUserValidator } from "../../../validators/ICreateUserValidator";
import { ICreateUserDTO } from "./ICreateUserDTO";
import { User } from "../../../../domain/entities/User";

export class ICreateUserController {
  constructor(private readonly iCreateUserUseCase: ICreateUserUseCase) {}

  async handle(req: FastifyRequest, res: FastifyReply): Promise<void> {
    const schema = ICreateUserValidator();

    try {
      const DTO: ICreateUserDTO = schema.parse(req.body);
      const useCaseResolve: boolean | User =
        await this.iCreateUserUseCase.execute(DTO);

      if (typeof useCaseResolve === "boolean") {
        res
          .status(409)
          .send({
            message: "Conflict: user with email provided already exists",
          });
      }

      res.status(201).send({ message: "User created successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(422).send({
          message: "Validation Error",
          errors: error.flatten().fieldErrors,
        });
      }

      if (error instanceof Error) {
        res.status(500).send({
          message: "Intern Server Error",
        });
      }
    }
  }
}
