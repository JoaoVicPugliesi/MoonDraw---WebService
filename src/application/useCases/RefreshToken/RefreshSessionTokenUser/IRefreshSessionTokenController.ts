import z from 'zod';
import { RequestResponseAdapter } from '@adapters/ServerAdapter';
import { IRefreshSessionTokenUseCase } from './IRefreshSessionTokenUseCase';
import { IRefreshSessionTokenDTO } from './IRefreshSessionTokenDTO';
import { InvalidRefreshToken } from '@application/handlers/RefreshToken/IRefreshSessionTokenHandler';
export class IRefreshSessionTokenController {
  constructor(
    private readonly iRefreshSessionTokenUseCase: IRefreshSessionTokenUseCase
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    const schema = z.object({
      public_id: z.string({
        required_error: 'public_id is required',
        invalid_type_error: 'public_id should be a string',
      }),
    });

    try {
      const DTO: IRefreshSessionTokenDTO = schema.parse(adapter.req.body);
      const refreshed: InvalidRefreshToken | object =
        await this.iRefreshSessionTokenUseCase.execute(DTO);

      if (refreshed instanceof InvalidRefreshToken)
        return adapter.res
          .status(404)
          .send({ message: 'Refresh Token not found' });

      return adapter.res.status(200).send({ current_user: refreshed });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return adapter.res.status(422).send({
          message: 'Validation Error',
          errors: error.flatten().fieldErrors,
        });
      }

      if (error instanceof Error) {
        return adapter.res
          .status(500)
          .send({ message: 'Server internal error' });
      }
    }
  }
}
