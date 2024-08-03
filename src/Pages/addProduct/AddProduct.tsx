import { FormControl, Grid, Typography } from "@mui/material";
import { Input } from "@mui/material";
import { InputLabel } from "@mui/material";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import addProductSchema from "../../schema/addProductSchemaForZod/addProductSchemaForZod";
import { useEffect, useRef } from "react";

// Input value type
type IFormInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function AddProduct() {
  const {
    control,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(addProductSchema),
  });
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Focusing the error field where error is occued
  useEffect(() => {
    if (errors.firstName) {
      firstNameRef.current?.focus();
    } else if (errors.lastName) {
      lastNameRef.current?.focus();
    } else if (errors.email) {
      emailRef.current?.focus();
    } else if (errors.password) {
      passwordRef.current?.focus();
    }
  }, [errors]);

  // submit handler
  const submit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);

    reset();
    setFocus("email");
  };

  return (
    <Box
      sx={{
        mx: "auto",
        my: 4,
        p: 4,
        border: 2,
        borderColor: "green.300",
        width: { xs: "90%", md: "60%" },
      }}
    >
      <Typography className="text-center text-green-800" mb={3}>
        Add Product
      </Typography>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 2, width: "45ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(submit)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl color="success" error={!!errors.firstName}>
              <InputLabel
                htmlFor="firstName"
                color="success"
                error={!!errors.firstName}
              >
                FirstName
              </InputLabel>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Input
                    id="firstName"
                    aria-describedby="firstName"
                    className="min-w-64 md:w-52 xl:w-96 mb-8 "
                    {...field}
                    inputRef={firstNameRef}
                  />
                )}
              />
            </FormControl>
            <p>
              {errors.firstName ? (
                <span className="text-red-500 text-xs md:text-sm">
                  {errors.firstName.message}
                </span>
              ) : (
                ""
              )}
            </p>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl color="success" error={!!errors.lastName}>
              <InputLabel
                htmlFor="lastName"
                color="success"
                error={!!errors.lastName}
              >
                LastName
              </InputLabel>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Input
                    id="lastName"
                    aria-describedby="my-helper-text"
                    className="min-w-64 md:w-52 xl:w-96 mb-8 "
                    {...field}
                    inputRef={lastNameRef}
                  />
                )}
              />
            </FormControl>
            <p>
              {errors.lastName ? (
                <span className="text-red-500 text-xs md:text-sm">
                  {errors.lastName.message}
                </span>
              ) : (
                ""
              )}
            </p>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl color="success" error={!!errors.email}>
              <InputLabel
                htmlFor="email"
                color="success"
                error={!!errors.email}
              >
                Email
              </InputLabel>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    id="email"
                    aria-describedby="my-helper-text"
                    className="min-w-64 md:w-52 xl:w-96 mb-8 "
                    {...field}
                    inputRef={emailRef}
                  />
                )}
              />
            </FormControl>
            <p>
              {errors.email ? (
                <span className="text-red-500 text-xs md:text-sm md:mb-8 block">
                  {errors.email.message}
                </span>
              ) : (
                ""
              )}
            </p>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl color="success" error={!!errors.password}>
              <InputLabel
                htmlFor="password"
                color="success"
                error={!!errors.password}
              >
                Password
              </InputLabel>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    id="password"
                    aria-describedby="my-helper-text"
                    className="min-w-64 md:w-52 xl:w-96 mb-8 "
                    {...field}
                    inputRef={passwordRef}
                  />
                )}
              />
            </FormControl>
            <p>
              {errors.password ? (
                <span className="text-red-500 text-xs md:text-sm md:mb-8 block">
                  {errors.password.message}
                </span>
              ) : (
                ""
              )}
            </p>
          </Grid>

          <Button
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
