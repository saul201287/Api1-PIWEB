import { query } from "../../database/mysql";
import { Payments } from "../domain/Payments";
import { PaymentsRepository } from "../domain/PaymentsRepository";

export class MysqlRepository implements PaymentsRepository {
  async findUser(
    email: string
  ): Promise<{ iduser: string; idplan: number } | null> {
    const sql = "SELECT idUsers, plan_id FROM users where email = ?";
    const params = [email];
    try {
      const [result]: any = await query(sql, params);
      const data: any = Object.values(JSON.parse(JSON.stringify(result)));
      if (data.length > 0) {
        const iduser = data[0].idUsers.toString();
        const idplan = Number(data[0].plan_id);
        const arreglo = { iduser: iduser, idplan: idplan };
        return arreglo;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async payPlan(payment: Payments): Promise<Payments | null> {
    const sql =
      "INSERT INTO pagos (id, id_user,id_plan,importe,fecha,descripcion) VALUES (?,?,?,?,?,?)";
    const params = [
      payment.id,
      payment.id_user,
      payment.id_plan,
      payment.importe,
      payment.fecha,
      payment.descripcion,
    ];
    try {
      const [result]: any = await query(sql, params);
      const data: any = Object.values(JSON.parse(JSON.stringify(result)));
      const pay: Payments = {
        id: payment.id,
        id_user: payment.id_user,
        id_plan: payment.id_plan,
        importe: payment.importe,
        fecha: payment.fecha,
        descripcion: payment.descripcion,
      };
      return pay;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getPayments(user: unknown): Promise<Payments[] | null> {
    return null;
  }
  async getPayment(user: string): Promise<Payments[] | null> {
    return null;
  }
}
