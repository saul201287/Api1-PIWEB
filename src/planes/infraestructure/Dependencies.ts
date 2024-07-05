import { AssignPlanUseCase } from "../application/AssignPlanUseCase";
import { GetPlansUseCase } from "../application/GetPlansUseCase";
import { GetPlanUserUseCase } from "../application/GetPlanUserUseCase";
import { PutPlanUseCase } from "../application/PutPlanUseCase";
import { AssignPlanController } from "./controllers/AssignPlanController";
import { GetPlansController } from "./controllers/GetPlansController";
import { GetPlanUserController } from "./controllers/GetPlanUserController";
import { PutPlanController } from "./controllers/PutPlanController";
import { MysqlRepository } from "./MysqlRepository";

const mysqlRepository = new MysqlRepository();

const assignPlanUseCase = new AssignPlanUseCase(mysqlRepository);
const getPlansUseCase = new GetPlansUseCase(mysqlRepository);
const getPlanUserUseCase = new GetPlanUserUseCase(mysqlRepository);
const putPlanUseCase = new PutPlanUseCase(mysqlRepository);

export const assignPlanController = new AssignPlanController(assignPlanUseCase);
export const getPlansController = new GetPlansController(getPlansUseCase);
export const getPlanUserContoller = new GetPlanUserController(
  getPlanUserUseCase
);
export const putPlanController = new PutPlanController(putPlanUseCase);
