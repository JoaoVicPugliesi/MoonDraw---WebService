import { IResendVerificationTokenUseCase } from "@application/useCases/User/ResendVerificationToken/IResendVerificationTokenUseCase";
import { ICacheProviderRedisImpl } from "@infra/providers/Cache/ICacheProviderRedisImpl";
import { IMailProviderMailTrapImpl } from "@infra/providers/Mail/IMailProviderMailTrapImpl";

export class IResendVerificationTokenFactory {
    compose(): IResendVerificationTokenUseCase {
        const iCacheProvider = new ICacheProviderRedisImpl();
        const iMailProvider = new IMailProviderMailTrapImpl();
        return new IResendVerificationTokenUseCase(iCacheProvider, iMailProvider)
    }
}