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
  addBenefitsDerivedSharedInteDetail,
  deleteBenefitsDerivedSharedInteDetail,
  editBenefitsDerivedSharedInteDetail,
  viewBenefitsDerivedSharedInteDetail,
  clearErrorMessage,
  clearSuccessMessage,
} from "../../../store/Community/CorporateSocialResponsibility/BenefitsDerivedAndSharedIntellectualPropertySlice";
import { fetchDeductedAndDepositedList, fetchFinancialYear } from "../../../store/CommonApi/CommonApiSlice";

const tableColumns = [
  { id: "Financial_Year", label: "Financial Year", width: "14%" },
  { id: "IP", label: "IP", width: "24%" },
  { id: "Owned", label: "OWNED", width: "13%" },
  { id: "Benefit_Shared", label: "BENEFIT SHARED", width: "14%" },
  { id: "Basis_of_Calculating_Benefit_Share", label: "BASIS OF CALCULATING BENEFIT SHARE", width: "22%" },
  { id: "actions", label: "ACTION", align: "right", width: "90px" },
];

function BenefitsDerivedAndSharedIntellectualProperty() {
  const dispatch = useDispatch();
  const [currentEditId, setCurrentEditId] = useState(null);

  const { finalYear,deducted_DepositedList } = useSelector((state) => state.CommonApiDetailSlice);

  const { viewReport, error, success, total_page } = useSelector(
    (state) => state.BenefitsDerivedAndSharedIntellectualPropertyDetails
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
    dispatch(fetchDeductedAndDepositedList());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    Financial_Year: "",
    IP: "",
    Owned: "",
    Benefit_Shared: "",
    Basis_of_Calculating_Benefit_Share: "",
  });

  const validateForm = (fieldName) => {
    const requiredFields = [
      "Financial_Year",
      "IP",
      "Owned",
      "Benefit_Shared",
      "Basis_of_Calculating_Benefit_Share",
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
        IP: "",
        Owned: "",
        Benefit_Shared: "",
        Basis_of_Calculating_Benefit_Share: "",
      });
    } else {
      console.log("else called");

      setFormData({
        Financial_Year: "",
        IP: "",
        Owned: "",
        Benefit_Shared: "",
        Basis_of_Calculating_Benefit_Share: "",
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
      IP: formData.IP,
      Owned: formData.Owned,
      Benefit_Shared: formData.Benefit_Shared,
      Basis_of_Calculating_Benefit_Share: formData.Basis_of_Calculating_Benefit_Share,
    };

    const editDataCheck = {
      id: currentEditId,
      Financial_Year: formData.Financial_Year,
      IP: formData.IP,
      Owned: formData.Owned,
      Benefit_Shared: formData.Benefit_Shared,
      Basis_of_Calculating_Benefit_Share: formData.Basis_of_Calculating_Benefit_Share,
      
    };

    if (currentEditId) {
      dispatch(
        editBenefitsDerivedSharedInteDetail({
          id: currentEditId,
          data: editDataCheck,
        })
      ).then(() => {
        dispatch(
          viewBenefitsDerivedSharedInteDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );
      });
    } else {
      dispatch(addBenefitsDerivedSharedInteDetail(data)).then(() => {
        resetData();

        dispatch(
          viewBenefitsDerivedSharedInteDetail({
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
      viewBenefitsDerivedSharedInteDetail({
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
      viewBenefitsDerivedSharedInteDetail({
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
      IP: "",
      Owned: "",
      Benefit_Shared: "",
      Basis_of_Calculating_Benefit_Share: "",
    });
    setValidationErrors({
      Financial_Year: "",
      IP: "",
      Owned: "",
      Benefit_Shared: "",
      Basis_of_Calculating_Benefit_Share: "",
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
    dispatch(deleteBenefitsDerivedSharedInteDetail(currentEditId)).then(() => {
      dispatch(
        viewBenefitsDerivedSharedInteDetail({
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
      IP: row.IP,
      Owned: row.Owned,
      Benefit_Shared: row.Benefit_Shared,
      Basis_of_Calculating_Benefit_Share: row.Basis_of_Calculating_Benefit_Share,
     
    });

    addBdasipDialog();
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
          title="Benefits Derived And Shared From Intellectual Property"
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
          {/* <Table
            stickyHeader
            aria-label="Benefits Derived And Shared From Intellectual Property"
          >
            <TableHead>
              <TableRow key="headRowBdasip">
                {columnsBdasip.map((column) => (
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
              {rowsBdasip
                .slice(
                  pageBdasip * rowsPerPageBdasip,
                  pageBdasip * rowsPerPageBdasip + rowsPerPageBdasip
                )
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columnsBdasip.map((column, index) => {
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
                                      onClick={addBdasipDialog}
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

<Table stickyHeader aria-label="Benefits Derived And Shared From Intellectual Property">
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
            ? "Edit  Benefits Derived And Shared From Intellectual Property"
            : "Add  Benefits Derived And Shared From Intellectual Property"}
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
                id="Owned"
                name="Owned"
                options={deducted_DepositedList.length > 0 ? deducted_DepositedList : []}
                value={formData.Owned}
                onChange={(event, value) => {
                  handleInputChange({
                    target: { name: "Owned", value },
                  });
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    Owned: "",
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Owned/ Acquired"
                    error={!!validationErrors.Owned}
                    helperText={validationErrors.Owned}
                  />
                )}
                
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                size="small"
                fullWidth
                id="Benefit_Shared"
                name="Benefit_Shared"
                options={deducted_DepositedList.length > 0 ? deducted_DepositedList : []}
                value={formData.Benefit_Shared}
                onChange={(event, value) => {
                  handleInputChange({
                    target: { name: "Benefit_Shared", value },
                  });
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    Benefit_Shared: "",
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Benefit shared"
                    error={!!validationErrors.Benefit_Shared}
                    helperText={validationErrors.Benefit_Shared}
                  />
                )}
                
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="Basis of calculating benefit share"
                name="Basis_of_Calculating_Benefit_Share"
                value={formData.Basis_of_Calculating_Benefit_Share}
               
                onChange={handleInputChange}
                error={
                  !!validationErrors.Basis_of_Calculating_Benefit_Share
                }
                helperText={
                  validationErrors.Basis_of_Calculating_Benefit_Share
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Intellectual Property based on traditional knowledge"
                id="IP"
                name="IP"
                value={formData.IP}
              
                onChange={handleInputChange}
                error={
                  !!validationErrors.IP
                }
                helperText={
                  validationErrors.IP
                }
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

export default BenefitsDerivedAndSharedIntellectualProperty;
