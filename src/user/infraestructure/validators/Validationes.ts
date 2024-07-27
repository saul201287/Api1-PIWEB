import { compare } from "bcryptjs";
import { User } from "../../domain/User";
import { query } from "../../../database/mysql";
import validator from "validator";
import sanitizeHtml from "sanitize-html";

export class ValidatorValues {
  private async getUserCount(sql: string, param: string): Promise<number> {
    try {
      const res = await query(sql, [param]);
      const result: any = JSON.parse(JSON.stringify(res));
      if (result[0][0].count > 0) {
        return result[0][0].count;
      }
      return 0;
    } catch (error) {
      console.error("Error in getUserCount:", error);
      return -1;
    }
  }

  async validateUsernameExistence(username: string): Promise<number> {
    const sql = "SELECT COUNT(*) AS count FROM users WHERE user = ?";
    return this.getUserCount(sql, username);
  }

  async validateEmailExistence(email: string): Promise<number> {
    const sql = "SELECT COUNT(*) AS count FROM users WHERE email = ?";
    return this.getUserCount(sql, email);
  }

  async validateEamil(email: string): Promise<number> {
    console.log(validator.isEmail(email));
    
    if (validator.isEmail(email)) {
      return 1;
    } else {
      return 0
    }
  }

  async validatePassword(username: string, password: string): Promise<boolean> {
    const sql = "SELECT * FROM users WHERE user = ?";
    try {
      const res = await query(sql, [username]);
      const users: User[] = JSON.parse(JSON.stringify(res));
      if (users.length > 0 && users[0].password) {
        return compare(password, users[0].password);
      }
      return false;
    } catch (error) {
      console.error("Error in validatePassword:", error);
      return false;
    }
  }
}
