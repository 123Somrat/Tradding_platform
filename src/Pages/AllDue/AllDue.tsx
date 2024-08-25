import Box from "@mui/material/Box";
import dueApi from "../../Redux/api/dueApi";
import {
  Chip,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledTableCell, StyledTableRow } from "../../Utils/TableCellAndRowStyle";
import { DownwardArrowIcon, UpwardArrowIcon } from "../../Utils/Icons";

import Status from "../../Utils/Status";
import DayDiffernce from "../../Utils/DayDiffernce";


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
  const sortByTableData = 'dsc'

  // Table rows
  const rows = data?.data?.map(
    ({_id, buyerName, sellerName, buyingPrice, buyingDate, expiredDate }) => ({
      _id,
      buyerName,
      sellerName,
      buyingPrice,
      buyingDate,
      expiredDate,
      expiredIn: DayDiffernce(expiredDate as Dayjs),
      status: Status(expiredDate as Dayjs)
    })    
  );



// Navigate user to see dues details
  const handleNavigate = (id: string) => {
    navigate(`/api/va/dues/${id}`);
  };


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
              <UpwardArrowIcon
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
               {sortByTableData==='dsc' ?<UpwardArrowIcon
                  className="arrow"
                  fontSize="small"
                  color="disabled"
                /> :<DownwardArrowIcon className="arrow"
                fontSize="small"
                color="disabled"/>} 
                BuyingDate
              </StyledTableCell>
              <StyledTableCell
                align="center"
                onClick={() => setSortBy("expiredDate")}
              >
              <UpwardArrowIcon
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
              <StyledTableRow onClick={() => handleNavigate(row._id as string)}>
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
      <span className="text-red-600">*</span>   <span> user can sorting data in <span className="text-green-800">buyingPrice</span> , <span className="text-green-800">buyingDate</span> , <span className="text-green-800">expiredDate</span> field </span>
      <Pagination
        count={totalPage}
        sx={{mt:2}}
        onChange={(_e, page) => setCurrentPage({ page: page })}
      />
    </Box>
  );
}
