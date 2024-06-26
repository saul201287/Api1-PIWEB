export class Plan{
    constructor(
      readonly id: string,
      readonly id_user: string,
      readonly tipo: string,
      readonly duracion: Date,
      readonly costo: Number,
      readonly detalles: string,
    ) {}
  }