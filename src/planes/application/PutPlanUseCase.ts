import { PlanRepository } from "../domain/PlanRepository";

export class PutPlanUseCase {
  constructor(readonly putPlan: PlanRepository) {}
  async run(email: string, id_plan: string): Promise<boolean | string> {
    try {
      const status = await this.putPlan.putPlan(email, id_plan);
      return status;
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
}
