import { Auth } from "./Auth";

export interface AuthRepository {
  authUser(id_user: string, password: string): Promise<string>;
  validateToken(token: string): Promise<number | string>;
}
