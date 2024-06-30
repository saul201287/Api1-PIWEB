import { AuthRepository } from "../domain/AuthRepository";

export class AuthUserUseCase {
  constructor(readonly authRepository: AuthRepository) {}

  async run(id_user: string, password: string): Promise<string> {
    try {
      const token = await this.authRepository.authUser(id_user, password);
      return token;
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
}
