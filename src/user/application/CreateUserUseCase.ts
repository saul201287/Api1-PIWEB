import { User } from "../domain/User";
import { userRepository } from "../domain/UserRepository";
import { IEncrypt } from "./services/IEncrypt";
import { ServicesSendEmailWelcome } from "./services/ServicesSendMailWelcome";
import { IGeneratorId } from "./services/IGeneratorId";

export class CreateUserUseCase {
  constructor(
    readonly userRepository: userRepository,
    readonly options: IEncrypt,
    readonly serviceEmail: ServicesSendEmailWelcome,
    readonly createId: IGeneratorId
  ) {}

  async run(
    id: string,
    nombre: string,
    apellidos: string,
    email: string,
    password: string,
    telefono: number,
    fechaPlan: Date
  ): Promise<{ user: User; token: string } | null> {
    try {
      const newPassword = await this.options.encodePassword(password);

      id = this.createId.asignarId();
      const User: any = await this.userRepository.createUser(
        id,
        nombre,
        apellidos,
        email,
        newPassword,
        telefono,
        fechaPlan
      );

      if (typeof User != null) {
        await this.serviceEmail.run(email, nombre);
        return User;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
