export class User{
    constructor(
      readonly id: string,
      readonly id_plan:number,
      readonly nombre: string,
      readonly apellidos: string,
      readonly email: string,
      readonly password: string,
      readonly telefono: Number,
      readonly plan: Date,
      readonly direccion:string
    ) {}
  }