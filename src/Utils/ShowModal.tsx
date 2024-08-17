import {FormControl, Box, Button, Input, InputLabel, Modal, Typography } from "@mui/material";

import { Controller, SubmitHandler, useForm } from "react-hook-form";

export default function ShowModal({setterFunction}:{setterFunction:React.Dispatch<React.SetStateAction<boolean>>}) {


  type TradingPass = {
    tradingPassWord: string;
  };

 
  const { control, handleSubmit , formState:{errors} } = useForm<TradingPass>({
    defaultValues: {
      tradingPassWord: "",
    },
  });

  const GetTradingPass: SubmitHandler<TradingPass> = (data: TradingPass) => {
      if(data.tradingPassWord==='somrat'){
         setterFunction(false)
      }
  };

  return (
    <div>
      <Modal open={true}>
        <Box
          component="form"
          onSubmit={handleSubmit(GetTradingPass)}
          sx={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",

            width: {
              xs: 300,
              sm: 300,
              md: 400,
            },
            bgcolor: "background.paper",
            border: "2px solid green",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="keep-mounted-modal-title"
            className="text-center text-green-800"
            sx={{
               mb:4
            }}
          >
            Enter your trading  password
          </Typography>
          <FormControl color="success" error={!!errors.tradingPassWord} fullWidth>
                <InputLabel
                  htmlFor="buyerName"
                  color="success"
                  error={!!errors.tradingPassWord}
                >
                  TradingPassWord
                </InputLabel>
                <Controller
                  name="tradingPassWord"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="tradingPassWord"
                      aria-describedby="tradingPassWord"
                      fullWidth
                      className="min-w-64 md:w-52 xl:w-96 mb-8 px-4"
                      {...field}
                      
                    />
                  )}
                />
              </FormControl>
          <Button color="success" type="submit">
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
