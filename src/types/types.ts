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

type TSellPrice = {
  sellingPrice:string
  sellingDate:string
}

type TSellRecords = IFormInput & TSellPrice;

type TShowModalProps = {
     selectedProductId:string,
     modalShow : boolean,
     setterFunction: React.Dispatch<React.SetStateAction<boolean>>;
}

export type { IFormInput, TDues , TSellPrice  , TShowModalProps , TSellRecords};
