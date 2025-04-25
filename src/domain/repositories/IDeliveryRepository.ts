import { ISaveDeliveryDTO } from "@application/useCases/Delivery/SaveDelivery/ISaveDeliveryDTO";
import { Delivery } from "@domain/entities/Delivery";

export interface IDeliveryRepository {
    saveDelivery(DTO: ISaveDeliveryDTO): Promise<Delivery>;
}