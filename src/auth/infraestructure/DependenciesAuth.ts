import { AuthUserUseCase } from "../application/AuthUserUseCase";
import { ValidateTokenUseCase } from "../application/ValidateTokenUseCase";
import { AuthController } from "./controller/AuthController";
import { ValidateTokenController } from "./controller/ValidateTokenController";
import { AuthServices } from "./ServicesAuth";

const authServices = new AuthServices();

const authUserUseCase = new AuthUserUseCase(authServices);
const validateTokenUseCase = new ValidateTokenUseCase(authServices);

export const authController = new AuthController(authUserUseCase);
export const validateTokenController = new ValidateTokenController(
  validateTokenUseCase
);
