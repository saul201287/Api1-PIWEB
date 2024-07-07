import { PaymentsRepository } from "../domain/PaymentsRepository";

export class FindUserUseCase {
  constructor(readonly payments: PaymentsRepository) {}
  async run(email: string): Promise<[string, number] | null> {
    try {
      const data:any = await this.payments.findUser(email);
      if (data != null) {
        return data;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
