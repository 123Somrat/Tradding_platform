import { CircularProgress } from "@mui/material";

const Loading = ():JSX.Element => {
  

  return (
    <div className="flex justify-center items-center">
      <CircularProgress color="inherit" />
    </div>
  );

};

export default Loading