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
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import DeleteConfirmDialog from "./../../../Components/DeleteConfirmDialog";
import {
  ConsumerComplaintsTypeList,
  fetchFinancialYear,
} from "../../../store/CommonApi/CommonApiSlice";
import {
  addNumberOfConsumerComplaintsDetail,
  deleteNumberOfConsumerComplaintsDetail,
  editNumberOfConsumerComplaintsDetail,
  viewNumberOfConsumerComplaintsDetail,
  clearErrorMessage,
  clearSuccessMessage,
} from "../../../store/Community/Consumer/NumberOfConsumerComplaintsSlice";

const tableColumns = [
  { id: "Financial_Year", label: "Financial Year", width: "15%" },
  { id: "Type", label: "TYPE", width: "37%" },
  {
    id: "Received_During_The_Year",
    label: "RECEIVED DURING THE YEAR",
    width: "26%",
  },
  {
    id: "Pending_Resolution_At_End_Of_The_Year",
    label: "PENDING RESOLUTION AT END OF YEAR",
    width: "15%",
  },
  {
    id: "Remarks",
    label: "REMARKS",
    width: "15%",
  },
  { id: "actions", label: "ACTION", align: "right", width: "90px" },
];

function NumberOfConsumerComplaints() {
  const dispatch = useDispatch();
  const [currentEditId, setCurrentEditId] = useState(null);

  const { finalYear, complaintsTypeList } = useSelector(
    (state) => state.CommonApiDetailSlice
  );

  const { viewReport, error, success, total_page } = useSelector(
    (state) => state.NumberOfConsumerComplaintsDetails
  );

  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [addBdasipDialogOpen, setAddBdasipDialogOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidthMd] = React.useState("md");

  const [pageBdasip, setPageBdasip] = React.useState(0);
  const [rowsPerPageBdasip, setRowsPerPageBdasip] = React.useState(5);

  const [page, setPage] = useState(0);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 1,
  });

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [validationErrors, setValidationErrors] = useState({});

  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    dispatch(fetchFinancialYear());
    dispatch(ConsumerComplaintsTypeList());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    Financial_Year: "",
    Type: "",
    Received_During_The_Year: "",
    Pending_Resolution_At_End_Of_The_Year: "",
    Remarks: "",
  });

  const validateForm = (fieldName) => {
    const requiredFields = [
      "Financial_Year",
      "Type",
      "Received_During_The_Year",
      "Pending_Resolution_At_End_Of_The_Year",
      "Remarks",
    ];
    const errors = {};

    // Check for required fields
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = "This field is required";
      }
    });

    setValidationErrors(errors);

    if (fieldName) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
    }

    return Object.keys(errors).length === 0;
  };

  const resetData = () => {
    if (currentEditId) {
      setFormData({
        Financial_Year: formData.Financial_Year,
        Type: formData.Type,

        Received_During_The_Year: "",
        Pending_Resolution_At_End_Of_The_Year: "",
        Remarks: "",
      });
    } else {
      setFormData({
        Financial_Year: "",
        Type: "",
        Received_During_The_Year: "",
        Pending_Resolution_At_End_Of_The_Year: "",
        Remarks: "",
      });
    }
    setValidationErrors({
      Financial_Year: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value, id } = event.target;
    const numericalValue = parseFloat(value);

    // Validate input: show error if value is negative or zero
    let errorMessage = "";
    if (numericalValue <= 0) {
      errorMessage = "Value must be greater than zero";
    }

    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [name]: value,
        [id]: value,
      };

      return updatedFormData;
    });

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [id]: errorMessage,
    }));
  };

  const handleSaveChanges = () => {
    if (!validateForm()) {
      setValidationError("Form validation failed.");
      return;
    }

    const parseNumber = (value) => (value ? parseFloat(value) : 0);

    const data = {
      Financial_Year: formData.Financial_Year,
      Type: formData.Type,
      Received_During_The_Year: parseNumber(formData.Received_During_The_Year),
      Pending_Resolution_At_End_Of_The_Year: parseNumber(
        formData.Pending_Resolution_At_End_Of_The_Year
      ),
      Remarks: formData.Remarks,
    };

    const editDataCheck = {
      id: currentEditId,
      ...data,
    };

    if (currentEditId) {
      dispatch(
        editNumberOfConsumerComplaintsDetail({
          id: currentEditId,
          data: editDataCheck,
        })
      ).then(() => {
        dispatch(
          viewNumberOfConsumerComplaintsDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );
      });
    } else {
      dispatch(addNumberOfConsumerComplaintsDetail(data)).then(() => {
        resetData();

        dispatch(
          viewNumberOfConsumerComplaintsDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );
      });
    }

    addBdasipDialogClose();
  };

  const BdasipChangePage = (event, newPage) => {
    setPage(newPage);
    const newPaginationModel = { ...paginationModel, page: newPage + 1 };
    setPaginationModel(newPaginationModel);
    dispatch(
      viewNumberOfConsumerComplaintsDetail({
        page: newPage + 1,
        page_size: rowsPerPage,
      })
    );
  };

  const BdasipChangeRowsPerPage = (event) => {
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
      viewNumberOfConsumerComplaintsDetail({
        page: 1,
        page_size: rowsPerPage,
      })
    );
  };

  const addBdasipDialog = () => {
    setAddBdasipDialogOpen(true);
  };

  const addBdasipDialogClose = () => {
    setAddBdasipDialogOpen(false);
    setCurrentEditId(null);
    resetData(null);
    setFormData({
      Financial_Year: "",
      Type: "",
      Received_During_The_Year: "",
      Pending_Resolution_At_End_Of_The_Year: "",
      Remarks: "",
    });
    setValidationErrors({
      Financial_Year: "",
      Type: "",
      Received_During_The_Year: "",
      Pending_Resolution_At_End_Of_The_Year: "",
      Remarks: "",
    });
  };

  const handleDeleteConfirmDialogOpen = (row) => {
    setCurrentEditId(row.id);
    setDeleteConfirmDialogOpen(true);
  };

  const handleDeleteConfirmDialogClose = (row) => {
    setDeleteConfirmDialogOpen(false);
    setCurrentEditId(null);
  };

  const handleDeleteItem = () => {
    dispatch(deleteNumberOfConsumerComplaintsDetail(currentEditId)).then(() => {
      dispatch(
        viewNumberOfConsumerComplaintsDetail({
          page: 1,
          page_size: 5,
        })
      );
    });
  };

  const handleEdit = (row) => {
    setCurrentEditId(row.id);
    setFormData({
      Financial_Year: row.Financial_Year,
      Type: row.Type,
      Received_During_The_Year: row.Received_During_The_Year,
      Pending_Resolution_At_End_Of_The_Year:
        row.Pending_Resolution_At_End_Of_The_Year,
      Remarks: row.Remarks,
    });

    addBdasipDialog();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
      <Card className="card">
        <CardHeader
          title="Number Of Consumer Complaints"
          className="MuiCardHeader-action-smdown-fullwidth"
          action={
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="button"
              onClick={addBdasipDialog}
              sx={{ width: { xs: "100%", sm: 170 }, maxWidth: "100%" }}
            >
              ADD
            </Button>
          }
        />
        <TableContainer>
          <Table stickyHeader aria-label="Number Of Consumer Complaints">
            <TableHead>
              <TableRow key="headRowAopo">
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
                    pageBdasip * rowsPerPageBdasip,
                    pageBdasip * rowsPerPageBdasip + rowsPerPageBdasip
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
                              ) : column.format && typeof value === "number" ? (
                                column.format(value)
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
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={total_page}
          rowsPerPage={rowsPerPageBdasip}
          page={page}
          onPageChange={BdasipChangePage}
          onRowsPerPageChange={BdasipChangeRowsPerPage}
        />
      </Card>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidthMd}
        open={addBdasipDialogOpen}
        onClose={addBdasipDialogClose}
      >
        <DialogTitle>
          {currentEditId
            ? "Edit Number Of Consumer Complaints"
            : "Add Number Of Consumer Complaints"}
          <IconButton
            className="MuiIconButton-close"
            aria-label="close"
            onClick={addBdasipDialogClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container direction="row" spacing={{ xs: 3, sm: 6 }}>
            <Grid item xs={12} sm={6} mt={2}>
              <Autocomplete
                size="small"
                fullWidth
                id="Financial_Year"
                name="Financial_Year"
                options={finalYear.length > 0 ? finalYear : []}
                value={formData.Financial_Year}
                onChange={(event, value) => {
                  handleInputChange({
                    target: { name: "Financial_Year", value },
                  });
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    Financial_Year: "",
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Financial Year"
                    error={!!validationErrors.Financial_Year}
                    helperText={validationErrors.Financial_Year}
                  />
                )}
                disabled={!!currentEditId}
              />
            </Grid>
            <Grid item xs={12} sm={6} mt={2}>
              <Autocomplete
                size="small"
                fullWidth
                id="Type"
                name="Type"
                options={
                  complaintsTypeList.length > 0 ? complaintsTypeList : []
                }
                value={formData.Type}
                onChange={(event, value) => {
                  handleInputChange({
                    target: { name: "Type", value },
                  });
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    Type: "",
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Type"
                    error={!!validationErrors.Type}
                    helperText={validationErrors.Type}
                  />
                )}
                disabled={!!currentEditId}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="Received during the year"
                id="Received_During_The_Year"
                name="Received_During_The_Year"
                value={formData.Received_During_The_Year}
                type="number"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value < 0) {
                    setValidationError("Number should be positive.");
                  } else {
                    handleInputChange(e);
                    setValidationError("");
                  }
                }}
                error={!!validationErrors.Received_During_The_Year}
                helperText={validationErrors.Received_During_The_Year}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="Pending resolution at end of year"
                id="Pending_Resolution_At_End_Of_The_Year"
                name="Pending_Resolution_At_End_Of_The_Year"
                value={formData.Pending_Resolution_At_End_Of_The_Year}
                type="number"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value < 0) {
                    setValidationError("Number should be positive.");
                  } else {
                    handleInputChange(e);
                    setValidationError("");
                  }
                }}
                error={!!validationErrors.Pending_Resolution_At_End_Of_The_Year}
                helperText={
                  validationErrors.Pending_Resolution_At_End_Of_The_Year
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Remarks "
                id="Remarks"
                name="Remarks"
                onChange={handleChange}
                value={formData.Remarks}
                error={!!validationErrors.Remarks}
                helperText={validationErrors.Remarks}
              />
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
        onDelete={() => handleDeleteItem(currentEditId)}
      />
    </>
  );
}

export default NumberOfConsumerComplaints;
