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
  addPercentageOfInputMaterialDetail,
  deletePercentageOfInputMaterialDetail,
  editPercentageOfInputMaterialDetail,
  viewPercentageOfInputMaterialDetail,
  clearErrorMessage,
  clearSuccessMessage,
 } from "../../../store/Community/Society/PercentageOfInputMaterialSlice";
import { fetchFinancialYear } from "../../../store/CommonApi/CommonApiSlice";

const tableColumns = [
  { id: "Financial_Year", label: "Financial Year", width: "10%" },
  { id: "Directly_Sourced_From_MSMEs_Small_Producers", label: "DIRECTLY SOURCED FROM MSMES/ SMALL PRODUCERS", width: "45%" },
  { id: "Sourced_Directly_Within_The_District_And_Neighbouring_Districts", label: "SOURCED DIRECTLY WITHIN THE DISTRICT AND NEIGHBOURING DISTRICTS", width: "45%" },
  { id: "actions", label: "ACTION", align: "right", width: '90px' },
];


function PercentageOfInputMaterial() {
  
  const dispatch = useDispatch();
  const [currentEditId, setCurrentEditId] = useState(null);

  const { finalYear } = useSelector(
    (state) => state.CommonApiDetailSlice
  );

  const { viewReport, error, success, total_page } = useSelector(
    (state) => state.PercentageOfInputMaterialDetails
  );

  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [addPoimDialogOpen, setAddPoimDialogOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidthMd] = React.useState("md");

  const [pagePoim, setPagePoim] = React.useState(0);
  const [rowsPerPagePoim, setRowsPerPagePoim] = React.useState(5);


  
  
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
    Directly_Sourced_From_MSMEs_Small_Producers: "",
    Sourced_Directly_Within_The_District_And_Neighbouring_Districts: "",
    
  });

  const validateForm = (fieldName) => {
    const requiredFields = [
      "Financial_Year",
      "Directly_Sourced_From_MSMEs_Small_Producers",
      "Sourced_Directly_Within_The_District_And_Neighbouring_Districts",
      
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
        Directly_Sourced_From_MSMEs_Small_Producers: "",
        Sourced_Directly_Within_The_District_And_Neighbouring_Districts: "",
      });
    } else {
      console.log("else called");

      setFormData({
        Financial_Year: "",
        Directly_Sourced_From_MSMEs_Small_Producers: "",
        Sourced_Directly_Within_The_District_And_Neighbouring_Districts: "",
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
      Directly_Sourced_From_MSMEs_Small_Producers: parseNumber(formData.Directly_Sourced_From_MSMEs_Small_Producers),
      Sourced_Directly_Within_The_District_And_Neighbouring_Districts: parseNumber(formData.Sourced_Directly_Within_The_District_And_Neighbouring_Districts),
     
    };

    const editDataCheck = {
      id: currentEditId,
      Financial_Year: formData.Financial_Year,
      Directly_Sourced_From_MSMEs_Small_Producers: parseNumber(formData.Directly_Sourced_From_MSMEs_Small_Producers),
      Sourced_Directly_Within_The_District_And_Neighbouring_Districts: parseNumber(formData.Sourced_Directly_Within_The_District_And_Neighbouring_Districts),
 
    };

    if (currentEditId) {
      dispatch(
        editPercentageOfInputMaterialDetail({
          id: currentEditId,
          data: editDataCheck,
        })
      ).then(() => {
        dispatch(
          viewPercentageOfInputMaterialDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );
      });
    } else {
      dispatch(addPercentageOfInputMaterialDetail(data)).then(() => {
        resetData();

        dispatch(
          viewPercentageOfInputMaterialDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );
      });
    }

    addPoimDialogClose();
  };




  const PoimChangePage = (event, newPage) => {
    setPage(newPage);
    const newPaginationModel = { ...paginationModel, page: newPage + 1 };
    setPaginationModel(newPaginationModel);
    dispatch(
      viewPercentageOfInputMaterialDetail({
        page: newPage + 1,
        page_size: rowsPerPage,
      })
    );
  };

  const PoimChangeRowsPerPage = (event) => {
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
      viewPercentageOfInputMaterialDetail({
        page: 1,
        page_size: rowsPerPage,
      })
    );
  };

  const addPoimDialog = () => {
    setAddPoimDialogOpen(true);
  };

  const addPoimDialogClose = () => {
    setAddPoimDialogOpen(false);
    setCurrentEditId(null);
    resetData(null);
    setFormData({
      Financial_Year: "",
      Directly_Sourced_From_MSMEs_Small_Producers: "",
      Sourced_Directly_Within_The_District_And_Neighbouring_Districts: "",
    });
    setValidationErrors({
      Financial_Year: "",
      Directly_Sourced_From_MSMEs_Small_Producers: "",
      Sourced_Directly_Within_The_District_And_Neighbouring_Districts: "",
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
    dispatch(deletePercentageOfInputMaterialDetail(currentEditId)).then(
      () => {
        dispatch(
          viewPercentageOfInputMaterialDetail({
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
      Directly_Sourced_From_MSMEs_Small_Producers: row.Directly_Sourced_From_MSMEs_Small_Producers,
      Sourced_Directly_Within_The_District_And_Neighbouring_Districts: row.Sourced_Directly_Within_The_District_And_Neighbouring_Districts,
    });

    addPoimDialog();
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
          title="Percentage Of Input Material"
          className="MuiCardHeader-action-smdown-fullwidth"
          action={
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="button"
              onClick={addPoimDialog}
              sx={{ width: { xs: "100%", sm: 170 }, maxWidth: "100%" }}
            >
              ADD ROLE
            </Button>
          }
        />
        <TableContainer>
          {/* <Table stickyHeader aria-label="Percentage Of Input Material">
            <TableHead>
              <TableRow key="headRowPoim">
                {columnsPoim.map((column) => (
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
              {rowsPoim
                .slice(
                  pagePoim * rowsPerPagePoim,
                  pagePoim * rowsPerPagePoim + rowsPerPagePoim
                )
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columnsPoim.map((column, index) => {
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
                                      onClick={addPoimDialog}
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
            <Table stickyHeader aria-label="Percentage Of Input Material">
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
                    pagePoim * rowsPerPagePoim,
                  pagePoim * rowsPerPagePoim + rowsPerPagePoim
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
                              )   : column.id ===
                              "Directly_Sourced_From_MSMEs_Small_Producers" ||
                            column.id ===
                              "Sourced_Directly_Within_The_District_And_Neighbouring_Districts" ? (
                            `${value}%`
                          ): (
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
          rowsPerPage={rowsPerPagePoim}
          page={page}
          onPageChange={PoimChangePage}
          onRowsPerPageChange={PoimChangeRowsPerPage}
        />
      </Card>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidthMd}
        open={addPoimDialogOpen}
        onClose={addPoimDialogClose}
      >
          <DialogTitle>
          {currentEditId
            ? "Edit Percentage Of Input Material"
            : "Add Percentage Of Input Material"}
          <IconButton
            className="MuiIconButton-close"
            aria-label="close"
            onClick={addPoimDialogClose}
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
            <Grid item xs={12}>
         
                <TextField
                    fullWidth
                    size="small"
                  label="Directly sourced from MSMEs/ small producers"
                    id="Directly_Sourced_From_MSMEs_Small_Producers"
                    name="Directly_Sourced_From_MSMEs_Small_Producers"
                    value={formData.Directly_Sourced_From_MSMEs_Small_Producers}
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
                    error={!!validationErrors.Directly_Sourced_From_MSMEs_Small_Producers}
                    helperText={validationErrors.Directly_Sourced_From_MSMEs_Small_Producers}
                  />
            </Grid>
            <Grid item xs={12}>
            <TextField
                    fullWidth
                    size="small"
                    label="Sourced directly within the district and neighbouring districts"                    id="Sourced_Directly_Within_The_District_And_Neighbouring_Districts"
                    name="Sourced_Directly_Within_The_District_And_Neighbouring_Districts"
                    value={formData.Sourced_Directly_Within_The_District_And_Neighbouring_Districts}
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
                    error={!!validationErrors.Sourced_Directly_Within_The_District_And_Neighbouring_Districts}
                    helperText={validationErrors.Sourced_Directly_Within_The_District_And_Neighbouring_Districts}
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

export default PercentageOfInputMaterial;
