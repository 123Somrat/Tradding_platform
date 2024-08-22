import dayjs from "dayjs";

// Input value type
type IFormInput = {
    buyerName: string | "";
    sellerName: string | "";
    buyingPrice: number | "";
    buyingDate: dayjs.Dayjs | "";
    expiredDate: dayjs.Dayjs | "";
  };




export type {IFormInput}