import { Request, Response } from "express";
import { GetPlanUserUseCase } from "../../application/GetPlanUserUseCase";

export class GetPlanUserController {
  constructor(readonly getPlan: GetPlanUserUseCase) {}
  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const plan = await this.getPlan.run(data.user);
      if (typeof plan != "string") {
        res.status(200).json({
          data: plan,
        });
      } else {
        res.status(404).json({
          messages: plan,
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
