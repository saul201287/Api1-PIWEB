import { userRepository } from "../domain/UserRepository";
import { IEncrypt } from "./services/IEncrypt";

export class PutUserPassRecoverUseCase {
  constructor(
    readonly userRepository: userRepository,
    readonly encrypt: IEncrypt
  ) {}
  async run(email: string, passnew: string): Promise<string | boolean> {
    try {
      const passencrypt = await this.encrypt.encodePassword(passnew);
      const status = await this.userRepository.putUserPassRecover(
        email,
        passencrypt
      );
      if (status) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
}
