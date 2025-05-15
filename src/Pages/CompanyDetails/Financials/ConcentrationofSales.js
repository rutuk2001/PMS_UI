import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  Grid,
  Button,
  Autocomplete,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import DeleteConfirmDialog from "./../../../Components/DeleteConfirmDialog";
import { fetchFinancialYear } from "../../../store/CommonApi/CommonApiSlice";

import { ToastContainer, toast } from "react-toastify";
import {
  addCocentration_of_sales,
  deleteCocentration_of_sales,
  viewCocentration_of_sales,
  clearErrorMessage,
  clearSuccessMessage,
  editCocentration_of_sales,
} from "../../../store/CompanyDetails/Financials/ConcentrationofSalesSlice";

const addDetails = [
  { id: "Financial_Year", label: "Financial Year", width: "7%" },
  {
    id: "Sales_To_Dealers_Divided_BY_Distributors_As_Percent_Of_Total_Sales",
    label: " SALES TO DEALERS / DISTRIBUTORS AS % OF TOTAL SALES",
    width: "20%",
  },
  {
    id: "Number_Of_Dealers_Divided_BY_Distributors_To_Whom_Sales_Are_Made",
    label: " NUMBER OF DEALERS / DISTRIBUTORS TO WHOM SALES ARE MADE",
    width: "38%",
  },
  {
    id: "Sales_To_Top_Ten_Dealers_Divided_BY_Distributors_As_Percent_Of_Total_Sales_To_Dealers_Divided_BY_Distributors",
    label:
      "SALES TO TOP 10 DEALERS / DISTRIBUTORS AS % OF TOTAL SALES TO DEALERS / DISTRIBUTORS",
    width: "30%",
  },
  { id: "actions", label: "ACTION", align: "right", width: "90px" },
];

const columnsDiracce = [
  { id: "Financial_Year", label: "Financial Year", width: "7%" },
  {
    id: "Sales_To_Dealers_Divided_BY_Distributors_As_Percent_Of_Total_Sales",
    label: " SALES TO DEALERS / DISTRIBUTORS AS % OF TOTAL SALES",
    width: "20%",
  },
  {
    id: "Number_Of_Dealers_Divided_BY_Distributors_To_Whom_Sales_Are_Made",
    label: " NUMBER OF DEALERS / DISTRIBUTORS TO WHOM SALES ARE MADE",
    width: "38%",
  },
  {
    id: "Sales_To_Top_Ten_Dealers_Divided_BY_Distributors_As_Percent_Of_Total_Sales_To_Dealers_Divided_BY_Distributors",
    label:
      "SALES TO TOP 10 DEALERS / DISTRIBUTORS AS % OF TOTAL SALES TO DEALERS / DISTRIBUTORS",
    width: "30%",
  },
  { id: "actions", label: "ACTION", align: "right", width: "90px" },
];

function ConcentrationofSales() {
  const dispatch = useDispatch();
  const { viewReport, error, success, total_page } = useSelector(
    (state) => state.Cocentration_of_salesDetailSlice
  );

  const { finalYear } = useSelector((state) => state.CommonApiDetailSlice);

  useEffect(() => {
    dispatch(fetchFinancialYear());
  }, [dispatch]);

  const [validationError, setValidationError] = useState({
    Financial_Year: "",
    Sales_To_Dealers_Divided_BY_Distributors_As_Percent_Of_Total_Sales: "",
    Number_Of_Dealers_Divided_BY_Distributors_To_Whom_Sales_Are_Made: "",
    Sales_To_Top_Ten_Dealers_Divided_BY_Distributors_As_Percent_Of_Total_Sales_To_Dealers_Divided_BY_Distributors:
      "",
  });

  const [financialYear, setFinancialYear] = useState(null);

  const handleFinancialYearChange = (event, value) => {
    setFinancialYear(value);
    setValidationError({
      ...validationError,
      Financial_Year: "",
    });
  };

  const [formData, setFormData] = useState({
    Sales_To_Dealers_Divided_BY_Distributors_As_Percent_Of_Total_Sales: "",
    Number_Of_Dealers_Divided_BY_Distributors_To_Whom_Sales_Are_Made: "",
    Sales_To_Top_Ten_Dealers_Divided_BY_Distributors_As_Percent_Of_Total_Sales_To_Dealers_Divided_BY_Distributors:
      "",
  });

  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [addDiracceDialogOpen, setAddDiracceDialogOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidthMd] = React.useState("md");

  const [pageDiracce, setPageDiracce] = React.useState(0);
  const [rowsPerPageDiracce, setRowsPerPageDiracce] = React.useState(5);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [page, setPage] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 1,
  });
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const DiracceChangePage = (event, newPage) => {
    setPage(newPage);
    const newPaginationModel = { ...paginationModel, page: newPage + 1 };
    setPaginationModel(newPaginationModel);
    dispatch(
      viewCocentration_of_sales({
        page: newPage + 1,
        page_size: rowsPerPage,
      })
    );
  };

  const DiracceChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(+event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPageDiracce(0);
    const newPaginationModel = {
      ...paginationModel,
      page: 1,
      pageSize: newRowsPerPage,
    };
    setPaginationModel(newPaginationModel);

    dispatch(
      viewCocentration_of_sales({
        page: 1,
        page_size: rowsPerPage,
      })
    );
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    let newValidationError = { ...validationError };
    if (
      id ===
        "Sales_To_Top_Ten_Dealers_Divided_BY_Distributors_As_Percent_Of_Total_Sales_To_Dealers_Divided_BY_Distributors" ||
      id ===
        "Number_Of_Dealers_Divided_BY_Distributors_To_Whom_Sales_Are_Made" ||
      id ===
        "Sales_To_Dealers_Divided_BY_Distributors_As_Percent_Of_Total_Sales"
    ) {
      const isNumeric = !isNaN(value) && value.trim() !== "";
      if (!isNumeric) {
        newValidationError[id] = "Only numeric values are allowed";
      } else {
        newValidationError[id] = "";
      }
    } else {
      newValidationError[id] = "";
    }

    setValidationError(newValidationError);
    setFormData({ ...formData, [id]: value });
  };

  const addDiracceDialog = () => {
    setAddDiracceDialogOpen(true);
  };

  const addDiracceDialogClose = () => {
    setAddDiracceDialogOpen(false);
    setCurrentEditId(null);
    setFormData({
      Sales_To_Dealers_Divided_BY_Distributors_As_Percent_Of_Total_Sales: "",
      Number_Of_Dealers_Divided_BY_Distributors_To_Whom_Sales_Are_Made: "",
      Sales_To_Top_Ten_Dealers_Divided_BY_Distributors_As_Percent_Of_Total_Sales_To_Dealers_Divided_BY_Distributors:
        "",
    });
    setValidationError({
      Financial_Year: "",
      Sales_To_Dealers_Divided_BY_Distributors_As_Percent_Of_Total_Sales: "",
      Number_Of_Dealers_Divided_BY_Distributors_To_Whom_Sales_Are_Made: "",
      Sales_To_Top_Ten_Dealers_Divided_BY_Distributors_As_Percent_Of_Total_Sales_To_Dealers_Divided_BY_Distributors:
        "",
    });
    setFinancialYear(null);
  };

  const resetData = () => {
    if (currentEditId) {
      setFinancialYear(financialYear);
      setFormData({
        Sales_To_Dealers_Divided_BY_Distributors_As_Percent_Of_Total_Sales: "",
        Number_Of_Dealers_Divided_BY_Distributors_To_Whom_Sales_Are_Made: "",
        Sales_To_Top_Ten_Dealers_Divided_BY_Distributors_As_Percent_Of_Total_Sales_To_Dealers_Divided_BY_Distributors:
          "",
      });
    } else {
      setFinancialYear(null);
      setFormData({
        Sales_To_Dealers_Divided_BY_Distributors_As_Percent_Of_Total_Sales: "",
        Number_Of_Dealers_Divided_BY_Distributors_To_Whom_Sales_Are_Made: "",
        Sales_To_Top_Ten_Dealers_Divided_BY_Distributors_As_Percent_Of_Total_Sales_To_Dealers_Divided_BY_Distributors:
          "",
      });
    }
    setValidationError({
      Financial_Year: "",
      Sales_To_Dealers_Divided_BY_Distributors_As_Percent_Of_Total_Sales: "",
      Number_Of_Dealers_Divided_BY_Distributors_To_Whom_Sales_Are_Made: "",
      Sales_To_Top_Ten_Dealers_Divided_BY_Distributors_As_Percent_Of_Total_Sales_To_Dealers_Divided_BY_Distributors:
        "",
    });
  };

  const handleSaveChanges = () => {
    let newErrors = {
      Financial_Year: "",
      Sales_To_Dealers_Divided_BY_Distributors_As_Percent_Of_Total_Sales: "",
      Number_Of_Dealers_Divided_BY_Distributors_To_Whom_Sales_Are_Made: "",
      Sales_To_Top_Ten_Dealers_Divided_BY_Distributors_As_Percent_Of_Total_Sales_To_Dealers_Divided_BY_Distributors:
        "",
    };

    let valid = true;
    if (!financialYear) {
      newErrors.Financial_Year = "Financial Year is required";
      valid = false;
    }

    if (
      !formData.Sales_To_Dealers_Divided_BY_Distributors_As_Percent_Of_Total_Sales
    ) {
      newErrors.Sales_To_Dealers_Divided_BY_Distributors_As_Percent_Of_Total_Sales =
        "Name of Authority is required";
      valid = false;
    }

    if (
      !formData.Number_Of_Dealers_Divided_BY_Distributors_To_Whom_Sales_Are_Made
    ) {
      newErrors.Number_Of_Dealers_Divided_BY_Distributors_To_Whom_Sales_Are_Made =
        "Brief of the Case is required";
      valid = false;
    }

    if (
      !formData.Sales_To_Top_Ten_Dealers_Divided_BY_Distributors_As_Percent_Of_Total_Sales_To_Dealers_Divided_BY_Distributors
    ) {
      newErrors.Sales_To_Top_Ten_Dealers_Divided_BY_Distributors_As_Percent_Of_Total_Sales_To_Dealers_Divided_BY_Distributors =
        "Corrective Action  is required";
      valid = false;
    }

    setValidationError(newErrors);

    if (!valid) {
      return;
    }

    const data = {
      Financial_Year: financialYear,
      Sales_To_Dealers_Divided_BY_Distributors_As_Percent_Of_Total_Sales:
        parseInt(
          formData.Sales_To_Dealers_Divided_BY_Distributors_As_Percent_Of_Total_Sales
        ),
      Number_Of_Dealers_Divided_BY_Distributors_To_Whom_Sales_Are_Made:
        parseInt(
          formData.Number_Of_Dealers_Divided_BY_Distributors_To_Whom_Sales_Are_Made
        ),
      Sales_To_Top_Ten_Dealers_Divided_BY_Distributors_As_Percent_Of_Total_Sales_To_Dealers_Divided_BY_Distributors:
        parseInt(
          formData.Sales_To_Top_Ten_Dealers_Divided_BY_Distributors_As_Percent_Of_Total_Sales_To_Dealers_Divided_BY_Distributors
        ),
    };

    const editDataCheck = {
      id: currentEditId,
      ...data,
    };
    if (currentEditId) {
      dispatch(
        editCocentration_of_sales({ id: currentEditId, data: editDataCheck })
      ).then(() => {
        dispatch(
          viewCocentration_of_sales({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );
        resetData();
      });
    } else {
      dispatch(addCocentration_of_sales(data)).then(() => {
        resetData();
        dispatch(
          viewCocentration_of_sales({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );
      });
    }
    addDiracceDialogClose();
  };

  const handleDeleteConfirmDialogOpen = (row) => {
    setCurrentEditId(row.id);
    setDeleteConfirmDialogOpen(true);
  };

  const handleDeleteConfirmDialogClose = () => {
    setDeleteConfirmDialogOpen(false);
    setCurrentEditId(null);
  };

  const handleDeleteItem = () => {
    dispatch(deleteCocentration_of_sales(currentEditId)).then(() => {
      dispatch(
        viewCocentration_of_sales({
          page: 1,
          page_size: 5,
        })
      );
    });
  };

  const handleEdit = (row) => {
    setCurrentEditId(row.id);
    setFinancialYear(row.Financial_Year);
    setFormData({
      Sales_To_Dealers_Divided_BY_Distributors_As_Percent_Of_Total_Sales:
        row.Sales_To_Dealers_Divided_BY_Distributors_As_Percent_Of_Total_Sales,
      Number_Of_Dealers_Divided_BY_Distributors_To_Whom_Sales_Are_Made:
        row.Number_Of_Dealers_Divided_BY_Distributors_To_Whom_Sales_Are_Made,
      Sales_To_Top_Ten_Dealers_Divided_BY_Distributors_As_Percent_Of_Total_Sales_To_Dealers_Divided_BY_Distributors:
        row.Sales_To_Top_Ten_Dealers_Divided_BY_Distributors_As_Percent_Of_Total_Sales_To_Dealers_Divided_BY_Distributors,
    });
    addDiracceDialog();
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(clearSuccessMessage());
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrorMessage());
    }
  }, [error, dispatch]);

  return (
    <>
      <ToastContainer />
      <Card className="card">
        <CardHeader
          title="Concentration of Sales"
          className="MuiCardHeader-action-smdown-fullwidth"
          action={
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="button"
              onClick={addDiracceDialog}
              sx={{ width: { xs: "100%", sm: 170 }, maxWidth: "100%" }}
            >
              ADD
            </Button>
          }
        />
        <TableContainer>
          <Table stickyHeader aria-label="Concentration of Sales">
            <TableHead>
              <TableRow key="headRowDiracce">
                {columnsDiracce.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    width={column.width ? column.width : ""}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {viewReport?.data?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columnsDiracce.length} align="center">
                    <Typography variant="body1">No data found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                viewReport?.data
                  ?.slice(
                    pageDiracce * rowsPerPageDiracce,
                    pageDiracce * rowsPerPageDiracce + rowsPerPageDiracce
                  )
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {columnsDiracce.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === "actions" ? (
                                <>
                                  <Typography
                                    component="div"
                                    className="MuiTableActions"
                                  >
                                    <Grid
                                      container
                                      spacing={1}
                                      wrap="nowrap"
                                      justifyContent="flex-end"
                                    >
                                      <Grid item>
                                        <IconButton
                                          aria-label="edit"
                                          size="small"
                                          onClick={() => handleEdit(row)}
                                        >
                                          <span className="material-symbols-outlined icon-20">
                                            edit
                                          </span>
                                        </IconButton>
                                      </Grid>
                                      <Grid item>
                                        <IconButton
                                          aria-label="delete"
                                          size="small"
                                          onClick={() =>
                                            handleDeleteConfirmDialogOpen(row)
                                          }
                                        >
                                          <span className="material-symbols-outlined icon-20">
                                            delete
                                          </span>
                                        </IconButton>
                                      </Grid>
                                    </Grid>
                                  </Typography>
                                </>
                              ) : column.format && typeof value === "number" ? (
                                column.format()
                              ) : (
                                <>
                                  {value}{" "}
                                  {column.id !== "Financial_Year" && "%"}
                                </>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={total_page}
          rowsPerPage={rowsPerPageDiracce}
          page={page}
          onPageChange={DiracceChangePage}
          onRowsPerPageChange={DiracceChangeRowsPerPage}
        />
      </Card>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidthMd}
        open={addDiracceDialogOpen}
        onClose={addDiracceDialogClose}
      >
        <DialogTitle>
          Details Of Any Issues Related To Anti-Competitive Conduct By The
          Entity
        </DialogTitle>

        <DialogTitle>
          {currentEditId
            ? "Edit Concentration of Sales"
            : "Add Concentration of Sales"}

          <IconButton
            className="MuiIconButton-close"
            aria-label="close"
            onClick={addDiracceDialogClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <IconButton
          className="MuiIconButton-close"
          aria-label="close"
          onClick={addDiracceDialogClose}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Grid container direction="row" spacing={{ xs: 3, sm: 6 }}>
            {/* First row: Financial Year and another field side by side */}
            <Grid item xs={12} sm={6}>
              <Autocomplete
                size="small"
                fullWidth
                id="financialYearList"
                options={finalYear}
                value={financialYear}
                disabled={!!currentEditId}
                onChange={handleFinancialYearChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Financial Year"
                    error={!!validationError.Financial_Year}
                    helperText={validationError.Financial_Year}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              {addDetails
                .filter(
                  (column) =>
                    column.id !== "actions" && column.id !== "Financial_Year"
                )
                .map((column) => (
                  <Grid item xs={12} key={column.id} mb={4}>
                    <TextField
                      fullWidth
                      size="small"
                      id={column.id}
                      label={column.label}
                      value={formData[column.id]}
                      onChange={handleInputChange}
                      error={!!validationError[column.id]}
                      helperText={validationError[column.id]}
                    />
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container direction="row" spacing={{ xs: 3, sm: 6 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSaveChanges}
              >
                SAVE
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={() => {
                  resetData();
                }}
              >
                CANCEL
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>

      <DeleteConfirmDialog
        open={deleteConfirmDialogOpen}
        onClose={handleDeleteConfirmDialogClose}
        onDelete={handleDeleteItem}
      />
    </>
  );
}

export default ConcentrationofSales;
