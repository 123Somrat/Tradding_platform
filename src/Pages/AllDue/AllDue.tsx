import Box from "@mui/material/Box";
import dueApi from "../../Redux/api/dueApi";
import {
  Chip,
  Pagination,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

export default function AllDue() {
  const useGetDuesQuerys = dueApi.endpoints.getDues.useQuery;
  const { data } = useGetDuesQuerys({});
  const totalPage = data?.meta?.totalPage;

  const rows = data?.data?.map(
    ({ buyerName, sellerName, buyingPrice, buyingDate, expiredDate }) => ({
      buyerName,
      sellerName,
      buyingPrice,
      buyingDate,
      expiredDate,
    })
  );

  return (
    <Box>
      <Typography className="text-green-900 text-center">All Due</Typography>
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>BuyerName</StyledTableCell>
              <StyledTableCell align="center">SellerName</StyledTableCell>
              <StyledTableCell align="center">
                BuyingPrice&nbsp;(tk)
              </StyledTableCell>
              <StyledTableCell align="center">BuyingDate</StyledTableCell>
              <StyledTableCell align="center">
                ExpiredDate&nbsp;(g)
              </StyledTableCell>
              <StyledTableCell align="center">ExpiredIn</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <StyledTableRow key={row.buyerName}>
                <StyledTableCell component="th" scope="row">
                  {row.buyerName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.sellerName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {(row.buyingPrice as number) / 100000} lakhs
                </StyledTableCell>
                <StyledTableCell align="center">
                  {dayjs(row.buyingDate).format("MMMM D, YYYY")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {dayjs(row.expiredDate).format("MMMM D, YYYY")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {Math.round(
                    dayjs(row.expiredDate).diff(dayjs(), "day", true)
                  )}{" "}
                  Days
                </StyledTableCell>
                <StyledTableCell align="center">
                  {
                    <Chip
                      label={
                        Math.round(
                          dayjs(row.expiredDate).diff(dayjs(), "day", true)
                        ) <= 1
                          ? "Expired soon"
                          : "Have time"
                      }
                      size="small"
                      color={
                        Math.round(
                          dayjs(row.expiredDate).diff(dayjs(), "day", true)
                        ) <= 1
                          ? "warning"
                          : "success"
                      }
                    />
                  }
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination count={totalPage} />
    </Box>
  );
}
