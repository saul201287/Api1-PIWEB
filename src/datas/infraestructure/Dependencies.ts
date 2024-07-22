import { GetDataUseCase } from "../application/GetDataUseCase";
import { GetDataDateUseCase } from "../application/GetDataDateUseCase";
import { GetIncidenciasUseCase } from "../application/GetIncidenciasUseCase";
import { GetIncidenciasDateUseCase } from "../application/GetIncidenciasDateUseCase";
import { GetDataController } from "./controllers/GetDataController";
import { GetDataDateController } from "./controllers/GetDataDateController";
import { GetIncidenciasController } from "./controllers/GetIncidenciasController";
import { GetIncidenciasDateController } from "./controllers/GetIncidenciasDateController";
import { mysqlRepository } from "./MysqlRepository";

const mysql = new mysqlRepository();

const getDataUseCase = new GetDataUseCase(mysql);
const getDataDateUseCase = new GetDataDateUseCase(mysql);
const getIncidenciasUseCase = new GetIncidenciasUseCase(mysql);
const getIncidenciaDateUseCase = new GetIncidenciasDateUseCase(mysql);

export const getDataController = new GetDataController(getDataUseCase);
export const getDataDateController = new GetDataDateController(
  getDataDateUseCase
);
export const getIncidenciasController = new GetIncidenciasController(
  getIncidenciasUseCase
);
export const getIncidenciasDateController = new GetIncidenciasDateController(
  getIncidenciaDateUseCase
);
