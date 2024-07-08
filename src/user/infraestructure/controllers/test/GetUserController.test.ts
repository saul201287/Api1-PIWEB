import { NextFunction, Request, Response } from "express";
import { GetUserUseCase } from "../../../application/GeTUserUseCase";
import { GetUserControll } from "../GetUserController";
import { MysqlUserRepository } from "../../MysqlUserRepository";
import { EncryptServices } from "../../helpers/ServicesEncript";

jest.mock("../../application/GetUserUseCase");

describe("GetUserControll", () => {
  let getUserUseCase: GetUserUseCase;
  let getUserController: GetUserControll;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    const mysqlUserRepository = new MysqlUserRepository();
    const encryptServices = new EncryptServices();
    getUserUseCase = new GetUserUseCase(mysqlUserRepository, encryptServices);
    getUserController = new GetUserControll(getUserUseCase);

    req = {
      body: {
        user: "testuser",
        password: "password",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      locals: {},
    };

    next = jest.fn();
  });

  it("Se espera llamar la siguiente función si se encuentra el usuario", async () => {
    const user = { id: "1", user: "testuser", password: "password" };
    getUserUseCase.run = jest.fn().mockResolvedValue(user);

    await getUserController.run(req as Request, res as Response, next);

    if (res.locals) {
      expect(res.locals.user).toEqual(user);
    }
    expect(next).toHaveBeenCalled();
  });

  it("Se espera el error 404 si no se encuentra el usuario", async () => {
    getUserUseCase.run = jest.fn().mockResolvedValue(false);

    await getUserController.run(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "Credenciales invalidas",
    });
  });

  it("Se espera el error 500 si ocurre un error", async () => {
    getUserUseCase.run = jest.fn().mockRejectedValue(new Error("Test error"));

    await getUserController.run(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: new Error("Test error"),
    });
  });
});
