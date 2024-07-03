import { Auth } from "./Auth";

export interface AuthRepository {
  createToken(id_user: string): Promise<string>;
  validateToken(token: string): Promise<boolean | string>;
}
