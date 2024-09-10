import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import sellRecordApi from "../Redux/api/sellRecordApi";
import { StyledTableCell } from "../Utils/TableCellAndRowStyle";
import showInfoAlert from "../Utils/showInfoAlert";
import Loading from "../Utils/Loading";

export default function SellRecords() {
  const useGetAllSellRecordsQuery =
    sellRecordApi.endpoints.getAllSellRecords.useQuery;
  const { data, isError, isFetching } = useGetAllSellRecordsQuery({});

  const row =
    data?.data?.map(({ buyerName, sellerName,buyingPrice, sellingPrice }) => {
      return {
        buyerName: buyerName,
        sellerName: sellerName,
        buyingPrice: buyingPrice,
        sellingPrice: sellingPrice,
        profit: ((Number(sellingPrice) - Number(buyingPrice))/100000).toLocaleString(),
      };
    }) || [];

  // Error
  if (isError) {
    showInfoAlert({
      icon: "error",
      title: "SomeThing wrong when data fething",
    });
  }

  // LOading
  if (isFetching) {
    return <Loading />;
  }

  return (
    <div>
      <Typography variant="h6" align="center" className="text-green-900">
        Sell Records
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">BuyerName</StyledTableCell>
              <StyledTableCell align="left">SellerName</StyledTableCell>
              <StyledTableCell align="left">BuyingPrice</StyledTableCell>
              <StyledTableCell align="left">SellingPrice</StyledTableCell>
              <StyledTableCell align="left">Profit</StyledTableCell>
            </TableRow>
          </TableHead>
          {row.length === 0 ? (
            "No sell Records"
          ) : (
            <TableBody>
              {row.map(
                (
                  { buyerName, sellerName, buyingPrice, sellingPrice, profit },
                  index
                ) => (
                  <TableRow key={index}>
                    <StyledTableCell>{buyerName}</StyledTableCell>
                    <StyledTableCell>{sellerName}</StyledTableCell>
                    <StyledTableCell>{buyingPrice}</StyledTableCell>
                    <StyledTableCell>{sellingPrice}</StyledTableCell>
                    <StyledTableCell>{profit} lakhs</StyledTableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </div>
  );
}
