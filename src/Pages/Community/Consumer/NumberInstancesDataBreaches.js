import React, { useState, useEffect } from "react";
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

import { fetchFinancialYear } from "../../../store/CommonApi/CommonApiSlice";
import {
  addNIDBDetail,
  deleteNIDBDetail,
  editNIDBDetail,
  viewNIDBDetail,
  clearErrorMessage,
  clearSuccessMessage,
} from "../../../store/Community/Consumer/NIDBSlice";

const tableColumns = [
  { id: "Financial_Year", label: "Financial Year", width: "7%" },
  {
    id: "Number_Of_Instances_Of_Data_Breaches",
    label: " NUMBER OF INSTANCES OF DATA BREACHES",
    width: "40%",
  },
  {
    id: "Percent_Of_Customers_Affected_By_Data_Breaches",
    label: "% OF CUSTOMERS OF DATA BREACHES",
    width: "20%",
  },
  { id: "Description", label: "DESCRIPTION", width: "30%" },
  { id: "Impact", label: "IMPACT", width: "30%" },
  { id: "actions", label: "ACTION", align: "right", width: "90px" },
];

function NumberInstancesDataBreaches() {
  const dispatch = useDispatch();
  const [currentEditId, setCurrentEditId] = useState(null);

  const { finalYear } = useSelector((state) => state.CommonApiDetailSlice);

  const { viewReport, error, success, total_page } = useSelector(
    (state) => state.NIDBDetails
  );

  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [addDbcpDialogOpen, setAddDbcpDialogOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidthMd] = React.useState("md");

  const [pageDbcp, setPageDbcp] = React.useState(0);
  const [rowsPerPageDbcp, setRowsPerPageDbcp] = React.useState(5);

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
  }, []);

  const [formData, setFormData] = useState({
    Financial_Year: "",
    Number_Of_Instances_Of_Data_Breaches: "",
    Percent_Of_Customers_Affected_By_Data_Breaches: "",
    Description: "",
    Impact: "",
  });

  const validateForm = (fieldName) => {
    const requiredFields = [
      "Financial_Year",
      "Number_Of_Instances_Of_Data_Breaches",
      "Percent_Of_Customers_Affected_By_Data_Breaches",
      "Description",
      "Impact",
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
        Number_Of_Instances_Of_Data_Breaches: "",
        Percent_Of_Customers_Affected_By_Data_Breaches: "",
        Description: "",
        Impact: "",
      });
    } else {
      console.log("else called");

      setFormData({
        Financial_Year: "",
        Number_Of_Instances_Of_Data_Breaches: "",
        Percent_Of_Customers_Affected_By_Data_Breaches: "",
        Description: "",
        Impact: "",
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
    // let errorMessage = "";
    // if (numericalValue <= 0) {
    //   errorMessage = "Value must be greater than zero";
    // }

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
      // [id]: errorMessage,
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
      Number_Of_Instances_Of_Data_Breaches: parseInt(
        formData.Number_Of_Instances_Of_Data_Breaches
      ),
      Percent_Of_Customers_Affected_By_Data_Breaches: parseInt(
        formData.Percent_Of_Customers_Affected_By_Data_Breaches
      ),
      Description: formData.Description,
      Impact: formData.Impact,
    };

    const editDataCheck = {
      id: currentEditId,
      ...data,
    };

    if (currentEditId) {
      dispatch(
        editNIDBDetail({
          id: currentEditId,
          data: editDataCheck,
        })
      ).then(() => {
        dispatch(
          viewNIDBDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );
      });
    } else {
      dispatch(addNIDBDetail(data)).then(() => {
        resetData();

        dispatch(
          viewNIDBDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );
      });
    }

    addDbcpDialogClose();
  };

  const DbcpChangePage = (event, newPage) => {
    setPage(newPage);
    const newPaginationModel = { ...paginationModel, page: newPage + 1 };
    setPaginationModel(newPaginationModel);
    dispatch(
      viewNIDBDetail({
        page: newPage + 1,
        page_size: rowsPerPage,
      })
    );
  };

  const DbcpChangeRowsPerPage = (event) => {
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
      viewNIDBDetail({
        page: 1,
        page_size: rowsPerPage,
      })
    );
  };

  const addDbcpDialog = () => {
    setAddDbcpDialogOpen(true);
  };

  const addDbcpDialogClose = () => {
    setAddDbcpDialogOpen(false);
    setCurrentEditId(null);
    resetData(null);
    setFormData({
      Financial_Year: "",
      Number_Of_Instances_Of_Data_Breaches: "",
      Percent_Of_Customers_Affected_By_Data_Breaches: "",
      Description: "",
      Impact: "",
    });
    setValidationErrors({
      Financial_Year: "",
      Number_Of_Instances_Of_Data_Breaches: "",
      Percent_Of_Customers_Affected_By_Data_Breaches: "",
      Description: "",
      Impact: "",
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
    dispatch(deleteNIDBDetail(currentEditId)).then(() => {
      dispatch(
        viewNIDBDetail({
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
      Number_Of_Instances_Of_Data_Breaches:
        row.Number_Of_Instances_Of_Data_Breaches,
      Percent_Of_Customers_Affected_By_Data_Breaches:
        row.Percent_Of_Customers_Affected_By_Data_Breaches,
      Description: row.Description,
      Impact: row.Impact,
    });

    addDbcpDialog();
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
          title="Number Of Instances Of Data Breaches"
          className="MuiCardHeader-action-smdown-fullwidth"
          action={
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="button"
              onClick={addDbcpDialog}
              sx={{ width: { xs: "100%", sm: 170 }, maxWidth: "100%" }}
            >
              ADD
            </Button>
          }
        />
        <TableContainer>
          <Table stickyHeader aria-label="Number Of Instances Of Data Breaches">
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
                    pageDbcp * rowsPerPageDbcp,
                    pageDbcp * rowsPerPageDbcp + rowsPerPageDbcp
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
          rowsPerPage={rowsPerPageDbcp}
          page={page}
          onPageChange={DbcpChangePage}
          onRowsPerPageChange={DbcpChangeRowsPerPage}
        />
      </Card>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidthMd}
        open={addDbcpDialogOpen}
        onClose={addDbcpDialogClose}
      >
        <DialogTitle>
          {currentEditId
            ? "Edit Number Of Instances Of Data Breaches"
            : "Add Number Of Instances Of Data Breaches"}
          <IconButton
            className="MuiIconButton-close"
            aria-label="close"
            onClick={addDbcpDialogClose}
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

            <Grid item xs={12} sm={6}>
              {/* <TextField
                fullWidth
                size="small"
                label=" Number of instances of data breaches"
                id="Number_Of_Instances_Of_Data_Breaches"
                name="Number_Of_Instances_Of_Data_Breaches"
                value={formData.Number_Of_Instances_Of_Data_Breaches}
                onChange={handleInputChange}
                error={!!validationErrors.Number_Of_Instances_Of_Data_Breaches}
                helperText={
                  validationErrors.Number_Of_Instances_Of_Data_Breaches
                }
                
              /> */}
              <TextField
                fullWidth
                size="small"
                label="Number of instances of data breaches"
                id="Number_Of_Instances_Of_Data_Breaches"
                name="Number_Of_Instances_Of_Data_Breaches"
                type="number" 
                value={formData.Number_Of_Instances_Of_Data_Breaches}
                onChange={handleInputChange}
                error={!!validationErrors.Number_Of_Instances_Of_Data_Breaches}
                helperText={
                  validationErrors.Number_Of_Instances_Of_Data_Breaches
                }
                InputProps={{ inputProps: { min: 0 } }} // Optional: Set minimum value to 0 to prevent negative numbers
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="Description"
                id="Description"
                name="Description"
                value={formData.Description}
                onChange={handleInputChange}
                error={!!validationErrors.Description}
                helperText={validationErrors.Description}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                type="number" 

                label="% of customers of data breaches"
                id="Percent_Of_Customers_Affected_By_Data_Breaches"
                name="Percent_Of_Customers_Affected_By_Data_Breaches"
                value={formData.Percent_Of_Customers_Affected_By_Data_Breaches}
                onChange={handleInputChange}
                error={
                  !!validationErrors.Percent_Of_Customers_Affected_By_Data_Breaches
                }
                helperText={
                  validationErrors.Percent_Of_Customers_Affected_By_Data_Breaches
                }
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="Impact"
                id="Impact"
                name="Impact"
                value={formData.Impact}
                onChange={handleInputChange}
                error={!!validationErrors.Impact}
                helperText={validationErrors.Impact}
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

export default NumberInstancesDataBreaches;
