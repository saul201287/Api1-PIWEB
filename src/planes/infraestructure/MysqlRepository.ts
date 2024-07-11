import { query } from "../../database/mysql";
import { PlanRepository } from "../domain/PlanRepository";
import { Plan } from "../domain/Plan";

export class MysqlRepository implements PlanRepository {
  async assignPlan(email: string, plan: number): Promise<string | boolean> {
    const sql = "UPDATE users SET plan_id = ? where email= ?";
    const params = [plan, email];
    try {
      const [result]: any = await query(sql, params);
      const data: any = Object.values(JSON.parse(JSON.stringify(result)));
      if (typeof data === "object") {
        if (data[1] > 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
  async getPlans(): Promise<Plan[] | string> {
    const sql = "SELECT * FROM planes";
    try {
      const [result]: any = await query(sql, []);
      const data: any = Object.values(JSON.parse(JSON.stringify(result)));
      if (data.length > 0) {
        const planes: Plan[] = data.map(
          (plan: any) =>
            new Plan(
              plan.idplan,
              plan.tipo,
              plan.duracion,
              Number(plan.costo),
              plan.detalles
            )
        );
        return planes;
      } else {
        return "No hay datos registrados";
      }
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
  async getPlanUser(email: string): Promise<Plan[] | string> {
    const sql =
      "SELECT planes.* FROM users JOIN planes ON users.plan_id = planes.idplan WHERE users.email = ?";
    const params = [email];
    try {
      const [result]: any = await query(sql, params);
      const data: any = Object.values(JSON.parse(JSON.stringify(result)));
      if (data.length > 0) {
        const plan: Plan[] = data.map(
          (plan: any) =>
            new Plan(
              plan.idplan,
              plan.tipo,
              plan.duracion,
              Number(plan.costo),
              plan.detalles
            )
        );
        return plan;
      } else {
        return "No se encontro el plan";
      }
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
  async putPlan(email: string, id_plan: string): Promise<boolean | string> {
    const sql = "UPDATE users SET plan_id = ? where email= ?";
    const params = [id_plan, email];
    try {
      const [result]: any = await query(sql, params);
      const data: any = Object.values(JSON.parse(JSON.stringify(result)));
      if (typeof data === "object") {
        if (data[1] > 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
}
