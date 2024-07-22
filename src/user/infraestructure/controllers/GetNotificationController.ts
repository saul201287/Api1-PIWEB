import { Request, Response } from "express";
import { GetNotification } from "../../application/GetNotificationUseCase";
import { get } from "http";

export class GetNotificationController {
  constructor(readonly getNoti: GetNotification) {}
  async run(req: Request, res: Response) {
    const data = req.params;
    try {
      const notificationes = await this.getNoti.run(data.id_user);
      if (notificationes.length > 0) {
        res.status(200).json({
          data: notificationes,
        });
      } else {
        res.status(406).json({
          messages: "No se encontraron notificaciones " + notificationes,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: error,
      });
    }
  }
}
