import { Request, Response, NextFunction } from "express";
import { ValidateTokenUseCase } from "../../application/ValidateTokenUseCase";

export class ValidateTokenController {
  constructor(readonly validate: ValidateTokenUseCase) {}
  async run(req: Request, res: Response, next: NextFunction) {
    try {
      let token = req.headers["x-token-access"];
      if (typeof token === "string") {
        const access = await this.validate.run(token);
        if (typeof access !== "string") {
          if (access == 201) {
            res.status(access).json({
              msg: "Token valido",
            });
          } else {
            res.status(access).json({
              msg: "Acceso denegado, token invalido",
            });
          }
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: error,
      });
    }
  }
}
