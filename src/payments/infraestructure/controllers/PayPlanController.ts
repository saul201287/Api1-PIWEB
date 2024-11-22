import { Request, Response } from "express";
import { PayPlanUseCase } from "../../application/PayPlanUseCase";

export class PayPlanController {
  constructor(readonly payPlan: PayPlanUseCase) {}
  async run(req: Request, res: Response) {
    const data = req.body;
    console.log(data);
    
    try {
      const pay = await this.payPlan.run(
        data.tarjeta,
        data.cvv,
        data.fecha,
        data.email,
        data.metodoPago,
        data.monto,
        data.direccion,
        data.paquete
      );
      if (typeof pay == "boolean") {
        res.status(401).json({
          messages: "No se pudo efectuar el pago",
        });
      } else if (typeof pay != "string") {
        const newToken = res.locals.newToken;
        if (newToken) {
          res.header("nuevo-token", newToken).status(201).json({
            messages: "Pago efectuado con exito",
            data: pay,
          });
        } else {
          res.status(201).json({
            messages: "Pago efectuado con exito",
            data: pay,
          });
        }
      } else {
        res.status(409).json({
          messages: "Hubo un problema en los servicios de pago intente despues",
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
