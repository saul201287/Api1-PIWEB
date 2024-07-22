import { DataRepository } from "../domain/DataRepository";

export class GetIncidenciasUseCase {
  constructor(readonly dataRe: DataRepository) {}
  async run(id_user: string): Promise<[] | string> {
    try {
      const data = await this.dataRe.getIncidencias(id_user);
      return data;
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
}
