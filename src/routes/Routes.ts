import { UserEndpoints } from './User/UserEndpoints';
import { RefreshTokenEndpoints } from './RefreshToken/RefreshTokenEndpoints';
import { ProductEndpoints } from './Product/ProductEndpoints';

export class Routes {
    constructor(
        private readonly user: UserEndpoints,
        private readonly refreshToken: RefreshTokenEndpoints,
        private readonly product: ProductEndpoints
    ) {}
    setupRoutes() {
        this.user.setupRoutes();
        this.refreshToken.setupRoutes();
        this.product.setupRoutes();
    }
}