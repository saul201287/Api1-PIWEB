import { Request, Response } from "express";
import { GetPaymentsUseCase } from "../../application/GetPaymetsUseCase";

export class GetPaymentsController {
  constructor(readonly getPayment: GetPaymentsUseCase) {}
  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const payments = await this.getPayment.run(data.email);
      if (payments != null) {
        const newToken = res.locals.newToken;
        if (newToken) {
          res.header("nuevo-token", newToken).status(200).json({
            messages: "elemntos encontrados",
            data: payments,
          });
        } else {
          res.status(200).json({
            messages: "elemntos encontrados",
            data: payments,
          });
        }
      } else {
        res.status(406).json({
          messages:
            "El usuario o datos relacionado a este no se encontron",
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
