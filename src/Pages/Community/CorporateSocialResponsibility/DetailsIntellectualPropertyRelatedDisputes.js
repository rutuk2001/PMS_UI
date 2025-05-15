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
  
  addDetailsIntProtyRtdDisputesDetail,
  deleteDetailsIntProtyRtdDisputesDetail,
  editDetailsIntProtyRtdDisputesDetail,
  viewDetailsIntProtyRtdDisputesDetail,
  clearErrorMessage,
  clearSuccessMessage,
 } from "../../../store/Community/CorporateSocialResponsibility/DetailsIntellectualPropertyRelatedDisputesSlice";
import { fetchFinancialYear } from "../../../store/CommonApi/CommonApiSlice";

const tableColumns = [
  { id: "Financial_Year", label: "Financial Year", width: "7%" },
  { id: "Name_of_Authority", label: "NAME OF AUTHORITY", width: "20%" },
  { id: "Brief_of_The_case", label: "BRIEF OF THE CASE", width: "40%" },
  {
    id: "Corrective_Actions_Taken",
    label: "CORRECTIVE ACTION TAKEN",
    width: "35%",
  },
  { id: "actions", label: "ACTION", align: "right", width: "90px" },
];

function DetailsIntellectualPropertyRelatedDisputes() {

  
  const dispatch = useDispatch();
  const [currentEditId, setCurrentEditId] = useState(null);

  const { finalYear } = useSelector(
    (state) => state.CommonApiDetailSlice
  );

  const { viewReport, error, success, total_page } = useSelector(
    (state) => state.DetailsIntellectualPropertyRelatedDisputesDetails
  );

  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [addDiprdDialogOpen, setAddDiprdDialogOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidthMd] = React.useState("md");

  const [pageDiprd, setPageDiprd] = React.useState(0);
  const [rowsPerPageDiprd, setRowsPerPageDiprd] = React.useState(5);




  
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
  }, [dispatch]);

  const [formData, setFormData] = useState({
    Financial_Year: "",
    Name_of_Authority: "",
    Brief_of_The_case: "",
    Corrective_Actions_Taken: "",
    
  });

  const validateForm = (fieldName) => {
    const requiredFields = [
      "Financial_Year",
      "Name_of_Authority",
      "Brief_of_The_case",
      "Corrective_Actions_Taken",
      
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
        Name_of_Authority: "",
        Brief_of_The_case: "",
        Corrective_Actions_Taken: "",
      });
    } else {
      console.log("else called");

      setFormData({
        Financial_Year: "",
        Name_of_Authority: "",
        Brief_of_The_case: "",
        Corrective_Actions_Taken: "",
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



    const data = {
      Financial_Year: formData.Financial_Year,
      Name_of_Authority: formData.Name_of_Authority,
      Brief_of_The_case: formData.Brief_of_The_case,
      Corrective_Actions_Taken: formData.Corrective_Actions_Taken,
        
    };

    const editDataCheck = {
      id: currentEditId,
      Financial_Year: formData.Financial_Year,
      Name_of_Authority: formData.Name_of_Authority,
      Brief_of_The_case: formData.Brief_of_The_case,
      Corrective_Actions_Taken: formData.Corrective_Actions_Taken,
    
    };

    if (currentEditId) {
      dispatch(
        editDetailsIntProtyRtdDisputesDetail({
          id: currentEditId,
          data: editDataCheck,
        })
      ).then(() => {
        dispatch(
          viewDetailsIntProtyRtdDisputesDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );
      });
    } else {
      dispatch(addDetailsIntProtyRtdDisputesDetail(data)).then(() => {
        resetData();

        dispatch(
          viewDetailsIntProtyRtdDisputesDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );
      });
    }

    addDiprdDialogClose();
  };


  const DiprdChangePage = (event, newPage) => {
    setPage(newPage);
    const newPaginationModel = { ...paginationModel, page: newPage + 1 };
    setPaginationModel(newPaginationModel);
    dispatch(
      viewDetailsIntProtyRtdDisputesDetail({
        page: newPage + 1,
        page_size: rowsPerPage,
      })
    );
  };

  const DiprdChangeRowsPerPage = (event) => {
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
      viewDetailsIntProtyRtdDisputesDetail({
        page: 1,
        page_size: rowsPerPage,
      })
    );
  };

  const addDiprdDialog = () => {
    setAddDiprdDialogOpen(true);
  };

  const addDiprdDialogClose = () => {
    setAddDiprdDialogOpen(false);
    setCurrentEditId(null);
    resetData(null);
    setFormData({
      Financial_Year: "",
      Name_of_Authority: "",
      Brief_of_The_case: "",
      Corrective_Actions_Taken: "",
    });
    setValidationErrors({
      Financial_Year: "",
      Name_of_Authority: "",
      Brief_of_The_case: "",
      Corrective_Actions_Taken: "",
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
    dispatch(deleteDetailsIntProtyRtdDisputesDetail(currentEditId)).then(
      () => {
        dispatch(
          viewDetailsIntProtyRtdDisputesDetail({
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
      Name_of_Authority: row.Name_of_Authority,
      Brief_of_The_case: row.Brief_of_The_case,
      Corrective_Actions_Taken: row.Corrective_Actions_Taken,

    });

    addDiprdDialog();
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
          title="Details Of Intellectual Property Related Disputes"
          className="MuiCardHeader-action-smdown-fullwidth"
          action={
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="button"
              onClick={addDiprdDialog}
              sx={{ width: { xs: "100%", sm: 170 }, maxWidth: "100%" }}
            >
              ADD 
            </Button>
          }
        />
        <TableContainer>
          {/* <Table
            stickyHeader
            aria-label="Details Of Intellectual Property Related Disputes"
          >
            <TableHead>
              <TableRow key="headRowDiprd">
                {columnsDiprd.map((column) => (
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
              {rowsDiprd
                .slice(
                  pageDiprd * rowsPerPageDiprd,
                  pageDiprd * rowsPerPageDiprd + rowsPerPageDiprd
                )
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columnsDiprd.map((column, index) => {
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
                                      onClick={addDiprdDialog}
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
                   <Table stickyHeader aria-label="Details Of Intellectual Property Related Disputes">
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
                    pageDiprd * rowsPerPageDiprd,
                    pageDiprd * rowsPerPageDiprd + rowsPerPageDiprd
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
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={total_page}
          rowsPerPage={rowsPerPageDiprd}
          page={page}
          onPageChange={DiprdChangePage}
          onRowsPerPageChange={DiprdChangeRowsPerPage}
        />
      </Card>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidthMd}
        open={addDiprdDialogOpen}
        onClose={addDiprdDialogClose}
      >
      
        <DialogTitle>
          {currentEditId
            ? "Edit   Details Of Intellectual Property Related Disputes"
            : "Add   Details Of Intellectual Property Related Disputes"}
          <IconButton
            className="MuiIconButton-close"
            aria-label="close"
            onClick={addDiprdDialogClose}
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
              <TextField
                fullWidth
                size="small"
                label="Name of authority"
                
                id="Name_of_Authority"
                name="Name_of_Authority"
                value={formData.Name_of_Authority}                
                onChange={handleInputChange}
                error={!!validationErrors.Name_of_Authority}
                helperText={validationErrors.Name_of_Authority}
              />
             
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Brief of the case"
                id="Brief_of_The_case"
                name="Brief_of_The_case"
                value={formData.Brief_of_The_case}                
                onChange={handleInputChange}
                error={!!validationErrors.Brief_of_The_case}
                helperText={validationErrors.Brief_of_The_case}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Corrective action taken"
                id="Corrective_Actions_Taken"
                name="Corrective_Actions_Taken"
                value={formData.Corrective_Actions_Taken}                
                onChange={handleInputChange}
                error={!!validationErrors.Corrective_Actions_Taken}
                helperText={validationErrors.Corrective_Actions_Taken}
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

export default DetailsIntellectualPropertyRelatedDisputes;
