import { query } from "../../database/mysql";
import { ProductRepository } from "../domain/ProductRepository";

export class MysqlProduct implements ProductRepository {
  async asigProduct(
    id_user: string,
    id_plan: number,
    id: string
  ): Promise<boolean | string> {
    const sql = "UPDATE product SET id_user = ?, id_plan = ? WHERE id = ?";
    const params = [id_user, id_plan, id];
    try {
      const [result]: any = await query(sql, params);
      const data = Object.values(JSON.parse(JSON.stringify(result)));
      if (data[1] == 1) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
  async putProduct(id: string, id_plan: number): Promise<boolean | string> {
    const sql = "UPDATE product SET id_plan = ? where id= ? ";
    const params = [id_plan, id];
    try {
      const [result]: any = await query(sql, params);
      const data = Object.values(JSON.parse(JSON.stringify(result)));
      if (data[1] == 1) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
}
