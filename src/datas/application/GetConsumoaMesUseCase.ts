import { DataRepository } from "../domain/DataRepository";

export class GetConsumoaMesUseCase {
  constructor(readonly dataRe: DataRepository) {}
  async run(id_user: string): Promise<[] | string> {
    try {
      const datas = await this.dataRe.getConsumoaMes(id_user);
      return datas;
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
}
