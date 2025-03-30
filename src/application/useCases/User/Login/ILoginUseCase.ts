import { User } from '@domain/entities/User';
import { ILoginRepo } from '@domain/repositories/User/ILoginRepo';
import { IHashService } from '@domain/services/IHashService';
import { ITokenService } from '@domain/services/ITokenService';
import { ILoginDTO } from './ILoginDTO';
import { configDotenv } from "dotenv";
configDotenv();

export class ILoginUseCase {
  constructor(
    private readonly iLoginRepo: ILoginRepo,
    private readonly iHashService: IHashService,
    private readonly iTokenService: ITokenService
  ) {}

  async execute(DTO: ILoginDTO): Promise<number | string> {
    const user: User | null = await this.iLoginRepo.findUser(DTO.email);
    if (!user) return 0;

    const isPasswordEqual: boolean = await this.iHashService.compare(
      DTO.password,
      user.password
    );
    if (!isPasswordEqual) return 1;

    const accessToken: string = this.iTokenService.sign({
      payload: {
        sub: user.public_id,
        email: user.email,
      },
      secret_key: process.env.SECRET_KEY as string,
      options: {
        expiresIn: '1h',
      },
    });

    return accessToken;
  }
}
