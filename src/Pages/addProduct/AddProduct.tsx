import {
  FormControl,
  Grid,
  Typography,
  Input,
  InputLabel,
  Button,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import addProductSchema from "../../schema/addProductSchemaForZod/addProductSchemaForZod";
import { useEffect, useRef } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// Input value type
type IFormInput = {
  buyerName: string;
  sellerName: string;
  buyingDate: Date | "";
  expiredDate: Date | "";
};

export default function AddProduct() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      buyerName: "",
      sellerName: "",
      buyingDate: "",
      expiredDate: "",
    },
    resolver: zodResolver(addProductSchema),
  });
  const buyerNameRef = useRef<HTMLInputElement>(null);
  const sellerNameRef = useRef<HTMLInputElement>(null);
  const buyingDateRef = useRef<HTMLInputElement>(null);
  const expiredDateRef = useRef<HTMLInputElement>(null);

  // Focusing the error field where error is occured
  useEffect(() => {
    if (errors.buyerName) {
      buyerNameRef.current?.focus();
    } else if (errors.sellerName) {
      sellerNameRef.current?.focus();
    } else if (errors.buyingDate) {
      buyingDateRef.current?.focus();
    } else if (errors.expiredDate) {
      expiredDateRef.current?.focus();
    }
  }, [errors]);

  // submit handler
  const submit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    console.log(typeof data.buyingDate);
    reset();
  };
  console.log(errors);
  return (
    <Box
      sx={{
        mx: "auto",
        my: 4,
        p: 4,
        border: 2,
        borderColor: "green",
        width: { xs: "90%", md: "60%" },
      }}
    >
      <Typography className="text-center text-green-800" mb={3}>
        Add Product
      </Typography>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": {
            mb: 2,
            width: "auto",
            borderBottom: "1px solid grey",
          },
          "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
            border: "none",
            margin: "0px",
          },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(submit)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl color="success" error={!!errors.buyerName}>
              <InputLabel
                htmlFor="buyerName"
                color="success"
                error={!!errors.buyerName}
              >
                BuyerName
              </InputLabel>
              <Controller
                name="buyerName"
                control={control}
                render={({ field }) => (
                  <Input
                    id="firstName"
                    aria-describedby="buyerName"
                    className="min-w-64 md:w-52 xl:w-96 mb-8 "
                    {...field}
                    inputRef={buyerNameRef}
                  />
                )}
              />
            </FormControl>
            <p>
              {errors.buyerName ? (
                <span className="text-red-500 text-xs md:text-sm">
                  {errors.buyerName.message}
                </span>
              ) : (
                ""
              )}
            </p>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl color="success" error={!!errors.sellerName}>
              <InputLabel
                htmlFor="SellerName"
                color="success"
                error={!!errors.sellerName}
              >
                SellerName
              </InputLabel>
              <Controller
                name="sellerName"
                control={control}
                render={({ field }) => (
                  <Input
                    id="sellerName"
                    aria-describedby="my-helper-text"
                    className="min-w-64 md:w-52 xl:w-96 mb-8 "
                    {...field}
                    inputRef={sellerNameRef}
                  />
                )}
              />
            </FormControl>
            <p>
              {errors.sellerName ? (
                <span className="text-red-500 text-xs md:text-sm">
                  {errors.sellerName.message}
                </span>
              ) : (
                ""
              )}
            </p>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl color="success" error={!!errors.buyingDate} fullWidth>
              <InputLabel
                htmlFor="buyingDate"
                color="success"
                error={!!errors.buyingDate}
              ></InputLabel>
              <Controller
                name="buyingDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Buying Date"
                    disablePast
                    formatDensity="spacious"
                    disableHighlightToday
                    displayWeekNumber
                    onChange={(date) =>
                      field.onChange(date?.format("YYYY-MM-DD"))
                    }
                    inputRef={buyingDateRef}
                    slotProps={{
                      openPickerIcon: { fontSize: "medium" },
                      openPickerButton: { color: "success" },
                      textField: {
                        focused: false,
                        color: "success",
                      },
                    }}
                  />
                )}
              />
            </FormControl>
            <p>
              {errors.buyingDate ? (
                <span className="text-red-500 text-xs md:text-sm md:mb-8 block">
                  {errors.buyingDate.message}
                </span>
              ) : (
                ""
              )}
            </p>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl color="success" error={!!errors.expiredDate} fullWidth>
              <InputLabel
                htmlFor="expeiredDate"
                color="success"
                error={!!errors.expiredDate}
              ></InputLabel>
              <Controller
                name="expiredDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Expeired Date"
                    disablePast
                    formatDensity="spacious"
                    disableHighlightToday
                    displayWeekNumber
                    onChange={(date) =>
                      field.onChange(date?.format("YYYY-MM-DD"))
                    }
                    inputRef={expiredDateRef}
                    slotProps={{
                      openPickerIcon: { fontSize: "medium" },
                      openPickerButton: { color: "success" },
                      textField: {
                        focused: false,
                        color: "success",
                      },
                    }}
                  />
                )}
              />
            </FormControl>
            <p>
              {errors.expiredDate ? (
                <span className="text-red-500 text-xs md:text-sm md:mb-8 block">
                  {errors.expiredDate.message}
                </span>
              ) : (
                ""
              )}
            </p>
          </Grid>
          <Button
            //disabled={!isValid}
            type="submit"
            fullWidth
            style={{ marginLeft: "5px" }}
            variant="contained"
            color="success"
            className="hover:bg-green-900"
          >
            Add Product
          </Button>
        </Grid>
      </Box>
    </Box>
  );
}
