import { CreateUserUseCase } from "../application/CreateUserUseCase";
import { GetUserUseCase } from "../application/GeTUserUseCase";
import { PutUserPassRecoverUseCase } from "../application/PutUserPassRecoverUseCase";
import { PutUserPassUseCase } from "../application/PutUserPassUseCase";
import { ServicesSendEmailWelcome } from "../application/services/ServicesSendMailWelcome";
import { SendEmailPassRecover } from "../application/services/SendEmailPassRecover";
import { CreateUserController } from "./controllers/CreateUserController";
import { GetUserControll } from "./controllers/GetUserController";
import { PutUserPassRecoverController } from "./controllers/PutUserPassRecoverController";
import { PutUserPassController } from "./controllers/PutUserPassController";
import { RecoverPassController } from "./controllers/RecoverPassController";
import { MysqlUserRepository } from "./MysqlUserRepository";
import { IdServices } from "./helpers/ServicesUuidv4";
import { EncryptServices } from "./helpers/ServicesEncript";
import { servicesEmail } from "./ServicesEmail";

const mysqlUserRepository = new MysqlUserRepository();
const idServices = new IdServices();
const encryptServices = new EncryptServices();
const serviceEmail = new servicesEmail();
const sendMailWelcome = new ServicesSendEmailWelcome(serviceEmail);

const createUserUseCase = new CreateUserUseCase(
  mysqlUserRepository,
  encryptServices,
  sendMailWelcome,
  idServices
);
const getUserUseCase = new GetUserUseCase(mysqlUserRepository, encryptServices);
const putUserPassRecoverUseCase = new PutUserPassRecoverUseCase(mysqlUserRepository, encryptServices)
const putUserPassUseCase = new PutUserPassUseCase(
  mysqlUserRepository,
  encryptServices
);
const sendEmailPassRecover = new SendEmailPassRecover(
  serviceEmail,
  mysqlUserRepository
);

export const createUserController = new CreateUserController(createUserUseCase);
export const getUserController = new GetUserControll(getUserUseCase);
export const putUserPassRecoverController = new PutUserPassRecoverController(putUserPassRecoverUseCase)
export const putUserPassController = new PutUserPassController(
  putUserPassUseCase
);
export const recoverPassController = new RecoverPassController(
  sendEmailPassRecover
);
