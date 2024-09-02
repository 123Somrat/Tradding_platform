import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TSellPrice, TShowModalProps } from "../../types/types";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Modal,
  Typography,
} from "@mui/material";
import expiredDueApi from "../../Redux/api/expiredDueApi";

const SellModal = ({ selectedProductId ,modalShow , setterFunction }: TShowModalProps) => {

    const useUpdateExpiredDueSellingPriceMutation = expiredDueApi.endpoints.updateExpiredDueSellingPrice.useMutation;
     const  [updateExpiredDueSellingPrice]  = useUpdateExpiredDueSellingPriceMutation()


   
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TSellPrice>({ defaultValues: { sellPrice: "" } });

  //const selectedProductDetails = rows.find(due=>due._id===selectedProduct)

  const Submit: SubmitHandler<TSellPrice> = (data: TSellPrice) =>{

       // Gathering Data
       const sellingPrice = data.sellPrice;
       const info = updateExpiredDueSellingPrice({id:selectedProductId,sellingPrice:sellingPrice})

      
    reset();
  };

 const closeModal = ()=>{
    setterFunction(false)
 }




  return (
    <Modal
      open={modalShow}
      disableEnforceFocus
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        sx={{
          width: { sm: "w-full", md: "500px" },
          height: "220px",
          backgroundColor: "white",
          transform: "translate(-50%, -50%)",
          position: "absolute",
          top: "30%",
          left: "50%",
          zIndex: 50,
        }}
        border="2px solid green"
        borderRadius={1}
      >
        <Typography
          id="parent-modal-title"
          m={2}
          className="text-center text-green-800 "
        >
          Enter your selling price
        </Typography>
        <Box component="form" onSubmit={handleSubmit(Submit)} p={2}>
          <FormControl color="success" error={!!errors.sellPrice} fullWidth>
            <InputLabel
              htmlFor="sellPrice"
              color="success"
              error={!!errors.sellPrice}
            >
              SellingPrice
            </InputLabel>
            <Controller
              name="sellPrice"
              control={control}
              render={({ field }) => (
                <Input
                  id="sellPrice"
                  aria-describedby="sellPrice"
                  fullWidth
                  {...field}
                  className="mb-7 pl-3"
                />
              )}
            />
            {/*   
            {sellPrice ? (
              <span className="text-red-600">{sellPrice}</span>
            ) : (
              ""
            )}
*/}
          </FormControl>
          <Button variant="outlined" color="success" type="submit" sx={{mr:2}}>
            Sell
          </Button>
          <Button variant="outlined" color="warning" className="block ml-2" onClick={closeModal}>Close</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SellModal;
