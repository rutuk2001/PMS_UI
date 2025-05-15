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
import {
  fetchFinancialYear,
  fetchTypeOfPlantstackHolderListApi,
} from "../../../store/CommonApi/CommonApiSlice";
import {
  addTDCDetail,
  clearTDCErrorMessage,
  clearTDCSuccessMessage,
  deleteTDCDetails,
  editTDCDetail,
  filterTDC,
  viewTDCDetail,
} from "../../../store/Community/stakeholder/TDCSlice";
import { toast } from "react-toastify";

const columnsTDC = [
  { id: "Financial_Year", label: "Financial Year", width: "7%" },
  { id: "Stack_Holder_Group", label: "Stakeholder Group", width: "15%" },
  {
    id: "Field_Complaint",
    label: "Field Complaint",
    width: "15%",
  },
  { id: "Pending_Complaint", label: "Pending Complaint", width: "45%" },
  { id: "Weblink", label: "Web-Link(if available)", width: "15%" },
  {
    id: "grievance_redressal_mechanism_in_place",
    label: "Grievance Redressal Mechanism",
    width: "15%",
  },
  { id: "Remarks", label: "Remarks", width: "15%" },
  { id: "actions", label: "ACTION", align: "right", width: "90px" },
];

const addDetails = [
  { id: "Financial_Year", label: "Financial Year", width: "7%" },
  { id: "Stack_Holder_Group", label: "Stakeholder Group", width: "15%" },
  {
    id: "Field_Complaint",
    label: "Field Complaint",
    width: "15%",
  },
  { id: "Pending_Complaint", label: "Pending Complaint", width: "45%" },
  { id: "Weblink", label: "Web-Link(if available)", width: "15%" },
  {
    id: "grievance_redressal_mechanism_in_place",
    label: "Grievance Redressal Mechanism",
    width: "15%",
  },
  { id: "Remarks", label: "Remarks", width: "15%" },
  { id: "actions", label: "ACTION", align: "right", width: "90px" },
];

function TransparencyandDisclosureCompliances() {
  const dispatch = useDispatch();

  const { stackHolderList } = useSelector(
    (state) => state.ListStackholderSliceDetails
  );

  const { viewReport, error, success, total_page, loading } = useSelector(
    (state) => state.TDCSliceDetails
  );

  const { finalYear } = useSelector((state) => state.CommonApiDetailSlice);

  const Choices = ["yes", "no"];

  const [validationError, setValidationError] = useState({
    Field_Complaint: "",
    Pending_Complaint: "",
    Weblink: "",
    Remarks: "",
  });

  const [stackHolder, setstackHolder] = useState(null);
  const [financialyear, setFinancialYear] = useState(null);
  const [filterstackHolder, setfilterstackHolder] = useState(null);
  const [grivanceChoices, setgrivanceChoices] = useState(null);

  useEffect(() => {
    dispatch(fetchFinancialYear());
  }, [dispatch]);

  const handlestackHolderChange = (event, value) => {
    setstackHolder(value);
    setValidationError({
      ...validationError,
      stackHolder: "",
    });
  };

  const handleFinancialYear = (event, value) => {
    setFinancialYear(value);
    setValidationError({
      ...validationError,
      Financial_Year: "",
    });
  };

  const handleGrievanceChoicesChange = (event, value) => {
    setgrivanceChoices(value);
    setValidationError({
      ...validationError,
      grievance_redressal_mechanism_in_place: "",
    });
  };

  const [formData, setFormData] = useState({
    Field_Complaint: "",
    Pending_Complaint: "",
    Weblink: "",
    Remarks: "",
    grievance_redressal_mechanism_in_place: "",
  });

  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [addTDCDialogOpen, setAddTDCDialogOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidthMd] = React.useState("md");

  const [pageTDC, setPageTDC] = React.useState(0);
  const [rowsPerPageTDC, setRowsPerPageTDC] = React.useState(5);
  const [page, setPage] = useState(0);
  const [currentEditId, setCurrentEditId] = useState(null);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 1,
  });
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const TDCChangePage = (event, newPage) => {
    setPage(newPage);
    const newPaginationModel = { ...paginationModel, page: newPage + 1 };
    setPaginationModel(newPaginationModel);
    if (filterstackHolder) {
      // dispatch(
      //   filterTDC({
      //     stackHolder: filterstackHolder,
      //     page: newPage + 1,
      //     page_size: rowsPerPage,
      //   })
      // );
    } else {
      dispatch(
        viewTDCDetail({
          page: newPage + 1,
          page_size: rowsPerPage,
        })
      );
    }
  };

  const TDCChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(+event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPageTDC(0);
    const newPaginationModel = {
      ...paginationModel,
      page: 1,
      pageSize: newRowsPerPage,
    };
    setPaginationModel(newPaginationModel);

    dispatch(
      viewTDCDetail({
        page: 1,
        page_size: rowsPerPage,
      })
    );
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    if (id === "Weblink") {
      const regex = new RegExp(
        "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
      );
      const isValidUrl = regex.test(value);
      setValidationError((prevState) => ({
        ...prevState,
        [id]: isValidUrl ? "" : "Enter a valid URL",
      }));
    } else {
      setValidationError((prevState) => ({
        ...prevState,
        [id]: "",
      }));
    }
  };

  const addTDCDialog = () => {
    setAddTDCDialogOpen(true);
  };

  const addTDCDialogClose = () => {
    setAddTDCDialogOpen(false);
    setCurrentEditId(null);
    setFormData({
      Field_Complaint: "",
      Pending_Complaint: "",
      Weblink: "",
      Remarks: "",
    });
    setValidationError({
      Financial_Year: "",
      Stack_Holder_Group: "",
      Field_Complaint: "",
      Pending_Complaint: "",
      Weblink: "",
      Remarks: "",
      grievance_redressal_mechanism_in_place: "",
    });
    setFinancialYear(null);
    setgrivanceChoices(null);
    setstackHolder(null);
  };

  const resetData = () => {
    const currentFinancialYear = formData.Financial_Year;
    const currentstackHolder = formData.stackHolder;

    setFormData({
      Field_Complaint: "",
      Pending_Complaint: "",
      Weblink: "",
      Remarks: "",
    });

    setValidationError({
      Financial_Year: "",
      Stack_Holder_Group: "",
      Field_Complaint: "",
      Pending_Complaint: "",
      Weblink: "",
      Remarks: "",
    });
    setFormData((prevFormData) => ({
      ...prevFormData,
      Financial_Year: currentFinancialYear,
      stackHolder: currentstackHolder,
      grievance_redressal_mechanism_in_place:
        formData.grievance_redressal_mechanism_in_place,
    }));
  };

  const handleSaveChanges = () => {
    let newErrors = {
      Financial_Year: "",
      Stack_Holder_Group: "",
      Field_Complaint: "",
      Pending_Complaint: "",
      Weblink: "",
      Remarks: "",
      grievance_redressal_mechanism_in_place: "",
    };

    let valid = true;
    if (!financialyear) {
      newErrors.Financial_Year = "Financial Year is required";
      valid = false;
    }

    if (!stackHolder) {
      newErrors.stackHolder = "StackHolder is required";
      valid = false;
    }

    if (!grivanceChoices) {
      newErrors.grievance_redressal_mechanism_in_place =
        "Grievances Choice is required";
      valid = false;
    }

    if (!formData.Field_Complaint) {
      newErrors.Field_Complaint = "Field Complaint is required";
      valid = false;
    }

    if (!formData.Pending_Complaint) {
      newErrors.Pending_Complaint = "Pending Complaint is required";
      valid = false;
    }

    if (!formData.Remarks) {
      newErrors.Remarks = "Remark is required";
      valid = false;
    }

    setValidationError(newErrors);

    if (!valid) {
      return;
    }
    const data = {
      Financial_Year: financialyear,
      Stack_Holder_Group: stackHolder,
      Field_Complaint: formData.Field_Complaint,
      Pending_Complaint: formData.Pending_Complaint,
      Weblink: formData.Weblink,
      Remarks: formData.Remarks,
      grievance_redressal_mechanism_in_place: grivanceChoices,
    };

    const editDataCheck = {
      id: currentEditId,
      ...data,
    };
    if (currentEditId) {
      dispatch(
        editTDCDetail({
          id: currentEditId,
          data: editDataCheck,
        })
      ).then(() => {
        dispatch(
          viewTDCDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );

        resetData();
      });
    } else {
      dispatch(addTDCDetail(data)).then(() => {
        resetData();
        dispatch(
          viewTDCDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );
      });
    }

    addTDCDialogClose();
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
    dispatch(deleteTDCDetails(currentEditId)).then(() => {
      dispatch(
        viewTDCDetail({
          page: 1,
          page_size: 5,
        })
      );
    });
  };

  const handleEdit = (row) => {
    setCurrentEditId(row.id);
    setFinancialYear(row.Financial_Year);
    setstackHolder(row.Stack_Holder_Group);
    setFormData({
      Field_Complaint: row.Field_Complaint,
      Pending_Complaint: row.Pending_Complaint,
      Weblink: row.Weblink,
      Remarks: row.Remarks,
      grievance_redressal_mechanism_in_place:
        row.grievance_redressal_mechanism_in_place,
    });
    addTDCDialog();
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(clearTDCSuccessMessage());
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearTDCErrorMessage());
    }
  }, [error, dispatch]);

  return (
    <>
      <Card className="card">
        <CardHeader
          title="Transparency and Disclosure Compliances"
          className="MuiCardHeader-action-smdown-fullwidth"
          action={
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              rowSpacing={3}
              columnSpacing={{ xs: 3, sm: 6 }}
            >
              <Grid item xs={12} sm="auto">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  className="button"
                  onClick={addTDCDialog}
                  sx={{ width: { xs: "100%", sm: 170 }, maxWidth: "100%" }}
                >
                  ADD
                </Button>
              </Grid>
            </Grid>
          }
        />
        <TableContainer>
          <Table
            stickyHeader
            aria-label="Awareness Programmes for value chain partners"
          >
            <TableHead>
              <TableRow key="headRowTDC">
                {columnsTDC.map((column) => (
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
              {viewReport?.data
                ?.slice(
                  pageTDC * rowsPerPageTDC,
                  pageTDC * rowsPerPageTDC + rowsPerPageTDC
                )
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columnsTDC.map((column) => {
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
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={total_page}
          rowsPerPage={rowsPerPageTDC}
          page={page}
          onPageChange={TDCChangePage}
          onRowsPerPageChange={TDCChangeRowsPerPage}
        />
      </Card>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidthMd}
        open={addTDCDialogOpen}
        onClose={addTDCDialogClose}
      >
        <DialogTitle>
          {currentEditId
            ? "Edit Transparency and Disclosure Compliances"
            : "Add Transparency and Disclosure Compliances"}

          <IconButton
            className="MuiIconButton-close"
            aria-label="close"
            onClick={addTDCDialogClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <IconButton
          className="MuiIconButton-close"
          aria-label="close"
          onClick={addTDCDialogClose}
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

            <Grid item xs={12} sm={6}>
              <Autocomplete
                size="small"
                fullWidth
                id="grievance_redressal_mechanism_in_place"
                options={Choices || []}
                value={grivanceChoices}
                disabled={!!currentEditId}
                onChange={handleGrievanceChoicesChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Grievance Redressal Mechanism"
                    error={
                      !!validationError.grievance_redressal_mechanism_in_place
                    }
                    helperText={
                      validationError.grievance_redressal_mechanism_in_place
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                size="small"
                fullWidth
                id="stackHolderList"
                options={stackHolderList}
                value={stackHolder}
                onChange={handlestackHolderChange}
                disabled={!!currentEditId}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Stackholder Group"
                    error={!!validationError.stackHolder}
                    helperText={validationError.stackHolder}
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
                      column.id !== "Stack_Holder_Group" &&
                      column.id !== "grievance_redressal_mechanism_in_place"
                  )
                  .map((column) => (
                    <Grid item key={column.id} xs={12} sm={6}>
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
            <Grid item xs={12}>
              <Grid container direction="row" spacing={{ xs: 3, sm: 6 }}>
                {addDetails
                  .filter(
                    (column) =>
                      column.id !== "Financial_Year" &&
                      column.id !== "actions" &&
                      column.id !== "Stack_Holder_Group" &&
                      column.id !== "Field_Complaint" &&
                      column.id !== "Pending_Complaint" &&
                      column.id !== "Weblink" &&
                      column.id !== "Remarks" &&
                      column.id !== "grievance_redressal_mechanism_in_place"
                  )
                  .map((column) => (
                    <Grid item key={column.id} xs={12} sm={6}>
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

export default TransparencyandDisclosureCompliances;
