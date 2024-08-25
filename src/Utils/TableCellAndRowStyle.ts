import { styled, TableCell, tableCellClasses, TableRow } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  [`&.${tableCellClasses.head}`]: {
    fontSize: 14,
    position: "relative", // Add this to position the arrow icon relative to the cell
    cursor: "pointer",
    "&:hover .arrow": {
      opacity: 1, // Show the arrow icon on hover
    },
  },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

export { StyledTableCell , StyledTableRow}