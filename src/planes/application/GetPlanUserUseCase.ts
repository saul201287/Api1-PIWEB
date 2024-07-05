import { Plan } from "../domain/Plan";
import { PlanRepository } from "../domain/PlanRepository";

export class GetPlanUserUseCase{
    constructor(readonly getPlan: PlanRepository){}
    async run(user:string):Promise<Plan[] | string>{
        try {
            const plan = await this.getPlan.getPlanUser(user);
            return plan
        } catch (error) {
            console.error(error);
            return "error: " + error
        }
    }
}