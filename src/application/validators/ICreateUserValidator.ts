import z from "zod";

export function ICreateUserValidator() {
  return z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name should be of type string",
      })
      .min(1, { message: "Name should not be empty" })
      .max(50, { message: "Name should have at maximum 50 characters" }),

    surname: z
      .string({
        required_error: "Surname is required",
        invalid_type_error: "Surname should be of type string",
      })
      .min(1, { message: "Name should not be empty" })
      .max(200, { message: "Name should have at maximum 200 characters" }),

    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email should be of type string",
      })
      .includes("@", { message: "Email must include @" })
      .endsWith(".com", { message: "Email needs to end with .com" }),

    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password should be of type string",
      })
      .min(8, { message: "Password should have at least 8 characters" })
      .max(255),
  });
}
