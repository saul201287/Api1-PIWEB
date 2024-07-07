import { PayPlanUseCase } from "../application/PayPlanUseCase";
import { FindUserUseCase } from "../application/FindUserUseCase";
import { SendMailPayment } from "../application/services/SendMailPayment";
import { SendPaymentRabbit } from "../application/services/SendPaymentRabbit";
import { PayPlanController } from "./controllers/PayPlanController";
import { MysqlRepository } from "./MysqlRepository";
import { IdServices } from "./helpers/ServicesUuidv4";
import { NodeMailerServices } from "./services/NodeMeilerServices";
import { RabbitServices } from "./services/RabbitServices";

const mysql = new MysqlRepository();
const rabbit = new RabbitServices();
const idservices = new IdServices();
const email = new NodeMailerServices();

const sendMail = new SendMailPayment(email);
const sendRabbit = new SendPaymentRabbit(rabbit);
const findUser = new FindUserUseCase(mysql);
const payPlanUseCase = new PayPlanUseCase(
  sendMail,
  sendRabbit,
  idservices,
  findUser,
  mysql
);

export const payPlanController = new PayPlanController(payPlanUseCase);
