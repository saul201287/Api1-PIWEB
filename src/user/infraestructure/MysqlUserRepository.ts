import { query } from "../../database/mysql";
import { User } from "../domain/User";
import { userRepository } from "../domain/UserRepository";

export class MysqlUserRepository implements userRepository {
  async createUser(
    id: string,
    nombre: string,
    apellidos: string,
    email: string,
    edad: number,
    user: string,
    password: string,
    telefono: number
  ): Promise<User | null> {
    const sql =
      "INSERT INTO users (idUsers,name,lastname,email,edad,user,password, telefono) VALUES (?,?,?,?,?,?,?,?)";
    const params: any[] = [
      id,
      nombre,
      apellidos,
      email,
      edad,
      user,
      password,
      telefono,
    ];

    try {
      const [result]: any = await query(sql, params);
      const userNew: any = new User(
        id,
        nombre,
        apellidos,
        email,
        user,
        password,
        edad,
        telefono
      );
      return userNew;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async getUser(user: string, password: string): Promise<boolean | User[]> {
    console.log(user);

    const sql = "SELECT * FROM users where user = ? ";
    const params: any = [user];
    try {
      const [result]: any = await query(sql, params);
      const dataUsers = Object.values(JSON.parse(JSON.stringify(result)));
      console.log(dataUsers);

      if (dataUsers.length > 0) {
        const users: User[] = dataUsers.map(
          (user: any) =>
            new User(
              user.idUsers,
              user.name,
              user.lastname,
              user.email,
              user.user,
              user.password,
              user.edad,
              user.telefono
            )
        );
        return users;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
  async getEmail(email: string): Promise<string | boolean> {
    const sql = "SELECT name FROM users where email= ?";
    const params = [email];
    try {
      const [result]: any = await query(sql, params);
      const data: any = Object.values(JSON.parse(JSON.stringify(result)));
      if (data.length > 0) {
        return data[0].name;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
  async putUserPass(user: string, password: string): Promise<Boolean> {
    const params: any = [password, user];
    const sql = "UPDATE users SET password = ? where user= ? ";
    try {
      const [result]: any = await query(sql, params);
      const data = Object.values(JSON.parse(JSON.stringify(result)));
      console.log(data);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  async putUserPassRecover(
    email: string,
    newpass: string
  ): Promise<string | boolean> {
    const sql = "UPDATE users SET password = ? where email= ? ";
    const params = [newpass, email];

    try {
      const [result]: any = await query(sql, params);
      const data: any = Object.values(JSON.parse(JSON.stringify(result)));
      if (data[1] == 1) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
  async deleteUser(id_user: string): Promise<string> {
    return "";
  }
}
