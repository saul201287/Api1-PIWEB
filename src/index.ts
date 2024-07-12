import express from "express";
import morgan from "morgan";
import { Signale } from "signale";
import * as dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
//import cookieParser from 'cookie-parser';
import rateLimit from "express-rate-limit";
import { userRouter } from "./user/infraestructure/RouterUser";
import { planRouter } from "./planes/infraestructure/RoouterPlans";
import { paymentsRouter } from "./payments/infraestructure/PaymentsRouter";

dotenv.config();
const app = express();
app.use(helmet.hidePoweredBy());
dotenv.config();
app.use(morgan("dev"));

app.use(cors({ origin: "*" }));


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);
app.use(express.json());
app.use("/user", userRouter);
app.use("/plan", planRouter);
app.use("/payments", paymentsRouter);

const options = {
  secrets: ["([0-9]{4}-?)+"],
};

const logger = new Signale(options);

const port: string | undefined = process.env.PORT;

app.listen(port, () => {
  logger.success("server listening on port:", port);
});

//Configuracion de HTTPS
/*
import express from "express";
import morgan from "morgan";
import { Signale } from "signale";
import * as dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { userRouter } from "./user/infraestructure/RouterUser";
import https from 'https';
import fs from "fs";

// Cargar variables de entorno
dotenv.config();

const app = express();

// Configurar middlewares
app.use(helmet.hidePoweredBy());
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.json());

// Configurar rutas
app.use("/user", userRouter);

// Configurar opciones HTTPS
const optionsHTTPS = {
  key: fs.readFileSync(String(process.env.RUTA_KEY)),
  cert: fs.readFileSync(String(process.env.RUTA_CERTIFICADO))
};

const options = {
  secrets: ["([0-9]{4}-?)+"],
};

const logger = new Signale(options);

const port: string | undefined = process.env.PORT;

// Crear y lanzar el servidor HTTPS
https.createServer(optionsHTTPS, app).listen(port, () => {
  logger.success("server listening on port:", port);
});
*/
