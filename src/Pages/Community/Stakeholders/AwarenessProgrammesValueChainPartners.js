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
  addAPVCPDetail,
  clearAPVCPErrorMessage,
  clearAPVCPSuccessMessage,
  deleteAPVCPDetails,
  editAPVCPDetail,
  filterAPVCP,
  viewAPVCPDetail,
} from "../../../store/Community/stakeholder/APVCPSlice";
import { toast } from "react-toastify";

const columnsApvcp = [
  { id: "Financial_Year", label: "FY", width: "7%" },
  {
    id: "Total_No_Of_Programmes_Held",
    label: "TOTAL NO. OF PROGRAMMES HELD",
    width: "15%",
  },
  { id: "Topics_Covered", label: "TOPICS COVERERD", width: "45%" },
  { id: "Percentage_Of_Persons_Covered", label: "% OF PARTNERS", width: "15%" },
  { id: "actions", label: "ACTION", align: "right", width: "90px" },
];

const addDetails = [
  { id: "Financial_Year", label: "FY", width: "7%" },
  {
    id: "Total_No_Of_Programmes_Held",
    label: "TOTAL NO. OF PROGRAMMES HELD",
    width: "15%",
  },
  { id: "Topics_Covered", label: "TOPICS COVERERD", width: "45%" },
  { id: "Percentage_Of_Persons_Covered", label: "% OF PARTNERS", width: "15%" },
  { id: "actions", label: "ACTION", align: "right", width: "90px" },
];

function AwarenessProgrammesValueChainPartners() {
  const dispatch = useDispatch();
  const { viewReport, error, success, total_page, loading } = useSelector(
    (state) => state.APVCPSliceDetails
  );

  const { finalYear } = useSelector((state) => state.CommonApiDetailSlice);

  const [validationError, setValidationError] = useState({
    Total_No_Of_Programmes_Held: "",
    Topics_Covered: "",
    Percentage_Of_Persons_Covered: "",
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
    Total_No_Of_Programmes_Held: "",
    Topics_Covered: "",
    Percentage_Of_Persons_Covered: "",
  });

  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [addApvcpDialogOpen, setAddApvcpDialogOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidthMd] = React.useState("md");

  const [pageApvcp, setPageApvcp] = React.useState(0);
  const [rowsPerPageApvcp, setRowsPerPageApvcp] = React.useState(5);
  const [page, setPage] = useState(0);
  const [currentEditId, setCurrentEditId] = useState(null);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 1,
  });
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const ApvcpChangePage = (event, newPage) => {
    setPage(newPage);
    const newPaginationModel = { ...paginationModel, page: newPage + 1 };
    setPaginationModel(newPaginationModel);
    // if (filterFacility) {
    //   dispatch(
    //     filterAPVCP({
    //       Facility: filterFacility,
    //       page: newPage + 1,
    //       page_size: rowsPerPage,
    //     })
    //   );
    // } else {
    dispatch(
      viewAPVCPDetail({
        page: newPage + 1,
        page_size: rowsPerPage,
      })
    );
    // }
  };

  // const handleFilter = (event, value) => {
  //   if (value) {
  //     setfilterFacility(value);
  //     dispatch(
  //       filterAPVCP({
  //         Facility: value,
  //         page: paginationModel.page,
  //         page_size: paginationModel.pageSize,
  //       })
  //     );
  //   } else {
  //     setfilterFacility(null);
  //     dispatch(
  //       viewAPVCPDetail({
  //         page: paginationModel.page,
  //         page_size: paginationModel.pageSize,
  //       })
  //     );
  //   }
  // };

  const ApvcpChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(+event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPageApvcp(0);
    const newPaginationModel = {
      ...paginationModel,
      page: 1,
      pageSize: newRowsPerPage,
    };
    setPaginationModel(newPaginationModel);

    dispatch(
      viewAPVCPDetail({
        page: 1,
        page_size: rowsPerPage,
      })
    );
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    if (id === "Percentage_Of_Persons_Covered") {
      const parsedValue = parseFloat(value.replace(/[^0-9.]/g, "") || 0);
      const boundedValue = Math.min(Math.max(parsedValue, 0), 100); // Ensure the value is between 0 and 100
      setFormData((prevData) => ({ ...prevData, [id]: boundedValue }));
    } else if (id === "Total_No_Of_Programmes_Held") {
      const parsedValue = parseFloat(value.replace(/[^0-9.]/g, "") || 0);
      const nonNegativeValue = Math.abs(parsedValue);
      setFormData((prevData) => ({ ...prevData, [id]: nonNegativeValue }));
    } else {
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    }

    setValidationError({ ...validationError, [id]: "" });
  };

  const addApvcpDialog = () => {
    setAddApvcpDialogOpen(true);
  };

  const addApvcpDialogClose = () => {
    setAddApvcpDialogOpen(false);
    setCurrentEditId(null);
    setFormData({
      Total_No_Of_Programmes_Held: "",
      Topics_Covered: "",
      Percentage_Of_Persons_Covered: "",
    });
    setValidationError({
      Financial_Year: "",
      Total_No_Of_Programmes_Held: "",
      Topics_Covered: "",
      Percentage_Of_Persons_Covered: "",
    });
    setFinancialYear(null);
  };

  const resetData = () => {
    const currentFinancialYear = formData.Financial_Year;
    setFormData({
      Total_No_Of_Programmes_Held: "",
      Topics_Covered: "",
      Percentage_Of_Persons_Covered: "",
    });

    setValidationError({
      Financial_Year: "",
      Total_No_Of_Programmes_Held: "",
      Topics_Covered: "",
      Percentage_Of_Persons_Covered: "",
    });
    setFormData((prevFormData) => ({
      ...prevFormData,
      Financial_Year: currentFinancialYear,
    }));
  };

  const handleSaveChanges = () => {
    let newErrors = {
      Financial_Year: "",
      Total_No_Of_Programmes_Held: "",
      Topics_Covered: "",
      Percentage_Of_Persons_Covered: "",
    };

    let valid = true;
    if (!financialyear) {
      newErrors.Financial_Year = "Financial Year is required";
      valid = false;
    }

    if (
      formData.Percentage_Of_Persons_Covered === "" ||
      formData.Percentage_Of_Persons_Covered > 100
    ) {
      newErrors.Percentage_Of_Persons_Covered =
        "% Of Partners is required and should not exceed 100";
      valid = false;
    }

    if (!formData.Topics_Covered) {
      newErrors.Topics_Covered = "Topics Covered is required";
      valid = false;
    }

    if (!formData.Total_No_Of_Programmes_Held) {
      newErrors.Total_No_Of_Programmes_Held =
        "Total No. Of Programmes Held is required";
      valid = false;
    }

    setValidationError(newErrors);

    if (!valid) {
      return;
    }

    const parseNumber = (value) => (value ? parseFloat(value) : 0);
    const data = {
      Financial_Year: financialyear,
      Percentage_Of_Persons_Covered: parseNumber(
        formData.Percentage_Of_Persons_Covered
      ),
      Total_No_Of_Programmes_Held: parseNumber(
        formData.Total_No_Of_Programmes_Held
      ),
      Topics_Covered: formData.Topics_Covered,
    };

    const editDataCheck = {
      id: currentEditId,
      ...data,
    };
    if (currentEditId) {
      dispatch(
        editAPVCPDetail({
          id: currentEditId,
          data: editDataCheck,
        })
      ).then(() => {
        dispatch(
          viewAPVCPDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );

        resetData();
      });
    } else {
      dispatch(addAPVCPDetail(data)).then(() => {
        resetData();
        dispatch(
          viewAPVCPDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );
      });
    }

    addApvcpDialogClose();
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
    dispatch(deleteAPVCPDetails(currentEditId)).then(() => {
      dispatch(
        viewAPVCPDetail({
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
      Total_No_Of_Programmes_Held: row.Total_No_Of_Programmes_Held,
      Topics_Covered: row.Topics_Covered,
      Percentage_Of_Persons_Covered: row.Percentage_Of_Persons_Covered,
    });
    addApvcpDialog();
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(clearAPVCPSuccessMessage());
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAPVCPErrorMessage());
    }
  }, [error, dispatch]);

  return (
    <>
      <Card className="card">
        <CardHeader
          title="Awareness Programmes for value chain partners"
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
                  onClick={addApvcpDialog}
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
              <TableRow key="headRowApvcp">
                {columnsApvcp.map((column) => (
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
                  pageApvcp * rowsPerPageApvcp,
                  pageApvcp * rowsPerPageApvcp + rowsPerPageApvcp
                )
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columnsApvcp.map((column) => {
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
                            ) : column.id ===
                              "Percentage_Of_Persons_Covered" ? (
                              `${value}%`
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
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={total_page}
          rowsPerPage={rowsPerPageApvcp}
          page={page}
          onPageChange={ApvcpChangePage}
          onRowsPerPageChange={ApvcpChangeRowsPerPage}
        />
      </Card>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidthMd}
        open={addApvcpDialogOpen}
        onClose={addApvcpDialogClose}
      >
        <DialogTitle>
          {currentEditId
            ? "Edit Awareness Programmes on BRS Principles"
            : "Add Awareness Programmes on BRS Principles"}

          <IconButton
            className="MuiIconButton-close"
            aria-label="close"
            onClick={addApvcpDialogClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <IconButton
          className="MuiIconButton-close"
          aria-label="close"
          onClick={addApvcpDialogClose}
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
                      column.id !== "Total_No_Of_Programmes_Held"
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
                      column.id !== "Percentage_Of_Persons_Covered" &&
                      column.id !== "Topics_Covered"
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

export default AwarenessProgrammesValueChainPartners;
