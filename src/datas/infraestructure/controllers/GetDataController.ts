import { Request, Response } from "express";
import { GetDataUseCase } from "../../application/GetDataUseCase";

export class GetDataController {
  constructor(readonly getData: GetDataUseCase) {}
  async run(req: Request, res: Response) {
    const data = req.params;
    try {
      const result = await this.getData.run(data.id_user);
      if (result.length > 1 && typeof result != "string") {
        res.status(200).json({
          data: result,
        });
      } else if (result.length < 1 && typeof result != "string") {
        res.status(200).json({
          messages: "No se encontraron datos",
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
