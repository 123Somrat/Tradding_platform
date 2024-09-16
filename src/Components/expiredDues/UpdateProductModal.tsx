import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Modal,
  Typography,
} from "@mui/material";
import { TShowModalProps } from "../../types/types";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function UpdateProductModal({ selectedProductId, modalShow, setterFunction,}: TShowModalProps) {

  const { handleSubmit, control, formState: { errors },reset,} = useForm<{ expiredDate: string }>({
     defaultValues: {
      expiredDate: "",
    },
  });

  // Submit handeler
  const Submit = (FormInputDate: { expiredDate: string }) => {
    console.log(FormInputDate);
    console.log(selectedProductId)
    setterFunction(false);
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
