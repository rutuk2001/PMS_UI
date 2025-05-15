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

import DeleteConfirmDialog from "./../../../Components/DeleteConfirmDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  addtop10_TICDetail,
  cleartop10_TICErrorMessage,
  cleartop10_TICSuccessMessage,
  deletetop10_TICDetails,
  edittop10_TICDetail,
  viewtop10_TICDetail,
} from "../../../store/Community/stakeholder/top10_TICSlice";
import { toast } from "react-toastify";

const addDetails = [
  {
    id: "Name_Of_The_Trade_And_Industry_Chambers",
    label: "Number of affiliation with trade and industry chambers",
  },
  {
    id: "Reach_Of_Trade_And_Industry_Chambers",
    label: "Reach of trade and industry chambers",
  },
  { id: "actions", label: "ACTION", align: "right" },
];

const columnsTaic = [
  { id: "Sr_No", label: "S. NO.", width: "15%" },
  {
    id: "Name_Of_The_Trade_And_Industry_Chambers",
    label: "NAME OF THE TRADE AND INDUSTRY CHAMBERS",
    width: "45%",
  },
  {
    id: "Reach_Of_Trade_And_Industry_Chambers",
    label: "REACH OF TRADE AND INDUSTRY CHAMBERS",
    width: "40%",
  },
  { id: "actions", label: "ACTION", align: "right", width: "90px" },
];

function TradeAndIndustryChambers() {
  const dispatch = useDispatch();

  const { viewReport, error, success, total_page } = useSelector(
    (state) => state.top10_TICSliceDetails
  );

  const [validationErrors, setValidationErrors] = useState({
    Name_Of_The_Trade_And_Industry_Chambers: "",
    Reach_Of_Trade_And_Industry_Chambers: "",
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
    setValidationErrors({ ...validationErrors, [id]: "" });
  };

  const [formData, setFormData] = useState({
    Name_Of_The_Trade_And_Industry_Chambers: "",
    Reach_Of_Trade_And_Industry_Chambers: "",
  });

  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [addTaicDialogOpen, setAddTaicDialogOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidthMd] = React.useState("md");

  const [pageTaic, setPageTaic] = React.useState(0);
  const [rowsPerPageTaic, setRowsPerPageTaic] = React.useState(5);
  const [currentEditId, setCurrentEditId] = useState(null);

  const [page, setPage] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 1,
  });

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const TaicChangePage = (event, newPage) => {
    setPage(newPage);
    const newPaginationModel = { ...paginationModel, page: newPage + 1 };
    setPaginationModel(newPaginationModel);
    dispatch(
      viewtop10_TICDetail({
        page: newPage + 1,
        page_size: rowsPerPage,
      })
    );
  };

  const TaicChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(+event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPageTaic(0);
    const newPaginationModel = {
      ...paginationModel,
      page: 1,
      pageSize: newRowsPerPage,
    };
    setPaginationModel(newPaginationModel);

    dispatch(
      viewtop10_TICDetail({
        page: 1,
        page_size: rowsPerPage,
      })
    );
  };

  const addTaicDialog = () => {
    setAddTaicDialogOpen(true);
  };

  const addTaicDialogClose = () => {
    setAddTaicDialogOpen(false);
    setCurrentEditId(null);
    setFormData({
      Name_Of_The_Trade_And_Industry_Chambers: "",
      Reach_Of_Trade_And_Industry_Chambers: "",
    });
    setValidationErrors({
      Name_Of_The_Trade_And_Industry_Chambers: "",
      Reach_Of_Trade_And_Industry_Chambers: "",
    });
  };

  const resetData = () => {
    setFormData({
      Name_Of_The_Trade_And_Industry_Chambers: "",
      Reach_Of_Trade_And_Industry_Chambers: "",
    });

    setValidationErrors({
      Name_Of_The_Trade_And_Industry_Chambers: "",
      Reach_Of_Trade_And_Industry_Chambers: "",
    });
  };

  const handleSaveChanges = () => {
    let valid = true;
    const newErrors = {
      Name_Of_The_Trade_And_Industry_Chambers: "",
      Reach_Of_Trade_And_Industry_Chambers: "",
    };

    if (!formData.Name_Of_The_Trade_And_Industry_Chambers) {
      newErrors.Name_Of_The_Trade_And_Industry_Chambers =
        "This field is required";
      valid = false;
    }

    if (!formData.Reach_Of_Trade_And_Industry_Chambers) {
      newErrors.Reach_Of_Trade_And_Industry_Chambers = "This field is required";
      valid = false;
    }

    if (!valid) {
      setValidationErrors(newErrors);
      return;
    }

    const parseNumber = (value) => (value ? parseFloat(value) : 0);
    const data = {
      Name_Of_The_Trade_And_Industry_Chambers:
        formData.Name_Of_The_Trade_And_Industry_Chambers,
      Reach_Of_Trade_And_Industry_Chambers:
        formData.Reach_Of_Trade_And_Industry_Chambers,
    };

    const editDataCheck = {
      id: currentEditId,
      ...data,
    };

    if (currentEditId) {
      dispatch(
        edittop10_TICDetail({
          id: currentEditId,
          data: editDataCheck,
        })
      ).then(() => {
        dispatch(
          viewtop10_TICDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );
        resetData();
      });
    } else {
      dispatch(addtop10_TICDetail(data)).then(() => {
        resetData();

        dispatch(
          viewtop10_TICDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );
      });
    }

    addTaicDialogClose();
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
    dispatch(deletetop10_TICDetails(currentEditId)).then(() => {
      dispatch(
        viewtop10_TICDetail({
          page: 1,
          page_size: 5,
        })
      );
      setDeleteConfirmDialogOpen(false);
    });
  };

  const handleEdit = (row) => {
    setCurrentEditId(row.id);
    setFormData({
      Name_Of_The_Trade_And_Industry_Chambers:
        row.Name_Of_The_Trade_And_Industry_Chambers,
      Reach_Of_Trade_And_Industry_Chambers:
        row.Reach_Of_Trade_And_Industry_Chambers,
    });
    addTaicDialog();
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(cleartop10_TICSuccessMessage());
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(cleartop10_TICErrorMessage());
    }
  }, [error, dispatch]);

  return (
    <>
      <Card className="card">
        <CardHeader
          title="Top 10 Trade And Industry Chambers"
          className="MuiCardHeader-action-smdown-fullwidth"
          action={
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="button"
              onClick={addTaicDialog}
              sx={{ width: { xs: "100%", sm: 170 }, maxWidth: "100%" }}
            >
              ADD
            </Button>
          }
        />
        <TableContainer>
          <Table stickyHeader aria-label="Top 10 Trade And Industry Chambers">
            <TableHead>
              <TableRow key="headRowTaic">
                {columnsTaic.map((column) => (
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
                  <TableCell colSpan={columnsTaic.length} align="center">
                    <Typography variant="body1">No data found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                viewReport?.data
                  ?.slice(
                    pageTaic * rowsPerPageTaic,
                    pageTaic * rowsPerPageTaic + rowsPerPageTaic
                  )
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {columnsTaic.map((column) => {
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
          rowsPerPage={rowsPerPageTaic}
          page={page}
          onPageChange={TaicChangePage}
          onRowsPerPageChange={TaicChangeRowsPerPage}
        />
      </Card>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidthMd}
        open={addTaicDialogOpen}
        onClose={addTaicDialogClose}
      >
        <DialogTitle>
          {currentEditId
            ? "Edit Top 10 Trade And Industry Chambers"
            : "Add Top 10 Trade And Industry Chambers"}

          <IconButton
            className="MuiIconButton-close"
            aria-label="close"
            onClick={addTaicDialogClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <IconButton
          className="MuiIconButton-close"
          aria-label="close"
          onClick={addTaicDialogClose}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Grid container direction="row" spacing={{ xs: 3, sm: 6 }}>
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

export default TradeAndIndustryChambers;
