import { ProductRepository } from "../domain/ProductRepository";
export class AssignProductUseCase {
  constructor(readonly product: ProductRepository) {}
  async run(id_user: string, id_plan: number, id:string): Promise<boolean | string> {
    try {
      const status = await this.product.asigProduct(id_user, id_plan, id);
      return status;
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
}
