export class Plan{
    constructor(
      readonly id: string,
      readonly tipo: string,
      readonly duracion: number,
      readonly costo: Number,
      readonly detalles: string,
    ) {}
  }