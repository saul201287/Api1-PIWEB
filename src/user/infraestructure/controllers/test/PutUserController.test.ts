import { Request, Response } from "express";
import { PutUserPassUseCase } from "../../../application/PutUserPassUseCase"; 
import { PutUserPassController } from "../PutUserPassController"; 
import { MysqlUserRepository } from "../../MysqlUserRepository";
import { EncryptServices } from "../../helpers/ServicesEncript";

jest.mock("../../application/PutUserPassUseCase");

describe("PutUserPassController", () => {
  let putUserPassUseCase: PutUserPassUseCase;
  let putUserPassController: PutUserPassController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    const mysqlUserRepository = new MysqlUserRepository();
    const encryptServices = new EncryptServices();
    putUserPassUseCase = new PutUserPassUseCase(mysqlUserRepository, encryptServices);
    putUserPassController = new PutUserPassController(putUserPassUseCase);

    req = {
      body: {
        user: "testuser",
        password: "oldpassword",
        password2: "newpassword",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      header: jest.fn().mockReturnThis(),
      locals: {},
    };
  });

  it("Se espera que se haya modificado la contraseña y retorne un nuevo token", async () => {
    putUserPassUseCase.run = jest.fn().mockResolvedValue(true);
    if (res.locals) {
        res.locals.newToken = "newToken123";
    }

    await putUserPassController.run(req as Request, res as Response);

    expect(res.header).toHaveBeenCalledWith("nuevo-token", "newToken123");
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      messages: "Contraseña modificada",
    });
  });

  it("should modify the password and return 201 without new token", async () => {
    putUserPassUseCase.run = jest.fn().mockResolvedValue(true);

    await putUserPassController.run(req as Request, res as Response);

    expect(res.header).not.toHaveBeenCalledWith("nuevo-token", expect.anything());
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      messages: "Contraseña modificada",
    });
  });

  it("should return 400 if there is a client error", async () => {
    putUserPassUseCase.run = jest.fn().mockResolvedValue(false);

    await putUserPassController.run(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "hubo un error de parte del cliente",
    });
  });

  it("should return 500 if an error occurs", async () => {
    putUserPassUseCase.run = jest.fn().mockRejectedValue(new Error("Test error"));

    await putUserPassController.run(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: new Error("Test error"),
    });
  });
});
