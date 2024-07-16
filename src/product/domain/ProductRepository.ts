import { Product } from "./Product";
export interface ProductRepository{
asigProduct(id_user:string, id_plan:number, id:string):Promise<boolean| string>
putProduct(id:string, id_plan:number):Promise<boolean | string>
}