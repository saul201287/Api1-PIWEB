import { Data } from "./Data";

export interface DataRepository {
  getData(id_user: string): Promise<Data[] | string>;
  getDataDate(
    id_user: string,
    fechaIni: Date,
    fechaFin: Date
  ): Promise<Data[] | string>;
  getIncidencias(id_user: string): Promise<[] | string>;
  getIncidenciaDate(
    id_user: string,
    fechaIni: Date,
    fechaFin: Date
  ): Promise<[] | string>;
}
