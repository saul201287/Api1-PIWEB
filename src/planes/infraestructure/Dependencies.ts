import { AssignPlanUseCase } from "../application/AssignPlanUseCase";
import { GetPlansUseCase } from "../application/GetPlansUseCase";
import { AssignPlanController } from "./controllers/AssignPlanController";
import { GetPlansController } from "./controllers/GetPlansController";
import { MysqlRepository } from "./MysqlRepository";

const mysqlRepository = new MysqlRepository();

const assignPlanUseCase = new AssignPlanUseCase(mysqlRepository);
const getPlansUseCase = new GetPlansUseCase(mysqlRepository);

export const assignPlanController = new AssignPlanController(assignPlanUseCase);
export const getPlansController = new GetPlansController(getPlansUseCase);
