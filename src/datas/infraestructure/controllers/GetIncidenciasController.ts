import { Request, Response } from "express";
import { GetIncidenciasUseCase } from "../../application/GetIncidenciasUseCase";

export class GetIncidenciasController {
  constructor(readonly getInc: GetIncidenciasUseCase) {}
  async run(req: Request, res: Response) {
    const data = req.params;
    try {
      const result = await this.getInc.run(data.id_user);
      if (result.length >= 1 && typeof result != "string") {
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
      console.error(error);
      res.status(500).json({
        error: error,
      });
    }
  }
}
