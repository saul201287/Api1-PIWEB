import { compare } from "bcryptjs";
import { User } from "../../domain/User";
import { query } from "../../../database/mysql";

interface UserCount {
  count: number;
}

export class ValidatorValues {
  private async getUserCount(sql: string, param: string): Promise<number> {
    try {
      const res = await query(sql, [param]);
      const result: UserCount[] = JSON.parse(JSON.stringify(res));
      if (result.length > 0) {
        return result[0].count;
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
