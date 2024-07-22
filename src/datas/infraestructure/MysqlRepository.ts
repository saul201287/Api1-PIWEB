import { query } from "../../database/mysql";
import { Data } from "../domain/Data";
import { DataRepository } from "../domain/DataRepository";

function formatDate(date: Date) {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }

  return [year, month, day].join("-");
}
export class mysqlRepository implements DataRepository {
  async getData(id_user: string): Promise<Data[] | string> {
    const params = [id_user];
    const sql = `SELECT 
    DAYNAME(fecha) AS dia_semana,
    SUM(consumokwh) AS total_consumokwh
FROM 
    historialsensores
WHERE 
    YEARWEEK(fecha, 1) = YEARWEEK(CURDATE(), 1)
    AND id_user = ?
GROUP BY 
    DAYOFWEEK(fecha)
ORDER BY 
    FIELD(DAYOFWEEK(fecha), 2, 3, 4, 5, 6, 7, 1);
`;
    try {
      const [result]: any = await query(sql, params);
      const data: any = Object.values(JSON.parse(JSON.stringify(result)));
      console.log(data);

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
    console.log(id_user, fechaFin, fechaIni);
    const data1 = formatDate(fechaIni);
    const date2 = formatDate(fechaFin);
    const params = [data1, date2, id_user];
    const sql = `SELECT 
    SUM(consumokwh) AS total_consumokwh FROM historialsensores
    WHERE fecha BETWEEN ? AND ? AND id_user = ?`;
    try {
      const [result]: any = await query(sql, params);
      console.log(result);

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
    const sql = `SELECT MONTHNAME(fecha) AS mes, tipo, COUNT(*) AS total 
    FROM incidencias WHERE YEAR(fecha) = YEAR(CURDATE()) AND id_user = ?
    GROUP BY MONTH(fecha), tipo ORDER BY MONTH(fecha);`;
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
    const params = [id_user];
    const sql = `SELECT MONTHNAME(fecha) AS mes, SUM(consumokwh) AS total_consumokwh FROM historialsensores
       WHERE YEAR(fecha) = YEAR(CURDATE()) AND id_user = ? GROUP BY MONTH(fecha) ORDER BY MONTH(fecha);`;
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
  async getConsumoaMes(id_user: string): Promise<[] | string> {
    const params = [id_user];
    const sql = `SELECT MONTHNAME(fecha) AS mes, SUM(consumokwh) AS total_consumokwh
    FROM historialsensores
    WHERE YEAR(fecha) = YEAR(CURDATE()) AND id_user = ?
    GROUP BY MONTH(fecha) ORDER BY MONTH(fecha)`;
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
