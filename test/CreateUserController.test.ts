import { NextFunction, Request, Response } from "express";
import { CreateUserUseCase } from "../src/user/application/CreateUserUseCase";
import { ValidatorValues } from "../src/user/infraestructure/validators/Validationes";
import { CreateUserController } from "../src/user/infraestructure/controllers/CreateUserController";
import { IdServices } from "../src/user/infraestructure/helpers/ServicesUuidv4";
import { MysqlUserRepository } from "../src/user/infraestructure/MysqlUserRepository";
import { EncryptServices } from "../src/user/infraestructure/helpers/ServicesEncript";
import { servicesEmail } from "../src/user/infraestructure/ServicesEmail";
import { ServicesSendEmailWelcome } from "../src/user/application/services/ServicesSendMailWelcome";

jest.mock("../src/user/application/CreateUserUseCase");
jest.mock("../src/user/infraestructure/validators/Validationes");

describe("CreateUserController", () => {
  let createUserUseCase: CreateUserUseCase;
  let validatorValues: ValidatorValues;
  let createUserController: CreateUserController;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    const mysqlUserRepository = new MysqlUserRepository();
    const encryptServices = new EncryptServices();
    const idServices = new IdServices();
    const serviceEmail = new servicesEmail();
    const sendMailWelcome = new ServicesSendEmailWelcome(serviceEmail);

    createUserUseCase = new CreateUserUseCase(
      mysqlUserRepository,
      encryptServices,
      sendMailWelcome,
      idServices
    );
    validatorValues = new ValidatorValues();
    createUserController = new CreateUserController(createUserUseCase);

    req = {
      body: {
        id: "",
        nombre: "Test",
        apellidos: "User",
        email: "jrmich3@hotmail.com",
        edad: 30,
        user: "testuser",
        password: "password",
        telefono: "123456789",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
      locals: {},
    };

    next = jest.fn();
  });

  it("Se espera un 409 si el nombre de usuario ya ha sido registrado", async () => {
    validatorValues.validateUsernameExistence = jest.fn().mockResolvedValue(1);
    await createUserController.run(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.send).toHaveBeenCalledWith({
      status: "error",
      data: "El nombre de usuario ya se encuentra registrado",
    });
  });

  it("Se espera un 409 si el correo ya ha sido registrado", async () => {
    validatorValues.validateUsernameExistence = jest.fn().mockResolvedValue(0);
    validatorValues.validateEmailExistence = jest.fn().mockResolvedValue(1);
    await createUserController.run(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.send).toHaveBeenCalledWith({
      status: "error",
      data: "El correo ingresado ya se encuentra registrado",
    });
  });

  it("Se espera el siguiente llamado en caso de que la creación se haya hecho con exito", async () => {
    validatorValues.validateUsernameExistence = jest.fn().mockResolvedValue(0);
    validatorValues.validateEmailExistence = jest.fn().mockResolvedValue(0);
    createUserUseCase.run = jest.fn().mockResolvedValue(req.body);

    await createUserController.run(req as Request, res as Response, next);

    if (res.locals) {
      expect(res.locals.user).toEqual({
        id: req.body.id,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        email: req.body.email,
        edad: req.body.edad,
        user: req.body.user,
        password: req.body.password,
        telefono: req.body.telefono,
      });
    }
    expect(next).toHaveBeenCalled();
  });

  it("Se espera un error 404 si la creacion del usuario falla", async () => {
    validatorValues.validateUsernameExistence = jest.fn().mockResolvedValue(0);
    validatorValues.validateEmailExistence = jest.fn().mockResolvedValue(0);
    createUserUseCase.run = jest.fn().mockResolvedValue(null);

    await createUserController.run(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      status: "error",
      data: "NO fue posible agregar el registro",
    });
  });

  it("Se espera un error 500 en caso de presentar algun error en el servidor", async () => {
    validatorValues.validateUsernameExistence = jest
      .fn()
      .mockRejectedValue(new Error("Test error"));
    await createUserController.run(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      status: "error",
      data: "Ocurrio un error",
      mesagges: new Error("Test error"),
    });
  });
});
