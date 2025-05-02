import z from "zod";
import { IUserValidator } from "./IUserValidator";

export class IUserValidatorZodImpl implements IUserValidator {
  validateRegister() {
    return z
      .object({
        name: z
          .string({
            required_error: "Name is required",
            invalid_type_error: "Name should be of type string",
          })
          .max(50, { message: "Name should have at maximum 50 characters" }),

        surname: z
          .string({
            required_error: "Surname is required",
            invalid_type_error: "Surname should be of type string",
          })
          .max(200, {
            message: "Surname should have at maximum 200 characters",
          }),

        email: z
          .string({
            required_error: "Email is required",
            invalid_type_error: "Email should be of type string",
          })
          .email({ message: "This is not a valid email" })
          .includes("@", { message: "Email must include @" })
          .endsWith(".com", { message: "Email needs to end with .com" }),
        role: z.enum(["buyer", "artist"], {
          required_error: "Role is required",
          invalid_type_error: "Role should be of type string",
        }),
        password: z
          .string({
            required_error: "Password is required",
            invalid_type_error: "Password should be of type string",
          })
          .min(15, { message: "Password should have minimum length of 15" })
          .max(255, { message: "Password is too long" })
          .regex(/^(?=.*[A-Z]).{8,}$/, {
            message:
              "Should Contain at least one uppercase letter and have a minimum length of 8 characters.",
          }),
        confirmPassword: z.string({
          required_error: "Confirm Password is required",
          invalid_type_error: "Confirm Password should be of type string",
        }),
      })
      .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
          ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ["confirmPassword"],
          });
        }
      });
  }

  validateConfirmMail() {
    return z.object({
      verification_token: z.string({
        required_error: "Token is required",
        invalid_type_error: "Token should be a string",
      }),
    });
  }

  validateLogin() {
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
}
