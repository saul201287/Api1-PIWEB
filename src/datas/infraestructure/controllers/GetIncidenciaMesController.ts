import { Request, Response } from "express";
import {GetConsumoaMesUseCase  } from "../../application/GetConsumoaMesUseCase";

export class GetConsumoaMesController {
  constructor(readonly getData: GetConsumoaMesUseCase) {}
  async run(req: Request, res: Response) {
    const data = req.params;
    try {
      const result = await this.getData.run(data.id_user);
      if (result.length >= 1 && typeof result != "string") {
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
      console.error(error);
      
      res.status(500).json({
        error: error,
      });
    }
  }
}