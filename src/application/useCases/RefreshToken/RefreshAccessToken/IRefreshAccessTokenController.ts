import z from 'zod';
import { RequestResponseAdapter } from '@adapters/ServerAdapter';
import { IRefreshAccessTokenUseCase } from './IRefreshAccessTokenUseCase';
import { IRefreshAccessTokenDTO } from './IRefreshAccessTokenDTO';
import { InvalidRefreshTokenNotFoundResponse, RefreshAccessTokenResponse } from '@application/handlers/RefreshToken/IRefreshAccessTokenHandler';
export class IRefreshAccessTokenController {
  constructor(
    private readonly iRefreshAccessTokenUseCase: IRefreshAccessTokenUseCase
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    const schema = z.object({
      public_id: z.string({
        required_error: 'public_id is required',
        invalid_type_error: 'public_id should be a string',
      }),
    });

    try {
      const DTO: IRefreshAccessTokenDTO = schema.parse(adapter.req.body);
      const refreshed: InvalidRefreshTokenNotFoundResponse | RefreshAccessTokenResponse =
        await this.iRefreshAccessTokenUseCase.execute(DTO);

      if (refreshed instanceof InvalidRefreshTokenNotFoundResponse)
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
