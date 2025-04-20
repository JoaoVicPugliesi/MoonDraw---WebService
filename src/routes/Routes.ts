import { UserEndpoints } from './User/UserEndpoints';
import { RefreshTokenEndpoints } from './RefreshToken/RefreshTokenEndpoints';
import { ProductEndpoints } from './Product/ProductEndpoints';
import { CartEndpoints } from './Cart/CartEndpoints';

export class Routes {
    constructor(
        private readonly user: UserEndpoints,
        private readonly refreshToken: RefreshTokenEndpoints,
        private readonly product: ProductEndpoints,
        private readonly cart: CartEndpoints
    ) {}
    setupRoutes() {
        this.user.setupRoutes();
        this.refreshToken.setupRoutes();
        this.product.setupRoutes();
        this.cart.setupRoutes();
    }
}