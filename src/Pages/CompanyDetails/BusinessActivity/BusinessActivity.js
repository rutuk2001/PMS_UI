import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Grid,
  Button,
  FormControl,
  TextField,
  Typography,
  Link,
  Autocomplete,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchBusinessActivityList,
  fetchFinancialYear,
} from "../../../store/CommonApi/CommonApiSlice";
import {
  addBusinessActivitySliceDetails,
  clearErrorMessage,
  clearSuccessMessage,
  deleteBusinessActivitySliceDetails,
  editBusinessActivitySliceDetails,
  viewBusinessActivitySliceDetails,
} from "../../../store/CompanyDetails/BusinessActivity/BusinessActivityADD/BusinessActivitySlice";
import DeleteConfirmDialog from "./../../../Components/DeleteConfirmDialog";

const BusinessActivity = () => {
  const dispatch = useDispatch();

  const { viewReport, error, success, total_page } = useSelector(
    (state) => state.BASliceDetails
  );

  const { finalYear, businessActivityList } = useSelector(
    (state) => state.CommonApiDetailSlice
  );

  const [tableColumns, setTableColumns] = useState([
    { id: "Financial_Year", label: "Financial Year" },
    { id: "Total_Percent_Turnover", label: "TOTAL" },
    { id: "actions", label: "ACTION", align: "right" },
  ]);

  useEffect(() => {
    dispatch(fetchFinancialYear());
    dispatch(fetchBusinessActivityList());
  }, [dispatch]);

  useEffect(() => {
    if (
      Array.isArray(businessActivityList) &&
      businessActivityList.length > 0
    ) {
      const dynamicColumns = businessActivityList.map((activity) => ({
        id: activity,
        label: activity.toUpperCase(),
      }));
      setTableColumns([
        { id: "Financial_Year", label: "Financial Year" },
        ...dynamicColumns,
        { id: "Total_Percent_Turnover", label: "TOTAL" },
        { id: "actions", label: "ACTION", align: "right" },
      ]);
    }
  }, [businessActivityList]);

  const [financialYear, setFinancialYear] = useState(null);
  const handleFinancialYearChange = (event, value) => {
    setFinancialYear(value);
    setValidationError("");
  };

  const [businessActivities, setBusinessActivities] = useState([
    { businessActivity: null, percentTurnover: "" },
  ]);

  const handleBusinessActivityChange = (index, event, value) => {
    const updatedBusinessActivities = [...businessActivities];

    if (
      updatedBusinessActivities.some(
        (activity) => activity.businessActivity === value
      )
    ) {
      toast.error("Business Activity already selected");
    } else {
      updatedBusinessActivities[index].businessActivity = value;
      setBusinessActivities(updatedBusinessActivities);
      setValidationError("");
    }
  };

  const handleInputChange = (index, event) => {
    const { value } = event.target;
    const updatedBusinessActivities = [...businessActivities];
    updatedBusinessActivities[index].percentTurnover = value;

    const totalPercent = calculateTotalPercent(updatedBusinessActivities);

    if (
      value.trim() === "" ||
      !updatedBusinessActivities[index].businessActivity
    ) {
      setValidationError(
        "Business Activity and % of Turnover are required for all entries."
      );
    } else if (totalPercent > 100) {
      setValidationError("Total turnover percentage cannot exceed 100%");
    } else {
      updatedBusinessActivities[index].validationError = "";
      setBusinessActivities(updatedBusinessActivities);
      setValidationError("");
    }
  };

  const calculateTotalPercent = (activities) => {
    return activities.reduce((total, activity) => {
      return total + parseFloat(activity.percentTurnover || 0);
    }, 0);
  };

  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidthMd, setMaxWidthMd] = React.useState("md");
  const [validationError, setValidationError] = useState("");
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [addBusinessActivityDialogOpen, setAddBusinessActivityDialogOpen] =
    useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  const [pageBusinessActivity, setPageBusinessActivity] = React.useState(0);
  const [rowsPerPageBusinessActivity, setRowsPerPageBusinessActivity] =
    React.useState(5);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 1,
  });

  const businessActivityChangePage = (event, newPage) => {
    setPage(newPage);
    const newPaginationModel = { ...paginationModel, page: newPage + 1 };
    setPaginationModel(newPaginationModel);
    dispatch(
      viewBusinessActivitySliceDetails({
        page: newPage + 1,
        page_size: rowsPerPage,
      })
    );
  };

  const businessActivityChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(+event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    const newPaginationModel = {
      ...paginationModel,
      page: 1,
      pageSize: newRowsPerPage,
    };
    setPaginationModel(newPaginationModel);

    dispatch(
      viewBusinessActivitySliceDetails({
        page: 1,
        page_size: rowsPerPage,
      })
    );
  };

  const addBusinessActivityDialog = () => {
    setAddBusinessActivityDialogOpen(true);
  };

  const addBusinessActivityDialogClose = () => {
    setAddBusinessActivityDialogOpen(false);
    setCurrentEditId(null);
    setBusinessActivities([{ businessActivity: null, percentTurnover: "" }]);
    setValidationError("");
    setFinancialYear(null);
  };

  const resetData = () => {
    if (currentEditId) {
      setFinancialYear(financialYear);
      setBusinessActivities([{ businessActivity: null, percentTurnover: "" }]);
    } else {
      setCurrentEditId(null);
      setBusinessActivities([{ businessActivity: null, percentTurnover: "" }]);
      setValidationError("");
      setFinancialYear(null);
    }
  };

  const addAnother = () => {
    if (calculateTotalPercent(businessActivities) >= 100) {
      setValidationError("Total turnover percentage cannot exceed 100%");
      return;
    }
    setBusinessActivities([
      ...businessActivities,
      { businessActivity: null, percentTurnover: "" },
    ]);
    setValidationError("");
  };

  const handleDeleteConfirmDialogOpen = (row) => {
    setCurrentEditId(row.id);
    setDeleteConfirmDialogOpen(true);
  };

  const handleDeleteConfirmDialogClose = () => {
    setDeleteConfirmDialogOpen(false);
    setCurrentEditId(null);
  };

  const handleDeleteItem = (currentEditId) => {
    dispatch(deleteBusinessActivitySliceDetails(currentEditId)).then(() => {
      dispatch(
        viewBusinessActivitySliceDetails({
          page: 1,
          page_size: rowsPerPage,
        })
      );
    });
  };

  const handleSaveChanges = () => {
    if (!financialYear) {
      setValidationError("Financial Year is required.");
      return;
    }

    const totalPercent = calculateTotalPercent(businessActivities);
    if (totalPercent > 100) {
      setValidationError("Total turnover percentage cannot exceed 100%");
      return;
    }

    const businessActivityAndTurnoverValid = businessActivities.every(
      (item) => item.businessActivity && item.percentTurnover
    );

    if (!businessActivityAndTurnoverValid) {
      setValidationError(
        "Business Activity and Percent Turnover are required for all entries."
      );
      return;
    }

    const payload = {
      Financial_Year: financialYear,
      Total_Percent_Turnover: totalPercent,
      Business_Activity_and_Turnover: businessActivities.map((item) => ({
        Business_Activity: item.businessActivity,
        Percent_Turnover: item.percentTurnover,
      })),
    };

    const Editpayload = {
      id: currentEditId,
      Financial_Year: financialYear,
      Total_Percent_Turnover: totalPercent,
      Business_Activity_and_Turnover: businessActivities.map((item) => ({
        Business_Activity: item.businessActivity,
        Percent_Turnover: item.percentTurnover,
      })),
    };

    if (currentEditId) {
      dispatch(
        editBusinessActivitySliceDetails({
          id: currentEditId,
          data: Editpayload,
        })
      ).then(() => {
        dispatch(
          viewBusinessActivitySliceDetails({
            page: 1,
            page_size: rowsPerPage,
          })
        );
      });
    } else {
      dispatch(addBusinessActivitySliceDetails(payload)).then(() => {
        dispatch(
          viewBusinessActivitySliceDetails({
            page: 1,
            page_size: rowsPerPage,
          })
        );
      });
    }

    addBusinessActivityDialogClose();
    resetData();
  };

  useEffect(() => {
    dispatch(
      viewBusinessActivitySliceDetails({
        page: 1,
        page_size: rowsPerPage,
      })
    );
  }, [dispatch, rowsPerPage]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrorMessage());
    }
    if (success) {
      toast.success(success);
      dispatch(clearSuccessMessage());
    }
  }, [error, success, dispatch]);

  const handleEdit = (row) => {
    setCurrentEditId(row.id);
    setFinancialYear(row.Financial_Year);
    const activity = row?.Business_Activity_and_Turnover;
    const businessActivityData = [
      {
        businessActivity: activity?.Business_Activity,
        percentTurnover: activity?.Percent_Turnover,
      },
    ];

    setBusinessActivities(businessActivityData);
    setAddBusinessActivityDialogOpen(true);
  };

  return (
    <>
      <Card className="card">
        <CardHeader
          title="Business Activity"
          action={
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="button"
              onClick={addBusinessActivityDialog}
              sx={{ minWidth: 170 }}
            >
              ADD
            </Button>
          }
        />
        <TableContainer>
          <Table stickyHeader aria-label="Business Activity">
            <TableHead>
              <TableRow key="headRowBA">
                {tableColumns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
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
                    pageBusinessActivity * rowsPerPageBusinessActivity,
                    pageBusinessActivity * rowsPerPageBusinessActivity +
                      rowsPerPageBusinessActivity
                  )
                  .map((row, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {tableColumns.map((column) => (
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
                                  {/* <Grid item>
                                    <IconButton
                                      aria-label="edit"
                                      size="small"
                                      onClick={() => handleEdit(row)}
                                    >
                                      <span className="material-symbols-outlined icon-20">
                                        edit
                                      </span>
                                    </IconButton>
                                  </Grid> */}
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
                          ) : column.id === "Financial_Year" ? (
                            row.Financial_Year
                          ) : column.id === "Total_Percent_Turnover" ? (
                            row.Total_Percent_Turnover
                          ) : (
                            `${
                              row.Business_Activity_and_Turnover[column.id] ===
                              undefined
                                ? 0
                                : row.Business_Activity_and_Turnover[column.id]
                            } %` || "0"
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={total_page}
          rowsPerPage={rowsPerPageBusinessActivity}
          page={page}
          onPageChange={businessActivityChangePage}
          onRowsPerPageChange={businessActivityChangeRowsPerPage}
        />
      </Card>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidthMd}
        open={addBusinessActivityDialogOpen}
        onClose={addBusinessActivityDialogClose}
      >
        <DialogTitle>
          {currentEditId ? "Edit Business Activity" : "Add Business Activity"}

          <IconButton
            className="MuiIconButton-close"
            aria-label="close"
            onClick={addBusinessActivityDialogClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container direction="row" spacing={{ xs: 3, sm: 6 }}>
            <Grid item xs={12} sm={6} mt={2}>
              <Autocomplete
                fullWidth
                size="small"
                value={financialYear}
                onChange={handleFinancialYearChange}
                options={finalYear || []}
                getOptionLabel={(option) => option || ""}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Financial Year"
                    variant="outlined"
                  />
                )}
                error={validationError !== ""}
                        helperText={
                          validationError !== "" ? validationError : ""
                        }
                disabled={!!currentEditId}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                direction="row"
                rowSpacing={3}
                columnSpacing={{ xs: 3, sm: 6 }}
              >
                {businessActivities.map((activity, index) => (
                  <React.Fragment key={index}>
                    <Grid item xs={12} sm={6}>
                      <Autocomplete
                        fullWidth
                        value={activity?.businessActivity}
                        onChange={(event, value) =>
                          handleBusinessActivityChange(index, event, value)
                        }
                        // options={businessActivityList || []}
                        options={
                          businessActivityList.length > 0
                            ? businessActivityList
                            : []
                        }
                        getOptionLabel={(option) => option || ""}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            label="Business Activity"
                            variant="outlined"
                            error={validationError !== ""}
                            helperText={
                              validationError !== "" &&
                              "Business Activity is required"
                            }
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        size="small"
                        id="percentTurnover"
                        label="% of Turnover"
                        variant="outlined"
                        value={activity?.percentTurnover}
                        onChange={(event) => handleInputChange(index, event)}
                        error={validationError !== ""}
                        helperText={
                          validationError !== "" ? validationError : ""
                        }
                      />
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Link
                component="button"
                variant="body2"
                onClick={addAnother}
                style={{ marginLeft: 8 }}
              >
                Add another
              </Link>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              alignItems="center"
              spacing={{ xs: 3, sm: 6 }}
            >
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  Accounting for 90% of the Turnover
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  label="TOTAL %"
                  value={calculateTotalPercent(businessActivities)}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <Grid container spacing={2} justifyContent="left" padding={2}>
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
      </Dialog>

      <DeleteConfirmDialog
        open={deleteConfirmDialogOpen}
        onClose={handleDeleteConfirmDialogClose}
        onDelete={() => handleDeleteItem(currentEditId)}
      />
    </>
  );
};

export default BusinessActivity;
