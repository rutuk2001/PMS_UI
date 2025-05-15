import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  TextField,
  Typography,
  Link,
  Autocomplete,
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
  DialogContentText,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import DeleteConfirmDialog from "./../../../Components/DeleteConfirmDialog";
import {
  fetchFinancialYear,
  fetchGetproductsServicesList,
} from "../../../store/CommonApi/CommonApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addPServicesDetail,
  deletePServicesDetail,
  editPServicesDetail,
  viewPServicesDetail,
  clearSuccessMessage,
  clearErrorMessage,
} from "../../../store/CompanyDetails/BusinessActivity/ProductServiceADD/PServiceSlice";
import { toast } from "react-toastify";

function ProductsServices() {
  const dispatch = useDispatch();

  const { viewReport, error, success, total_page } = useSelector(
    (state) => state.PServiceSliceDetail
  );

  const { finalYear, productServiceList } = useSelector(
    (state) => state.CommonApiDetailSlice
  );

  const [tableColumns, setTableColumns] = useState([
    { id: "Financial_Year", label: "Financial Year" },
    { id: "Total_Percent_Turnover", label: "TOTAL" },
    { id: "actions", label: "ACTION", align: "right" },
  ]);

  useEffect(() => {
    dispatch(fetchFinancialYear());
    dispatch(fetchGetproductsServicesList());
  }, [dispatch]);

  // useEffect(() => {
  //   if (productServiceList) {
  //     const dynamicColumns = productServiceList.map((activity) => ({
  //       id: activity,
  //       label: activity.toUpperCase(),
  //     }));
  //     setTableColumns([
  //       { id: "Financial_Year", label: "Financial Year" },
  //       ...dynamicColumns,
  //       { id: "Total_Percent_Turnover", label: "TOTAL" },
  //       { id: "actions", label: "ACTION", align: "right" },
  //     ]);
  //   }
  // }, [productServiceList]);

  useEffect(() => {
    if (Array.isArray(productServiceList) && productServiceList.length > 0) {
      const dynamicColumns = productServiceList.map((activity) => ({
        id: activity,
        label: activity.toUpperCase(),
      }));
      setTableColumns([
        { id: "Financial_Year", label: "Financial Year" },
        ...dynamicColumns,
        { id: "Total_Percent_Turnover", label: "TOTAL" },
        { id: "actions", label: "ACTION", align: "right" },
      ]);
    }
  }, [productServiceList]);

  const [financialYear, setFinancialYear] = useState(null);
  const handleFinancialYearChange = (event, value) => {
    setFinancialYear(value);
    setValidationError("");
  };

  const [productService, setProductService] = useState([
    { productServiceList: null, percentTurnover: "" },
  ]);

  const handleProductServiceChange = (index, event, value) => {
    const updatedProductService = [...productService];

    if (
      updatedProductService.some(
        (activity) => activity.productServiceList === value
      )
    ) {
      toast.error("Process Service already selected");
    } else {
      updatedProductService[index].productServiceList = value;
      setProductService(updatedProductService);
      setValidationError("");
    }
  };

  const handleInputChange = (index, event) => {
    const { value } = event.target;
    const updatedProductService = [...productService];
    updatedProductService[index].percentTurnover = value;

    const totalPercent = calculateTotalPercent(updatedProductService);

    if (
      value.trim() === "" ||
      !updatedProductService[index].productServiceList
    ) {
      setValidationError(
        "Product Service and % of Turnover are required for all entries."
      );
    } else if (totalPercent > 100) {
      setValidationError("Total turnover percentage cannot exceed 100%");
    } else {
      updatedProductService[index].validationError = "";
      setProductService(updatedProductService);
      setValidationError("");
    }
  };

  const calculateTotalPercent = (activities) => {
    return activities.reduce((total, activity) => {
      return total + parseFloat(activity.percentTurnover || 0);
    }, 0);
  };

  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [addProductsServicesDialogOpen, setAddProductsServicesDialogOpen] =
    React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidthMd, setMaxWidthMd] = React.useState("md");

  const [pageProductsServices, setPageProductsServices] = React.useState(0);
  const [rowsPerPageProductsServices, setRowsPerPageProductsServices] =
    React.useState(5);
  const [currentEditId, setCurrentEditId] = useState(null);

  const [validationError, setValidationError] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 1,
  });

  const productsServicesChangePage = (event, newPage) => {
    setPageProductsServices(newPage);
    const newPaginationModel = { ...paginationModel, page: newPage + 1 };
    setPaginationModel(newPaginationModel);
    dispatch(
      viewPServicesDetail({
        page: newPage + 1,
        page_size: rowsPerPage,
      })
    );
  };

  const productsServicesChangeRowsPerPage = (event) => {
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
      viewPServicesDetail({
        page: 1,
        page_size: rowsPerPage,
      })
    );
  };

  const addProductsServicesDialog = () => {
    setAddProductsServicesDialogOpen(true);
  };

  const addProductsServicesDialogClose = () => {
    setAddProductsServicesDialogOpen(false);
    setCurrentEditId(null);
    setProductService([{ productServiceList: null, percentTurnover: "" }]);
    setValidationError("");
    setFinancialYear(null);
  };

  const resetData = () => {
    if (currentEditId) {
      setFinancialYear(financialYear);
      setProductService([{ productService: null, percentTurnover: "" }]);
    } else {
      setCurrentEditId(null);
      setFinancialYear(null);
      setProductService([{ productService: null, percentTurnover: "" }]);
    }
    setValidationError("");
  };

  const addAnother = () => {
    if (calculateTotalPercent(productService) >= 100) {
      setValidationError("Total turnover percentage cannot exceed 100%");
      return;
    }
    setProductService([
      ...productService,
      { productServiceList: null, percentTurnover: "" },
    ]);
    setValidationError("");
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
    dispatch(deletePServicesDetail(currentEditId)).then(() => {
      dispatch(
        viewPServicesDetail({
          page: 1,
          page_size: rowsPerPage,
        })
      );
    });
  };

  const handleSaveChanges = () => {
    if (!financialYear) {
      setValidationError("Financial Year is required.");
      return;
    }

    const totalPercent = calculateTotalPercent(productService);
    if (totalPercent > 100) {
      setValidationError("Total turnover percentage cannot exceed 100%");
      return;
    }

    const productServiceAndTurnoverValid = productService.every(
      (item) => item.productServiceList && item.percentTurnover
    );

    if (!productServiceAndTurnoverValid) {
      setValidationError(
        "Product Service and Percent Turnover are required for all entries."
      );
      return;
    }
    const payload = {
      Financial_Year: financialYear,
      Total_Percent_Turnover: totalPercent,
      Products_Services_and_Turnover: productService.map((item) => ({
        Product_Service: item.productServiceList,
        Percent_Turnover: item.percentTurnover,
      })),
    };

    const Editpayload = {
      id: currentEditId,
      Financial_Year: financialYear,
      Total_Percent_Turnover: totalPercent,
      Products_Services_and_Turnover: productService.map((item) => ({
        Product_Service: item.productServiceList,
        Percent_Turnover: item.percentTurnover,
      })),
    };

    if (currentEditId) {
      dispatch(
        editPServicesDetail({
          id: currentEditId,
          data: Editpayload,
        })
      ).then(() => {
        dispatch(
          viewPServicesDetail({
            page: 1,
            page_size: rowsPerPage,
          })
        );
      });
    } else {
      dispatch(addPServicesDetail(payload)).then(() => {
        dispatch(
          viewPServicesDetail({
            page: 1,
            page_size: rowsPerPage,
          })
        );
      });
    }

    addProductsServicesDialogClose();
  };

  const handleEdit = (row) => {
    setCurrentEditId(row.id);
    setFinancialYear(row.Financial_Year);

    // setProductService(
    //   row.Products_Services_and_Turnover.map((item) => ({
    //     productService: item.Product_Service,
    //     percentTurnover: item.Percent_Turnover,
    //   }))
    // )
    let productServiceArray = [];

    // Convert to an array if necessary
    if (!Array.isArray(row.Products_Services_and_Turnover)) {
      productServiceArray = Object.values(row.Products_Services_and_Turnover);
    } else {
      productServiceArray = row.Products_Services_and_Turnover;
    }

    const productServiceData = productServiceArray.map((item) => ({
      productService: item.Product_Service,
      percentTurnover: item.Percent_Turnover,
    }));

    setProductService(productServiceData);

    addProductsServicesDialog();
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
          title="Products/ Services"
          action={
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="button"
              onClick={addProductsServicesDialog}
              sx={{ minWidth: 170 }}
            >
              ADD
            </Button>
          }
        />
        <TableContainer>
          <Table stickyHeader aria-label="Products/ Services">
            <TableHead>
              <TableRow key="headRowBA">
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
                    pageProductsServices * rowsPerPageProductsServices,
                    pageProductsServices * rowsPerPageProductsServices +
                      rowsPerPageProductsServices
                  )
                  .map((row, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {tableColumns.map((column) => (
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
                          ) : column.id === "Financial_Year" ? (
                            row.Financial_Year
                          ) : column.id === "Total_Percent_Turnover" ? (
                            row.Total_Percent_Turnover
                          ) : (
                            `${
                              row.Products_Services_and_Turnover[column.id] ===
                              undefined
                                ? 0
                                : row.Products_Services_and_Turnover[column.id]
                            } %` || "0"
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={total_page}
          rowsPerPage={rowsPerPageProductsServices}
          page={page}
          onPageChange={productsServicesChangePage}
          onRowsPerPageChange={productsServicesChangeRowsPerPage}
        />
      </Card>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidthMd}
        open={addProductsServicesDialogOpen}
        onClose={addProductsServicesDialogClose}
      >
        <DialogTitle>
          {currentEditId ? "Edit Products/Services" : "Add Products/Services"}

          <IconButton
            className="MuiIconButton-close"
            aria-label="close"
            onClick={addProductsServicesDialogClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container direction="row" spacing={{ xs: 3, sm: 6 }}>
            <Grid item xs={12} sm={6} mt={2}>
              <Autocomplete
                fullWidth
                size="small"
                value={financialYear}
                onChange={handleFinancialYearChange}
                options={finalYear || []}
                getOptionLabel={(option) => option || ""}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Financial Year"
                    variant="outlined"
                  />
                )}
                disabled={!!currentEditId}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                direction="row"
                rowSpacing={3}
                columnSpacing={{ xs: 3, sm: 6 }}
              >
                {productService.map((product, index) => (
                  <React.Fragment key={index}>
                    <Grid item xs={12} sm={6}>
                      <Autocomplete
                        fullWidth
                        value={product?.productService}
                        onChange={(event, value) =>
                          handleProductServiceChange(index, event, value)
                        }
                        // options={productServiceList || []}
                        options={
                          productServiceList.length > 0
                            ? productServiceList
                            : []
                        }
                        getOptionLabel={(option) => option || ""}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            label="Product Service"
                            variant="outlined"
                            error={validationError !== ""}
                            helperText={
                              validationError !== "" &&
                              "Product Service is required"
                            }
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        size="small"
                        id="percentTurnover"
                        label="% of Turnover"
                        variant="outlined"
                        value={product?.percentTurnover}
                        onChange={(event) => handleInputChange(index, event)}
                        error={validationError !== ""}
                        helperText={
                          validationError !== "" ? validationError : ""
                        }
                      />
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Link
                component="button"
                variant="body2"
                onClick={addAnother}
                style={{ marginLeft: 8 }}
              >
                Add another
              </Link>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              alignItems="center"
              spacing={{ xs: 3, sm: 6 }}
            >
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  Accounting for 100% of the Turnover
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  label="TOTAL %"
                  value={calculateTotalPercent(productService)}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <Grid container spacing={2} justifyContent="left" padding={2}>
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
      </Dialog>

      <DeleteConfirmDialog
        open={deleteConfirmDialogOpen}
        onClose={handleDeleteConfirmDialogClose}
        onDelete={() => handleDeleteItem(currentEditId)}
      />
    </>
  );
}

export default ProductsServices;
