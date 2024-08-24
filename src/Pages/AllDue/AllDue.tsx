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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

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

export default function AllDue() {
  const useGetDuesQuerys = dueApi.endpoints.getDues.useQuery;
  const [currentPage, setCurrentPage] = useState({ page: 1 });
  const [sortBy, setSortBy] = useState("expiredDate");
  const queryParams = {
    page: currentPage.page,
    limit: 5,
    sortBy,
    sortType: "dsc",
  };
  // Fethcing all dues
  const { data } = useGetDuesQuerys(queryParams);
  const navigate = useNavigate();
  const totalPage = data?.meta?.totalPage;

  // Table rows
  const rows = data?.data?.map(
    ({ buyerName, sellerName, buyingPrice, buyingDate, expiredDate }) => ({
      buyerName,
      sellerName,
      buyingPrice,
      buyingDate,
      expiredDate,
      expiredIn: Math.round(dayjs(expiredDate).diff(dayjs(), "day", true)),
      status:
        Math.round(dayjs(expiredDate).diff(dayjs(), "day", true)) <= 1
          ? "Expired soon"
          : "Have time",
    })
  );

  const handleNavigate = (id: string) => {
    navigate(`/api/va/dues/${id}`);
  };
  // showing arrow icon when hover
  const ArrowIcon = styled(ArrowUpwardIcon)(({ theme }) => ({
    opacity: 0,
    transition: "opacity 0.3s",
  }));
  return (
    <Box>
      <Typography
        variant="h4"
        className="text-green-900 text-center"
        gutterBottom
      >
        All Dues
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>BuyerName</StyledTableCell>
              <StyledTableCell align="center">SellerName</StyledTableCell>
              <StyledTableCell
                align="center"
                onClick={() => setSortBy("buyingPrice")}
              >
                <ArrowIcon
                  className="arrow"
                  fontSize="small"
                  color="disabled"
                />{" "}
                BuyingPrice
              </StyledTableCell>
              <StyledTableCell
                align="center"
                onClick={() => setSortBy("buyingDate")}
              >
                <ArrowIcon
                  className="arrow"
                  fontSize="small"
                  color="disabled"
                />
                BuyingDate
              </StyledTableCell>
              <StyledTableCell
                align="center"
                onClick={() => setSortBy("expiredDate")}
              >
                <ArrowIcon
                  className="arrow"
                  fontSize="small"
                  color="disabled"
                />{" "}
                ExpiredDate
              </StyledTableCell>
              <StyledTableCell align="center">ExpiredIn</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <StyledTableRow onClick={() => handleNavigate(row.buyerName)}>
                <StyledTableCell component="th" scope="row" sx={{ p: "25px" }}>
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
                  {row.expiredIn} Days
                </StyledTableCell>
                <StyledTableCell align="center">
                  {
                    <Chip
                      label={row.status}
                      size="small"
                      color={
                        row.status === "expired soon" ? "warning" : "success"
                      }
                    />
                  }
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={totalPage}
        onChange={(_e, page) => setCurrentPage({ page: page })}
      />
    </Box>
  );
}
