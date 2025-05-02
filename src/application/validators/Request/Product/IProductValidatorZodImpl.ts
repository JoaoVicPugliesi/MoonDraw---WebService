import z from "zod";
import { IProductValidator } from "./IProductValidator";

export class IProductValidatorZodImpl implements IProductValidator {
  validateSaveProduct() {
    return z.object({
      images_id: z.array(z.string({
        required_error: "images_id is required",
        invalid_type_error: "images_id should be an array of strings",
      })),
      artist_id: z.string({
        required_error: "artist_id is required",
        invalid_type_error: "artist_id should be of type string",
      }), 
      name: z.string({
        required_error: "name is required",
        invalid_type_error: "name should be of type string",
      }),
      description: z.string({
        required_error: "description is required",
        invalid_type_error: "description should be of type string",
      }),
      price: z.number({
        required_error: "price is required",
        invalid_type_error: "price should be a Float",
      }),
      supply: z.number({
        required_error: "price is required",
        invalid_type_error: "price should be a Float",
      }),
      publisher: z.string({
        required_error: "publisher is required",
        invalid_type_error: "publisher should be of type string",
      }),
    });
  }
}
