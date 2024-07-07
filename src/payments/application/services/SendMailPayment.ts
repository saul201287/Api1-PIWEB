import { Payments } from "../../domain/Payments";
import { IServicesEmailPayments } from "../../domain/Services/IServicesEmailPayments";

export class SendMailPayment {
  constructor(readonly Iservicesemail: IServicesEmailPayments) {}
  async run(email: string, payment: Payments): Promise<boolean | null> {
    try {
      const status = await this.Iservicesemail.sendMailPayment(email, payment);
      if (status) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
