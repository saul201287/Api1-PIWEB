import { Payments } from "../Payments";

export interface IServicesRabbit{
    sendMqpPayment(data:Payments):Promise<boolean | null>
}