import { Request, Response } from "express";
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

  beforeEach(() => {
    const mysqlUserRepository = new MysqlUserRepository();
    const serviceEmail = new servicesEmail();
    sendEmailPassRecover = new SendEmailPassRecover(serviceEmail, mysqlUserRepository);
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
  });

  it("should return 200 if email is sent successfully", async () => {
    sendEmailPassRecover.run = jest.fn().mockResolvedValue(true);

    await recoverPassController.run(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Email enviado",
    });
  });

  it("should return 404 if email is not registered", async () => {
    sendEmailPassRecover.run = jest.fn().mockResolvedValue(false);

    await recoverPassController.run(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      messages: "Email no registrado",
    });
  });

  it("should return 500 if there is an error in the services", async () => {
    const error = new Error("Test service error");
    sendEmailPassRecover.run = jest.fn().mockResolvedValue(error);

    await recoverPassController.run(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: error,
    });
  });

  it("should return 500 if an error occurs", async () => {
    const error = new Error("Test error");
    sendEmailPassRecover.run = jest.fn().mockRejectedValue(error);

    await recoverPassController.run(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: error,
    });
  });
});
