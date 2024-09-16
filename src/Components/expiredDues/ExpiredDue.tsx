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
import expiredDueApi from "../../Redux/api/expiredDueApi";
import { TDues } from "../../types/types";
import { StyledTableCell } from "../../Utils/TableCellAndRowStyle";
import dayjs from "dayjs";
import { useState } from "react";

import SellModal from "./SellModal";
import Swal from "sweetalert2";
import UpdateProductModal from "./UpdateProductModal";

export default function ExpiredDue() {
  const [showsellDueModal, setShowSellDueModal] = useState(false);
  const [showUpdateDueModal, setShowUpdateDueModal] = useState(false);
  const [selectedSellProduct, setSelectedSellProduct] = useState("");
  const [selecteUpdateProduct, setSelectedUpdateProduct] = useState("");
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

  // Modal open and close
  const showSellModal = (dueId: string) => {
    // showing a alert user want to sell or not
    Swal.fire({
      title: "Are you sure?",
      text: "You want to sell this due!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sell it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setSelectedSellProduct(dueId);
        setShowSellDueModal(true);
      }
    });
  };

  //

  const showUpdateDuesModal = (dueId: string) => {
    setSelectedUpdateProduct(dueId);
    setShowUpdateDueModal(true);
  };

  return (
    <div>
      <Typography align="center" variant="h6" className="text-red-700">
        Expired Due
      </Typography>
      <Divider></Divider>

      {showsellDueModal && (
        <SellModal
          modalShow={showsellDueModal}
          setterFunction={setShowSellDueModal}
          selectedProductId={selectedSellProduct}
        />
      )}

      {showUpdateDueModal && (
        <UpdateProductModal
          modalShow={showUpdateDueModal}
          selectedProductId={selecteUpdateProduct}
          setterFunction={setShowUpdateDueModal}
        />
      )}
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
                <TableRow key={due._id}>
                  <StyledTableCell align="left">
                    {due.buyerName}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {due.sellerName}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {(due.buyingPrice as number) / 100000} lakhs
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {dayjs(due.expiredDate).format("MMMM D, YYYY")}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {" "}
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ mr: 2 }}
                      onClick={() => showSellModal(due._id as string)}
                    >
                      Sell
                    </Button>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => showUpdateDuesModal(due._id as string)}
                    >
                      Update
                    </Button>
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
