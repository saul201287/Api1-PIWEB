import { AuthRepository } from "../domain/AuthRepository";

export class CreateTokenUseCase {
  constructor(readonly authRepository: AuthRepository) {}
  async run(id_user: string): Promise<string> {
    try {
      const token = await this.authRepository.createToken(id_user);
      return token;
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
}
