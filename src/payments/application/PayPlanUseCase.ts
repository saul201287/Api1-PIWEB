import { Payments } from "../domain/Payments";
import { PaymentsRepository } from "../domain/PaymentsRepository";
import { SendMailPayment } from "./services/SendMailPayment";
import { SendPaymentRabbit } from "./services/SendPaymentRabbit";
import { IGeneratorId } from "./services/IGenaratorId";
import { FindUserUseCase } from "./FindUserUseCase";

export class PayPlanUseCase {
  constructor(
    readonly sendmailPay: SendMailPayment,
    readonly sendpayRabbit: SendPaymentRabbit,
    readonly idgenerador: IGeneratorId,
    readonly user: FindUserUseCase,
    readonly paymentsRepository: PaymentsRepository
  ) {}
  async run(
    tarjeta: string,
    cvv: number,
    fecha: Date,
    email: string,
    metodoPago: string,
    monto: number,
    paquete: number
  ): Promise<Payments | string | boolean> {
    try {
      const userFind:any  = await this.user.run(email);
      
      if (userFind != null) {
        const id_pago = this.idgenerador.asignarId();
        const data: Payments = {
          id: id_pago,
          id_user: userFind.iduser,
          id_plan: userFind.idplan,
          importe: monto,
          fecha: fecha,
          descripcion: [email, metodoPago, paquete, cvv, tarjeta],
        };
        const statusPayment = await this.sendpayRabbit.run(data);
        if (statusPayment) {
          this.sendmailPay.run(email, data);
          await this.paymentsRepository.payPlan(data)
          return data;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
}
