import { Request, Response } from "express";
import { PutUserPassUseCase } from "../../application/PutUserPassUseCase";

export class PutUserPassController {
  constructor(readonly putUserPassUseCase: PutUserPassUseCase) {}
  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const isPassTrue = await this.putUserPassUseCase.run(
        data.user,
        data.password,
        data.password2
      );
      if (isPassTrue) {
        res.status(201).json({
          messages: "Contraseña modificada",
        });
      } else {
        res.status(400).json({
          error: "hubo un error de parte del cliente",
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
