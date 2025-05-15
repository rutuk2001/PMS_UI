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
import { fetchDeductedAndDepositedList } from "../../../store/CommonApi/CommonApiSlice";
import {
  addDetailsOfSocialImpactAssessmentsDetail,
  deleteDetailsOfSocialImpactAssessmentsDetail,
  editDetailsOfSocialImpactAssessmentsDetail,
  viewDetailsOfSocialImpactAssessmentsDetail,
  clearErrorMessage,
  clearSuccessMessage,
} from "../../../store/Community/Society/DetailsOfSocialImpactAssessmentsSlice";
import { Public } from "@mui/icons-material";

const tableColumns = [
  {
    id: "Name_And_Brief_Details_Of_Project",
    label: "NAME AND BRIEF DETAILS OF PROJECT",
    width: "16%",
  },
  { id: "SIA_Notification_No", label: "SIA NOTIFICATION NO.", width: "16%" },
  { id: "Date_Of_Notification", label: "DATE OF NOTIFICATION", width: "16%" },
  {
    id: "Conducted_By_Independent_External_Agency",
    label: "CONDUCTED BY INDEPENDENT EXTERNAL AGENCY",
    width: "16%",
  },
  {
    id: "Results_Communicated_In_Public_Domain",
    label: "RESULTS COMMUNICATED IN PUBLIC DOMAIN",
    width: "16%",
  },
  { id: "Relevant_Web_Link", label: "RELEVANT WEB LINK", width: "16%" },
  { id: "Description_Details", label: "Description Details" },
  {
    id: "Whether_available_public_domain",
    label: "WHEN Available Public Domain",
  },
  { id: "actions", label: "ACTION", align: "right", width: "90px" },
];

function DetailsOfSocialImpactAssessments() {
  const dispatch = useDispatch();
  const [currentEditId, setCurrentEditId] = useState(null);

  const { deducted_DepositedList } = useSelector(
    (state) => state.CommonApiDetailSlice
  );

  const { viewReport, error, success, total_page } = useSelector(
    (state) => state.DetailsOfSocialImpactAssessmentsDetails
  );

  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [addDosiaDialogOpen, setAddDosiaDialogOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidthMd] = React.useState("md");

  const [pageDosia, setPageDosia] = React.useState(0);
  const [rowsPerPageDosia, setRowsPerPageDosia] = React.useState(5);

  const [page, setPage] = useState(0);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 1,
  });

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [validationErrors, setValidationErrors] = useState({});

  const [validationError, setValidationError] = useState("");
  const [publicDomain, setPublicDomain] = useState("");

  const choices = ["Yes", "No"];

  useEffect(() => {
    dispatch(fetchDeductedAndDepositedList());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    Name_And_Brief_Details_Of_Project: "",
    SIA_Notification_No: "",
    Date_Of_Notification: "",
    Relevant_Web_Link: "",
    Conducted_By_Independent_External_Agency: "",
    Results_Communicated_In_Public_Domain: "",
    isNotApplicable: false,
    Description_Details: "",
    Whether_available_public_domain: "",
  });

  const validateForm = (fieldName) => {
    const requiredFields = formData.isNotApplicable
      ? ["Description_Details"]
      : [
          "Name_And_Brief_Details_Of_Project",
          "SIA_Notification_No",
          "Date_Of_Notification",
          "Relevant_Web_Link",
          "Conducted_By_Independent_External_Agency",
          "Results_Communicated_In_Public_Domain",
          "Whether_available_public_domain",
        ];
    const errors = {};

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
        Whether_available_public_domain:
          formData.Whether_available_public_domain,
        Name_And_Brief_Details_Of_Project:
          formData.Name_And_Brief_Details_Of_Project,
        SIA_Notification_No: "",
        Date_Of_Notification: "",
        Relevant_Web_Link: "",
        Conducted_By_Independent_External_Agency: "",
        Results_Communicated_In_Public_Domain: "",
        isNotApplicable: false,
        Description_Details: "",
      });
      setPublicDomain(null);
    } else {
      setFormData({
        Whether_available_public_domain: "",
        Name_And_Brief_Details_Of_Project: "",
        SIA_Notification_No: "",
        Date_Of_Notification: "",
        Relevant_Web_Link: "",
        Conducted_By_Independent_External_Agency: "",
        Results_Communicated_In_Public_Domain: "",
        isNotApplicable: false,
        Description_Details: "",
      });
      setPublicDomain(null);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, id, checked } = event.target;
    const numericalValue = parseFloat(value);
    const newValidationErrors = { ...validationErrors };
    let errorMessage = "";
    if (numericalValue < 0) {
      errorMessage = "Value must be greater than zero";
    }
    if (name === "Relevant_Web_Link") {
      const urlRegex = new RegExp(
        "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
      );
      const isValidUrl = urlRegex.test(value);
      newValidationErrors[name] = isValidUrl ? "" : "Enter a valid URL";
    } else {
      newValidationErrors[name] = "";
    }

    if (name === "isNotApplicable") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        isNotApplicable: checked,
      }));
    } else {
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
      [name]: errorMessage || newValidationErrors[name],
    }));
  };

  const handleSaveChanges = () => {
    if (!validateForm()) {
      setValidationError("Form validation failed.");
      return;
    }
    const data = formData.isNotApplicable
      ? {
          Description_Details: `Not Applicable, ${formData.Description_Details}`,
        }
      : {
          Whether_available_public_domain:
            formData.Whether_available_public_domain,
          Name_And_Brief_Details_Of_Project:
            formData.Name_And_Brief_Details_Of_Project,
          SIA_Notification_No: formData.SIA_Notification_No,
          Date_Of_Notification: formData.Date_Of_Notification,
          Relevant_Web_Link: formData.Relevant_Web_Link,
          Conducted_By_Independent_External_Agency:
            formData.Conducted_By_Independent_External_Agency,
          Results_Communicated_In_Public_Domain:
            formData.Results_Communicated_In_Public_Domain,
        };

    const editDataCheck = formData.isNotApplicable
      ? {
          id: currentEditId,
          Description_Details: `${formData.Description_Details}`,
        }
      : {
          id: currentEditId,
          Whether_available_public_domain:
            formData.Whether_available_public_domain,
          Name_And_Brief_Details_Of_Project:
            formData.Name_And_Brief_Details_Of_Project,
          SIA_Notification_No: formData.SIA_Notification_No,
          Date_Of_Notification: formData.Date_Of_Notification,
          Relevant_Web_Link: formData.Relevant_Web_Link,
          Conducted_By_Independent_External_Agency:
            formData.Conducted_By_Independent_External_Agency,
          Results_Communicated_In_Public_Domain:
            formData.Results_Communicated_In_Public_Domain,
        };

    if (currentEditId) {
      dispatch(
        editDetailsOfSocialImpactAssessmentsDetail({
          id: currentEditId,
          data: editDataCheck,
        })
      ).then(() => {
        dispatch(
          viewDetailsOfSocialImpactAssessmentsDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );
      });
    } else {
      dispatch(addDetailsOfSocialImpactAssessmentsDetail(data)).then(() => {
        resetData();
        dispatch(
          viewDetailsOfSocialImpactAssessmentsDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );
      });
    }

    addDosiaDialogClose();
  };

  const DosiaChangePage = (event, newPage) => {
    setPage(newPage);
    const newPaginationModel = { ...paginationModel, page: newPage + 1 };
    setPaginationModel(newPaginationModel);
    dispatch(
      viewDetailsOfSocialImpactAssessmentsDetail({
        page: newPage + 1,
        page_size: rowsPerPage,
      })
    );
  };

  const DosiaChangeRowsPerPage = (event) => {
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
      viewDetailsOfSocialImpactAssessmentsDetail({
        page: 1,
        page_size: rowsPerPage,
      })
    );
  };

  const addDosiaDialog = () => {
    setAddDosiaDialogOpen(true);
  };

  const addDosiaDialogClose = () => {
    setAddDosiaDialogOpen(false);
    setCurrentEditId(null);
    resetData(null);
    setPublicDomain(null);
    setFormData({
      Name_And_Brief_Details_Of_Project: "",
      SIA_Notification_No: "",
      Date_Of_Notification: "",
      Relevant_Web_Link: "",
      Conducted_By_Independent_External_Agency: "",
      Results_Communicated_In_Public_Domain: "",
      isNotApplicable: false,
      Description_Details: "",
      Whether_available_public_domain: "",
    });
    setValidationErrors({
      Name_And_Brief_Details_Of_Project: "",
      SIA_Notification_No: "",
      Date_Of_Notification: "",
      Relevant_Web_Link: "",
      Conducted_By_Independent_External_Agency: "",
      Results_Communicated_In_Public_Domain: "",
      isNotApplicable: false,
      Description_Details: "",
      Whether_available_public_domain: "",
    });
    setPublicDomain(null);
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
    dispatch(deleteDetailsOfSocialImpactAssessmentsDetail(currentEditId)).then(
      () => {
        dispatch(
          viewDetailsOfSocialImpactAssessmentsDetail({
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
      Whether_available_public_domain: row.Whether_available_public_domain,
      Name_And_Brief_Details_Of_Project: row.Name_And_Brief_Details_Of_Project,
      SIA_Notification_No: row.SIA_Notification_No,
      Date_Of_Notification: row.Date_Of_Notification,
      Relevant_Web_Link: row.Relevant_Web_Link,
      Conducted_By_Independent_External_Agency:
        row.Conducted_By_Independent_External_Agency,
      Results_Communicated_In_Public_Domain:
        row.Results_Communicated_In_Public_Domain,
      Description_Details: row.Description_Details,
    });

    addDosiaDialog();
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
          title="Details Of Social Impact Assessments"
          className="MuiCardHeader-action-smdown-fullwidth"
          action={
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="button"
              onClick={addDosiaDialog}
              sx={{ width: { xs: "100%", sm: 170 }, maxWidth: "100%" }}
            >
              ADD
            </Button>
          }
        />
        <TableContainer>
          <Table stickyHeader aria-label="Details Of Social Impact Assessments">
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
                    pageDosia * rowsPerPageDosia,
                    pageDosia * rowsPerPageDosia + rowsPerPageDosia
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
          rowsPerPage={rowsPerPageDosia}
          page={page}
          onPageChange={DosiaChangePage}
          onRowsPerPageChange={DosiaChangeRowsPerPage}
        />
      </Card>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidthMd}
        open={addDosiaDialogOpen}
        onClose={addDosiaDialogClose}
      >
        <DialogTitle>
          {currentEditId
            ? "Edit Details of Social Impact Assessments"
            : "Add Details of Social Impact Assessments"}
          <IconButton
            className="MuiIconButton-close"
            aria-label="close"
            onClick={addDosiaDialogClose}
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
          <Grid item xs={12}>
            <Autocomplete
              size="small"
              fullWidth
              id="Whether_available_public_domain"
              name="Whether_available_public_domain"
              options={choices.length > 0 ? choices : []}
              value={formData.Whether_available_public_domain}
              onChange={(event, value) => {
                handleInputChange({
                  target: {
                    name: "Whether_available_public_domain",
                    value,
                  },
                });
                setValidationErrors((prevErrors) => ({
                  ...prevErrors,
                  Whether_available_public_domain: "",
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Whether Available Public Domain"
                  error={!!validationErrors.Whether_available_public_domain}
                  helperText={validationErrors.Whether_available_public_domain}
                />
              )}
            />
          </Grid>
          <Grid container direction="row" spacing={{ xs: 3, sm: 6 }}>
            {formData?.isNotApplicable ? (
              <Grid item xs={12} sm={12} mt={2}>
                <TextField
                  fullWidth
                  size="small"
                  label="Description_Details"
                  id="Description_Details"
                  name="Description_Details"
                  multiline
                  rows={8}
                  value={formData.Description_Details}
                  onChange={handleInputChange}
                  error={!!validationErrors.Description_Details}
                  helperText={validationErrors.Description_Details}
                />
              </Grid>
            ) : (
              <>
                <Grid item xs={12} sm={6} mt={2}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Name and brief details of project"
                    id="Name_And_Brief_Details_Of_Project"
                    name="Name_And_Brief_Details_Of_Project"
                    value={formData.Name_And_Brief_Details_Of_Project}
                    onChange={handleInputChange}
                    error={!!validationErrors.Name_And_Brief_Details_Of_Project}
                    helperText={
                      validationErrors.Name_And_Brief_Details_Of_Project
                    }
                    disabled={!!currentEditId}
                  />
                </Grid>
                <Grid item xs={12} sm={6} mt={2}>
                  <TextField
                    fullWidth
                    size="small"
                    label="SIA Notification No."
                    id="SIA_Notification_No"
                    type="number"
                    name="SIA_Notification_No"
                    value={formData.SIA_Notification_No}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value < 0) {
                        setValidationError("Number should be positive.");
                      } else {
                        handleInputChange(e);
                        setValidationError("");
                      }
                    }}
                    error={!!validationErrors.SIA_Notification_No}
                    helperText={validationErrors.SIA_Notification_No}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Date of notification"
                    id="Date_Of_Notification"
                    type="date"
                    name="Date_Of_Notification"
                    value={formData.Date_Of_Notification}
                    onChange={handleInputChange}
                    error={!!validationErrors.Date_Of_Notification}
                    helperText={validationErrors.Date_Of_Notification}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Relevant Web link"
                    id="Relevant_Web_Link"
                    name="Relevant_Web_Link"
                    value={formData.Relevant_Web_Link}
                    onChange={handleInputChange}
                    error={!!validationErrors.Relevant_Web_Link}
                    helperText={validationErrors.Relevant_Web_Link}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Autocomplete
                    size="small"
                    fullWidth
                    id="Conducted_By_Independent_External_Agency"
                    name="Conducted_By_Independent_External_Agency"
                    options={
                      deducted_DepositedList.length > 0
                        ? deducted_DepositedList
                        : []
                    }
                    value={formData.Conducted_By_Independent_External_Agency}
                    onChange={(event, value) => {
                      handleInputChange({
                        target: {
                          name: "Conducted_By_Independent_External_Agency",
                          value,
                        },
                      });
                      setValidationErrors((prevErrors) => ({
                        ...prevErrors,
                        Conducted_By_Independent_External_Agency: "",
                      }));
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Conducted by independent external agency"
                        error={
                          !!validationErrors.Conducted_By_Independent_External_Agency
                        }
                        helperText={
                          validationErrors.Conducted_By_Independent_External_Agency
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    size="small"
                    fullWidth
                    id="Results_Communicated_In_Public_Domain"
                    name="Results_Communicated_In_Public_Domain"
                    options={
                      deducted_DepositedList.length > 0
                        ? deducted_DepositedList
                        : []
                    }
                    value={formData.Results_Communicated_In_Public_Domain}
                    onChange={(event, value) => {
                      handleInputChange({
                        target: {
                          name: "Results_Communicated_In_Public_Domain",
                          value,
                        },
                      });
                      setValidationErrors((prevErrors) => ({
                        ...prevErrors,
                        Results_Communicated_In_Public_Domain: "",
                      }));
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Results communicated in public domain"
                        error={
                          !!validationErrors.Results_Communicated_In_Public_Domain
                        }
                        helperText={
                          validationErrors.Results_Communicated_In_Public_Domain
                        }
                      />
                    )}
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

export default DetailsOfSocialImpactAssessments;
