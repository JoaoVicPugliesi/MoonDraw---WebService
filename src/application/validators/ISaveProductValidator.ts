import z from 'zod';

export class ISaveProductValidator {
  validate() {
    return z.object({
      image_id: z.string({
        required_error: 'image_id is required',
        invalid_type_error: 'image_id should be of type string',
      }),
      name: z.string({
        required_error: 'name is required',
        invalid_type_error: 'name should be of type string',
      }),
      description: z.string({
        required_error: 'description is required',
        invalid_type_error: 'description should be of type string',
      }),
      price: z.number({
        required_error: 'price is required',
        invalid_type_error: 'price should be a Float',
      }),
      supply: z.number({
        required_error: 'price is required',
        invalid_type_error: 'price should be a Float',
      }),
      publisher: z.string({
        required_error: 'publisher is required',
        invalid_type_error: 'publisher should be of type string',
      }),
    });
  }
}
