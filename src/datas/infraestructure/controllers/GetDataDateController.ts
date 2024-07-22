import { Request, Response } from "express";
import { GetDataDateUseCase } from "../../application/GetDataDateUseCase";

export class GetDataDateController {
  constructor(readonly getData: GetDataDateUseCase) {}
  async run(req: Request, res: Response) {
    const data = req.params;
    const fechaIni = new Date(data.fechaIni);
    const fechaFin = new Date(data.fechaFin);
    try {
      const result = await this.getData.run(data.id_user, fechaIni, fechaFin);
      if (result.length > 1 && typeof result != "string") {
        res.status(200).json({
          data: result,
        });
      } else if (result.length < 1 && typeof result != "string") {
        res.status(200).json({
          messages: "No se encontraron datos para estas fechas",
        });
      } else {
        res.status(409).json({
          messages: "Hubo un error en la parte del cliente",
        });
      }
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  }
}
