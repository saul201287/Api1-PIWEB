import { verify, sign } from "jsonwebtoken";
import { query } from "../../database/mysql";
import { AuthRepository } from "../domain/AuthRepository";

export class AuthServices implements AuthRepository {
  async authUser(user: string, password: string): Promise<string> {
    try {
      const sql = "SELECT idUsers FROM users where user= ? && password=?";
      let params: any[] = [user, password];
      try {
        const [data]: any = await query(sql, params);
        const dataUsers = Object.values(JSON.parse(JSON.stringify(data)));
        if (dataUsers.length > 0) {
          let secret: any = process.env.SECRET_KEY_TOKEN;
          console.log(data);
          
          return sign(data.idUser, secret, { expiresIn: "15m" });
        } else {
          return "Credenciales inavalidas";
        }
      } catch (error) {
        return "error: " + error;
      }
    } catch (error) {
      console.error(error);

      return "error: " + console.error();
    }
  }

  async validateToken(token: string): Promise<number| string> {
    try {
      let secret: any = process.env.SECRET_KEY_TOKEN;
      let access = verify(token, secret);
      let userFind = await query(
        "SELECT COUNT(*) AS count FROM users WHERE idUsers = ?",
        [access]
      );
      let userFind2: any = Object.values(JSON.parse(JSON.stringify(userFind)));
      if (typeof userFind2 === "object") {
        if (userFind2[0][0].count > 0) {
          return 200;
        } else {
          return 401;
        }
      } else {
        return 402;
      }
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
}
