import { IDetachProductFromCartFactory } from '@application/factories/Cart/DetachProductFromCart/IDetachProductFromCartFactory';
import { IDetachProductFromCartController } from './IDetachProductFromCartController';
import { IDetachProductFromCartValidator } from '@application/validators/IDetachProductFromCartValidator';
import { ITokenServiceJWTImpl } from '@infra/services_implementation/ITokenServiceJWTImpl';

const iFactory = new IDetachProductFromCartFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iValidator = new IDetachProductFromCartValidator();
const iController = new IDetachProductFromCartController(
  iUseCase,
  iTokenService,
  iValidator
);

const iDetachProductFromCart: IDetachProductFromCartController = iController;

export { iDetachProductFromCart };
