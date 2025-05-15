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
  addDATMsDetail,
  clearErrorMessage,
  clearSuccessMessage,
  deleteDATMsDetail,
  editDATMsDetail,
  viewDATMsDetail,
} from "../../../store/Community/Society/DATMSlice";
import { toast } from "react-toastify";

const columnsDoattm = [
  { id: "Financial_Year", label: "FY", width: "7%" },
  {
    id: "Detail_of_Negative_Impact_Identified",
    label: "DETAILS OF NEGATIVE SOCIAL IMPACT IDENTIFIED",
    width: "50%",
  },
  {
    id: "Corrective_Action_Taken",
    label: "CORRECTIVE ACTION TAKEN",
    width: "35%",
  },
  { id: "actions", label: "ACTION", align: "right", width: "90px" },
];

const addDetails = [
  { id: "Financial_Year", label: "Financial Year", width: "7%" },
  {
    id: "Detail_of_Negative_Impact_Identified",
    label: "Detail of negative impact identified",
    width: "50%",
  },
  {
    id: "Corrective_Action_Taken",
    label: "Corrective Action Taken",
    width: "35%",
  },
  { id: "actions", label: "ACTION", align: "right", width: "90px" },
];

function DetailsOfActionsTakenToMitigate() {
  const dispatch = useDispatch();
  const { viewReport, error, success, total_page, WGTypeData, FilterData } =
    useSelector((state) => state.DATMsDetails);

  const { finalYear } = useSelector((state) => state.CommonApiDetailSlice);

  const [validationError, setValidationError] = useState({
    Detail_of_Negative_Impact_Identified: "",
    Corrective_Action_Taken: "",
  });

  const [financialyear, setFinancialYear] = useState(null);

  useEffect(() => {
    dispatch(fetchFinancialYear());
  }, [dispatch]);

  const handleFinancialYear = (event, value) => {
    setFinancialYear(value);
    setValidationError({
      ...validationError,
      Financial_Year: "",
    });
  };

  const [formData, setFormData] = useState({
    Detail_of_Negative_Impact_Identified: "",
    Corrective_Action_Taken: "",
  });

  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [addDoattmDialogOpen, setAddDoattmDialogOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidthMd] = React.useState("md");

  const [pageDoattm, setPageDoattm] = React.useState(0);
  const [rowsPerPageDoattm, setRowsPerPageDoattm] = React.useState(5);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [page, setPage] = useState(0);
  const [currentEditId, setCurrentEditId] = useState(null);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 1,
  });

  const DoattmChangePage = (event, newPage) => {
    setPage(newPage);
    const newPaginationModel = { ...paginationModel, page: newPage + 1 };
    setPaginationModel(newPaginationModel);
    dispatch(
      viewDATMsDetail({
        page: newPage + 1,
        page_size: rowsPerPage,
      })
    );
  };

  const DoattmChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(+event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPageDoattm(0);
    const newPaginationModel = {
      ...paginationModel,
      page: 1,
      pageSize: newRowsPerPage,
    };
    setPaginationModel(newPaginationModel);

    dispatch(
      viewDATMsDetail({
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

  const addDoattmDialog = () => {
    setAddDoattmDialogOpen(true);
  };

  const addDoattmDialogClose = () => {
    setAddDoattmDialogOpen(false);
    setCurrentEditId(null);
    setFormData({
      Detail_of_Negative_Impact_Identified: "",
      Corrective_Action_Taken: "",
    });
    setValidationError({
      Financial_Year: "",
      Detail_of_Negative_Impact_Identified: "",
      Corrective_Action_Taken: "",
    });
    setFinancialYear(null);
  };

  const resetData = () => {
    if (currentEditId) {
      setFinancialYear(finalYear);
      setFormData({
        Detail_of_Negative_Impact_Identified: "",
        Corrective_Action_Taken: "",
      });
    } else {
      setFinancialYear(null);
      setFormData({
        Detail_of_Negative_Impact_Identified: "",
        Corrective_Action_Taken: "",
      });
    }
    setValidationError({
      Financial_Year: "",
      Detail_of_Negative_Impact_Identified: "",
      Corrective_Action_Taken: "",
    });
  };

  const handleSaveChanges = () => {
    let newErrors = {
      Financial_Year: "",
      Detail_of_Negative_Impact_Identified: "",
      Corrective_Action_Taken: "",
    };

    let valid = true;
    if (!financialyear) {
      newErrors.Financial_Year = "Financial Year is required";
      valid = false;
    }

    if (!formData.Detail_of_Negative_Impact_Identified) {
      newErrors.Detail_of_Negative_Impact_Identified = "This Field is required";
      valid = false;
    }

    if (!formData.Corrective_Action_Taken) {
      newErrors.Corrective_Action_Taken = "This Field is required";
      valid = false;
    }

    setValidationError(newErrors);

    if (!valid) {
      return;
    }
    const data = {
      Financial_Year: financialyear,
      Detail_of_Negative_Impact_Identified:
        formData.Detail_of_Negative_Impact_Identified,
      Corrective_Action_Taken: formData.Corrective_Action_Taken,
    };

    const editDataCheck = {
      id: currentEditId,
      ...data,
    };
    if (currentEditId) {
      dispatch(
        editDATMsDetail({
          id: currentEditId,
          data: editDataCheck,
        })
      ).then(() => {
        dispatch(
          viewDATMsDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );

        resetData();
      });
    } else {
      dispatch(addDATMsDetail(data)).then(() => {
        resetData();
        dispatch(
          viewDATMsDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );
      });
    }

    addDoattmDialogClose();
  };

  const handleDeleteConfirmDialogOpen = (row) => {
    setDeleteConfirmDialogOpen(true);
    setCurrentEditId(row.id);
  };

  const handleDeleteConfirmDialogClose = () => {
    setCurrentEditId(null);
    setDeleteConfirmDialogOpen(false);
  };

  const handleDeleteItem = () => {
    dispatch(deleteDATMsDetail(currentEditId)).then(() => {
      dispatch(
        viewDATMsDetail({
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
      Detail_of_Negative_Impact_Identified:
        row.Detail_of_Negative_Impact_Identified,
      Corrective_Action_Taken: row.Corrective_Action_Taken,
    });
    addDoattmDialog();
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
          title="Details Of Actions Taken To Mitigate"
          className="MuiCardHeader-action-smdown-fullwidth"
          action={
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="button"
              onClick={addDoattmDialog}
              sx={{ width: { xs: "100%", sm: 170 }, maxWidth: "100%" }}
            >
              ADD ROLE
            </Button>
          }
        />
        <TableContainer>
          <Table stickyHeader aria-label="Details Of Actions Taken To Mitigate">
            <TableHead>
              <TableRow key="headRowDoattm">
                {columnsDoattm.map((column) => (
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
                  <TableCell colSpan={columnsDoattm.length} align="center">
                    <Typography variant="body1">No data found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                viewReport?.data
                  ?.slice(
                    pageDoattm * rowsPerPageDoattm,
                    pageDoattm * rowsPerPageDoattm + rowsPerPageDoattm
                  )
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {columnsDoattm.map((column) => {
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
          rowsPerPageOptions={[5]}
          component="div"
          count={total_page}
          rowsPerPage={rowsPerPageDoattm}
          page={page}
          onPageChange={DoattmChangePage}
          onRowsPerPageChange={DoattmChangeRowsPerPage}
        />
      </Card>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidthMd}
        open={addDoattmDialogOpen}
        onClose={addDoattmDialogClose}
      >
        <DialogTitle>
          {currentEditId
            ? "Edit Details Of Actions Taken To Mitigate"
            : "Add Details Of Actions Taken To Mitigate"}

          <IconButton
            className="MuiIconButton-close"
            aria-label="close"
            onClick={addDoattmDialog}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <IconButton
          className="MuiIconButton-close"
          aria-label="close"
          onClick={addDoattmDialogClose}
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
                value={financialyear}
                disabled={!!currentEditId}
                onChange={handleFinancialYear}
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
            <Grid item xs={12}>
              <Grid container direction="row" spacing={{ xs: 3, sm: 6 }}>
                {addDetails
                  .filter(
                    (column) =>
                      column.id !== "Financial_Year" &&
                      column.id !== "actions" &&
                      column.id !== "Detail_of_Negative_Impact_Identified"
                  )
                  .map((column) => (
                    <Grid item key={column.id} xs={12}>
                      <TextField
                        fullWidth
                        size="small"
                        id={column.id}
                        label={column.label}
                        value={formData[column.id]}
                        onChange={handleInputChange}
                      />
                    </Grid>
                  ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="row" spacing={{ xs: 3, sm: 6 }}>
                {addDetails
                  .filter(
                    (column) =>
                      column.id !== "Financial_Year" &&
                      column.id !== "actions" &&
                      column.id !== "Corrective_Action_Taken"
                  )
                  .map((column) => (
                    <Grid item key={column.id} xs={12}>
                      <TextField
                        fullWidth
                        size="small"
                        id={column.id}
                        label={column.label}
                        value={formData[column.id]}
                        onChange={handleInputChange}
                      />
                    </Grid>
                  ))}
              </Grid>
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

export default DetailsOfActionsTakenToMitigate;
