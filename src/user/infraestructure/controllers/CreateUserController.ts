import { NextFunction, Request, Response } from "express";
import { CreateUserUseCase } from "../../application/CreateUserUseCase";
import { ValidatorValues } from "../validators/Validationes";

const sanitizeString = (str: string): string => {
  return str.replace(/<[^>]*>?/gm, "");
};

export class CreateUserController {
  constructor(readonly createUserUseCase: CreateUserUseCase) {}

  async run(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    const validationes = new ValidatorValues();
    try {
      // Validaciones concurrentes
      const [isValidEmail, emailExists] = await Promise.all([
        validationes.validateEamil(data.email),
        validationes.validateEmailExistence(data.email),
      ]);

      if (isValidEmail == 0) {
        return res.status(409).send({
          status: "error",
          data: "El correo ingresado no es valido",
        });
      }

      if (emailExists > 0) {
        return res.status(409).send({
          status: "error",
          data: "El correo ingresado ya se encuentra registrado",
        });
      }

      // Crear usuario
      const user:any = await this.createUserUseCase.run(
        data.id.trim(),
        sanitizeString(data.nombre).trim(),
        sanitizeString(data.apellidos).trim(),
        sanitizeString(data.email).trim(),
        sanitizeString(data.password).trim(),
        data.telefono,
        data.fechaPlan
      );

      if (user) {
        const responseData = {
          id: user?.id,
          nombre: user?.nombre,
          apellidos: user?.apellidos,
          email: user?.email,
          password: user?.password,
          telefono: user?.telefono,
          fechaPlan: user?.fechaPlan,
        };
        res.locals.user = responseData;
        return next();
      } else {
        return res.status(409).send({
          status: "error",
          data: "NO fue posible agregar el registro",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        status: "error",
        data: "Ocurrió un error",
        mesagges: error,
      });
    }
  }
}
