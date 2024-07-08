import { Request, Response } from "express";
import { AssignPlanUseCase } from "../../application/AssignPlanUseCase";

export class AssignPlanController {
  constructor(readonly assign: AssignPlanUseCase) {}
  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const result = await this.assign.run(data.email, data.plan);
      if (typeof result == "boolean") {
        if (result) {
          const newToken = res.locals.newToken; 
          if (newToken) {
            res.header("nuevo-token", newToken).status(201).json({
              messages: "Plan asignado correctamente",
            });
          }else{
            res.status(201).json({
              messages: "Plan asignado correctamente",
            });
          }
         
        } else {
          res.status(404).json({
            messages: "Usuario no encontrado",
          });
        }
      } else {
        res.status(401).json({
          messages: "Error en el servicio",
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
