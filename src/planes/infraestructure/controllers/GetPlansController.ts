import { Request, Response } from "express";
import { GetPlansUseCase } from "../../application/GetPlansUseCase";

export class GetPlansController {
  constructor(readonly getPlans: GetPlansUseCase) {}
  async run(req: Request, res: Response) {
    try {
      const plans = await this.getPlans.run();
      if (typeof plans != "string") {
        const newToken = res.locals.newToken;
        if (newToken) {
          res.header("nuevo-token", newToken).status(200).json({
            data: plans,
          });
        } else {
          res.status(200).json({
            data: plans,
          });
        }
      } else {
        res.status(401).json({
          messages: plans,
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
