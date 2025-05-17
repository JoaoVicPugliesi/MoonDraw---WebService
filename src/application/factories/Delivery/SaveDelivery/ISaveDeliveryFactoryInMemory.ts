import { ISaveDeliveryUseCase } from "@application/useCases/Delivery/SaveDelivery/ISaveDeliveryUseCase";
import { Delivery } from "@domain/entities/Delivery";
import { IDeliveryRepositoryInMemoryImpl } from "@infra/repositories/Delivery/IDeliveryRepositoryInMemoryImpl";

export class ISaveDeliveryFactoryInMemory {
  constructor(
    private readonly deliveries: Delivery[]
  ) {}
  compose(): ISaveDeliveryUseCase {
    const iDeliveryRepository = new IDeliveryRepositoryInMemoryImpl(this.deliveries);
    return new ISaveDeliveryUseCase(iDeliveryRepository);
  }
}
