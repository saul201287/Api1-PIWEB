import { User } from "./User";

export interface userRepository {
  createUser(
    id: string,
    nombre: string,
    apellidos: string,
    email: string,
    password: string,
    telefono: number,
    fecha:Date
  ): Promise<User | null>;
  getUser(email: string, password: string): Promise<User[] | boolean>;
  getEmail(email: string): Promise<string | boolean>;
  putUserPass(email: string, password: string): Promise<Boolean>;
  putUserPassRecover(email: string, newpass: string): Promise<boolean | string>;
  getNotification(id_user:string):Promise<[]|string>
}
