import express from "express";
import { validateTokenController } from "../../auth/infraestructure/DependenciesAuth";
import {
  getDataController,
  getDataDateController,
  getIncidenciasController,
  getIncidenciasDateController,
  getConsumoaMesController
} from "./Dependencies";
export const routerData = express.Router();

routerData.get(
  "/:id_user",
  (req, res, next) => {
    validateTokenController
      .run(req, res, next)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: err.message, msg: "Error en el servidor" });
      });
  },
  (req, res) => {
    getDataController
      .run(req, res)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: err.message, msg: "Error en el servidor" });
      });
  }
);

routerData.get(
  "/date/:id_user/:fechaIni/:fechaFin",
  (req, res, next) => {
    validateTokenController
      .run(req, res, next)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: err.message, msg: "Error en el servidor" });
      });
  },
  (req, res) => {
    getDataDateController
      .run(req, res)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: err.message, msg: "Error en el servidor" });
      });
  }
);

routerData.get(
  "/incidencias/:id_user",
  (req, res, next) => {
    validateTokenController
      .run(req, res, next)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: err.message, msg: "Error en el servidor" });
      });
  },
  (req, res) => {
    getIncidenciasController
      .run(req, res)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: err.message, msg: "Error en el servidor" });
      });
  }
);

routerData.get(
  "/incidencias/:id_user/:fechaIni/:fechaFin",
  (req, res, next) => {
    validateTokenController
      .run(req, res, next)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: err.message, msg: "Error en el servidor" });
      });
  },
  (req, res) => {
    getIncidenciasDateController
      .run(req, res)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: err.message, msg: "Error en el servidor" });
      });
  }
);

routerData.get(
  "/consumo/:id_user",
  (req, res, next) => {
    validateTokenController
      .run(req, res, next)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: err.message, msg: "Error en el servidor" });
      });
  },
  (req, res) => {
    getConsumoaMesController
      .run(req, res)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: err.message, msg: "Error en el servidor" });
      });
  }
);
