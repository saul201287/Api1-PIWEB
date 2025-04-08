import { Request, Response, NextFunction } from "express";
import { SendEmailPassRecover } from "../src/user/application/services/SendEmailPassRecover";
import { RecoverPassController } from "../src/user/infraestructure/controllers/RecoverPassController";
import { MysqlUserRepository } from "../src/user/infraestructure/MysqlUserRepository";
import { servicesEmail } from "../src/user/infraestructure/ServicesEmail";

jest.mock("../src/user/application/services/SendEmailPassRecover");

describe("RecoverPassController", () => {
  let sendEmailPassRecover: SendEmailPassRecover;
  let recoverPassController: RecoverPassController;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    const mysqlUserRepository = new MysqlUserRepository();
    const serviceEmail = new servicesEmail();
    sendEmailPassRecover = new SendEmailPassRecover(
      serviceEmail,
      mysqlUserRepository
    );
    recoverPassController = new RecoverPassController(sendEmailPassRecover);

    req = {
      body: {
        email: "test@example.com",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    next = jest.fn();
  });

  it("should return 200 if email is sent successfully", async () => {
    sendEmailPassRecover.run = jest.fn().mockResolvedValue(true);

    await recoverPassController.run(req as Request, res as Response);

    expect(sendEmailPassRecover.run).toHaveBeenCalledWith("test@example.com");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Email enviado" });
  });

  it("should return 400 if email is missing in the request body", async () => {
    req.body = {};

    await recoverPassController.run(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "El email es requerido" });
  });

  it("should return 404 if email is not registered", async () => {
    sendEmailPassRecover.run = jest.fn().mockResolvedValue(false);

    await recoverPassController.run(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Email no registrado" });
  });

  it("should return 500 if an unexpected error occurs", async () => {
    const error = new Error("Test error");
    sendEmailPassRecover.run = jest.fn().mockRejectedValue(error);

    await recoverPassController.run(req as Request, res as Response);

    expect(next).toHaveBeenCalledWith(error);
  });
});
