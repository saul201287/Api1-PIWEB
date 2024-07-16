import express from "express";
import { assignProductController, putProductController } from "./Dependencies";

export const routerProduct = express.Router();

routerProduct.put("/asignar", (req, res) => {
  assignProductController
    .run(req, res)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});

routerProduct.put("/putProduct", (req, res) => {
  putProductController
    .run(req, res)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});
