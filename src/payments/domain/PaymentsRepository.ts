export interface PaymentsRepository {
  payPlan(
    targeta: string,
    cvv: number,
    fecha: Date,
    email: string,
    metodoPago: string,
    fechaExp: Date,
    monto: number,
    paquete: number
  ): Promise<JSON>;
  
}
