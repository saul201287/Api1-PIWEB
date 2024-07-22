import { DataRepository } from "../domain/DataRepository";
import { Data } from "../domain/Data";

export class GetDataUseCase {
  constructor(readonly dataRe: DataRepository) {}
  async run(id_user: string): Promise<Data[] | string> {
    try {
      const data = await this.dataRe.getData(id_user);
      return data;
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
}
