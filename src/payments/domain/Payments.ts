export class Payments {
  constructor(
    readonly id: string,
    readonly id_user: string,
    readonly id_plan: number,
    readonly importe: number,
    readonly fecha: Date,
    readonly descripcion: [string, string, number, number, string]
  ) {}
}
