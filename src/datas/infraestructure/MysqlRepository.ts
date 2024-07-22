import { query } from "../../database/mysql";
import { Data } from "../domain/Data";
import { DataRepository } from "../domain/DataRepository";

export class mysqlRepository implements DataRepository {
  async getData(id_user: string): Promise<Data[] | string> {
    const params = [id_user];
    const sql = "SELECT * FROM powerwatch.historialsensores where id_user = ?";
    try {
      const [result]: any = await query(sql, params);
      const data: any = Object.values(JSON.parse(JSON.stringify(result)));
      const datas: [] = data;
      return datas;
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
  async getDataDate(
    id_user: string,
    fechaIni: Date,
    fechaFin: Date
  ): Promise<Data[] | string> {
    const params = [id_user, fechaIni, fechaFin];
    const sql =
      "SELECT * FROM historialsensores WHERE id_user = ? AND fecha BETWEEN ? AND ? ";
    try {
      const [result]: any = await query(sql, params);
      const data: any = Object.values(JSON.parse(JSON.stringify(result)));
      const datas: [] = data;
      return datas;
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
  async getIncidencias(id_user: string): Promise<[] | string> {
    const params = [id_user];
    const sql = "SELECT * FROM powerwatch.incidencias where id_user = ?";
    try {
      const [result]: any = await query(sql, params);
      const data: any = Object.values(JSON.parse(JSON.stringify(result)));
      const datas: [] = data;
      return datas;
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
  async getIncidenciaDate(
    id_user: string,
    fechaIni: Date,
    fechaFin: Date
  ): Promise<[] | string> {
    const params = [id_user, fechaIni, fechaFin];
    const sql =
      "SELECT * FROM historialsensores WHERE id_user = ? AND fecha BETWEEN ? AND ? ";
    try {
      const [result]: any = await query(sql, params);
      const data: any = Object.values(JSON.parse(JSON.stringify(result)));
      const datas: [] = data;
      return datas;
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
}
