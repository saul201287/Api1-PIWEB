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
      if ((await validationes.validateEamil(data.email)) == 0) {
        res.status(409).send({
          status: "error",
          data: "El correo ingresado no es valido",
        });
      } else if ((await validationes.validateEmailExistence(data.email)) > 0) {
        res.status(409).send({
          status: "error",
          data: "El correo ingresado ya se encuentra registrado",
        });
      } else {
        const user: any = await this.createUserUseCase.run(
          data.id.trim(),
          sanitizeString(data.nombre).trim(),
          sanitizeString(data.apellidos).trim(),
          sanitizeString(data.email).trim(),
          sanitizeString(data.password).trim(),
          data.telefono,
          data.fechaPlan
        );
        console.log(
          data.id.trim(),
          sanitizeString(data.nombre).trim(),
          sanitizeString(data.apellidos).trim(),
          sanitizeString(data.email).trim(),
          sanitizeString(data.password).trim(),
          data.telefono,
          data.fechaPlan
        );
        console.log(user);

        if (user != null) {
          const data = {
            id: user?.id,
            nombre: user?.nombre,
            apellidos: user?.apellidos,
            email: user?.email,
            password: user?.password,
            telefono: user?.telefono,
            fechaPlan: user?.fechaPlan,
          };
          res.locals.user = data;
          next();
        } else
          res.status(409).send({
            status: "error",
            data: "NO fue posible agregar el registro",
          });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: "error",
        data: "Ocurrio un error",
        mesagges: error,
      });
    }
  }
}
