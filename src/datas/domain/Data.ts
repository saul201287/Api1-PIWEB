export class Data {
  constructor(
    readonly id: string,
    readonly id_user: string,
    readonly ampers: number,
    readonly consumokwh: number,
    readonly whs: number,
    readonly voltaje: number,
    readonly fecha: Date
  ) {}
}
