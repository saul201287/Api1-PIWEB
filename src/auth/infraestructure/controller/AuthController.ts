import { Request, Response, NextFunction } from "express";
import { AuthUserUseCase } from "../../application/AuthUserUseCase";

export class AuthController {
  constructor(readonly authUserUseCase: AuthUserUseCase) {}
  async run(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    try {
      const token = await this.authUserUseCase.run(data.user, data.password);
      if (token.length >= 50) {
        res.status(200).json({
          status: "succes",
          message: "Credenciales validas",
        });
        next();
      } else {
        res.status(401).json({
          message: token,
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
