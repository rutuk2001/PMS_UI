import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Grid,
  Button,
  IconButton,
  TextField,
  Typography,
  Link,
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
import DeleteConfirmDialog from "./../../../../Components/DeleteConfirmDialog";
import {
  addInitiativesTowardsCarbonZeroDetail,
  deleteInitiativesTowardsCarbonZeroDetail,
  editInitiativesTowardsCarbonZeroDetail,
  viewInitiativesTowardsCarbonZeroDetail,
  clearErrorMessage,
  clearSuccessMessage,
} from "../../../../store/Environment/Sustanibility/Environmental_Impact/InitiativesTowardsCarbonZeroSlice";


const tableColumns = [
  { id: "Initiative_undertaken", label: "INITIATIVE UNDERTAKEN", width: "23%" },
  {
    id: "Details_of_the_initiative",
    label: "DETAILS OF THE INITIATIVE",
    width: "27%",
  },
  {
    id: "Outcome_of_the_initiative",
    label: "OUTCOME OF THE INITIATIVE",
    width: "20%",
  },
  { id: "Web_link", label: "WEB-LINK", width: "20%" },
  { id: "actions", label: "ACTION", align: "right", width: "90px" },
];

function InitiativesTowardsCarbonZero() {
  
  const dispatch = useDispatch();
  const [currentEditId, setCurrentEditId] = useState(null);

  const { viewReport, error, success, total_page } = useSelector(
    (state) => state.InitiativesTowardsCarbonZeroDetails
  );

  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [addITCZDialogOpen, setAddITCZDialogOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidthMd] = React.useState("md");

  const [pageITCZ, setPageITCZ] = React.useState(0);
  const [rowsPerPageITCZ, setRowsPerPageITCZ] = React.useState(5);

  const [page, setPage] = useState(0);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 1,
  });

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [validationError, setValidationError] = useState({
    Initiative_undertaken: "",
    Details_of_the_initiative: "",
    Outcome_of_the_initiative: "",
    Web_link: "",
  });

  const [initiativeUndertakenList, setInitiativeundertakenList] =
    useState(null);

  const handleInitiativeUndertakenChange = (event) => {
    setInitiativeundertakenList(event.target.value);
    setValidationError({
      ...validationError,
      Initiative_undertaken: "",
    });
  };

  const [detailsoftheinitiativeList, setDetailsoftheinitiativeList] =
    useState(null);

  const handleDetailsoftheinitiativeChange = (event) => {
    setDetailsoftheinitiativeList(event.target.value);
    setValidationError({
      ...validationError,
      Details_of_the_initiative: "",
    });
  };

  const [outcomeInitiativeList, setOutcomeInitiativeList] = useState(null);

  const handleOutcomeInitiativeChange = (event) => {
    setOutcomeInitiativeList(event.target.value);
    setValidationError({
      ...validationError,
      Outcome_of_the_initiative: "",
    });
  };

  const [webLinkList, setWebLinkList] = useState(null);

  const handleWebLinkChange = (event) => {
    const value = event.target.value;
    setWebLinkList(value);

    const urlRegex = new RegExp(
      "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
    );
    const isValidUrl = urlRegex.test(value);
    setValidationError({
      ...validationError,
      Web_link: isValidUrl ? "" : "Enter a valid URL",
    });
  };

  const resetNCWAELData = () => {
    setInitiativeundertakenList("");
    setDetailsoftheinitiativeList("");
    setOutcomeInitiativeList("");
    setWebLinkList("");
    setValidationError({});
  };

  const handleSaveChanges = () => {
    let formValid = true;
    const errors = {};

    if (!initiativeUndertakenList) {
      errors.Initiative_undertaken = "Field is required";
      formValid = false;
    }
    if (!detailsoftheinitiativeList) {
      errors.Details_of_the_initiative = "Field is required";
      formValid = false;
    }
    if (!outcomeInitiativeList) {
      errors.Outcome_of_the_initiative = "Field is required";
      formValid = false;
    }
    // if (!webLinkList) {
    //   errors.Web_link = "Field is required";
    //   formValid = false;
    // }
    if (!webLinkList) {
      errors.Web_link = "Field is required";
      formValid = false;
    } else {
      const urlRegex = new RegExp(
        "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
      );
      const isValidUrl = urlRegex.test(webLinkList);
      if (!isValidUrl) {
        errors.Web_link = "Enter a valid URL";
        formValid = false;
      }
    }

    if (!formValid) {
      setValidationError(errors);
      return;
    }

    const data = {
      Initiative_undertaken: initiativeUndertakenList,
      Details_of_the_initiative: detailsoftheinitiativeList,
      Outcome_of_the_initiative: outcomeInitiativeList,
      Web_link: webLinkList,
    };

    const editDataCheck = {
      id: currentEditId,
      Initiative_undertaken: initiativeUndertakenList,
      Details_of_the_initiative: detailsoftheinitiativeList,
      Outcome_of_the_initiative: outcomeInitiativeList,
      Web_link: webLinkList,
    };

    if (currentEditId) {
      dispatch(
        editInitiativesTowardsCarbonZeroDetail({
          id: currentEditId,
          data: editDataCheck,
        })
      ).then(() => {
        dispatch(
          viewInitiativesTowardsCarbonZeroDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );
        resetNCWAELData();
      });
    } else {
      dispatch(addInitiativesTowardsCarbonZeroDetail(data)).then(() => {
        resetNCWAELData();

        dispatch(
          viewInitiativesTowardsCarbonZeroDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );
      });
    }

    addITCZDialogClose();
  };

  const ITCZChangePage = (event, newPage) => {
    setPage(newPage);
    const newPaginationModel = { ...paginationModel, page: newPage + 1 };
    setPaginationModel(newPaginationModel);
    dispatch(
      viewInitiativesTowardsCarbonZeroDetail({
        page: newPage + 1,
        page_size: rowsPerPage,
      })
    );
  };

  const ITCZChangeRowsPerPage = (event) => {
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
      viewInitiativesTowardsCarbonZeroDetail({
        page: 1,
        page_size: rowsPerPage,
      })
    );
  };

  const addITCZDialog = () => {
    setAddITCZDialogOpen(true);
  };

  const addITCZDialogClose = () => {
    setAddITCZDialogOpen(false);
    setCurrentEditId(null);
    setInitiativeundertakenList(null);
    setDetailsoftheinitiativeList(null);
    setOutcomeInitiativeList(null);
    setWebLinkList(null);
    setValidationError({
      Initiative_undertaken: "",
      Details_of_the_initiative: "",
      Outcome_of_the_initiative: "",
      Web_link: "",
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

 
  const handleDeleteItem = (currentEditId) => {
    dispatch(deleteInitiativesTowardsCarbonZeroDetail(currentEditId)).then(
      () => {
        dispatch(
          viewInitiativesTowardsCarbonZeroDetail({
            page: 1,
            page_size: 5,
          })
        );
      }
    );
  };

  const handleEdit = (row) => {
    setCurrentEditId(row.id);
    setInitiativeundertakenList(row.Initiative_undertaken);
    setDetailsoftheinitiativeList(row.Details_of_the_initiative);
    setOutcomeInitiativeList(row.Outcome_of_the_initiative);
    setWebLinkList(row.Web_link);
    addITCZDialog();
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
          title="Initiatives towards carbon zero"
          action={
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="button"
              onClick={addITCZDialog}
              sx={{ width: { xs: "100%", sm: 170 }, maxWidth: "100%" }}
            >
              ADD
            </Button>
          }
        />
        <TableContainer>
        
          <Table stickyHeader aria-label="Initiatives towards carbon zero">
            <TableHead>
              <TableRow key="headRowITCZ">
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
                    pageITCZ * rowsPerPageITCZ,
                    pageITCZ * rowsPerPageITCZ + rowsPerPageITCZ
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
          rowsPerPage={rowsPerPageITCZ}
          page={page}
          onPageChange={ITCZChangePage}
          onRowsPerPageChange={ITCZChangeRowsPerPage}
        />
      </Card>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidthMd}
        open={addITCZDialogOpen}
        onClose={addITCZDialogClose}
      >
     

        <DialogTitle>
          {currentEditId
            ? "Edit  Initiatives towards carbon zero "
            : "Add  Initiatives towards carbon zero "}
          <IconButton
            className="MuiIconButton-close"
            aria-label="close"
            onClick={addITCZDialogClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container direction="row" spacing={{ xs: 3, sm: 6 }}>
            <Grid item xs={12} mt={2}>
              <TextField
                fullWidth
                size="small"
                label="Initiative Undertaken"
                id="Initiative_undertaken"
                name="Initiative_undertaken"
                value={initiativeUndertakenList}
                onChange={handleInitiativeUndertakenChange}
                error={!!validationError.Initiative_undertaken}
                helperText={validationError.Initiative_undertaken}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Details of the initiative"
                id="Details_of_the_initiative"
                name="Details_of_the_initiative"
                value={detailsoftheinitiativeList}
                onChange={handleDetailsoftheinitiativeChange}
                error={!!validationError.Details_of_the_initiative}
                helperText={validationError.Details_of_the_initiative}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Outcome of the initiative"
                id="Outcome_of_the_initiative"
                name="Outcome_of_the_initiative"
                value={outcomeInitiativeList}
                onChange={handleOutcomeInitiativeChange}
                error={!!validationError.Outcome_of_the_initiative}
                helperText={validationError.Outcome_of_the_initiative}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Web-link"
                id="Web_link"
                name="Web_link"
                value={webLinkList}
                onChange={handleWebLinkChange}
                error={!!validationError.Web_link}
                helperText={validationError.Web_link}
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
                // onClick={addITCZDialogClose}
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
                // onClick={addITCZDialogClose}
                onClick={() => {
                  resetNCWAELData();
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

export default InitiativesTowardsCarbonZero;
