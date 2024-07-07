import express from "express";
import {validateTokenController} from "../../auth/infraestructure/DependenciesAuth";
import { payPlanController } from "./Dependencies";
export const paymentsRouter = express.Router();

paymentsRouter.post(
    "/generate",
    (req, res, next) => {
      validateTokenController
        .run(req, res, next)
        .then((pay) => {
          return pay;
        })
        .catch((err) => {
          res
            .status(500)
            .send({ error: err.message, msg: "Error en el servidor" });
        });
    },
    (req, res) => {
      payPlanController
        .run(req, res)
        .then((pay) => {
          return pay;
        })
        .catch((err) => {
          res
            .status(500)
            .send({ error: err.message, msg: "Error en el servidor" });
        });
    }
  );