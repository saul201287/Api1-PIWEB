import express from "express";
import { assignPlanController,getPlansController } from "./Dependencies";
import { validateTokenController } from "../../auth/infraestructure/DependenciesAuth";

export const planRouter = express.Router();

planRouter.put(
  "/assignPlan",
  (req, res, next) => {
    validateTokenController
      .run(req, res, next)
      .then((user) => {
        return user;
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: err.message, msg: "Error en el servidor" });
      });
  },
  (req, res) => {
    assignPlanController
      .run(req, res)
      .then((user) => {
        return user;
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: err.message, msg: "Error en el servidor" });
      });
  }
);
planRouter.get(
  "/getPlans",
  (req, res, next) => {
    validateTokenController
      .run(req, res, next)
      .then((user) => {
        return user;
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: err.message, msg: "Error en el servidor" });
      });
  },
  (req, res) => {
    getPlansController
      .run(req, res)
      .then((user) => {
        return user;
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: err.message, msg: "Error en el servidor" });
      });
  }
);