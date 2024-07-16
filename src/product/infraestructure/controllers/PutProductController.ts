import { Request, Response } from "express";
import { PutProductUseCase } from "../../application/PutProductUseCase";

export class PutProductController {
  constructor(readonly product: PutProductUseCase) {}
  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const status = await this.product.run(data.id, data.id_plan);
      if (status) {
        res.status(201).json({
          messages: "Producto modificado",
        });
      } else {
        res.status(409).json({
          messages: "Error en el proceso",
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
