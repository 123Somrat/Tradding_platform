import z from "zod";

const addProductSchema = z
  .object({
    buyerName: z
      .string({
        required_error: "BuyerName is required",
        invalid_type_error: "BuyerName must be a string",
      })
      .min(5, "BuyerName Must be 5 or more characters long"),
    sellerName: z
      .string({
        required_error: "SellerName is required",
        invalid_type_error: "SellerName must be a string",
      })
      .min(5, "SellerName Must be 5 or more characters long"),
    buyingPrice: z.coerce
      .number({
        required_error: "Buying price is required",
        invalid_type_error: "Buying price must be a number",
      }).positive()
      .nonnegative("Buying price can not negative"),
    buyingDate: z
      .string({
        required_error: "Expired date is required",
        invalid_type_error: "Expired date must be a date",
      })
      .date("Buying Date is required"),
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
