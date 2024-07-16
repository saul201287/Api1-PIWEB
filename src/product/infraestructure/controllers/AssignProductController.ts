import { Request, Response } from "express";
import { AssignProductUseCase } from "../../application/AsigProductUseCase";

export class AssignProductController {
  constructor(readonly product: AssignProductUseCase) {}
  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const status = await this.product.run(
        data.id_user,
        data.id_plan,
        data.id
      );
      if (status) {
        res.status(200).json({
          messages: "producto asignado al cliente",
        });
      } else {
        res.status(406).json({
          messages: "error en la parte del cliente",
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
