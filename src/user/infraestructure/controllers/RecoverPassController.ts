import { Request, Response } from "express";
import { SendEmailPassRecover } from "../../application/services/SendEmailPassRecover";

export class RecoverPassController {
  constructor(readonly sendEmailPassRecover: SendEmailPassRecover) {}
  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const recover = await this.sendEmailPassRecover.run(data.email);
      if (typeof recover == "boolean") {
        if (recover) {
          res.status(200).json({
            message: "Email enviado",
          });
        } else {
          res.status(406).json({
            messages: "Email no registrado",
          });
        }
      } else {
        res.status(500).json({
          error: recover,
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
