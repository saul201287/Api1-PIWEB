import { query } from "../../database/mysql";
import { User } from "../domain/User";
import { userRepository } from "../domain/UserRepository";

function addOneMonth(date: Date): Date {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + 1);
  return newDate;
}

export class MysqlUserRepository implements userRepository {
  async createUser(
    id: string,
    nombre: string,
    apellidos: string,
    email: string,
    password: string,
    telefono: number,
    fechaPlan: Date
  ): Promise<User | null> {
    const currentDate = new Date();
    fechaPlan = addOneMonth(currentDate);

    const sql =
      "INSERT INTO users (idUsers,name,lastname,email,password, telefono, fechaPlan) VALUES (?,?,?,?,?,?,?)";
    const params: any[] = [
      id,
      nombre,
      apellidos,
      email,
      password,
      telefono.toString(),
      fechaPlan,
    ];

    try {
      const [result]: any = await query(sql, params);
      const userNew: any = new User(
        id,
        0,
        nombre,
        apellidos,
        email,
        password,
        telefono,
        fechaPlan
      );
      return userNew;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async getUser(email: string, password: string): Promise<boolean | User[]> {
    const sql = "SELECT * FROM users where email = ? ";
    const params: any = [email];
    try {
      const [result]: any = await query(sql, params);
      const dataUsers: any = Object.values(JSON.parse(JSON.stringify(result)));

      if (dataUsers.length > 0) {
        const users: User[] = dataUsers.map(
          (user: any) =>
            new User(
              user.idUsers,
              user.id_plan,
              user.name,
              user.lastname,
              user.email,
              user.password,
              user.telefono,
              user.fechaPlan
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
  async putUserPass(email: string, password: string): Promise<Boolean> {
    const params: any = [password, email];
    const sql = "UPDATE users SET password = ? where email= ? ";
    try {
      const [result]: any = await query(sql, params);
      const data = Object.values(JSON.parse(JSON.stringify(result)));
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
  async getNotification(id_user: string): Promise<[] | string> {
    const params = [id_user];
    console.log(id_user);
    
    const sql = "SELECT * FROM notification where id_user = ?";
    try {
      const [result]: any = await query(sql, params);
      const data: any = Object.values(JSON.parse(JSON.stringify(result)));
      const notification: [] = data;
      return notification;
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
}
