import z from "zod";

const addProductSchema = z.object({
  firstName: z.string({
    required_error: "FirstName is required",
    invalid_type_error: "FirstName must be a string",
  }),
  lastName: z.string({
    required_error: "LastName is required",
    invalid_type_error: "LastName must be a string",
  }),
  email: z
    .string({ required_error: "Email is requiored" })
    .email({ message: "Invalid enail address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Must be 8 or more characters long" })
    .max(15, { message: "Must be 15 or fewer characters long" }),
});

export default addProductSchema;
