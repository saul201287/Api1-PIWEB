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

  async getPayments(user: string): Promise<Payments[] | null> {
    const sql = `SELECT pagos.id,pagos.importe,pagos.fecha,pagos.descripcion, planes.tipo AS nombre_plan,users.lastname, users.name AS usuario 
    FROM pagos JOIN users ON pagos.id_user = users.idUsers JOIN planes ON pagos.id_plan = planes.idplan
     WHERE users.user = ?`;
    const params = [user];
    try {
      const [result]: any = await query(sql, params);
      const data: any = Object.values(JSON.parse(JSON.stringify(result)));
      if (data.length > 0) {
        const payments: Payments[] = data.map(
          (payment: any) =>
            new Payments(
              payment.id,
              payment.nombre_plan + " " + payment.lastname,
              payment.usuario,
              payment.importe,
              payment.fecha,
              payment.descripcion
            )
        );
        console.log(payments);
        return payments;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async getPayment(user: string, id_pago:string): Promise<Payments[] | null> {
    const sql = `SELECT pagos.id,pagos.importe,pagos.fecha,pagos.descripcion, planes.tipo AS nombre_plan,users.lastname, users.name AS usuario 
    FROM pagos JOIN users ON pagos.id_user = users.idUsers JOIN planes ON pagos.id_plan = planes.idplan
     WHERE users.user = ? && pagos.id = ?`;
    const params = [user, id_pago];
    try {
      const [result]: any = await query(sql, params);
      const data: any = Object.values(JSON.parse(JSON.stringify(result)));
      if (data.length > 0) {
        const payments: Payments[] = data.map(
          (payment: any) =>
            new Payments(
              payment.id,
              payment.nombre_plan + " " + payment.lastname,
              payment.usuario,
              payment.importe,
              payment.fecha,
              payment.descripcion
            )
        );
        console.log(payments);
        return payments;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
