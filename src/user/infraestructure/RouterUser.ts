import express from "express";
import {
  createTokenControll,
  validateTokenController,
} from "../../auth/infraestructure/DependenciesAuth";
import {
  createUserController,
  putUserPassController,
  getUserController,
  recoverPassController,
  putUserPassRecoverController,
} from "./DependenciesUser";

export const userRouter = express.Router();

userRouter.post(
  "/",
  (req, res, next) => {
    createUserController
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
    createTokenControll
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
userRouter.post("/recoverpass", (req, res) => {
  recoverPassController
    .run(req, res)
    .then((user) => {
      return user;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});
userRouter.get(
  "/login",
  (req, res, next) => {
    getUserController
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
    createTokenControll
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

userRouter.put(
  "/pass",
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
    putUserPassController
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

userRouter.put("/passrecover", (req, res) => {
  putUserPassRecoverController
    .run(req, res)
    .then((user) => {
      return user;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});
