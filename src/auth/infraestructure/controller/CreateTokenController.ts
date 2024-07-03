import { Request, Response } from "express";
import { CreateTokenUseCase } from "../../application/CreateTokenUseCase";

export class CreateTokenControll {
  constructor(readonly createToken: CreateTokenUseCase) {}
  async run(req: Request, res: Response) {
    try {
      const token = await this.createToken.run(res.locals.user.id);
      res.status(201).header("token", token).json({
        data: res.locals.user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: error,
      });
    }
  }
}
