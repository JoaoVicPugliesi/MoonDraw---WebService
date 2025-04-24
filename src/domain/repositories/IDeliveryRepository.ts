import { ISaveDeliveryDTO } from "@application/useCases/Delivery/SaveDelivery/ISaveDeliveryDTO";

export interface IDeliveryRepository {
    saveDelivery(DTO: ISaveDeliveryDTO): Promise<void>;
}