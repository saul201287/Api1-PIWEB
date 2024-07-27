
import express from "express";
import morgan from "morgan";
import { Signale } from "signale";
import * as dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { userRouter } from "./user/infraestructure/RouterUser";
import { planRouter } from "./planes/infraestructure/RoouterPlans";
import { paymentsRouter } from "./payments/infraestructure/PaymentsRouter";
import { routerProduct } from "./product/infraestructure/RouterProduct";
import { routerData } from "./datas/infraestructure/RouterDatas";

dotenv.config();
const app = express();
app.use(helmet.hidePoweredBy());
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  keyGenerator: (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    return ip ? ip.toString() : 'default';
  }
});

app.use(limiter);
app.use(express.json());
app.use("/user", userRouter);
app.use("/plan", planRouter);
app.use("/payments", paymentsRouter);
app.use("/product",routerProduct)
app.use("/data",routerData)

app.get("/", (req, res) => {
  res.send("API is running");
});
const options = {
  secrets: ["([0-9]{4}-?)+"],
};

const logger = new Signale(options);
const port = process.env.PORT;

app.listen(port, () => {
  logger.success("server listening on port:", port);
});
/*
import express from "express";
import morgan from "morgan";
import { Signale } from "signale";
import * as dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import https from "https";
import fs from "fs";
import { userRouter } from "./user/infraestructure/RouterUser";
import { planRouter } from "./planes/infraestructure/RoouterPlans";
import { paymentsRouter } from "./payments/infraestructure/PaymentsRouter";
import { routerProduct } from "./product/infraestructure/RouterProduct";
import { routerData } from "./datas/infraestructure/RouterDatas";

dotenv.config();

const corsOptions = {
  origin: ['https://www.powerwatch.piweb.lat', 'https://powerwatch.piweb.lat'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-token-access'],
  optionsSuccessStatus: 200 
};

const app = express();

app.use(helmet.hidePoweredBy());
app.use(
  helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  })
);
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  keyGenerator: (req) => {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    return ip ? ip.toString() : "default";
  },
});

app.use(limiter);

app.use((req, res, next) => {
  const forbiddenPaths = ["/autodiscover/autodiscover.json", "/Powershell"];
  if (forbiddenPaths.some((path) => req.path.includes(path))) {
    return res.status(403).send("Forbidden");
  }
  next();
});

app.use("/user", userRouter);
app.use("/plan", planRouter);
app.use("/payments", paymentsRouter);
app.use("/product", routerProduct);
app.use("/data", routerData);

app.get("/", (req, res) => {
  res.send("API is running");
});

const optionsHTTPS = {
  key: fs.readFileSync(String(process.env.RUTA_KEY)),
  cert: fs.readFileSync(String(process.env.RUTA_CERTIFICADO)),
};

const logger = new Signale({
  secrets: ["([0-9]{4}-?)+"],
});

const port = process.env.PORT || 3000;

https.createServer(optionsHTTPS, app).listen(port, () => {
  logger.success("Server listening on port:", port);
});
*/