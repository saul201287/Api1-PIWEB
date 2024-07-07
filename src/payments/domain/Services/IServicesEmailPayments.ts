import { Payments } from "../Payments";

export interface IServicesEmailPayments {
  sendMailPayment(email: string, payment: Payments): Promise<boolean>;
}
