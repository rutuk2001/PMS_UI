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
  addNumberofAffiliationsDetail,
  clearNumberofAffiliationsErrorMessage,
  clearNumberofAffiliationsSuccessMessage,
  deleteNumberofAffiliationsDetails,
  editNumberofAffiliationsDetail,
  viewNumberofAffiliationsDetail,
} from "../../../store/Community/stakeholder/Number_of_AffiliationSlice";
import { toast } from "react-toastify";

const addDetails = [
  { id: "Financial_Year", label: "FY" },
  {
    id: "Number_Of_Affiliations_With_Trade_And_Industry_Chambers",
    label: "Number of affiliation with trade and industry chambers",
  },
  { id: "actions", label: "ACTION", align: "right" },
];

const columnsNoas = [
  { id: "Financial_Year", label: "FY", width: "12%" },
  {
    id: "Number_Of_Affiliations_With_Trade_And_Industry_Chambers",
    label:
      "NUMBER OF AFFILIATIONS WITH TRADE AND INDUSTRY CHAMBERS/ ASSOCIATIONS",
    width: "84%",
  },
  { id: "actions", label: "ACTION", align: "right", width: "90px" },
];

function NumberOfAffiliations() {
  const dispatch = useDispatch();

  const { viewReport, error, success, total_page } = useSelector(
    (state) => state.NumberofAffiliationsSliceDetails
  );

  const { finalYear } = useSelector((state) => state.CommonApiDetailSlice);

  useEffect(() => {
    dispatch(fetchFinancialYear());
  }, [dispatch]);

  const [validationErrors, setValidationErrors] = useState({
    Financial_Year: "",
    Number_Of_Affiliations_With_Trade_And_Industry_Chambers: "",
  });

  const handleFinancialYearChange = (event, value) => {
    setFinancialYear(value);
    setValidationErrors({ ...validationErrors, Financial_Year: "" });
  };

  // const handleInputChange = (event) => {
  //   const { id, value } = event.target;

  //   if (
  //     id === "Number_Of_Affiliations_With_Trade_And_Industry_Chambers" &&
  //     !/^\d*\.?\d*$/.test(value)
  //   ) {
  //     setValidationErrors({
  //       ...validationErrors,
  //       Number_Of_Affiliations_With_Trade_And_Industry_Chambers:
  //         "Only numeric values are allowed",
  //     });
  //     return;
  //   }

  //   setFormData({ ...formData, [id]: value });
  //   setValidationErrors({ ...validationErrors, [id]: "" });
  // };
  const handleInputChange = (event) => {
    const { id, value } = event.target;

    // Remove the numeric validation logic
    setFormData({ ...formData, [id]: value });
    setValidationErrors({ ...validationErrors, [id]: "" });
  };

  const [formData, setFormData] = useState({
    Number_Of_Affiliations_With_Trade_And_Industry_Chambers: "",
  });

  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [addNoasDialogOpen, setAddNoasDialogOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidthMd] = React.useState("md");

  const [pageNoas, setPageNoas] = React.useState(0);
  const [rowsPerPageNoas, setRowsPerPageNoas] = React.useState(5);
  const [currentEditId, setCurrentEditId] = useState(null);

  const [page, setPage] = useState(0);

  const [financialYear, setFinancialYear] = useState(null);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 1,
  });

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const NoasChangePage = (event, newPage) => {
    setPage(newPage);
    const newPaginationModel = { ...paginationModel, page: newPage + 1 };
    setPaginationModel(newPaginationModel);
    dispatch(
      viewNumberofAffiliationsDetail({
        page: newPage + 1,
        page_size: rowsPerPage,
      })
    );
  };

  const NoasChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(+event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPageNoas(0);
    const newPaginationModel = {
      ...paginationModel,
      page: 1,
      pageSize: newRowsPerPage,
    };
    setPaginationModel(newPaginationModel);

    dispatch(
      viewNumberofAffiliationsDetail({
        page: 1,
        page_size: rowsPerPage,
      })
    );
  };

  const addNoasDialog = () => {
    setAddNoasDialogOpen(true);
  };

  const addNoasDialogClose = () => {
    setAddNoasDialogOpen(false);
    setCurrentEditId(null);
    setFormData({
      Number_Of_Affiliations_With_Trade_And_Industry_Chambers: "",
    });
    setValidationErrors({
      Financial_Year: "",
      Number_Of_Affiliations_With_Trade_And_Industry_Chambers: "",
    });
    setFinancialYear(null);
  };

  const resetData = () => {
    if (currentEditId) {
      setFinancialYear(financialYear);
      setFormData({
        Number_Of_Affiliations_With_Trade_And_Industry_Chambers: "",
      });
    } else {
      setFinancialYear(null);
      setFormData({
        Number_Of_Affiliations_With_Trade_And_Industry_Chambers: "",
      });
    }
    setValidationErrors({
      Financial_Year: "",
      Number_Of_Affiliations_With_Trade_And_Industry_Chambers: "",
    });
  };

  const handleSaveChanges = () => {
    let valid = true;
    const newErrors = {
      Financial_Year: "",
      Number_Of_Affiliations_With_Trade_And_Industry_Chambers: "",
    };

    if (!financialYear) {
      newErrors.Financial_Year = "Financial Year is required";
      valid = false;
    }

    if (!formData.Number_Of_Affiliations_With_Trade_And_Industry_Chambers) {
      newErrors.Number_Of_Affiliations_With_Trade_And_Industry_Chambers =
        "This field is required";
      valid = false;
    }

    if (!valid) {
      setValidationErrors(newErrors);
      return;
    }

    // const parseNumber = (value) => (value ? parseFloat(value) : 0);
    const data = {
      Financial_Year: financialYear,
      Number_Of_Affiliations_With_Trade_And_Industry_Chambers:
        formData.Number_Of_Affiliations_With_Trade_And_Industry_Chambers,
    };

    const editDataCheck = {
      id: currentEditId,
      Financial_Year: financialYear,
      Number_Of_Affiliations_With_Trade_And_Industry_Chambers: 
        formData.Number_Of_Affiliations_With_Trade_And_Industry_Chambers
      ,
    };

    if (currentEditId) {
      dispatch(
        editNumberofAffiliationsDetail({
          id: currentEditId,
          data: editDataCheck,
        })
      ).then(() => {
        dispatch(
          viewNumberofAffiliationsDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );
        resetData();
      });
    } else {
      dispatch(addNumberofAffiliationsDetail(data)).then(() => {
        resetData();

        dispatch(
          viewNumberofAffiliationsDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );
      });
    }

    addNoasDialogClose();
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
    dispatch(deleteNumberofAffiliationsDetails(currentEditId)).then(() => {
      dispatch(
        viewNumberofAffiliationsDetail({
          page: 1,
          page_size: 5,
        })
      );
      setDeleteConfirmDialogOpen(false);
    });
  };

  const handleEdit = (row) => {
    setCurrentEditId(row.id);
    setFinancialYear(row.Financial_Year);
    setFormData({
      Number_Of_Affiliations_With_Trade_And_Industry_Chambers:
        row.Number_Of_Affiliations_With_Trade_And_Industry_Chambers,
    });
    addNoasDialog();
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(clearNumberofAffiliationsSuccessMessage());
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearNumberofAffiliationsErrorMessage());
    }
  }, [error, dispatch]);

  return (
    <>
      <Card className="card">
        <CardHeader
          title="Number Of Affiliations"
          className="MuiCardHeader-action-smdown-fullwidth"
          action={
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="button"
              onClick={addNoasDialog}
              sx={{ width: { xs: "100%", sm: 170 }, maxWidth: "100%" }}
            >
              ADD
            </Button>
          }
        />
        <TableContainer>
          <Table stickyHeader aria-label="Number Of Affiliations">
            <TableHead>
              <TableRow key="headRowNoas">
                {columnsNoas.map((column) => (
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
                  <TableCell colSpan={columnsNoas.length} align="center">
                    <Typography variant="body1">No data found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                viewReport?.data
                  ?.slice(
                    pageNoas * rowsPerPageNoas,
                    pageNoas * rowsPerPageNoas + rowsPerPageNoas
                  )
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {columnsNoas.map((column) => {
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
          rowsPerPage={rowsPerPageNoas}
          page={page}
          onPageChange={NoasChangePage}
          onRowsPerPageChange={NoasChangeRowsPerPage}
        />
      </Card>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidthMd}
        open={addNoasDialogOpen}
        onClose={addNoasDialogClose}
      >
        <DialogTitle>
          {currentEditId
            ? "Edit Number Of Affiliations"
            : "Add Number Of Affiliationsl"}

          <IconButton
            className="MuiIconButton-close"
            aria-label="close"
            onClick={addNoasDialogClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <IconButton
          className="MuiIconButton-close"
          aria-label="close"
          onClick={addNoasDialogClose}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Grid container direction="row" spacing={{ xs: 3, sm: 6 }}>
            <Grid item xs={12}>
              <Autocomplete
                size="small"
                fullWidth
                id="financialYearList"
                options={finalYear || []}
                value={financialYear}
                onChange={handleFinancialYearChange}
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
            {addDetails
              .filter(
                (column) =>
                  column.id !== "actions" && column.id !== "Financial_Year"
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
                    error={!!validationErrors[column.id]}
                    helperText={validationErrors[column.id]}
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

export default NumberOfAffiliations;
