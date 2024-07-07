import nodemailer from "nodemailer";
import { IServicesEmailPayments } from "../../domain/Services/IServicesEmailPayments";
import { Payments } from "../../domain/Payments";
import { query } from "../../../database/mysql";

export class NodeMailerServices implements IServicesEmailPayments {
  async sendMailPayment(email: string, payment: Payments): Promise<boolean> {
    try {
      const sql = "SELECT name FROM users where email = ?";
      const [result]: any = await query(sql, [email]);
      const data: any = Object.values(JSON.parse(JSON.stringify(result)));
      const info = await transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to: email,
        subject: `Comprobante de Pago`,
        html: `
    <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://i.ibb.co/VCDskyy/Captura-de-pantalla-2024-04-19-103202.png" alt="PowerWatch Logo" style="width: 150px;"/>
      </div>
      <h2 style="color: #333; text-align: center;">Comprobante de Pago</h2>
      <p style="text-align: center;">Gracias por su compra. A continuación encontrará los detalles de su transacción.</p>
      
      <div style="margin: 20px 0;">
        <p><strong>Nombre del Cliente:</strong>${data[0].name}</p>
        <p><strong>Monto Pagado:</strong>$${payment.importe}</p>
        <p><strong>Fecha del Pago:</strong> ${payment.fecha}</p>
        <p><strong>ID de Transacción:</strong>${payment.id}</p>
      </div>
      
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
      
      <div style="text-align: center;">
        <p><strong>Bienvenido a PowerWatch</strong></p>
        <p>Si desea adquirir uno de nuestros productos por favor póngase en contacto con nuestro agente más cercano al siguiente número: 9671941293</p>
        <p>O a la siguiente dirección de correo: <a href="mailto:jrmich3@hotmail.com">jrmich3@hotmail.com</a></p>
      </div>
      
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
      
      <div style="text-align: center;">
        <p>Para más información, visite nuestro sitio web:</p>
        <p><a href="https://www.powerwatch.com" style="color: #0066cc;">www.powerwatch.com</a></p>
      </div>
      
      <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #777;">
        <p>Este es un correo generado automáticamente. Por favor, no responda a este mensaje.</p>
      </div>
    </div>
  `,
      });
      if (info) {
        return true;
      } else {
        console.log("hubo un problema al enviar el email");
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
const transporter = nodemailer.createTransport({
  host: process.env.HOST_EMAIL,
  port: Number(process.env.PORT_EMAI),
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASS_EMAIL,
  },
});
