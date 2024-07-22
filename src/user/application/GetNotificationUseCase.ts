import { userRepository } from "../domain/UserRepository";

export class GetNotification {
  constructor(readonly repo: userRepository) {}
  async run(id_user: string): Promise<[] | string> {
    try {
      const data: any = await this.repo.getNotification(id_user);
      return data;
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
}
