import { Plan } from "./Plan";

export interface PlanRepository {
  assignPlan(email: string, plan:number): Promise<string | boolean>;
  getPlans(): Promise<Plan[] | string>;
  getPlanUser(user: string): Promise<Plan[] | string>;
  putPlan(email: string, id_plan: string): Promise<boolean | string>;
}
