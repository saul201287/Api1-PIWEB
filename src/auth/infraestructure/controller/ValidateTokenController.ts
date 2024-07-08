import { Request, Response, NextFunction } from "express";
import { ValidateTokenUseCase } from "../../application/ValidateTokenUseCase";

export class ValidateTokenController {
  constructor(readonly validate: ValidateTokenUseCase) {}
  async run(req: Request, res: Response, next: NextFunction) {
    try {
      let token = req.headers["x-token-access"];
      if (typeof token === "string" && token.length>1) {
        const access = await this.validate.run(token);
        if (typeof access !== "string") {
          if (access == true) {
            next();
          } else {
            res.status(401).json({
              msg: "Acceso denegado, token invalido",
            });
          }
        }else{
          res.locals.newToken = access;
          next();
        }
      }else{
        res.status(400).json({
          msg: "No se encontro el token",
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
