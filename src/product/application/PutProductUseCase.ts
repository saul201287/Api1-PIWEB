import { ProductRepository } from "../domain/ProductRepository";

export class PutProductUseCase {
  constructor(readonly product: ProductRepository) {}
  async run(id: string, id_plan:number): Promise<boolean | string> {
    try {
      const status = await this.product.putProduct(id, id_plan);
      return status;
    } catch (error) {
      return "error: " + error;
    }
  }
}
