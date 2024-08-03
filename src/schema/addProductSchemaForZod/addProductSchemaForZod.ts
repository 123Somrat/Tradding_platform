import z from "zod";
// Input value type

const addProductSchema= z.object({
  firstName: z.string({
    required_error: "FirstName is required",
    invalid_type_error: "FirstName must be a string",
  }).min(5,"Firstname Must be 5 or more characters long"),
  lastName: z.string({
    required_error: "LastName is required",
    invalid_type_error: "LastName must be a string",
  }).min(5,"LastName Must be 5 or more characters long"),
  email: z
    .string({ required_error: "Email is requiored" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Must be 8 or more characters long" })
    .max(15, { message: "Must be 15 or fewer characters long" }),
});

export default addProductSchema;
