import { Request, Response } from "express";
import { GetPaymentUseCase } from "../../application/GetPaymentUseCase";

export class GetPaymentController {
  constructor(readonly getPayment: GetPaymentUseCase) {}
  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const payments = await this.getPayment.run(data.user, data.id_pago);
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
        res.status(404).json({
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
