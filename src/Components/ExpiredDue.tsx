import {
  Button,
  Divider,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import expiredDueApi from "../Redux/api/expiredDueApi";
import { TDues } from "../types/types";
import { StyledTableCell } from "../Utils/TableCellAndRowStyle";
import dayjs from "dayjs";

export default function ExpiredDue() {
  const useGetAllExpiredDuesQuerys =
    expiredDueApi.endpoints.getAllExpiredDues.useQuery;
  // Fetch expired data
  const { data } = useGetAllExpiredDuesQuerys({});

  // Construct Data from showing in row
  const rows: TDues[] = (data?.data ?? []).map(
    ({ _id, buyerName, sellerName, buyingPrice, expiredDate }) => {
      return {
        _id: _id,
        buyerName: buyerName,
        sellerName: sellerName,
        buyingPrice: buyingPrice,
        expiredDate: expiredDate,
      };
    }
  );

  console.log(rows);

  return (
    <div>
      <Typography align="center" variant="h6" className="text-red-700">
        Expired Due
      </Typography>
      <Divider></Divider>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">BuyerName</StyledTableCell>
              <StyledTableCell align="left">SellerName</StyledTableCell>
              <StyledTableCell align="left">BuyingPrice</StyledTableCell>
              <StyledTableCell align="left">ExpiredDate</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          {rows.length === 0 ? (
            <Typography>No expired due</Typography>
          ) : (
            <TableBody>
              {rows.map((due) => (
                <TableRow>
                  <StyledTableCell align="left">{due.buyerName}</StyledTableCell>
                  <StyledTableCell align="left">{due.sellerName}</StyledTableCell>
                  <StyledTableCell align="left">{due.buyingPrice}</StyledTableCell>
                  <StyledTableCell align="left">
                    {dayjs(due.expiredDate).format("YYYY-MM-DD")}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {" "}
                    <Button variant="outlined" color="error" sx={{mr:2}}>Sell</Button>
                    <Button variant="outlined" color="success">Update</Button>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </div>
  );
}
