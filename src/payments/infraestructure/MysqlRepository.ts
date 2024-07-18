import { query } from "../../database/mysql";
import { Payments } from "../domain/Payments";
import { PaymentsRepository } from "../domain/PaymentsRepository";

function addOneMonth(date: Date): Date {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + 1);
  return newDate;
}
function addOneYear(date: Date): Date {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + 1);
  return newDate;
}
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
  async payPlan(payment: Payments): Promise<[Payments, string] | null> {
    const sql =
      "INSERT INTO pagos (id, id_user,id_plan,importe,fecha,descripcion, direccion) VALUES (?,?,?,?,?,?,?)";
    const params = [
      payment.id,
      payment.id_user,
      payment.id_plan,
      payment.importe,
      payment.fecha,
      payment.descripcion,
      payment.direccion,
    ];
    const sql2 = "UPDATE users SET fechaPlan=? where idUsers = ?";
    const sql3 = "SELECT fechaPlan FROM users where idUsers = ?";
    const [fecha]: any = await query(sql3, [payment.id_user]);
    const res: any = Object.values(JSON.parse(JSON.stringify(fecha)));
    const fechaUs = res[0].fechaPlan;
    let params2: Date;
    if (payment.id_plan == 1) {
      params2 = addOneMonth(fechaUs);
    } else {
      params2 = addOneYear(fechaUs);
    }

    const formattedDate = params2.toLocaleDateString("en-US");
    try {
      await query(sql2, [params2, payment.id_user]);
      const [result]: any = await query(sql, params);
      const data: any = Object.values(JSON.parse(JSON.stringify(result)));
      const pay: Payments = {
        id: payment.id,
        id_user: payment.id_user,
        id_plan: payment.id_plan,
        importe: payment.importe,
        fecha: payment.fecha,
        direccion: payment.direccion,
        descripcion: payment.descripcion,
      };
      return [pay, formattedDate];
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getPayments(email: string): Promise<Payments[] | null> {
    const sql = `SELECT pagos.id,pagos.importe,pagos.fecha,pagos.descripcion, planes.tipo AS nombre_plan,users.lastname, users.name AS usuario 
    FROM pagos JOIN users ON pagos.id_user = users.idUsers JOIN planes ON pagos.id_plan = planes.idplan
     WHERE users.email = ?`;
    const params = [email];
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
              payment.direccion,
              payment.descripcion
            )
        );
        return payments;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async getPayment(email: string, id_pago: string): Promise<Payments[] | null> {
    const sql = `SELECT pagos.id,pagos.importe,pagos.fecha,pagos.descripcion, planes.tipo AS nombre_plan,users.lastname, users.name AS usuario 
    FROM pagos JOIN users ON pagos.id_user = users.idUsers JOIN planes ON pagos.id_plan = planes.idplan
     WHERE users.email = ? && pagos.id = ?`;
    const params = [email, id_pago];
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
              payment.direccion,
              payment.descripcion
            )
        );
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
