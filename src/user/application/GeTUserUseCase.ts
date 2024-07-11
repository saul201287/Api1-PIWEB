import { User } from "../domain/User";
import { userRepository } from "../domain/UserRepository";
import { IEncrypt } from "./services/IEncrypt";

export class GetUserUseCase {
  constructor(
    private readonly userRepository: userRepository,
    private readonly encrypt: IEncrypt
  ) {}

  async run(email: string, password: string): Promise<User | boolean> {
    try {
      const userN: any = await this.userRepository.getUser(
        email,
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
