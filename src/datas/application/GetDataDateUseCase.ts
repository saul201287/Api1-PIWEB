import { DataRepository } from "../domain/DataRepository";
import { Data } from "../domain/Data";

export class GetDataDateUseCase{
    constructor(readonly dataRe:DataRepository){}
    async run(id_user:string,fechaIni:Date,fechaFin:Date):Promise<Data[]|string>{
        try {
            const data = await this.dataRe.getDataDate(id_user,fechaIni,fechaFin)
            return data
        } catch (error) {
            console.error(error);
            return "error: " + error;
        }
    }
}