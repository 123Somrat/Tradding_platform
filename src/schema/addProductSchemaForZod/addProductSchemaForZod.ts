import z from "zod";

const addProductSchema = z
  .object({
    buyerName: z
      .string({
        required_error: "FirstName is required",
        invalid_type_error: "FirstName must be a string",
      })
      .min(5, "Firstname Must be 5 or more characters long"),
    sellerName: z
      .string({
        required_error: "LastName is required",
        invalid_type_error: "LastName must be a string",
      })
      .min(5, "LastName Must be 5 or more characters long"),
    buyingDate: z.string().date("Buying Date is required"),
    expiredDate: z
      .string({
        required_error: "Expired date is required",
        invalid_type_error: "Expired date must be a date",
      })
      .date("Expired Date is required"),
  })
  .refine(
    (data) => {
      const buyingDate = Date.parse(data.buyingDate);
      const expiredDate = Date.parse(data.expiredDate);

      if (buyingDate >= expiredDate) {
        return false;
      }
      return true;
    },
    {
      message: "Expired date must be later than buying date",
      path: ["expiredDate"], // Adjust the error path as needed
    }
  );

export default addProductSchema;
