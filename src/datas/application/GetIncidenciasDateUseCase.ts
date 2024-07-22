import { DataRepository } from "../domain/DataRepository";

export class GetIncidenciasDateUseCase {
  constructor(readonly dataRe: DataRepository) {}
  async run(
    id_user: string,
    fechaIni: Date,
    fechaFin: Date
  ): Promise<[] | string> {
    try {
      const datas = await this.dataRe.getIncidenciaDate(
        id_user,
        fechaIni,
        fechaFin
      );
      return datas;
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
}
