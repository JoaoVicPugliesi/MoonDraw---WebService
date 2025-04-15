import { RequestResponseAdapter } from "@adapters/ServerAdapter";
import { IFetchProductsUseCase } from "./IFetchProductsUseCase";
import { IFetchProductsDTO } from "./IFetchProductsDTO";
import { FetchProductsResponse, InvalidProductsNotFoundErrorResponse } from "@application/handlers/UseCasesResponses/Product/IFetchProductsHandlers";
import { IEnsureAccessTokenMiddleware } from "@application/middlewares/IEnsureAccessTokenMiddleware";
import { IJWTTokenServiceImpl } from "@infra/services_implementation/IJWTTokenServiceImpl";

export class IFetchProductsController {
    constructor(
        private readonly iFetchProductsUseCase: IFetchProductsUseCase
    ) {}

    async handle(adapter: RequestResponseAdapter) {
        try {
            const iTokenService = new IJWTTokenServiceImpl();
            const iEnsureAccessTokenMiddleware = new IEnsureAccessTokenMiddleware(adapter, iTokenService);
            iEnsureAccessTokenMiddleware.ensure();
            const { page } = adapter.req.params as { page: number };
            const DTO: IFetchProductsDTO = {
                page
            };
            const response: FetchProductsResponse | InvalidProductsNotFoundErrorResponse = 
            await this.iFetchProductsUseCase.execute(DTO);

            if(response instanceof InvalidProductsNotFoundErrorResponse) 
            return adapter.res.status(404).send({ message: 'Products Not Found' });

            return adapter.res.status(200).send({ products: response.products })

        } catch (error) {
            return adapter.res.status(500)
            .send({ message: error })
        }
    }
}