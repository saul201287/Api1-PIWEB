import { Request, Response } from "express";
import { PutUserPassRecoverUseCase } from "../../application/PutUserPassRecoverUseCase";

export class PutUserPassRecoverController {
  constructor(readonly putUserPass: PutUserPassRecoverUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const status = await this.putUserPass.run(data.email, data.passnew);
      if (typeof status == "boolean") {
        if (status) {
          res.status(201).json({
            messages: "Contraseña editada correctamente",
          });
        } else {
          res.status(409).json({
            menssages: "El correo no esta registrado",
          });
        }
      } else {
        res.status(409).json({
          messages: "Hubo un error en los servicicos",
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
