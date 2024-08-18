import dayjs from "dayjs";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  MutationTrigger,
   MutationDefinition
} from "@reduxjs/toolkit/query/react";




import showInfoAlert from "../../Utils/showInfoAlert";
type formData = {
  buyerName: string | "";
  sellerName: string | "";
  buyingPrice: number | "";
  buyingDate: dayjs.Dayjs | "";
  expiredDate: dayjs.Dayjs | "";
};

type addDues = MutationTrigger<
  MutationDefinition<
    formData,
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    never,
    formData,
    "baseApi"
  >
>;

export default async function HandleAddProduct(
  formInputData: formData,
  addDues: addDues
) {
  try {
    const res = await addDues(formInputData);
    console.log(res)
    if (res.data) {
      showInfoAlert({
        icon: "success",
        title: "Due added successfully",
      });
    }
  } catch (err) {
    showInfoAlert({
      icon: "error",
      title: "Something is wrong",
    });
  }
}
