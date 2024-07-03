import { CreateTokenUseCase } from "../application/CreateTokenUseCase";
import { ValidateTokenUseCase } from "../application/ValidateTokenUseCase";
import { CreateTokenControll } from "./controller/CreateTokenController";
import { ValidateTokenController } from "./controller/ValidateTokenController";
import { AuthServices } from "./ServicesAuth";

const authServices = new AuthServices();

const validateTokenUseCase = new ValidateTokenUseCase(authServices);
const createTokenUseCase = new CreateTokenUseCase(authServices);

export const validateTokenController = new ValidateTokenController(
  validateTokenUseCase
);
export const createTokenControll = new CreateTokenControll(createTokenUseCase);
