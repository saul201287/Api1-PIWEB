import { Payments } from "./Payments";

export interface PaymentsRepository {
  payPlan(payment: Payments): Promise<Payments | null>;
  getPayments(user: string): Promise<Payments[] | null>;
  getPayment(user: string, id_pago:string): Promise<Payments[] | null>;
  findUser(email: string): Promise<{iduser:string,idplan:number}| null>;
}
