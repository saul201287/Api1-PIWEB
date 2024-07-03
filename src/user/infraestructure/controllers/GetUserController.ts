import { NextFunction, Request, Response } from "express";
import { GetUserUseCase } from "../../application/GeTUserUseCase";

export class GetUserControll {
  constructor(readonly getUserUseCase: GetUserUseCase) {}

  async run(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    try {
      const userN = await this.getUserUseCase.run(data.user, data.password);
      console.log(userN);
      
      if (typeof userN != "boolean") {
        res.locals.user = userN;
        next();
      } else {
        res.status(404).json({
          error: "Credenciales invalidas",
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
