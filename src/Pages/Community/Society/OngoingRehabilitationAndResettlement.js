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
  FormControlLabel,
  Checkbox,
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
  fetchFinancialYear,
  FetchIndianStatesList,
} from "../../../store/CommonApi/CommonApiSlice";
import { registerlistofCitiesDetail } from "../../../store/CompanyDetails/EditCompanyProfile/EditCompanyProfileSlice";
import {
  addOngoingRehabandResettlementDetail,
  deleteOngoingRehabandResettlementDetail,
  editOngoingRehabandResettlementDetail,
  viewOngoingRehabandResettlementDetail,
  clearErrorMessage,
  clearSuccessMessage,
} from "../../../store/Community/Society/OngoingRehabilitationAndResettlementSlice";

const tableColumns = [
  { id: "Financial_Year", label: "Financial Year" },
  { id: "Name_Of_Project", label: "NAME OF PROJECT" },
  { id: "State", label: "STATE" },
  { id: "District", label: "DISTRICT" },
  { id: "No_Of_PAFs", label: "NO. OF PAFs" },
  {
    id: "Percentage_Of_PAFs_Covered_By_R_R",
    label: "% OF PAFS COVERED BY R&R",
  },
  { id: "Amounts_Paid_To_PAFs", label: "AMOUNTS PAID TO PAFs (IN INR)" },
  { id: "Description_Ongoing", label: "Description Ongoing" },
  { id: "actions", label: "ACTION", align: "right", width: "90px" },
];

function OngoingRehabilitationAndResettlement() {
  const dispatch = useDispatch();
  const [currentEditId, setCurrentEditId] = useState(null);

  const { finalYear, indianStatesList } = useSelector(
    (state) => state.CommonApiDetailSlice
  );

  const { viewRegisterCitiesDetail } = useSelector(
    (state) => state.EditCompanyProfileSliceDetails
  );
  const { viewReport, error, success, total_page } = useSelector(
    (state) => state.OngoingRehabilitationAndResettlementDetails
  );
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [addOrarDialogOpen, setAddOrarDialogOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidthMd] = React.useState("md");

  const [pageOrar, setPageOrar] = React.useState(0);
  const [rowsPerPageOrar, setRowsPerPageOrar] = React.useState(5);

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
    dispatch(FetchIndianStatesList());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    Financial_Year: "",
    Name_Of_Project: "",
    State: "",
    District: "",
    No_Of_PAFs: "",
    Percentage_Of_PAFs_Covered_By_R_R: "",
    Amounts_Paid_To_PAFs: "",
    isNotApplicable: false,
    Description: "",
  });
  useEffect(() => {
    if (formData.State) {
      dispatch(registerlistofCitiesDetail(formData.State));
    }
  }, [formData.State, dispatch, setFormData]);
  const validateForm = (fieldName) => {
    const requiredFields = formData.isNotApplicable ? ["Description"] : [
      "Name_Of_Project",
      "Financial_Year",
      "State",
      "District",
      "No_Of_PAFs",
      "Percentage_Of_PAFs_Covered_By_R_R",
      "Amounts_Paid_To_PAFs",
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
        Name_Of_Project: "",
        State: "",
        District: "",
        No_Of_PAFs: "",
        Percentage_Of_PAFs_Covered_By_R_R: "",
        Amounts_Paid_To_PAFs: "",
        isNotApplicable: false,
        Description: "",
      });
    } else {
      console.log("else called");

      setFormData({
        Financial_Year: "",
        Name_Of_Project: "",
        State: "",
        District: "",
        No_Of_PAFs: "",
        Percentage_Of_PAFs_Covered_By_R_R: "",
        Amounts_Paid_To_PAFs: "",
        isNotApplicable: false,
        Description: "",
      });
    }
    setValidationErrors({
      Financial_Year: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value, id, checked } = event.target;
    const numericalValue = parseFloat(value);

    // Validate input: show error if value is negative or zero
    let errorMessage = "";
    if (numericalValue <= 0) {
      errorMessage = "Value must be greater than zero";
    }

    if(name === "isNotApplicable"){
      setFormData((prevFormData) => ({
       ...prevFormData,
        isNotApplicable: checked,
      }));
    }else{
      setFormData((prevFormData) => {
        const updatedFormData = {
          ...prevFormData,
          [name]: value,
          [id]: value,
        };
        
        return updatedFormData;
      });
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

    const data = formData.isNotApplicable ? {Description_Ongoing:`Not Applicable, ${formData.Description}`}: {
      Financial_Year: formData.Financial_Year,
      Name_Of_Project: formData.Name_Of_Project,
      State: formData.State,
      District: formData.District,
      No_Of_PAFs: parseNumber(formData.No_Of_PAFs),
      Percentage_Of_PAFs_Covered_By_R_R: parseNumber(
        formData.Percentage_Of_PAFs_Covered_By_R_R
      ),
      Amounts_Paid_To_PAFs: parseNumber(formData.Amounts_Paid_To_PAFs),
    };

    const editDataCheck = formData.isNotApplicable ? {id: currentEditId,Description_Ongoing:`${formData.Description}`}: {
      id: currentEditId,
      Financial_Year: formData.Financial_Year,
      Name_Of_Project: formData.Name_Of_Project,
      State: formData.State,
      District: formData.District,
      No_Of_PAFs: parseNumber(formData.No_Of_PAFs),
      Percentage_Of_PAFs_Covered_By_R_R: parseNumber(
        formData.Percentage_Of_PAFs_Covered_By_R_R
      ),
      Amounts_Paid_To_PAFs: parseNumber(formData.Amounts_Paid_To_PAFs),
    };

    if (currentEditId) {
      dispatch(
        editOngoingRehabandResettlementDetail({
          id: currentEditId,
          data: editDataCheck,
        })
      ).then(() => {
        dispatch(
          viewOngoingRehabandResettlementDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );
      });
    } else {
      dispatch(addOngoingRehabandResettlementDetail(data)).then(() => {
        resetData();

        dispatch(
          viewOngoingRehabandResettlementDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );
      });
    }

    addOrarDialogClose();
  };

  const OrarChangePage = (event, newPage) => {
    setPage(newPage);
    const newPaginationModel = { ...paginationModel, page: newPage + 1 };
    setPaginationModel(newPaginationModel);
    dispatch(
      viewOngoingRehabandResettlementDetail({
        page: newPage + 1,
        page_size: rowsPerPage,
      })
    );
  };

  const OrarChangeRowsPerPage = (event) => {
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
      viewOngoingRehabandResettlementDetail({
        page: 1,
        page_size: rowsPerPage,
      })
    );
  };

  const addOrarDialog = () => {
    setAddOrarDialogOpen(true);
  };

  const addOrarDialogClose = () => {
    setAddOrarDialogOpen(false);
    setCurrentEditId(null);
    resetData(null);
    setFormData({
      Financial_Year: "",
      Name_Of_Project: "",
      State: "",
      District: "",
      No_Of_PAFs: "",
      Percentage_Of_PAFs_Covered_By_R_R: "",
      Amounts_Paid_To_PAFs: "",
      isNotApplicable: false,
      Description: "",
    });
    setValidationErrors({
      Financial_Year: "",
      Name_Of_Project: "",
      State: "",
      District: "",
      No_Of_PAFs: "",
      Percentage_Of_PAFs_Covered_By_R_R: "",
      Amounts_Paid_To_PAFs: "",
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
    dispatch(deleteOngoingRehabandResettlementDetail(currentEditId)).then(
      () => {
        dispatch(
          viewOngoingRehabandResettlementDetail({
            page: 1,
            page_size: 5,
          })
        );
      }
    );
  };

  const handleEdit = (row) => {
    setCurrentEditId(row.id);
    setFormData({
      Financial_Year: row.Financial_Year,
      Name_Of_Project: row.Name_Of_Project,
      State: row.State,
      District: row.District,
      No_Of_PAFs: row.No_Of_PAFs,
      Percentage_Of_PAFs_Covered_By_R_R: row.Percentage_Of_PAFs_Covered_By_R_R,
      Amounts_Paid_To_PAFs: row.Amounts_Paid_To_PAFs,
      Description: row.Description_Ongoing
    });

    addOrarDialog();
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
          title="Ongoing Rehabilitation And Resettlement"
          className="MuiCardHeader-action-smdown-fullwidth"
          action={
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="button"
              onClick={addOrarDialog}
              sx={{ width: { xs: "100%", sm: 170 }, maxWidth: "100%" }}
            >
              ADD
            </Button>
          }
        />
        <TableContainer>
          {/* <Table
            stickyHeader
            aria-label="Disciplinary Action Against For Corruption"
          >
            <TableHead>
              <TableRow key="headRowOrar">
                {columnsOrar.map((column) => (
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
              {rowsOrar
                .slice(
                  pageOrar * rowsPerPageOrar,
                  pageOrar * rowsPerPageOrar + rowsPerPageOrar
                )
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columnsOrar.map((column, index) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "actions" ? (
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
                                      onClick={addOrarDialog}
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
                                      onClick={handleDeleteConfirmDialogOpen}
                                    >
                                      <span className="material-symbols-outlined icon-20">
                                        delete
                                      </span>
                                    </IconButton>
                                  </Grid>
                                </Grid>
                              </Typography>
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
                })}
            </TableBody>
          </Table> */}
          <Table
            stickyHeader
            aria-label="Disciplinary Action Against For Corruption"
          >
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
                    pageOrar * rowsPerPageOrar,
                    pageOrar * rowsPerPageOrar + rowsPerPageOrar
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
                              ) : column.id ===
                                "Percentage_Of_PAFs_Covered_By_R_R" ? value && (
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
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={total_page}
          rowsPerPage={rowsPerPageOrar}
          page={page}
          onPageChange={OrarChangePage}
          onRowsPerPageChange={OrarChangeRowsPerPage}
        />
      </Card>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidthMd}
        open={addOrarDialogOpen}
        onClose={addOrarDialogClose}
      >
        <DialogTitle>
          {currentEditId
            ? "Edit  Ongoing Rehabilitation And Resettlement"
            : "Add  Ongoing Rehabilitation And Resettlement"}
          <IconButton
            className="MuiIconButton-close"
            aria-label="close"
            onClick={addOrarDialogClose}
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
              <TextField
                fullWidth
                size="small"
                label="Name of project"
                id="Name_Of_Project"
                name="Name_Of_Project"
                value={formData.Name_Of_Project}
                onChange={handleInputChange}
                error={!!validationErrors.Name_Of_Project}
                helperText={validationErrors.Name_Of_Project}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* <TextField fullWidth 
              size="small" 
              label="State" 
              id="State"
               /> */}
              <Autocomplete
                size="small"
                fullWidth
                id="State"
                name="State"
                value={formData.State}
                options={indianStatesList.length > 0 ? indianStatesList : []}
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
                    onChange={(e) => {
                      handleInputChange({
                        target: {
                          name: "State",
                          value: e.target.value,
                        },
                      });
                      setValidationErrors((prevErrors) => ({
                        ...prevErrors,
                        State: "",
                      }));
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* <TextField
                fullWidth
                size="small"
                label="District"
                id="District"
              /> */}
              <Autocomplete
                size="small"
                fullWidth
                id="District"
                name="District"
                value={formData.District}
                options={
                  viewRegisterCitiesDetail.length > 0
                    ? viewRegisterCitiesDetail
                    : []
                }
                onChange={(event, value) => {
                  handleInputChange({
                    target: { name: "District", value },
                  });
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    District: "",
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="District"
                    error={!!validationErrors.District}
                    helperText={validationErrors.District}
                    onChange={(e) => {
                      handleInputChange({
                        target: {
                          name: "District",
                          value: e.target.value,
                        },
                      });
                      setValidationErrors((prevErrors) => ({
                        ...prevErrors,
                        District: "",
                      }));
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="No. of PAFs"
                id="No_Of_PAFs"
                name="No_Of_PAFs"
                value={formData.No_Of_PAFs}
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
                error={!!validationErrors.No_Of_PAFs}
                helperText={validationErrors.No_Of_PAFs}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="% of PAFs covered by R&R"
                id="Percentage_Of_PAFs_Covered_By_R_R"
                name="Percentage_Of_PAFs_Covered_By_R_R"
                value={formData.Percentage_Of_PAFs_Covered_By_R_R}
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
                error={!!validationErrors.Percentage_Of_PAFs_Covered_By_R_R}
                helperText={validationErrors.Percentage_Of_PAFs_Covered_By_R_R}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="Amounts paid to PAFs (In INR)"
                id="Amounts_Paid_To_PAFs"
                name="Amounts_Paid_To_PAFs"
                value={formData.Amounts_Paid_To_PAFs}
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
                error={!!validationErrors.Amounts_Paid_To_PAFs}
                helperText={validationErrors.Amounts_Paid_To_PAFs}
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

export default OngoingRehabilitationAndResettlement;
