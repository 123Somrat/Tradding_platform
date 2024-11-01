import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Modal,
  Typography,
} from "@mui/material";
import { TShowModalProps } from "../../types/types";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import expiredDueApi from "../../Redux/api/expiredDueApi";
import showInfoAlert from "../../Utils/showInfoAlert";

export default function UpdateProductModal({
  selectedProductId,
  modalShow,
  setterFunction,
}: TShowModalProps) {

  const useUpdateExpiredDueDate =
    expiredDueApi.endpoints.updateExpiredDueDate.useMutation;
  const [updateExpiredDueDate] = useUpdateExpiredDueDate();
  
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<{ buyingPrice: string; expiredDate: string }>({
    defaultValues: {
      buyingPrice: "",
      expiredDate: "",
    },
  });

  // Submit handeler
  const Submit = async ({
    buyingPrice,
    expiredDate,
  }: {
    buyingPrice: string;
    expiredDate: string;
  }) => {
    const data = await updateExpiredDueDate({
      haveToUpdateProductId: selectedProductId,
      updatedBuyingPrice: buyingPrice,
      updatedExpiredDate: expiredDate,
    });

    // Showing alert and close modal if data updated succesfully
    if (data.data) {
      showInfoAlert({ icon: "success", title: "Due updated succesfullu" });
      setterFunction(false);
    }

    // Reset form after submission
    reset();
  };

  // Modal Close function
  const CloseModal = () => {
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
          Enter updated expiredDate
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
          <FormControl color="success" error={!!errors.buyingPrice} fullWidth>
            <InputLabel
              htmlFor="buyingPrice"
              color="success"
              error={!!errors.buyingPrice}
            >
              BuyingPrice
            </InputLabel>
            <Controller
              name="buyingPrice"
              control={control}
              render={({ field }) => (
                <Input
                  id="buyingPrice"
                  aria-describedby="buyingPrice"
                  fullWidth
                  {...field}
                  className="mb-7 pl-3"
                />
              )}
            />
          </FormControl>
          <FormControl color="success" error={!!errors.expiredDate} fullWidth>
            <FormControl color="success" error={!!errors.expiredDate} fullWidth>
              <InputLabel
                htmlFor="ExpiredDate"
                color="success"
                error={!!errors.expiredDate}
              ></InputLabel>
              <Controller
                name="expiredDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Expired Date"
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
          </FormControl>
          <Button
            variant="outlined"
            color="success"
            type="submit"
            sx={{ mr: 2 }}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            color="warning"
            className="block ml-2"
            onClick={CloseModal}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
