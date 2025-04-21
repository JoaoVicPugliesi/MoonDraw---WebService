import { IAttachProductIntoCartFactory } from '@application/factories/Cart/AttachProductIntoCart/IAttachProductIntoCartFactory';
import { IAttachProductIntoCartController } from './IAttachProductIntoCartController';
import { ITokenServiceJWTImpl } from '@infra/services_implementation/ITokenServiceJWTImpl';
import { IAttachProductIntoCartValidator } from '@application/validators/IAttachProductIntoCartValidator';

const iFactory = new IAttachProductIntoCartFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iValidator = new IAttachProductIntoCartValidator();
const iController = new IAttachProductIntoCartController(
  iUseCase,
  iTokenService,
  iValidator
);
const iAttachProductIntoCart: IAttachProductIntoCartController = iController;

export { iAttachProductIntoCart };
