import { Request, Response } from "express";
import { PutUserPassRecoverUseCase } from "../src/user/application/PutUserPassRecoverUseCase";
import { PutUserPassRecoverController } from "../src/user/infraestructure/controllers/PutUserPassRecoverController";  
import { MysqlUserRepository } from "../src/user/infraestructure/MysqlUserRepository";
import { EncryptServices } from "../src/user/infraestructure/helpers/ServicesEncript";

jest.mock("../src/user/application/PutUserPassRecoverUseCase");

describe("PutUserPassRecoverController", () => {
  let putUserPassRecoverUseCase: PutUserPassRecoverUseCase;
  let putUserPassRecoverController: PutUserPassRecoverController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    const mysqlUserRepository = new MysqlUserRepository();
    const encryptServices = new EncryptServices();
    putUserPassRecoverUseCase = new PutUserPassRecoverUseCase(mysqlUserRepository, encryptServices);
    putUserPassRecoverController = new PutUserPassRecoverController(putUserPassRecoverUseCase);

    req = {
      body: {
        email: "test@example.com",
        passnew: "newpassword",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it("Se espera un codigo 201 si la contraseña se cambio con exito", async () => {
    putUserPassRecoverUseCase.run = jest.fn().mockResolvedValue(true);

    await putUserPassRecoverController.run(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      messages: "Contraseña editada correctamente",
    });
  });

  it("Se espera un error 409 si el correo no ha sido registrado", async () => {
    putUserPassRecoverUseCase.run = jest.fn().mockResolvedValue(false);

    await putUserPassRecoverController.run(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      menssages: "El correo no esta registrado",
    });
  });

  it("Se espera un error 409 si llega a haber un error en el servicio", async () => {
    putUserPassRecoverUseCase.run = jest.fn().mockResolvedValue("error");

    await putUserPassRecoverController.run(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      messages: "Hubo un error en los servicicos",
    });
  });

  it("Se espera retornar un codigo 500 si ocurre algun error", async () => {
    putUserPassRecoverUseCase.run = jest.fn().mockRejectedValue(new Error("Test error"));

    await putUserPassRecoverController.run(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: new Error("Test error"),
    });
  });
});
