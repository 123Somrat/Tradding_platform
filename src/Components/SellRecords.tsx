import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
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
import dayjs from "dayjs";
import { useState } from "react";

export default function SellRecords() {
  // imported Redux query hooks for fetching data
  const useGetAllSellRecordsQuery =
    sellRecordApi.endpoints.getAllSellRecords.useQuery;
  const [currentPage, setSelectedPage] = useState({ page: 1 });
  const months = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentmonths = Number(dayjs().month());
  const currentYear = dayjs().year();

  // State for manageing selected month  When user want to seach data by Month
  const [selectedMonth, setSelectedMonth] = useState<string>(
    `${currentYear}-${months[currentmonths + 1]}`
  );

  // Query params for searching by month
  const queryParams = {
    page: currentPage.page,
    searchBy: selectedMonth,
  };

  // Fetching data
  const { data, isError, isFetching } = useGetAllSellRecordsQuery(queryParams);
  const totalIteams = data?.meta?.totalPage;
  console.log(data);
  // CReate array for display month in option
  const month = new Array(currentmonths + 1).fill(0);

  // Genearted row data for table
  const row =
    data?.data?.map(({ buyerName, sellerName, buyingPrice, sellingPrice }) => {
      return {
        buyerName: buyerName,
        sellerName: sellerName,
        buyingPrice: buyingPrice,
        sellingPrice: sellingPrice,
        profit: (
          (Number(sellingPrice) - Number(buyingPrice)) /
          100000
        ).toLocaleString(),
      };
    }) || [];

  // Error handle
  if (isError) {
    showInfoAlert({
      icon: "error",
      title: "SomeThing wrong when data fething",
    });
  }

  // selected={index+1===currentmonths+1} defaultValue={months[currentmonths + 1]}

  // LOading status hanndle
  if (isFetching) {
    return <Loading />;
  }

  console.log("selectedPage", queryParams);

  return (
    <Box>
      <div className="flex justify-around items-center ">
        <div></div>
        <Typography variant="h6" align="center" className="text-green-900">
          Sell Records
        </Typography>

        <Box
          width={200}
          sx={{
            "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root": {
              color: "green",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "green", // Custom border color
              },
              "&:hover fieldset": {
                borderColor: "green", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "green", // Border color when focused
              },
            },
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="selecte by month" color="success">
              Search by month
            </InputLabel>
            <Select
              labelId="selecte by month"
              id="selecte by month"
              value={selectedMonth}
              label="Search by month"
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {month.map((_month, index) => (
                <MenuItem
                  key={index}
                  id="sellRecords"
                  value={`${currentYear}-${months[index + 1]}`}
                  sx={{
                    backgroundColor: "white", // Background color for each MenuItem
                    "&:hover": {
                      backgroundColor: "#a2a6ab", // Hover color for each MenuItem
                    },
                    color: "green",
                  }}
                >
                  {currentYear}-{months[index + 1]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
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
       { data?.data?.length as number > 0 && <><Pagination
          count={totalIteams}
          sx={{ m: 2 ,"& .MuiPagination-root Mui-selected":{color:"red"}}}
          page={currentPage.page}
          onChange={(_e, page) => setSelectedPage({ page: page })}
     
        />
        <Divider></Divider></>} 
      </TableContainer>
    </Box>
  );
}
