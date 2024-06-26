export class User{
    constructor(
      readonly id: string,
      readonly nombre: string,
      readonly apellidos: string,
      readonly email: string,
      readonly username: string,
      readonly password: string,
      readonly token: string,
      readonly edad: Number,
      readonly telefono: Number
    ) {}
  }