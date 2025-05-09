import { IServicesEmail } from "../domain/services/IServisesEmail";
import nodemailer from "nodemailer";
import crypto from "crypto";

const transporter = nodemailer.createTransport({
  host: process.env.HOST_EMAIL,
  port: Number(process.env.PORT_EMAI),
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASS_EMAIL,
  },
});

async function verify(): Promise<boolean> {
  try {
    await transporter.verify();
    console.log("Conectado al servidor SMTP");
    return true;
  } catch (error) {
    console.error("Error al conectar con el servidor SMTP:", error);
    return false;
  }
}

const generateResetToken = (): string => {
  return crypto.randomBytes(32).toString("hex");
};

export class servicesEmail implements IServicesEmail {
  async sendMailWelcome(email: string, nombre: string): Promise<boolean> {
    try {
      const isVerified = await verify();
      if (!isVerified) return false;

      const info = await transporter.sendMail({
        from: process.env.TO_EMAIL,
        to: email,
        subject: `Correo de verificación para ${nombre}`,
        html: `
          <div style="text-align: center;">
              <p><b>Bienvenido a PowerWatch</b></p>
              <p><b>Si desea adquirir uno de nuestros productos por favor póngase en contacto con nuestro 
              agente más cercano al siguiente número: 9671941293</b></p>
              <p><b>O a la siguiente dirección de correo: jrmich3@hotmail.com</b></p> 
              <p><b>PAQUETES Y COSTOS:</b></p>
              <a href="https://ibb.co/zrmGfLF"><img src="https://i.ibb.co/t4H8CNz/Whats-App-Image-2024-07-08-at-8-57-02-AM.jpg" ></a>            
          </div>`,
      });

      return !!info;
    } catch (error) {
      console.error("Error al enviar correo de bienvenida:", error);
      return false;
    }
  }

  async sendPromociones(emails: string[], nombre: string): Promise<boolean[]> {
    try {
      const isVerified = await verify();
      if (!isVerified) return emails.map(() => false);

      const sendPromises = emails.map((email) =>
        transporter.sendMail({
          from: process.env.TO_EMAIL,
          to: email,
          subject: `Promociones especiales para ${nombre}`,
          html: `
            <div style="text-align: center;">
                <p><b>¡Grandes promociones en PowerWatch!</b></p>
                <p>Descubre nuestras ofertas exclusivas visitando nuestro sitio web.</p>
            </div>`,
        })
      );

      const results = await Promise.allSettled(sendPromises);

      return results.map((result) => result.status === "fulfilled");
    } catch (error) {
      console.error("Error al enviar promociones:", error);
      return emails.map(() => false);
    }
  }

  async sendPassRecover(email: string, nombre: string): Promise<boolean> {
    try {
      const isVerified = await verify();
      if (!isVerified) return false;

      const token = generateResetToken();
      const info = await transporter.sendMail({
        from: process.env.TO_EMAIL,
        to: email,
        subject: `Correo de recuperación para ${nombre}`,
        html: `
          <div style="text-align: center; font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
              <div style="background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                  <h2 style="color: #333;">Solicitud para restablecer tu contraseña</h2>
                  <p style="color: #555;">Hola ${nombre},</p>
                  <p style="color: #555;">Recibimos una solicitud para restablecer tu contraseña. Haz clic en el botón de abajo para restablecerla:</p>
                  <a href="${
                    process.env.URL_FROTNEND
                  }/RecuperacionDeContraseña?token=${token}&email=${encodeURIComponent(
          email
        )}" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #28a745; color: #ffffff; text-decoration: none; border-radius: 5px;">Restablecer contraseña</a>
                  <p style="color: #555; margin-top: 20px;">Si no solicitaste un cambio de contraseña, por favor ignora este correo.</p>
              </div>
          </div>
      `,
      });

      return !!info;
    } catch (error) {
      console.error(
        "Error al enviar correo de recuperación de contraseña:",
        error
      );
      return false;
    }
  }
}
