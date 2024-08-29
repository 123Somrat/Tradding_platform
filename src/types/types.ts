import dayjs from "dayjs";

// Input value type
type IFormInput = {
  buyerName: string | "";
  sellerName: string | "";
  buyingPrice: number | "";
  buyingDate: dayjs.Dayjs | "";
  expiredDate: dayjs.Dayjs | "";
};

type TDues = {
  _id ?:string | ''
  buyerName: string | "";
  sellerName: string | "";
  buyingPrice: number | "";
  buyingDate?: dayjs.Dayjs | "";
  expiredDate: dayjs.Dayjs | "";
  expiredIn ?: string
  status ?:string
};

export type { IFormInput, TDues };
