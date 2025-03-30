import z from "zod";

export function ILoginValidator() {
  return z.object({
    email: z.string({
      required_error: "Email is required",
      invalid_type_error: "Email should be of type string",
    }),
    password: z.string({
      required_error: "Password is required",
      invalid_type_error: "Password should be of type string",
    }),
  });
}
