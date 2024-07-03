import { User } from "./User";

export interface userRepository {
  createUser(
    id:string,
    nombre: string,
    apellidos: string,
    email: string,
    edad: number,
    user: string,
    password: string,
    telefono: number
  ): Promise<User | null>;
  getUser(
    user: string,
    password: string
  ): Promise<User[]| boolean>;
  getEmail(email:string):Promise<string | boolean>;
  putUserPass(user: string, password: string): Promise<Boolean>;
  deleteUser(id_user: string): Promise<string>;
}
