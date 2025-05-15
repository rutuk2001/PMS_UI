import React, { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  Grid,
  Button,
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
  addDetailsBeneficiariesCsrProjectsDetail,
  deleteDetailsBeneficiariesCsrProjectsDetail,
  editDetailsBeneficiariesCsrProjectsDetail,
  viewDetailsBeneficiariesCsrProjectsDetail,
  clearErrorMessage,
  clearSuccessMessage,
} from "../../../store/Community/CorporateSocialResponsibility/DetailsBeneficiariesCsrProjectsSlice";

const tableColumns = [
  { id: "sno", label: "S.NO.", width: "7%" },
  { id: "CSR_Project", label: "CRF PROJECT", width: "20%" },
  {
    id: "NO_Of_Persons_Benefitted_From_CSR_Projects",
    label: "NO. OF PERSONS BENEFITTED FROM CSR PROJECTS",
    width: "30%",
  },
  {
    id: "Percent_of_Beneficiaries_From_Vulnerable_And_Merginalized_Groups",
    label: "% OF BENEFICIARIES FROM VULNERABLE AND MARGINALIZED GROUPS",
    width: "40%",
  },
  { id: "actions", label: "ACTION", align: "right", width: "90px" },
];

function DetailsBeneficiariesCsrProjects() {
  const dispatch = useDispatch();
  const [currentEditId, setCurrentEditId] = useState(null);

  const { viewReport, error, success, total_page } = useSelector(
    (state) => state.DetailsBeneficiariesCsrProjectsDetails
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

  const [formData, setFormData] = useState({
    CSR_Project: "",
    NO_Of_Persons_Benefitted_From_CSR_Projects: "",
    Percent_of_Beneficiaries_From_Vulnerable_And_Merginalized_Groups: "",
  });

  const validateForm = (fieldName) => {
    const requiredFields = [
      "CSR_Project",
      "NO_Of_Persons_Benefitted_From_CSR_Projects",
      "Percent_of_Beneficiaries_From_Vulnerable_And_Merginalized_Groups",
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
        CSR_Project: formData.CSR_Project,
        NO_Of_Persons_Benefitted_From_CSR_Projects: "",
        Percent_of_Beneficiaries_From_Vulnerable_And_Merginalized_Groups: "",
      });
    } else {
      console.log("else called");

      setFormData({
        CSR_Project: "",
        NO_Of_Persons_Benefitted_From_CSR_Projects: "",
        Percent_of_Beneficiaries_From_Vulnerable_And_Merginalized_Groups: "",
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
      CSR_Project: formData.CSR_Project,
      NO_Of_Persons_Benefitted_From_CSR_Projects:
        formData.NO_Of_Persons_Benefitted_From_CSR_Projects,
      Percent_of_Beneficiaries_From_Vulnerable_And_Merginalized_Groups:
        formData.Percent_of_Beneficiaries_From_Vulnerable_And_Merginalized_Groups,
    };

    const editDataCheck = {
      id: currentEditId,
      CSR_Project: formData.CSR_Project,
      NO_Of_Persons_Benefitted_From_CSR_Projects:
        formData.NO_Of_Persons_Benefitted_From_CSR_Projects,
      Percent_of_Beneficiaries_From_Vulnerable_And_Merginalized_Groups:
        formData.Percent_of_Beneficiaries_From_Vulnerable_And_Merginalized_Groups,
    };

    if (currentEditId) {
      dispatch(
        editDetailsBeneficiariesCsrProjectsDetail({
          id: currentEditId,
          data: editDataCheck,
        })
      ).then(() => {
        dispatch(
          viewDetailsBeneficiariesCsrProjectsDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );
      });
    } else {
      dispatch(addDetailsBeneficiariesCsrProjectsDetail(data)).then(() => {
        resetData();

        dispatch(
          viewDetailsBeneficiariesCsrProjectsDetail({
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
      viewDetailsBeneficiariesCsrProjectsDetail({
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
      viewDetailsBeneficiariesCsrProjectsDetail({
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
      CSR_Project: "",
      NO_Of_Persons_Benefitted_From_CSR_Projects: "",
      Percent_of_Beneficiaries_From_Vulnerable_And_Merginalized_Groups: "",
    });
    setValidationErrors({
      CSR_Project: "",
      NO_Of_Persons_Benefitted_From_CSR_Projects: "",
      Percent_of_Beneficiaries_From_Vulnerable_And_Merginalized_Groups: "",
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
    dispatch(deleteDetailsBeneficiariesCsrProjectsDetail(currentEditId)).then(
      () => {
        dispatch(
          viewDetailsBeneficiariesCsrProjectsDetail({
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
      CSR_Project: row.CSR_Project,
      NO_Of_Persons_Benefitted_From_CSR_Projects:
        row.NO_Of_Persons_Benefitted_From_CSR_Projects,
      Percent_of_Beneficiaries_From_Vulnerable_And_Merginalized_Groups:
        row.Percent_of_Beneficiaries_From_Vulnerable_And_Merginalized_Groups,
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
          title="Details Of Beneficiaries Of CSR Projects"
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
          {/* <Table
            stickyHeader
            aria-label="Details Of Beneficiaries Of CSR Projects"
          >
            <TableHead>
              <TableRow key="headRowDbcp">
                {columnsDbcp.map((column) => (
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
              {rowsDbcp
                .slice(
                  pageDbcp * rowsPerPageDbcp,
                  pageDbcp * rowsPerPageDbcp + rowsPerPageDbcp
                )
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columnsDbcp.map((column, index) => {
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
                                      onClick={addDbcpDialog}
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
            aria-label="Details Of Beneficiaries Of CSR Projects"
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
                    pageDbcp * rowsPerPageDbcp,
                    pageDbcp * rowsPerPageDbcp + rowsPerPageDbcp
                  )
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {/* {tableColumns.map((column) => {
                          const value = row[column.id]; */}
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
                              ) : column.id ===
                                "Percent_of_Beneficiaries_From_Vulnerable_And_Merginalized_Groups" ? (
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
            ? "Edit Details of beneficiaries of CSR Projects"
            : "Add Details of beneficiaries of CSR Projects"}
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
              <TextField
                fullWidth
                size="small"
                label="CSR Project"
                id="CSR_Project"
                name="CSR_Project"
                value={formData.CSR_Project}                
                onChange={handleInputChange}
                error={!!validationErrors.CSR_Project}
                helperText={validationErrors.CSR_Project}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="No. of persons benefitted from CSR Projects"
                id="NO_Of_Persons_Benefitted_From_CSR_Projects"
                name="NO_Of_Persons_Benefitted_From_CSR_Projects"
                value={formData.NO_Of_Persons_Benefitted_From_CSR_Projects}
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
                error={!!validationErrors.NO_Of_Persons_Benefitted_From_CSR_Projects}
                helperText={validationErrors.NO_Of_Persons_Benefitted_From_CSR_Projects}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="% of beneficiaries from vulnerable and marginalized groups"
                id="Percent_of_Beneficiaries_From_Vulnerable_And_Merginalized_Groups"
                name="Percent_of_Beneficiaries_From_Vulnerable_And_Merginalized_Groups"
                value={formData.Percent_of_Beneficiaries_From_Vulnerable_And_Merginalized_Groups}
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
                error={!!validationErrors.Percent_of_Beneficiaries_From_Vulnerable_And_Merginalized_Groups}
                helperText={validationErrors.Percent_of_Beneficiaries_From_Vulnerable_And_Merginalized_Groups}
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

export default DetailsBeneficiariesCsrProjects;
