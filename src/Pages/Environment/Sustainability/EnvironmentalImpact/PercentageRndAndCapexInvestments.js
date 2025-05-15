import React, { useEffect, useState } from "react";
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

import DeleteConfirmDialog from "./../../../../Components/DeleteConfirmDialog";
import { fetchFinancialYear } from "../../../../store/CommonApi/CommonApiSlice";
import {
  addPercentageofRandDCapexInvestmentDetail,
  clearPercentageofRandDCapexInvestmentErrorMessage,
  clearPercentageofRandDCapexInvestmentSuccessMessage,
  deletePercentageofRandDCapexInvestmentDetails,
  editPercentageofRandDCapexInvestmentDetail,
  viewPercentageofRandDCapexInvestmentDetail,
} from "../../../../store/Environment/Sustanibility/Percentage_R&DC/Percentage_R&D_Capex_investmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const addDetails = [
  { id: "Financial_Year", label: "FY" },
  {
    id: "Percentage_of_R_and_D_investments",
    label: "%OF R&D INVESTMENT",
    align: "right",
  },
  { id: "Details_investment", label: "DETAILS", align: "right" },
  { id: "Percent_of_capex", label: "% OF CAPX", align: "right" },
  { id: "Details_capex", label: "DETAILS", align: "right" },
  { id: "actions", label: "ACTION", align: "right" },
];

const tableColumns = [
  { id: "Financial_Year", label: "FY" },
  {
    id: "Percentage_of_R_and_D_investments",
    label: "%OF R&D INVESTMENT",
    align: "center",
  },
  { id: "Details_investment", label: "DETAILS", align: "center" },
  { id: "Percent_of_capex", label: "% OF CAPX", align: "center" },
  { id: "Details_capex", label: "DETAILS", align: "center" },
  { id: "actions", label: "ACTION", align: "center" },
];

function PercentageRndAndCapexInvestments() {
  const dispatch = useDispatch();
  const { viewReport, error, success, total_page } = useSelector(
    (state) => state.PercentageofRandDCapexInvestmentSliceDetails
  );

  const { finalYear } = useSelector((state) => state.CommonApiDetailSlice);

  const [validationError, setValidationError] = useState({
    Percentage_of_R_and_D_investments: "",
    Details_investment: "",
    Percent_of_capex: "",
    Details_capex: "",
  });
  const [financialyear, setFinancialYear] = useState(null);

  useEffect(() => {
    dispatch(fetchFinancialYear());
  }, [dispatch]);

  const handleFinancialYear = (event, value) => {
    setFinancialYear(value);
    setValidationError({
      ...validationError,
      Financial_Year: "",
    });
  };

  const [formData, setFormData] = useState({
    Percentage_of_R_and_D_investments: "",
    Details_investment: "",
    Percent_of_capex: "",
    Details_capex: "",
  });

  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [addPRACIDialogOpen, setAddPRACIDialogOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidthMd] = React.useState("md");

  const [pagePRACI, setPagePRACI] = React.useState(0);
  const [rowsPerPagePRACI, setRowsPerPagePRACI] = React.useState(5);

  const [page, setPage] = useState(0);
  const [currentEditId, setCurrentEditId] = useState(null);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 1,
  });
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const PRACIChangePage = (event, newPage) => {
    setPage(newPage);
    const newPaginationModel = { ...paginationModel, page: newPage + 1 };
    setPaginationModel(newPaginationModel);
    dispatch(
      viewPercentageofRandDCapexInvestmentDetail({
        page: newPage + 1,
        page_size: rowsPerPage,
      })
    );
  };

  const PRACIChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(+event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPagePRACI(0);
    const newPaginationModel = {
      ...paginationModel,
      page: 1,
      pageSize: newRowsPerPage,
    };
    setPaginationModel(newPaginationModel);

    dispatch(
      viewPercentageofRandDCapexInvestmentDetail({
        page: 1,
        page_size: rowsPerPage,
      })
    );
  };

  // const handleInputChange = (event) => {
  //   const { id, value } = event.target;

  //   if (
  //     id === "Percentage_of_R_and_D_investments" ||
  //     id === "Percent_of_capex"
  //   ) {
  //     const parsedValue = parseFloat(value.replace(/[^0-9.]/g, "") || 0);
  //     const nonNegativeValue = Math.abs(parsedValue);
  //     setFormData((prevData) => ({ ...prevData, [id]: nonNegativeValue }));
  //   } else {
  //     setFormData((prevData) => ({ ...prevData, [id]: value }));
  //   }

  //   setValidationError((prevErrors) => ({ ...prevErrors, [id]: "" }));
  // };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
  
    if (id === "Percentage_of_R_and_D_investments" || id === "Percent_of_capex") {
      // Remove all non-numeric and non-decimal characters except for one decimal point
      const parsedValue = value.replace(/[^0-9.]/g, "");
      
      // Prevent more than one decimal point
      const isValidDecimal = (parsedValue.match(/\./g) || []).length <= 1;
  
      if (isValidDecimal) {
        // Update the form data with the valid decimal number
        setFormData((prevData) => ({ ...prevData, [id]: parsedValue }));
      }
    } else {
      // For all other fields, update the form data with the input value
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    }
  
    // Clear validation errors for the current field
    setValidationError((prevErrors) => ({ ...prevErrors, [id]: "" }));
  };
  


  const addPRACIDialog = () => {
    setAddPRACIDialogOpen(true);
  };

  const addPRACIDialogClose = () => {
    setAddPRACIDialogOpen(false);
    setCurrentEditId(null);
    setFormData({
      Percentage_of_R_and_D_investments: "",
      Details_investment: "",
      Percent_of_capex: "",
      Details_capex: "",
    });
    setValidationError({
      Financial_Year: "",
      Percentage_of_R_and_D_investments: "",
      Details_investment: "",
      Percent_of_capex: "",
      Details_capex: "",
    });
    setFinancialYear(null);
  };

  const resetData = () => {
    if (currentEditId) {
      const currentFinancialYear = formData.Financial_Year;
      const currentFacility = formData.Facility;
      setFormData((prevFormData) => ({
        ...prevFormData,
        Financial_Year: currentFinancialYear,
        Facility: currentFacility,
        Percentage_of_R_and_D_investments: "",
        Details_investment: "",
        Percent_of_capex: "",
        Details_capex: "",
      }));
    } else {
      setFinancialYear(null);
    }
    setFormData({
      Percentage_of_R_and_D_investments: "",
      Details_investment: "",
      Percent_of_capex: "",
      Details_capex: "",
    });
    setValidationError({
      Financial_Year: "",
      Percentage_of_R_and_D_investments: "",
      Details_investment: "",
      Percent_of_capex: "",
      Details_capex: "",
    });
  };

  const handleSaveChanges = () => {
    let valid = true;

    const newErrors = {
      Financial_Year: "",
      Percentage_of_R_and_D_investments: "",
      Details_investment: "",
      Percent_of_capex: "",
      Details_capex: "",
    };

    if (!financialyear) {
      newErrors.Financial_Year = "Financial Year is required";
      valid = false;
    }

    if (
      formData.Percentage_of_R_and_D_investments === "" ||
      parseFloat(formData.Percentage_of_R_and_D_investments) < 0
    ) {
      newErrors.Percentage_of_R_and_D_investments =
        "Percentage of R&D investments is required and should be a non-negative number";
      valid = false;
    }

    if (!formData.Details_investment) {
      newErrors.Details_investment = "Details investment is required";
      valid = false;
    }

    if (
      formData.Percent_of_capex === "" ||
      parseFloat(formData.Percent_of_capex) < 0
    ) {
      newErrors.Percent_of_capex =
        "Percent of capex is required and should be a non-negative number";
      valid = false;
    }

    if (!formData.Details_capex) {
      newErrors.Details_capex = "Details capex is required";
      valid = false;
    }

    if (!valid) {
      setValidationError(newErrors);
      return;
    }

    const parseNumber = (value) => (value ? parseFloat(value) : 0);
    const data = {
      Financial_Year: financialyear,
      Percentage_of_R_and_D_investments: parseNumber(
        formData.Percentage_of_R_and_D_investments
      ),
      Details_investment: formData.Details_investment,
      Percent_of_capex: parseNumber(formData.Percent_of_capex),
      Details_capex: formData.Details_capex,
    };

    const editDataCheck = {
      id: currentEditId,
      ...data,
    };

    if (currentEditId) {
      dispatch(
        editPercentageofRandDCapexInvestmentDetail({
          id: currentEditId,
          data: editDataCheck,
        })
      ).then(() => {
        dispatch(
          viewPercentageofRandDCapexInvestmentDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );

        resetData();
      });
    } else {
      dispatch(addPercentageofRandDCapexInvestmentDetail(data)).then(() => {
        resetData();
        dispatch(
          viewPercentageofRandDCapexInvestmentDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );
      });
    }

    addPRACIDialogClose();
  };

  const handleDeleteConfirmDialogOpen = (row) => {
    setDeleteConfirmDialogOpen(true);
    setCurrentEditId(row.id);
  };

  const handleDeleteConfirmDialogClose = () => {
    setCurrentEditId(null);
    setDeleteConfirmDialogOpen(false);
  };

  const handleDeleteItem = () => {
    dispatch(deletePercentageofRandDCapexInvestmentDetails(currentEditId)).then(
      () => {
        dispatch(
          viewPercentageofRandDCapexInvestmentDetail({
            page: 1,
            page_size: 5,
          })
        );
      }
    );
  };

  const handleEdit = (row) => {
    setCurrentEditId(row.id);
    setFinancialYear(row.Financial_Year);

    setFormData({
      Financial_Year: row.Financial_Year,
      Percentage_of_R_and_D_investments: row.Percentage_of_R_and_D_investments,
      Details_investment: row.Details_investment,
      Percent_of_capex: row.Percent_of_capex,
      Details_capex: row.Details_capex,
    });
    addPRACIDialog();
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(clearPercentageofRandDCapexInvestmentSuccessMessage());
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);

      dispatch(clearPercentageofRandDCapexInvestmentErrorMessage());
    }
  }, [error, dispatch]);

  return (
    <>
      <Card className="card">
        <CardHeader
          title="Percentage of R&D and Capex investments"
          action={
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="button"
              onClick={addPRACIDialog}
              sx={{ width: { xs: "100%", sm: 170 }, maxWidth: "100%" }}
            >
              ADD
            </Button>
          }
        />
        <TableContainer>
          <Table
            stickyHeader
            aria-label="Percentage of R&D and Capex investments"
          >
            <TableHead>
              <TableRow key="headRowPRACI">
                {tableColumns.map((column) => (
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
                  <TableCell colSpan={tableColumns.length} align="center">
                    <Typography variant="body1">No data found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                viewReport?.data
                  ?.slice(
                    pagePRACI * rowsPerPagePRACI,
                    pagePRACI * rowsPerPagePRACI + rowsPerPagePRACI
                  )
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {tableColumns.map((column) => {
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
                              ) : column.id ===
                                  "Percentage_of_R_and_D_investments" ||
                                column.id === "Percent_of_capex" ? (
                                `${value}%`
                              ) : (
                                value
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
          rowsPerPage={rowsPerPagePRACI}
          page={page}
          onPageChange={PRACIChangePage}
          onRowsPerPageChange={PRACIChangeRowsPerPage}
        />
      </Card>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidthMd}
        open={addPRACIDialogOpen}
        onClose={addPRACIDialogClose}
      >
        <DialogTitle>
          {currentEditId
            ? "Edit Percentage of R&D and Capex investmentss"
            : "Add Percentage of R&D and Capex investments"}

          <IconButton
            className="MuiIconButton-close"
            aria-label="close"
            onClick={addPRACIDialogClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <IconButton
          className="MuiIconButton-close"
          aria-label="close"
          onClick={addPRACIDialogClose}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Grid container direction="row" spacing={{ xs: 3, sm: 6 }}>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                size="small"
                fullWidth
                id="financialYearList"
                options={finalYear}
                value={financialyear}
                disabled={!!currentEditId}
                onChange={handleFinancialYear}
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
              <Grid container direction="row" spacing={{ xs: 3, sm: 6 }}>
                <Grid item xs={12}>
                  <Grid container direction="row" spacing={{ xs: 3, sm: 6 }}>
                    {addDetails
                      .filter(
                        (column) =>
                          column.id !== "Financial_Year" &&
                          column.id !== "actions"
                      )
                      .map((column) => (
                        <Grid item key={column.id} xs={12} sm={6}>
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
              </Grid>
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

export default PercentageRndAndCapexInvestments;
