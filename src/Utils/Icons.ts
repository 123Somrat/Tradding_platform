import styled from "@emotion/styled";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


const UpwardArrowIcon = styled(ArrowUpwardIcon)(() => ({
    opacity: 0,
    transition: 'opacity 0.3s',
  }));

  const DownwardArrowIcon = styled(ArrowDownwardIcon)(() => ({
    opacity: 0,
    transition: 'opacity 0.3s',
  }));



  export {UpwardArrowIcon , DownwardArrowIcon}