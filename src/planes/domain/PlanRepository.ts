import { Plan } from "./Plan";

export interface planRepository {
  creatPlan(
    id_user: string,
    tipo: string,
    duracion: Date,
    costo: Number,
    detalles: string
  ): Promise<Plan | null>;
  getPlan(id: string): Promise<Plan | null>;
}
