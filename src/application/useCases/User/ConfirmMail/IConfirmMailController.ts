import z from "zod";
import { RequestResponseAdapter} from "@adapters/ServerAdapter";
import { IConfirmMailUseCase } from "./IConfirmMailUseCase";
import { IConfirmMailDTO } from "./IConfirmMailDTO";

export class IConfirmMailController {
    constructor(private readonly iConfirmMailUseCase: IConfirmMailUseCase) {}

    async handle(adapter: RequestResponseAdapter) {
        const schema = z.object({
            email: z.string({
                required_error: 'Email is required',
                invalid_type_error: 'Email should be a string'
            }),
            token: z.string({
                required_error: 'Token is required',
                invalid_type_error: 'Token should be a string'
            })
        });

        try {
            const DTO: IConfirmMailDTO = schema.parse(adapter.req.body);
            const confirmed: boolean | number = await this.iConfirmMailUseCase.execute(DTO);

            if(typeof confirmed === 'boolean') return adapter.res.status(404).send({ message: 'User Not Found' });

            return adapter.res.status(204).send();
        } catch(error) {
            if(error instanceof z.ZodError) return adapter.res.status(401).send({ message: 'Non Authorized' });
            if(error instanceof Error) return adapter.res.status(500).send({ message: 'Server internal error' });
        }
    }
}