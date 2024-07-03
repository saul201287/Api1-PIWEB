import { User } from "../domain/User";
import { userRepository } from "../domain/UserRepository";
import { IEncrypt } from "./services/IEncrypt";

export class GetUserUseCase {
  constructor(
    private readonly userRepository: userRepository,
    private readonly encrypt: IEncrypt
  ) {}

  async run(user: string, password: string): Promise<User | boolean> {
    try {
      const userN: User[] | boolean = await this.userRepository.getUser(
        user,
        password
      );

      if (typeof userN === "boolean") {
        return false;
      }
      const isPasswordCorrect = await this.encrypt.compareTo(
        password,
        userN[0].password
      );

      if (!isPasswordCorrect) {
        return false;
      }
      return userN[0];
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
