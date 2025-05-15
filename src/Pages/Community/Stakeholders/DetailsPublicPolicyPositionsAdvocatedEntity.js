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

import DeleteConfirmDialog from "./../../../Components/DeleteConfirmDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  addDpppaeDetail,
  clearDpppaeErrorMessage,
  clearDpppaeSuccessMessage,
  deleteDpppaeDetails,
  editDpppaeDetail,
  viewDpppaeDetail,
} from "../../../store/Community/stakeholder/DpppaeSlice";
import { toast } from "react-toastify";
import InformationOnCsrProjectsSlice from "../../../store/Community/CorporateSocialResponsibility/InformationOnCsrProjectsSlice";
import { Description } from "@mui/icons-material";
import { fetchFinancialYear } from "../../../store/CommonApi/CommonApiSlice";

const addDetails = [
  { id: "Financial_Year", label: "FY", width: "7%" },
  {
    id: "Public_Policy_Advocated",
    label: "Public Policy Advocated",
    width: "15%",
  },
  {
    id: "Information_Available_In_Public_Domain",
    label: "Information Available In Public Domain",
    width: "15%",
  },
  {
    id: "Frequency_Of_Engagement",
    label: "Frequency Of Engagement",
    width: "17%",
  },
  { id: "Web_Link", label: "Web Link", width: "15%" },
  { id: "Description", label: "Description", width: "15%" },
  {
    id: "Method_Resorted_For_Such_Advocacy",
    label: "Method Resorted For Such Advocacy",
    width: "18%",
  },
  { id: "actions", label: "ACTION", align: "right", width: "90px" },
];

const columnsDpppae = [
  { id: "Sr_No", label: "S. NO.", width: "7%" },
  { id: "Financial_Year", label: "FY", width: "7%" },
  {
    id: "Public_Policy_Advocated",
    label: "PUBLIC POLICY ADVOCATED",
    width: "15%",
  },
  {
    id: "Information_Available_In_Public_Domain",
    label: "INFORMATION AVAILABLE IN PUBLIC DOMAIN?",
    width: "15%",
  },
  {
    id: "Frequency_Of_Engagement",
    label: "FREQUENCY OF ENGAGEMENT",
    width: "17%",
  },
  { id: "Web_Link", label: "WEB LINK, IF AVAILABLE", width: "15%" },
  {
    id: "Method_Resorted_For_Such_Advocacy",
    label: "METHOD RESORTED FOR SUCH ADVOCACY",
    width: "18%",
  },
  { id: "Description_Details", label: "DESCRIPTION", width: "15%" },
  { id: "actions", label: "ACTION", align: "right", width: "90px" },
];

const informationAvailablePublicDomainList = ["Yes", "No"];
const frequencyOfEngagementList = ["Half yearly"];

function DetailsPublicPolicyPositionsAdvocatedEntity() {
  const dispatch = useDispatch();
  const { viewReport, error, success, total_page } = useSelector(
    (state) => state.DpppaeSliceDetails
  );
  const { finalYear } = useSelector((state) => state.CommonApiDetailSlice);

  useEffect(() => {
    dispatch(fetchFinancialYear());
  }, [dispatch]);

  const [validationError, setValidationError] = useState({
    Financial_Year: "",
    Public_Policy_Advocated: "",
    Information_Available_In_Public_Domain: "",
    Frequency_Of_Engagement: "",
    Web_Link: "",
    Method_Resorted_For_Such_Advocacy: "",
    Description: "",
  });

  const [
    informationAvailablePublicDomain,
    setinformationAvailablePublicDomain,
  ] = useState(null);
  const [frequencyOfEngagement, setfrequencyOfEngagement] = useState(null);

  const [financialYear, setFinancialYear] = useState(null);

  const handleFinancialYearChange = (event, value) => {
    setFinancialYear(value);
    setValidationError({
      ...validationError,
      Financial_Year: "",
    });
  };

  const handleInformationAvailablePublicDomainChange = (event, value) => {
    setinformationAvailablePublicDomain(value);
    setValidationError({
      ...validationError,
      Information_Available_In_Public_Domain: "",
    });
  };

  const handleFrequencyOfEngagementChange = (event, value) => {
    setfrequencyOfEngagement(value);
    setValidationError({
      ...validationError,
      Frequency_Of_Engagement: "",
    });
  };

  const [formData, setFormData] = useState({
    Public_Policy_Advocated: "",
    Web_Link: "",
    Method_Resorted_For_Such_Advocacy: "",
    Description: "",
  });

  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [addDpppaeDialogOpen, setAddDpppaeDialogOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidthMd] = React.useState("md");

  const [pageDpppae, setPageDpppae] = React.useState(0);
  const [rowsPerPageDpppae, setRowsPerPageDpppae] = React.useState(5);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [page, setPage] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 1,
  });
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const DpppaeChangePage = (event, newPage) => {
    setPage(newPage);
    const newPaginationModel = { ...paginationModel, page: newPage + 1 };
    setPaginationModel(newPaginationModel);
    dispatch(
      viewDpppaeDetail({
        page: newPage + 1,
        page_size: rowsPerPage,
      })
    );
  };

  const DpppaeChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(+event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPageDpppae(0);
    const newPaginationModel = {
      ...paginationModel,
      page: 1,
      pageSize: newRowsPerPage,
    };
    setPaginationModel(newPaginationModel);
    dispatch(
      viewDpppaeDetail({
        page: 1,
        page_size: rowsPerPage,
      })
    );
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
    if (id === "Web_Link") {
      const regex = new RegExp(
        "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
      );
      const isValidUrl = regex.test(value);
      setValidationError((prevState) => ({
        ...prevState,
        [id]: isValidUrl ? "" : "Enter a valid URL",
      }));
    } else if (id === "Description") {
      const maxLength = 2000;
      if (value.length > maxLength) {
        setValidationError((prevState) => ({
          ...prevState,
          [id]: `Maximum length exceeded. You can enter ${maxLength} characters.`,
        }));
      } else {
        setValidationError((prevState) => ({
          ...prevState,
          [id]: "",
        }));
      }
    } else {
      setValidationError((prevState) => ({
        ...prevState,
        [id]: "",
      }));
    }
  };

  const addDpppaeDialog = () => {
    setAddDpppaeDialogOpen(true);
  };

  const addDpppaeDialogClose = () => {
    setAddDpppaeDialogOpen(false);
    setCurrentEditId(null);
    setFormData({
      Public_Policy_Advocated: "",
      Web_Link: "",
      Method_Resorted_For_Such_Advocacy: "",
      Description: "",
    });
    setValidationError({
      Public_Policy_Advocated: "",
      Information_Available_In_Public_Domain: "",
      Frequency_Of_Engagement: "",
      Web_Link: "",
      Method_Resorted_For_Such_Advocacy: "",
      Description: "",
      Financial_Year: "",
    });
    setinformationAvailablePublicDomain(null);
    setfrequencyOfEngagement(null);
    setFinancialYear(null);
  };

  const resetData = () => {
    if (currentEditId) {
      setFinancialYear(financialYear);
      setinformationAvailablePublicDomain(informationAvailablePublicDomain);
      setfrequencyOfEngagement(frequencyOfEngagement);
      setFormData({
        Public_Policy_Advocated: "",
        Web_Link: "",
        Method_Resorted_For_Such_Advocacy: "",
        Description: "",
      });
    } else {
      setFinancialYear(null);
      setinformationAvailablePublicDomain(null);
      setfrequencyOfEngagement(null);
      setFormData({
        Public_Policy_Advocated: "",
        Web_Link: "",
        Method_Resorted_For_Such_Advocacy: "",
        Description: "",
      });
    }
    setValidationError({
      Financial_Year: "",
      Public_Policy_Advocated: "",
      Information_Available_In_Public_Domain: "",
      Frequency_Of_Engagement: "",
      Web_Link: "",
      Method_Resorted_For_Such_Advocacy: "",
      Description: "",
    });
  };

  const handleSaveChanges = () => {
    let newErrors = {
      Financial_Year: "",
      Description: "",
    };

    let valid = true;
    if (!formData.Description || formData.Description.length === 0) {
      newErrors.Description = "Description is required";
      valid = false;
    } else if (formData.Description.length > 2000) {
      newErrors.Description = `Maximum length exceeded. You can enter ${2000} characters.`;
      valid = false;
    }

    if (!financialYear) {
      newErrors.Financial_Year = "Financial Year is required";
      valid = false;
    }
    // if (!informationAvailablePublicDomain) {
    //   newErrors.Information_Available_In_Public_Domain =
    //     "This Field is required";
    //   valid = false;
    // }

    // if (!frequencyOfEngagement) {
    //   newErrors.Frequency_Of_Engagement = "This Field is required";
    //   valid = false;
    // }

    // if (!formData.Public_Policy_Advocated) {
    //   newErrors.Public_Policy_Advocated = "This Field is required";
    //   valid = false;
    // }

    // if (!formData.Method_Resorted_For_Such_Advocacy) {
    //   newErrors.Method_Resorted_For_Such_Advocacy = "This Field is required";
    //   valid = false;
    // }

    // if (!formData.Web_Link) {
    //   newErrors.Web_Link = "URL of Published Results is required";
    //   valid = false;
    // } else {
    //   const urlRegex = new RegExp(
    //     "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
    //   );
    //   if (!urlRegex.test(formData.Web_Link)) {
    //     newErrors.Web_Link = "Enter a valid URL";
    //     valid = false;
    //   }
    // }

    setValidationError(newErrors);

    if (!valid) {
      return;
    }
    const data = {
      Financial_Year: financialYear,
      Public_Policy_Advocated: formData.Public_Policy_Advocated,
      Information_Available_In_Public_Domain: informationAvailablePublicDomain,
      Frequency_Of_Engagement: frequencyOfEngagement,
      Web_Link: formData.Web_Link,
      Method_Resorted_For_Such_Advocacy:
        formData.Method_Resorted_For_Such_Advocacy,
      Description_Details: formData.Description,
    };

    const editDataCheck = {
      id: currentEditId,
      ...data,
    };
    if (currentEditId) {
      dispatch(
        editDpppaeDetail({ id: currentEditId, data: editDataCheck })
      ).then(() => {
        dispatch(
          viewDpppaeDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );
        resetData();
      });
    } else {
      dispatch(addDpppaeDetail(data)).then(() => {
        resetData();
        dispatch(
          viewDpppaeDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );
      });
    }
    addDpppaeDialogClose();
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
    dispatch(deleteDpppaeDetails(currentEditId)).then(() => {
      dispatch(
        viewDpppaeDetail({
          page: 1,
          page_size: 5,
        })
      );
    });
  };

  const handleEdit = (row) => {
    setCurrentEditId(row.id);
    setFinancialYear(row.Financial_Year);
    setinformationAvailablePublicDomain(
      row.Information_Available_In_Public_Domain
    );
    setfrequencyOfEngagement(row.Frequency_Of_Engagement);
    setFormData({
      Public_Policy_Advocated: row.Public_Policy_Advocated,
      Web_Link: row.Web_Link,
      Method_Resorted_For_Such_Advocacy: row.Method_Resorted_For_Such_Advocacy,
      Description: row.Description_Details,
    });
    addDpppaeDialog();
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(clearDpppaeSuccessMessage());
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearDpppaeErrorMessage());
    }
  }, [error, dispatch]);

  return (
    <>
      <Card className="card">
        <CardHeader
          title="Details Of Public Policy Positions Advocated By The Entity"
          className="MuiCardHeader-action-smdown-fullwidth"
          action={
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="button"
              onClick={addDpppaeDialog}
              sx={{ width: { xs: "100%", sm: 170 }, maxWidth: "100%" }}
            >
              ADD
            </Button>
          }
        />
        <TableContainer>
          <Table
            stickyHeader
            aria-label="Details Of Public Policy Positions Advocated By The Entity"
          >
            <TableHead>
              <TableRow key="headRowDpppae">
                {columnsDpppae.map((column) => (
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
                  <TableCell colSpan={columnsDpppae.length} align="center">
                    <Typography variant="body1">No data found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                viewReport?.data
                  ?.slice(
                    pageDpppae * rowsPerPageDpppae,
                    pageDpppae * rowsPerPageDpppae + rowsPerPageDpppae
                  )
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {columnsDpppae.map((column) => {
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
          rowsPerPage={rowsPerPageDpppae}
          page={page}
          onPageChange={DpppaeChangePage}
          onRowsPerPageChange={DpppaeChangeRowsPerPage}
        />
      </Card>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidthMd}
        open={addDpppaeDialogOpen}
        onClose={addDpppaeDialogClose}
      >
        <DialogTitle>
          {currentEditId
            ? "Edit Details Of Public Policy Positions Advocated By The Entity"
            : "Add Details Of Public Policy Positions Advocated By The Entity"}

          <IconButton
            className="MuiIconButton-close"
            aria-label="close"
            onClick={addDpppaeDialogClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <IconButton
          className="MuiIconButton-close"
          aria-label="close"
          onClick={addDpppaeDialogClose}
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
            <Grid item xs={12} sm={6}>
              {addDetails
                .filter(
                  (column) =>
                    column.id !== "actions" &&
                    column.id !== "Information_Available_In_Public_Domain" &&
                    column.id !== "Frequency_Of_Engagement" &&
                    column.id !== "Web_Link" &&
                    column.id !== "Method_Resorted_For_Such_Advocacy" &&
                    column.id !== "Description" &&
                    column.id !== "Financial_Year"
                )
                .map((column) => (
                  <Grid item xs={12}>
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
            <Grid item xs={12} sm={6}>
              {addDetails
                .filter(
                  (column) =>
                    column.id !== "actions" &&
                    column.id !== "Information_Available_In_Public_Domain" &&
                    column.id !== "Frequency_Of_Engagement" &&
                    column.id !== "Web_Link" &&
                    column.id !== "Public_Policy_Advocated" &&
                    column.id !== "Description" &&
                    column.id !== "Financial_Year"
                )
                .map((column) => (
                  <Grid item xs={12}>
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
            <Grid item xs={12} sm={6}>
              <Autocomplete
                size="small"
                fullWidth
                id="informationAvailablePublicDomainList"
                options={informationAvailablePublicDomainList}
                value={informationAvailablePublicDomain}
                disabled={!!currentEditId}
                onChange={handleInformationAvailablePublicDomainChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Information available in public domain?"
                    error={
                      !!validationError.Information_Available_In_Public_Domain
                    }
                    helperText={
                      validationError.Information_Available_In_Public_Domain
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                size="small"
                fullWidth
                id="frequencyOfEngagementList"
                options={frequencyOfEngagementList}
                value={frequencyOfEngagement}
                disabled={!!currentEditId}
                onChange={handleFrequencyOfEngagementChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Frequency of engagement"
                    error={!!validationError.Frequency_Of_Engagement}
                    helperText={validationError.Frequency_Of_Engagement}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {addDetails
                .filter(
                  (column) =>
                    column.id !== "actions" &&
                    column.id !== "Information_Available_In_Public_Domain" &&
                    column.id !== "Frequency_Of_Engagement" &&
                    column.id !== "Public_Policy_Advocated" &&
                    column.id !== "Method_Resorted_For_Such_Advocacy" &&
                    column.id !== "Description" &&
                    column.id !== "Financial_Year"
                )
                .map((column) => (
                  <Grid item xs={12} mb={2}>
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
          <Grid item xs={12} mt={2}>
            {addDetails
              .filter(
                (column) =>
                  column.id !== "actions" &&
                  column.id !== "Information_Available_In_Public_Domain" &&
                  column.id !== "Frequency_Of_Engagement" &&
                  column.id !== "Public_Policy_Advocated" &&
                  column.id !== "Method_Resorted_For_Such_Advocacy" &&
                  column.id !== "Web_Link" &&
                  column.id !== "Financial_Year"
              )
              .map((column) => (
                <Grid item xs={12} mb={2}>
                  <TextField
                    fullWidth
                    size="small"
                    multiline={true}
                    rows={8}
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

export default DetailsPublicPolicyPositionsAdvocatedEntity;
