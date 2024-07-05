import { PlanRepository } from "../domain/PlanRepository";

export class AssignPlanUseCase {
  constructor(readonly planRepository: PlanRepository) {}
  async run(email: string, plan:number): Promise<string | boolean> {
    try {
      const status = await this.planRepository.assignPlan(email, plan);
      return status;
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
}
