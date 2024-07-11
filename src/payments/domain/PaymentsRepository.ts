import { Payments } from "./Payments";

export interface PaymentsRepository {
  payPlan(payment: Payments): Promise<Payments | null>;
  getPayments(email: string): Promise<Payments[] | null>;
  getPayment(email: string, id_pago:string): Promise<Payments[] | null>;
  findUser(email: string): Promise<{iduser:string,idplan:number}| null>;
}
