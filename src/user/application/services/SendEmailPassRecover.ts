import { IServicesEmail } from "../../domain/services/IServisesEmail";
import { userRepository } from "../../domain/UserRepository";

export class SendEmailPassRecover {
  constructor(
    readonly servicesEmail: IServicesEmail,
    readonly userRepository: userRepository
  ) {}

  async run(email: string): Promise<boolean | string> {
    try {
      const name = await this.userRepository.getEmail(email);
      if (typeof name == "string") {
        const status = await this.servicesEmail.sendPassRecover(email, name);
        if (status) {
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
