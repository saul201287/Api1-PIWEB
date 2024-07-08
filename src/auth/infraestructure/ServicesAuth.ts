import { verify, sign, TokenExpiredError } from "jsonwebtoken";
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
      let access: any;

      try {
        access = verify(token, secret);
      } catch (error) {
        if (error instanceof TokenExpiredError) {
          const newToken = await this.createToken(
            (verify(token, secret, { ignoreExpiration: true }) as any).id_user
          );
          return newToken;
        } else {
          console.error(error);
          return false;
        }
      }

      let userFind = await query(
        "SELECT COUNT(*) AS count FROM users WHERE idUsers = ?",
        [access.id_user]
      );
      let userFind2: any = Object.values(JSON.parse(JSON.stringify(userFind)));

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
