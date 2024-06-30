import { User } from "./User";

export interface userRepository {
  createUser(
    nombre: string,
    apellidos: string,
    email: string,
    edad: number,
    user: string,
    password: string,
    telefono: Number
  ): Promise<User | null>;
  getUser(
    user: string,
    password: string
  ): Promise<{ token: string; user: string; id: string } | string>;
  putUser(user: string, password: string): Promise<Boolean>;
  delete(id_user: string): Promise<string>;
}
