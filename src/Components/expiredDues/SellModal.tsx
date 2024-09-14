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
import Swal from "sweetalert2";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const SellModal = ({
  selectedProductId,
  modalShow,
  setterFunction,
}: TShowModalProps) => {
  const useUpdateExpiredDueSellingPriceMutation =
    expiredDueApi.endpoints.updateExpiredDueSellingPrice.useMutation;
  const [updateExpiredDueSellingPrice] =
    useUpdateExpiredDueSellingPriceMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TSellPrice>({
    defaultValues: { sellingPrice: "", sellingDate: "" },
  });

  //const selectedProductDetails = rows.find(due=>due._id===selectedProduct)

  const Submit: SubmitHandler<TSellPrice> = async (paylode: TSellPrice) => {
    // Gathering Data
    const sellingPrice = paylode.sellingPrice;
    const sellingDate = paylode.sellingDate;

    const data = await updateExpiredDueSellingPrice({
      id: selectedProductId,
      sellingPrice: sellingPrice,
      sellingDate: sellingDate,
    });

    // hide the modal
    setterFunction(false);

    // show succes alert
    if (data.data) {
      Swal.fire({
        title: "Sold!",
        text: "Your due has been sold.",
        icon: "success",
      });
    }

    reset();
  };

  const closeModal = () => {
    setterFunction(false);
  };

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
          height: "320px",
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
          Enter your selling price and selling date
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(Submit)}
          p={2}
          sx={{
            "& .MuiTextField-root": {
              mb: 2,
              width: "auto",
              borderBottom: "1px solid grey",
              "&:focus-within": {
                borderBottomColor: "green", // Change border color on focus
              },
            },
            "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
              border: "none",
              margin: "0px",
            },
            "& .css-1x51dt5-MuiInputBase-input-MuiInput-input": {
              marginBottom: "9px",
            },
          }}
        >
          <FormControl color="success" error={!!errors.sellingPrice} fullWidth>
            <InputLabel
              htmlFor="sellPrice"
              color="success"
              error={!!errors.sellingPrice}
            >
              SellingPrice
            </InputLabel>
            <Controller
              name="sellingPrice"
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
            <FormControl color="success" error={!!errors.sellingDate} fullWidth>
              <InputLabel
                htmlFor="sellingDate"
                color="success"
                error={!!errors.sellingDate}
              ></InputLabel>
              <Controller
                name="sellingDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Selling Date"
                    disablePast
                    formatDensity="spacious"
                    disableHighlightToday
                    displayWeekNumber
                    value={dayjs(field.value)}
                    onChange={(date) =>
                      field.onChange(date?.format("YYYY-MM-DD"))
                    }
                    className="mb-2"
                    slotProps={{
                      openPickerIcon: { fontSize: "medium" },
                      openPickerButton: { color: "success" },

                      textField: {
                        focused: true,
                        color: "success",
                      },
                    }}
                  />
                )}
              />
            </FormControl>
            {/*   
            {sellPrice ? (
              <span className="text-red-600">{sellPrice}</span>
            ) : (
              ""
            )}
*/}
          </FormControl>
          <Button
            variant="outlined"
            color="success"
            type="submit"
            sx={{ mr: 2 }}
          >
            Sell
          </Button>
          <Button
            variant="outlined"
            color="warning"
            className="block ml-2"
            onClick={closeModal}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SellModal;
