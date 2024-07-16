import { ProductRepository } from "../domain/ProductRepository";
import { AssignProductUseCase } from "../application/AsigProductUseCase";
import { PutProductUseCase } from "../application/PutProductUseCase";
import { PutProductController } from "./controllers/PutProductController";
import { AssignProductController } from "./controllers/AssignProductController";
import { MysqlProduct } from "./MysqlProduct";

const mysql = new MysqlProduct();
const assignProductUseCase = new AssignProductUseCase(mysql);
const putProductUseCase = new PutProductUseCase(mysql);

export const assignProductController = new AssignProductController(
  assignProductUseCase
);
export const putProductController = new PutProductController(putProductUseCase);
