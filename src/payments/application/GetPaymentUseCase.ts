import { Payments } from "../domain/Payments";
import { PaymentsRepository } from "../domain/PaymentsRepository";

export class GetPaymentUseCase {
  constructor(readonly payments: PaymentsRepository) {}
  async run(email: string, id_pago:string): Promise<Payments[] | null> {
    try {
      const paymenstT: Payments[] | null = await this.payments.getPayment(
        email,id_pago
      );
      if (paymenstT != null) {
        return paymenstT;
      } else {
        return null;
      }
    } catch (error) {
        console.error(error);
        return null
    }
  }
}
