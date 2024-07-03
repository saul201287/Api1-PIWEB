import { User } from "../domain/User";
import { userRepository } from "../domain/UserRepository";
import { IEncrypt } from "./services/IEncrypt";
import { ServicesSendEmailWelcome } from "./services/ServicesSendMailWelcome";
import { IGeneratorId } from "./services/IGeneratorId";

export class CreateUserUseCase {
  constructor(
    readonly userRepository: userRepository,
    readonly options: IEncrypt,
    readonly serviceEmail : ServicesSendEmailWelcome,
    readonly createId: IGeneratorId
  ) {}

  async run(
    id: string,
    nombre: string,
    apellidos: string,
    email: string,
    edad: number,
    user: string,
    password: string,
    telefono: number
  ): Promise<{ user: User; token: string } | null> {
    try {
      const newPassword = await this.options.encodePassword(password);
      id = this.createId.asignarId();
      const User: any = await this.userRepository.createUser(
        id,
        nombre,
        apellidos,
        email,
        edad,
        user,
        newPassword,
        telefono
      );
      if (User) {
        await this.serviceEmail.run(email, nombre)
      }
      return User;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
