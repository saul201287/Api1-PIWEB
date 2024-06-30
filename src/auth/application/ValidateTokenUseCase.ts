import { AuthRepository } from "../domain/AuthRepository";

export class ValidateTokenUseCase {
  constructor(readonly authRepository: AuthRepository) {}
  async run(token: string): Promise<number | string> {
    try {
      const result = await this.authRepository.validateToken(token);
      return result;
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
}
