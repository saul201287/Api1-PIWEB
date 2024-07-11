import express from "express";
import { validateTokenController } from "../../auth/infraestructure/DependenciesAuth";
import {
  assignPlanController,
  getPlansController,
  getPlanUserContoller,
  putPlanController,
} from "./Dependencies";
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
planRouter.post(
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
planRouter.post(
  "/getPlanUser",
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
    getPlanUserContoller
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
planRouter.put(
  "/putPlan",
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
    putPlanController
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
