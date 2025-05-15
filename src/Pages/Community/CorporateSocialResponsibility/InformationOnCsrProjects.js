import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Grid,
  Button,
  IconButton,
  Autocomplete,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
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
  addInformationOnCsrProjectsDetail,
  deleteInformationOnCsrProjectsDetail,
  editInformationOnCsrProjectsDetail,
  viewInformationOnCsrProjectsDetail,
  clearErrorMessage,
  clearSuccessMessage,
} from "../../../store/Community/CorporateSocialResponsibility/InformationOnCsrProjectsSlice";
import { FetchIndianStatesList } from "../../../store/CommonApi/CommonApiSlice";
import { CheckBox } from "@mui/icons-material";

const tableColumns = [
  { id: "sno", label: "S.NO.", width: "10%" },
  { id: "State", label: "STATE", width: "22%" },
  { id: "Aspirational_District", label: "ASPIRATIONAL DISTRICT", width: "44%" },
  { id: "Amount_Spent", label: "AMOUNT SPENT (IN INR)", width: "23%" },
  { id: "Description_CSR", label: "Description CSR", width: "23%" },
  { id: "actions", label: "ACTION", align: "right", width: "90px" },
];

function InformationOnCsrProjects() {
  const dispatch = useDispatch();
  const [currentEditId, setCurrentEditId] = useState(null);

  const { indianStatesList } = useSelector(
    (state) => state.CommonApiDetailSlice
  );

  const { viewReport, error, success, total_page } = useSelector(
    (state) => state.InformationOnCsrProjectsDetails
  );
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [addPoimDialogOpen, setAddPoimDialogOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidthMd] = React.useState("md");

  const [pagePoim, setPagePoim] = React.useState(0);
  const [rowsPerPagePoim, setRowsPerPagePoim] = React.useState(5);

  const [page, setPage] = useState(0);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 1,
  });

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [validationErrors, setValidationErrors] = useState({});

  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    dispatch(FetchIndianStatesList());
  }, []);

  const [formData, setFormData] = useState({
    State: "",
    Aspirational_District: "",
    Amount_Spent: "",
    Description: "",
    isNotApplicable: false,
  });

  // const validateForm = (fieldName) => {
  //   console.log(formData.isNotApplicable.length);
  //   const requiredFields = formData.isNotApplicable
  //     ? ["Description"]
  //     : ["State", "Aspirational_District", "Amount_Spent"];
  //   const errors = {};

  //   // Check for required fields
  //   requiredFields.forEach((field) => {
  //     if (!formData[field]) {
  //       errors[field] = "This field is required";
  //     } else if (
  //       !formData.isNotApplicable ||
  //       formData.isNotApplicable.length > 2000
  //     ) {
  //       console.log(formData.isNotApplicable.length);
  //       errors[field] = "Description cannot be moore than 2000";
  //     }
  //   });

  //   setValidationErrors(errors);

  //   if (fieldName) {
  //     setValidationErrors((prevErrors) => ({
  //       ...prevErrors,
  //       [fieldName]: "",
  //     }));
  //   }

  //   return Object.keys(errors).length === 0;
  // };

  const validateForm = (fieldName) => {
    const requiredFields = formData.isNotApplicable
      ? ["Description"] // Only require Description if Not Applicable
      : ["State", "Aspirational_District", "Amount_Spent"];
    const errors = {};

    // Check for required fields
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = "This field is required";
      }
    });

    if (formData.isNotApplicable && formData.Description) {
      if (formData.Description.length > 2000) {
        errors.Description = "Description cannot be more than 2000 characters";
      }
    }

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
        State: formData.State,
        Aspirational_District: "",
        Amount_Spent: "",
        isNotApplicable: false,
        Description: "",
      });
    } else {
      console.log("else called");

      setFormData({
        State: "",
        Aspirational_District: "",
        Amount_Spent: "",
        isNotApplicable: false,
        Description: "",
      });
    }
    setValidationErrors({
      State: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value, id, checked } = event.target;

    let errorMessage = "";

    if (name !== "Description") {
      const numericalValue = parseFloat(value);
      if (numericalValue <= 0) {
        errorMessage = "Value must be greater than zero";
      }
    }

    if (name === "Description") {
      if (value.length > 2000) {
        errorMessage = "Description cannot be more than 2000 characters";
      } else {
        errorMessage = "";
      }
    }

    if (name === "isNotApplicable") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        isNotApplicable: checked,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }

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

    const data = formData.isNotApplicable
      ? { Description_CSR: `Not Applicable, ${formData.Description}` }
      : {
          State: formData.State,
          Aspirational_District: formData.Aspirational_District,
          Amount_Spent: parseNumber(formData.Amount_Spent),
        };

    const editDataCheck = formData.isNotApplicable
      ? { id: currentEditId, Description_CSR: `${formData.Description}` }
      : {
          id: currentEditId,
          State: formData.State,
          Aspirational_District: formData.Aspirational_District,
          Amount_Spent: parseNumber(formData.Amount_Spent),
        };

    if (currentEditId) {
      dispatch(
        editInformationOnCsrProjectsDetail({
          id: currentEditId,
          data: editDataCheck,
        })
      ).then(() => {
        dispatch(
          viewInformationOnCsrProjectsDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );
      });
    } else {
      dispatch(addInformationOnCsrProjectsDetail(data)).then(() => {
        resetData();

        dispatch(
          viewInformationOnCsrProjectsDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );
      });
    }

    addPoimDialogClose();
  };

  const PoimChangePage = (event, newPage) => {
    setPage(newPage);
    const newPaginationModel = { ...paginationModel, page: newPage + 1 };
    setPaginationModel(newPaginationModel);
    dispatch(
      viewInformationOnCsrProjectsDetail({
        page: newPage + 1,
        page_size: rowsPerPage,
      })
    );
  };

  const PoimChangeRowsPerPage = (event) => {
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
      viewInformationOnCsrProjectsDetail({
        page: 1,
        page_size: rowsPerPage,
      })
    );
  };

  const addPoimDialog = () => {
    setAddPoimDialogOpen(true);
  };

  const addPoimDialogClose = () => {
    setAddPoimDialogOpen(false);
    setCurrentEditId(null);
    resetData(null);
    setFormData({
      State: "",
      Aspirational_District: "",
      Amount_Spent: "",
      isNotApplicable: false,
      Description: "",
    });
    setValidationErrors({
      State: "",
      Aspirational_District: "",
      Amount_Spent: "",
      isNotApplicable: false,
      Description: "",
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
    dispatch(deleteInformationOnCsrProjectsDetail(currentEditId)).then(() => {
      dispatch(
        viewInformationOnCsrProjectsDetail({
          page: 1,
          page_size: 5,
        })
      );
    });
  };

  const handleEdit = (row) => {
    setCurrentEditId(row.id);
    setFormData({
      State: row.State,
      Aspirational_District: row.Aspirational_District,
      Amount_Spent: row.Amount_Spent,
      Description: row.Description_CSR,
    });

    addPoimDialog();
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
          title="Information On CSR Projects"
          className="MuiCardHeader-action-smdown-fullwidth"
          action={
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="button"
              onClick={addPoimDialog}
              sx={{ width: { xs: "100%", sm: 170 }, maxWidth: "100%" }}
            >
              ADD
            </Button>
          }
        />
        <TableContainer>
          <Table stickyHeader aria-label="Information On CSR Projects">
            <TableHead>
              <TableRow key="headRowAopo">
                {tableColumns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {/* <TableBody>
              {viewReport?.data?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={tableColumns.length} align="center">
                    <Typography variant="body1">No data found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                viewReport?.data
                  ?.slice(
                    pagePoim * rowsPerPagePoim,
                    pagePoim * rowsPerPagePoim + rowsPerPagePoim
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
                              )  : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
              )}
            </TableBody> */}
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
                    pagePoim * rowsPerPagePoim,
                    pagePoim * rowsPerPagePoim + rowsPerPagePoim
                  )
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {tableColumns.map((column) => {
                          let value;
                          if (column.id === "sno") {
                            value = page * rowsPerPage + index + 1;
                          } else {
                            value = row[column.id];
                          }

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
          rowsPerPage={rowsPerPagePoim}
          page={page}
          onPageChange={PoimChangePage}
          onRowsPerPageChange={PoimChangeRowsPerPage}
        />
      </Card>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidthMd}
        open={addPoimDialogOpen}
        onClose={addPoimDialogClose}
      >
        <DialogTitle>
          {currentEditId
            ? "Edit  Information On CSR Projects"
            : "Add  Information On CSR Projects"}
          <IconButton
            className="MuiIconButton-close"
            aria-label="close"
            onClick={addPoimDialogClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isNotApplicable}
                  onChange={handleInputChange}
                  name="isNotApplicable"
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              }
              label="Not Applicable"
            />
          </Grid>
          <Grid container direction="row" spacing={{ xs: 3, sm: 6 }}>
            {formData?.isNotApplicable ? (
              <Grid item xs={12} sm={12} mt={2}>
                <TextField
                  fullWidth
                  size="small"
                  label="Description"
                  id="Description"
                  name="Description"
                  multiline
                  rows={8}
                  value={formData.Description}
                  onChange={handleInputChange}
                  error={!!validationErrors.Description}
                  helperText={validationErrors.Description}
                />
              </Grid>
            ) : (
              <>
                <Grid item xs={12} sm={6} mt={2}>
                  {/* <TextField fullWidth size="small" label="State" id="State" /> */}
                  <Autocomplete
                    size="small"
                    fullWidth
                    id="State"
                    name="State"
                    options={
                      indianStatesList.length > 0 ? indianStatesList : []
                    }
                    value={formData.State}
                    onChange={(event, value) => {
                      handleInputChange({
                        target: { name: "State", value },
                      });
                      setValidationErrors((prevErrors) => ({
                        ...prevErrors,
                        State: "",
                      }));
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="State"
                        error={!!validationErrors.State}
                        helperText={validationErrors.State}
                      />
                    )}
                    disabled={!!currentEditId}
                  />
                </Grid>
                <Grid item xs={12} sm={6} mt={2}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Aspirational District"
                    id="Aspirational_District"
                    name="Aspirational_District"
                    value={formData.Aspirational_District}
                    onChange={handleInputChange}
                    error={!!validationErrors.Aspirational_District}
                    helperText={validationErrors.Aspirational_District}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Amount spent (In INR)"
                    id="Amount_Spent"
                    name="Amount_Spent"
                    value={formData.Amount_Spent}
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
                    error={!!validationErrors.Amount_Spent}
                    helperText={validationErrors.Amount_Spent}
                  />
                </Grid>
              </>
            )}
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

export default InformationOnCsrProjects;
