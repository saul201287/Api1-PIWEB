import { NextFunction, Request, Response } from "express";
import { CreateUserUseCase } from "../../application/CreateUserUseCase";
import { ValidatorValues } from "../validators/Validationes";

export class CreateUserController {
  constructor(readonly createUserUseCase: CreateUserUseCase) {}

  async run(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    const validationes = new ValidatorValues();
    try {
      
     if ((await validationes.validateEmailExistence(data.email)) > 0) {
        res.status(409).send({
          status: "error",
          data: "El correo ingresado ya se encuentra registrado",
        });
      } else {
        const user: any = await this.createUserUseCase.run(
          data.id,
          data.nombre,
          data.apellidos,
          data.email,
          data.password,
          data.telefono,
          data.fechaPlan,
          data.direccion
        );

        if (user) {
          const data = {
            id: user?.id,
            nombre: user?.nombre,
            apellidos: user?.apellidos,
            email: user?.email,
            password: user?.password,
            telefono: user?.telefono,
            fechaPlan: user?.fechaPlan
          };
          res.locals.user = data;
          next();
        } 
        else
          res.status(401).send({
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
