export interface IServicesEmail {
  sendMailWelcome(email: string, nombre: string): Promise<boolean>;
  sendPromociones(email: string, nombre: string): Promise<boolean>;
  sendPassRecover(email: string, nombre: string): Promise<boolean>;
}
