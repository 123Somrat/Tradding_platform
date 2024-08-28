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
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../Utils/TableCellAndRowStyle";
import { DownwardArrowIcon, UpwardArrowIcon } from "../../Utils/Icons";

import Status from "../../Utils/Status";
import DayDiffernce from "../../Utils/DayDiffernce";
import { TDues } from "../../types/types";
import showInfoAlert from "../../Utils/showInfoAlert";
import Loading from "../../Utils/Loading";

export default function AllDue() {
  const useGetDuesQuerys = dueApi.endpoints.getDues.useQuery;
  const [currentPage, setCurrentPage] = useState({ page: 1 });
  const [sortBy, setSortBy] = useState("expiredDate");
  const [sortType, setSortType] = useState("asc");
  const navigate = useNavigate();

  const queryParams = {
    page: currentPage.page,
    limit: 5,
    sortBy,
    sortType,
  };

  // Fethcing all dues
  const { data, isFetching, isError } = useGetDuesQuerys(queryParams);

  const totalPage = data?.meta?.totalPage;

  // Table rows
  const rows: TDues[] =
    data?.data?.map(
      ({
        _id,
        buyerName,
        sellerName,
        buyingPrice,
        buyingDate,
        expiredDate,
      }) => ({
        _id,
        buyerName,
        sellerName,
        buyingPrice,
        buyingDate,
        expiredDate,
        expiredIn: DayDiffernce(expiredDate as Dayjs),
        status: Status(expiredDate as Dayjs),
      })
    ) || [];

  // showing error
  if (isError) {
    showInfoAlert({
      icon: "error",
      title: "An error occurred while fetching data",
    });
  }

  // Navigate user to see dues details
  const handleNavigate = useCallback(
    (id: string) => {
      console.log("navigate called");
      navigate(`/Dashboard/dues/${id}`);
    },
    [navigate]
  );

  // handleSort
  const handleSort = (sortField: string) => {
    setSortBy(sortField);
    // setting up sortType
    setSortType((prevSortType) => (prevSortType === "asc" ? "dsc" : "asc"));
  };

  return (
    <Box>
      {/* Showing a spinner if loading status is oke  */}
      {isFetching && <Loading />}
      <Typography
        variant="h4"
        className="text-green-900 text-center"
        gutterBottom
      >
        All Dues
      </Typography>
      {rows.length === 0 ? (
        <Typography variant="h5" color='succes' align="center" className="flex justify-center items-center text-green-900 h-96">No dues available</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ mb: 2 }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>BuyerName</StyledTableCell>
                <StyledTableCell align="center">SellerName</StyledTableCell>
                <StyledTableCell
                  align="center"
                  onClick={() => handleSort("buyingPrice")}
                >
                  {sortType === "asc" ? (
                    <UpwardArrowIcon
                      className="arrow"
                      fontSize="small"
                      color="disabled"
                    />
                  ) : (
                    <DownwardArrowIcon
                      className="arrow"
                      fontSize="small"
                      color="disabled"
                    />
                  )}
                  BuyingPrice
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  onClick={() => handleSort("buyingDate")}
                >
                  {sortType === "asc" ? (
                    <UpwardArrowIcon
                      className="arrow"
                      fontSize="small"
                      color="disabled"
                    />
                  ) : (
                    <DownwardArrowIcon
                      className="arrow"
                      fontSize="small"
                      color="disabled"
                    />
                  )}
                  BuyingDate
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  onClick={() => handleSort("expiredDate")}
                >
                  {sortType === "asc" ? (
                    <UpwardArrowIcon
                      className="arrow"
                      fontSize="small"
                      color="disabled"
                    />
                  ) : (
                    <DownwardArrowIcon
                      className="arrow"
                      fontSize="small"
                      color="disabled"
                    />
                  )}
                  ExpiredDate
                </StyledTableCell>
                <StyledTableCell align="center">ExpiredIn</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row) => (
                <StyledTableRow
                  key={row._id}
                  onClick={() => handleNavigate(row._id as string)}
                >
                  <StyledTableCell
                    component="th"
                    scope="row"
                    sx={{ p: "25px" }}
                  >
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
                          row.status === "Expired soon" ? "warning" : "success"
                        }
                      />
                    }
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <span className="text-red-600 inline-block mt-4">*</span>{" "}
          <span className="text-sm inline-block ">
            {" "}
            user can sorting data based on{" "}
            <span className="text-green-800">
              buyingPrice , buyingDate , expiredDate
            </span>{" "}
            {"  "} field
          </span>
          <Pagination
            count={totalPage}
            sx={{ my: 2 }}
            onChange={(_e, page) => setCurrentPage({ page: page })}
          />
        </TableContainer>
      )}
    </Box>
  );
}
