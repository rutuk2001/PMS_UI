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

import DeleteConfirmDialog from "./../../../Components/DeleteConfirmDialog";
import { useDispatch, useSelector } from "react-redux";
import { fetchFinancialYear } from "../../../store/CommonApi/CommonApiSlice";
import {
  addDiracceDetail,
  clearDiracceErrorMessage,
  clearDiracceSuccessMessage,
  deleteDiracceDetails,
  editDiracceDetail,
  viewDiracceDetail,
} from "../../../store/Community/stakeholder/DiracceSlice";
import { toast } from "react-toastify";

const addDetails = [
  { id: "Financial_Year", label: "FY", width: "7%" },
  { id: "Name_OF_Authority", label: "NAME OF AUTHORITY", width: "20%" },
  { id: "Brief_Of_The_Case", label: "BRIEF OF THE CASE", width: "38%" },
  {
    id: "Corrective_Action_Taken",
    label: "CORRECTIVE ACTION TAKEN",
    width: "30%",
  },
  { id: "actions", label: "ACTION", align: "right", width: "90px" },
];

const columnsDiracce = [
  { id: "Financial_Year", label: "FY", width: "7%" },
  { id: "Name_OF_Authority", label: "NAME OF AUTHORITY", width: "20%" },
  { id: "Brief_Of_The_Case", label: "BRIEF OF THE CASE", width: "38%" },
  {
    id: "Corrective_Action_Taken",
    label: "CORRECTIVE ACTION TAKEN",
    width: "30%",
  },
  { id: "actions", label: "ACTION", align: "right", width: "90px" },
];

function DetailsIssuesRelatedAntiCompetitiveConductEntity() {
  const dispatch = useDispatch();
  const { viewReport, error, success, total_page } = useSelector(
    (state) => state.DiracceSliceDetails
  );

  const { finalYear } = useSelector((state) => state.CommonApiDetailSlice);

  useEffect(() => {
    dispatch(fetchFinancialYear());
  }, [dispatch]);

  const [validationError, setValidationError] = useState({
    Financial_Year: "",
    Name_OF_Authority: "",
    Brief_Of_The_Case: "",
    Corrective_Action_Taken: "",
  });

  const [financialYear, setFinancialYear] = useState(null);

  const handleFinancialYearChange = (event, value) => {
    setFinancialYear(value);
    setValidationError({
      ...validationError,
      Financial_Year: "",
    });
  };

  const [formData, setFormData] = useState({
    Name_OF_Authority: "",
    Brief_Of_The_Case: "",
    Corrective_Action_Taken: "",
  });
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [addDiracceDialogOpen, setAddDiracceDialogOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidthMd] = React.useState("md");

  const [pageDiracce, setPageDiracce] = React.useState(0);
  const [rowsPerPageDiracce, setRowsPerPageDiracce] = React.useState(5);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [page, setPage] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 1,
  });
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const DiracceChangePage = (event, newPage) => {
    setPage(newPage);
    const newPaginationModel = { ...paginationModel, page: newPage + 1 };
    setPaginationModel(newPaginationModel);
    dispatch(
      viewDiracceDetail({
        page: newPage + 1,
        page_size: rowsPerPage,
      })
    );
  };

  const DiracceChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(+event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPageDiracce(0);
    const newPaginationModel = {
      ...paginationModel,
      page: 1,
      pageSize: newRowsPerPage,
    };
    setPaginationModel(newPaginationModel);

    dispatch(
      viewDiracceDetail({
        page: 1,
        page_size: rowsPerPage,
      })
    );
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setValidationError({
      ...validationError,
      [id]: "",
    });

    setFormData({ ...formData, [id]: value });
  };

  const addDiracceDialog = () => {
    setAddDiracceDialogOpen(true);
  };

  const addDiracceDialogClose = () => {
    setAddDiracceDialogOpen(false);
    setCurrentEditId(null);
    setFormData({
      Name_OF_Authority: "",
      Brief_Of_The_Case: "",
      Corrective_Action_Taken: "",
    });
    setValidationError({
      Financial_Year: "",
      Name_OF_Authority: "",
      Brief_Of_The_Case: "",
      Corrective_Action_Taken: "",
    });
    setFinancialYear(null);
  };

  const resetData = () => {
    if (currentEditId) {
      setFinancialYear(financialYear);
      setFormData({
        Name_OF_Authority: "",
        Brief_Of_The_Case: "",
        Corrective_Action_Taken: "",
      });
    } else {
      setFinancialYear(null);
      setFormData({
        Name_OF_Authority: "",
        Brief_Of_The_Case: "",
        Corrective_Action_Taken: "",
      });
    }
    setValidationError({
      Financial_Year: "",
      Name_OF_Authority: "",
      Brief_Of_The_Case: "",
      Corrective_Action_Taken: "",
    });
  };

  const handleSaveChanges = () => {
    let newErrors = {
      Financial_Year: "",
      Name_OF_Authority: "",
      Brief_Of_The_Case: "",
      Corrective_Action_Taken: "",
    };

    let valid = true;
    if (!financialYear) {
      newErrors.Financial_Year = "Financial Year is required";
      valid = false;
    }

    if (!formData.Name_OF_Authority) {
      newErrors.Name_OF_Authority = "Name of Authority is required";
      valid = false;
    }

    if (!formData.Brief_Of_The_Case) {
      newErrors.Brief_Of_The_Case = "Brief of the Case is required";
      valid = false;
    }

    if (!formData.Corrective_Action_Taken) {
      newErrors.Corrective_Action_Taken = "Corrective Action  is required";
      valid = false;
    }

    setValidationError(newErrors);

    if (!valid) {
      return;
    }

    const data = {
      Financial_Year: financialYear,
      Name_OF_Authority: formData.Name_OF_Authority,
      Brief_Of_The_Case: formData.Brief_Of_The_Case,
      Corrective_Action_Taken: formData.Corrective_Action_Taken,
    };

    const editDataCheck = {
      id: currentEditId,
      ...data,
    };
    if (currentEditId) {
      dispatch(
        editDiracceDetail({ id: currentEditId, data: editDataCheck })
      ).then(() => {
        dispatch(
          viewDiracceDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );
        resetData();
      });
    } else {
      dispatch(addDiracceDetail(data)).then(() => {
        resetData();
        dispatch(
          viewDiracceDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );
      });
    }
    addDiracceDialogClose();
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
    dispatch(deleteDiracceDetails(currentEditId)).then(() => {
      dispatch(
        viewDiracceDetail({
          page: 1,
          page_size: 5,
        })
      );
    });
  };

  const handleEdit = (row) => {
    setCurrentEditId(row.id);
    setFinancialYear(row.Financial_Year);
    setFormData({
      Name_OF_Authority: row.Name_OF_Authority,
      Brief_Of_The_Case: row.Brief_Of_The_Case,
      Corrective_Action_Taken: row.Corrective_Action_Taken,
    });
    addDiracceDialog();
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(clearDiracceSuccessMessage());
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearDiracceErrorMessage());
    }
  }, [error, dispatch]);

  return (
    <>
      <Card className="card">
        <CardHeader
          title="Details Of Any Issues Related To Anti-Competitive Conduct By The Entity"
          className="MuiCardHeader-action-smdown-fullwidth"
          action={
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="button"
              onClick={addDiracceDialog}
              sx={{ width: { xs: "100%", sm: 170 }, maxWidth: "100%" }}
            >
              ADD
            </Button>
          }
        />
        <TableContainer>
          <Table
            stickyHeader
            aria-label="Details Of Any Issues Related To Anti-Competitive Conduct By The Entity"
          >
            <TableHead>
              <TableRow key="headRowDiracce">
                {columnsDiracce.map((column) => (
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
                  <TableCell colSpan={columnsDiracce.length} align="center">
                    <Typography variant="body1">No data found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                viewReport?.data
                  ?.slice(
                    pageDiracce * rowsPerPageDiracce,
                    pageDiracce * rowsPerPageDiracce + rowsPerPageDiracce
                  )
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {columnsDiracce.map((column) => {
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
          rowsPerPage={rowsPerPageDiracce}
          page={page}
          onPageChange={DiracceChangePage}
          onRowsPerPageChange={DiracceChangeRowsPerPage}
        />
      </Card>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidthMd}
        open={addDiracceDialogOpen}
        onClose={addDiracceDialogClose}
      >
        <DialogTitle>
          Details Of Any Issues Related To Anti-Competitive Conduct By The
          Entity
        </DialogTitle>

        <DialogTitle>
          {currentEditId
            ? "Edit Details Of Any Issues Related To Anti-Competitive Conduct By The Entity"
            : "Add Details Of Any Issues Related To Anti-Competitive Conduct By The Entity"}

          <IconButton
            className="MuiIconButton-close"
            aria-label="close"
            onClick={addDiracceDialogClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <IconButton
          className="MuiIconButton-close"
          aria-label="close"
          onClick={addDiracceDialogClose}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Grid container direction="row" spacing={{ xs: 3, sm: 6 }}>
            {/* First row: Financial Year and another field side by side */}
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
                    column.id !== "Financial_Year" &&
                    column.id !== "Brief_Of_The_Case" &&
                    column.id !== "Corrective_Action_Taken"
                )
                .map((column) => (
                  <Grid item xs={12} key={column.id}>
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
            <Grid item xs={12}>
              {addDetails
                .filter(
                  (column) =>
                    column.id !== "actions" &&
                    column.id !== "Financial_Year" &&
                    column.id !== "Name_OF_Authority"
                )
                .map((column) => (
                  <Grid item xs={12} key={column.id} mb={4}>
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

export default DetailsIssuesRelatedAntiCompetitiveConductEntity;
