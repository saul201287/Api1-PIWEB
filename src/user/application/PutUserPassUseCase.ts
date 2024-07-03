import { userRepository } from "../domain/UserRepository";
import { IEncrypt } from "./services/IEncrypt";

export class PutUserPassUseCase {
  constructor(
    readonly userRepository: userRepository,
    readonly encrypt: IEncrypt
  ) {}
  async run(user: string, password: string, password2:string): Promise<boolean> {
    try {
      const userIsTrue = await this.userRepository.getUser(user, password);
      if (typeof userIsTrue != "boolean") {  
        const isPassModific = await this.encrypt.compareTo(
          password,
          userIsTrue[0].password
        );
        console.log(isPassModific);
        
        if (isPassModific) {
          const newPass = await this.encrypt.encodePassword(password2);
          const userPass = await this.userRepository.putUserPass(user, newPass);
          if (userPass) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
