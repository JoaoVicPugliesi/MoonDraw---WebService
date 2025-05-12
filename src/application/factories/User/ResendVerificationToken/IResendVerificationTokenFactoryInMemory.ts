import { IResendVerificationTokenUseCase } from "@application/useCases/User/ResendVerificationToken/IResendVerificationTokenUseCase";
import { ICacheProviderInMemoryImpl } from "@infra/providers/Cache/ICacheProviderInMemoryImpl";

export class IResendVerificationTokenFactoryInMemory {
  constructor(
    private readonly cache: Map<string, string>
  ) {}
  compose(): IResendVerificationTokenUseCase {
    const iCacheProvider = new ICacheProviderInMemoryImpl(this.cache);
    const iMailProvider = { sendMail: jest.fn() };
    return new IResendVerificationTokenUseCase(iCacheProvider, iMailProvider);
  }
}
