

import { FormControl, Grid, Typography } from "@mui/material";
import { Input } from "@mui/material";
import { InputLabel } from "@mui/material";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

// Input value type
type IFormInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function AddProduct() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  // submit handler
  const submit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
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
            <FormControl color="success">
              <InputLabel htmlFor="firstName" color="success">
                FirstName
              </InputLabel>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Input
                    id="firstName"
                    aria-describedby="firstName"
                    className="min-w-64 md:w-52 xl:w-96 mb-8"
                    {...field}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl color="success">
              <InputLabel htmlFor="lastName" color="success">
                LastName
              </InputLabel>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Input
                    id="lastName"
                    aria-describedby="my-helper-text"
                    {...field}
                    className="min-w-64 md:w-52 xl:w-96 mb-8 "
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl color="success">
              <InputLabel htmlFor="email" color="success">
                Email
              </InputLabel>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    id="email"
                    aria-describedby="my-helper-text"
                    {...field}
                    className="min-w-64 md:w-52 xl:w-96 mb-8 "
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl color="success">
              <InputLabel htmlFor="password" color="success">
               Password
              </InputLabel>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    id="password"
                    aria-describedby="my-helper-text"
                    {...field}
                    className="min-w-64 md:w-52 xl:w-96 mb-8 "
                  />
                )}
              />
            </FormControl>
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

