import mqtt from "mqtt";
import { IServicesRabbit } from "../../domain/Services/IServisesRabbit";
import { Payments } from "../../domain/Payments";

export class RabbitServices implements IServicesRabbit{
  
  async sendMqpPayment(data: Payments): Promise<boolean | null> {
    const options = {
      username: process.env.MQTT_USERNAME?.toString(),
      password: process.env.MQTT_PASSWORD?.toString(),
      protocolo: process.env.MQTT_PROTOCOLO?.toString(),
      port: Number(process.env.MQTT_PORT),
    };
    const queue = process.env.MQTT_QUEUE;
    const mqttUrl = process.env.MQTT_URL;
    const topic = process.env.MQTT_ROUTINGKEY;

    if (
      !options.username ||
      !options.password ||
      !options.port ||
      !options.protocolo ||
      !queue ||
      !mqttUrl ||
      !topic
    ) {
      throw new Error(
        "Las variables de entorno no están definidas correctamente."
      );
    } else {
      return new Promise((resolve, reject) => {
        const client = mqtt.connect(mqttUrl, options);

        client.on("connect", function () {
          client.publish(
            topic,
            JSON.stringify(data),
            { qos: 0, retain: false },
            (error) => {
              if (error) {
                console.error(error);
                resolve(false);
              } else {
                console.log("Mensaje enviado");
                resolve(true);
              }
              client.end();
            }
          );
        });

        client.on("error", (error) => {
          console.error(error);
          resolve(null);
          client.end();
        });
      });
    }
  }
}
