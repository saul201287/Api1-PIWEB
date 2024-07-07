import { Payments } from "../../domain/Payments";
import { IServicesRabbit } from "../../domain/Services/IServisesRabbit";

export class SendPaymentRabbit {
  constructor(readonly Iservicesrabbit: IServicesRabbit) {}
  async run(data: Payments): Promise<boolean | null> {
    try {
      const formt = await this.Iservicesrabbit.sendMqpPayment(data);
      if (typeof formt == "boolean") {
        if (formt) {
          return true;
        } else {
          return false;
        }
      } else {
        return formt;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
