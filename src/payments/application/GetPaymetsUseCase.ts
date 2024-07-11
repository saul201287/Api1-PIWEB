import { Payments } from "../domain/Payments";
import { PaymentsRepository } from "../domain/PaymentsRepository";

export class GetPaymentsUseCase {
  constructor(readonly payments: PaymentsRepository) {}
  async run(email: string): Promise<Payments[] | null> {
    try {
      const paymenstT: Payments[] | null = await this.payments.getPayments(
        email
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
