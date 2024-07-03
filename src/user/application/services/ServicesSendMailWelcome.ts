import { IServicesEmail } from "../../domain/services/IServisesEmail";

export class ServicesSendEmailWelcome {
  constructor(readonly servicesEmail: IServicesEmail) {}
  async run(email: string, nombre: string): Promise<boolean | string> {
    try {
      const status = await this.servicesEmail.sendMailWelcome(email, nombre);
      return status;
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
}
