import { verify, sign } from "jsonwebtoken";
import { query } from "../../database/mysql";
import { AuthRepository } from "../domain/AuthRepository";

export class AuthServices implements AuthRepository {
  async createToken(id_user: string): Promise<string> {
    try {
      let secret: any = process.env.SECRET_KEY_TOKEN;
      const payload = { id_user };
      return sign(payload, secret, { expiresIn: "1h" });
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }

  async validateToken(token: string): Promise<boolean | string> {
    try {
      let secret: any = process.env.SECRET_KEY_TOKEN;
      let access:any = verify(token, secret);
      let userFind = await query(
        "SELECT COUNT(*) AS count FROM users WHERE idUsers = ?",
        [access.id_user]
      );
      let userFind2: any = Object.values(JSON.parse(JSON.stringify(userFind)));
      console.log(userFind2[0][0].count);
      
      if (typeof userFind2 === "object") {
        if (userFind2[0][0].count > 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
}
