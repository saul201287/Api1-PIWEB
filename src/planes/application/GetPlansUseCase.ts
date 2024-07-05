import { Plan } from "../domain/Plan";
import { PlanRepository } from "../domain/PlanRepository";

export class GetPlansUseCase{
    constructor(readonly plan:PlanRepository) {}
    async run():Promise<Plan[] | string>{
        try {
            const planes = await this.plan.getPlans();
            return planes
        } catch (error) {
            console.error(error);
            return "error: " + error
        }
    }
} 