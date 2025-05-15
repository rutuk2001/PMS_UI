import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  Grid,
  Button,
  Chip,
  Autocomplete,
  InputAdornment,
  FormControl,
  InputLabel,
  Checkbox,
  Select,
  MenuItem,
  IconButton,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Link,
} from "@mui/material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CloseIcon from "@mui/icons-material/Close";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";

import DeleteConfirmDialog from "./../../../Components/DeleteConfirmDialog";
import {
  addUser,
  clearErrorMessage,
  clearSuccessMessage,
  deleteUser,
  editUser,
  viewRoleList,
  viewUser,
} from "../../../store/Users/UserList/usersListSlice";
import { toast } from "react-toastify";
import { current } from "@reduxjs/toolkit";
import { fetchTypeOfPlantFacilityListApi } from "../../../store/CommonApi/CommonApiSlice";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;

const checkedIcon = <CheckBoxIcon fontSize="small" />;

const columnsUsersList = [
  { id: "name", label: "NAME", sortable: true },
  { id: "phone_number", label: "PHONE NO.", sortable: false },
  { id: "employee_code", label: "EMPLOYEE CODE", sortable: false },
  { id: "email", label: "E-MAIL", sortable: true },
  { id: "designation", label: "DESIGNATION", sortable: true },
  { id: "location", label: "LOCATION", sortable: true },
  { id: "password", label: "PASSWORD", sortable: false },
  { id: "role", label: "ROLE", sortable: true },
  { id: "status", label: "STATUS", sortable: true },
  { id: "actions", label: "ACTION", align: "right", sortable: false },
];

const addDetails = [
  { id: "firstname", label: "First Name" },
  { id: "lastname", label: "Last Name" },
  { id: "employee_code", label: "Employee Code" },
  { id: "email", label: "Email" },
  { id: "phone_extension", label: "Ex." },
  { id: "phone_number", label: "Phone No." },
  { id: "designation", label: "Designation" },
  // { id: "location", label: "LOCATION" },
  { id: "role", label: "Role" },
  { id: "password", label: "Password" },
  { id: "confirm_password", label: "Confirm Password" },
  { id: "status", label: "Status" },
];

const filterList = [
  "NAME",
  "PHONE NO.",
  "E-MAIL",
  "DESIGNATION",
  "LOCATION",
  "PASSWORD",
  "ROLE",
  "STATUS",
];
const phoneExList = ["020", "91", "376", "971", "43"];

const statusList = ["ACTIVE", "INACTIVE"];

function UsersList() {
  const dispatch = useDispatch();

  const { viewReport, error, success, total_page, roleList } = useSelector(
    (state) => state.UserSliceDetails
  );
  const { plantFacilityList } = useSelector(
    (state) => state.CommonApiDetailSlice
  );

  console.log(viewReport, "++++++s____++");
  useEffect(() => {
    dispatch(viewRoleList());
    dispatch(fetchTypeOfPlantFacilityListApi());
  }, [dispatch]);

  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [addUsersListDialogOpen, setAddUsersListDialogOpen] =
    React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidthMd, setMaxWidthMd] = React.useState("md");

  const [pageUsersList, setPageUsersList] = React.useState(0);
  const [rowsPerPageUsersList, setRowsPerPageUsersList] = React.useState(5);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [status, setStatus] = useState(null);
  const [rolesList, setRolesList] = useState(null);
  const [locationList, setLocationList] = useState(null);
  const [phoneExtention, setPhoneExtention] = useState(null);
  const [currentEditId, setcurrentEditId] = useState(null);
  const [page, setPage] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 1,
  });

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    employee_code: "",
    phone_extension: "",
    phone_number: "",
    designation: "",
    location: [],
    role: "",
    password: "",
    confirm_password: "",
    status: "",
  });

  const [validationError, setValidationError] = useState({
    firstname: "",
    lastname: "",
    email: "",
    employee_code: "",
    phone_extension: "",
    phone_number: "",
    designation: "",
    location: "",
    role: "",
    password: "",
    confirm_password: "",
    status: "",
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setValidationError({
      ...validationError,
      [id]: "",
    });

    setFormData({ ...formData, [id]: value });
  };

  const handleStatusChange = (event, value) => {
    setStatus(value);
    setValidationError({
      ...validationError,
      status: "",
    });
  };

  const handleRolesList = (event, value) => {
    setRolesList(value);
    setValidationError({
      ...validationError,
      role: "",
    });
  };

  const handleLocationList = (event, value) => {
    const titles = value.map((item) => item);
    setLocationList(titles);

    setFormData((prevData) => ({
      ...prevData,
      location: value,
    }));
    setValidationError({
      ...validationError,
      location: [],
    });
  };

  const handlePhoneEXChange = (event, value) => {
    setPhoneExtention(value);
    setValidationError({
      ...validationError,
      phone_extension: "",
    });
  };

  const reset = () => {
    if (currentEditId) {
      setPhoneExtention(phoneExtention);
      setRolesList(rolesList);
      setLocationList(locationList);
      setStatus(status);
      setFormData({
        firstname: "",
        lastname: "",
        employee_code: "",
        email: "",
        phone_number: "",
        designation: "",
        location: [],
        password: "",
        confirm_password: "",
      });
    } else {
      setPhoneExtention(null);
      setRolesList(null);
      setLocationList(null);
      setStatus(null);
      setFormData({
        firstname: "",
        lastname: "",
        employee_code: "",
        email: "",
        phone_number: "",
        designation: "",
        location: [],
        password: "",
        confirm_password: "",
      });
    }
    setValidationError({
      firstname: "",
      lastname: "",
      employee_code: "",
      email: "",
      phone_number: "",
      designation: "",
      location: [],
      password: "",
      confirm_password: "",
    });
  };

  const handleSaveChanges = () => {
    let valid = true;
    const newErrors = {
      firstname: "",
      lastname: "",
      employee_code: "",
      email: "",
      phone_extension: "",
      phone_number: "",
      designation: "",
      location: [],
      role: "",
      password: "",
      confirm_password: "",
      status: "",
    };

    if (!formData.firstname) {
      newErrors.firstname = "firstname is required";
      valid = false;
    }

    if (!formData.lastname) {
      newErrors.lastname = "lastname is required";
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = "email is required";
      valid = false;
    }

    if (!phoneExtention) {
      newErrors.phone_extension = "phone extention is required";
      valid = false;
    }
    if (!formData.phone_number) {
      newErrors.phone_number = "phone nuamber is required";
      valid = false;
    }
    if (!formData.designation) {
      newErrors.designation = "designation is required";
      valid = false;
    }
    if (!formData.location) {
      newErrors.location = "location is required";
      valid = false;
    }
    if (!rolesList) {
      newErrors.role = "role is required";
      valid = false;
    }
    if (!formData.password) {
      newErrors.password = "password is required";
      valid = false;
    }
    if (!formData.confirm_password) {
      newErrors.confirm_password = "confirm password is required";
      valid = false;
    }
    if (!status) {
      newErrors.status = "status is required";
      valid = false;
    }

    if (!valid) {
      setValidationError(newErrors);
      return;
    }

    const data = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      employee_code: formData.employee_code,
      email: formData.email,
      phone_extension: phoneExtention,
      phone_number: formData.phone_number,
      designation: formData.designation,
      location: formData.location,
      role: rolesList,
      password: formData.password,
      confirm_password: formData.confirm_password,
      status: status,
    };
    const editDataCheck = {
      ...data,
    };

    if (currentEditId) {
      dispatch(editUser({ email: data.email, data: editDataCheck })).then(
        () => {
          dispatch(
            viewUser({
              page: paginationModel.page,
              page_size: paginationModel.pageSize,
            })
          );
          reset();
        }
      );
    } else {
      dispatch(addUser(data)).then(() => {
        reset();
        dispatch(
          viewUser({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );
      });
    }

    addUsersListDialogClose();
  };

  const UsersListChangePage = (event, newPage) => {
    setPage(newPage);
    const newPaginationModel = { ...paginationModel, page: newPage + 1 };
    setPaginationModel(newPaginationModel);
    dispatch(
      viewUser({
        page: newPage + 1,
        page_size: rowsPerPage,
      })
    );
  };

  const UsersListChangeRowsPerPage = (event) => {
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
      viewUser({
        page: 1,
        page_size: rowsPerPage,
      })
    );
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const addUsersListDialog = () => {
    setAddUsersListDialogOpen(true);
  };

  const addUsersListDialogClose = () => {
    setAddUsersListDialogOpen(false);
    setcurrentEditId(null);
    setFormData({
      firstname: "",
      lastname: "",
      employee_code: "",
      email: "",
      phone_number: "",
      designation: "",
      location: "",
      password: "",
      confirm_password: "",
    });
    setPhoneExtention(null);
    setRolesList(null);
    setLocationList(null);
    setStatus(null);
  };

  const handleDeleteConfirmDialogOpen = (row) => {
    setcurrentEditId(row.email);
    setDeleteConfirmDialogOpen(true);
  };

  const handleDeleteConfirmDialogClose = (row) => {
    setDeleteConfirmDialogOpen(false);
    setcurrentEditId(null);
  };

  const handleDeleteItem = () => {
    dispatch(deleteUser(currentEditId)).then(() => {
      dispatch(
        viewUser({
          page: 1,
          page_size: 5,
        })
      );
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleEdit = (row) => {
    setcurrentEditId(row.email);
    setFormData({
      firstname: row.firstname,
      lastname: row.lastname,
      employee_code: row.employee_code,
      email: row.email,
      phone_number: row.phone_number,
      designation: row.designation,
      location: row.location,
      password: row.password,
      confirm_password: row.password,
    });
    setPhoneExtention(row.phone_extension);
    setRolesList(row.role);
    setLocationList(row.location);
    setStatus(row.status);
    addUsersListDialog();
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
          title="Patient List"
          className="MuiCardHeader-action-lgdown-fullwidth"
          action={
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              rowSpacing={3}
              columnSpacing={{ xs: 3, sm: 6 }}
            >
              <Grid item xs={12} sm="auto">
                <TextField
                  size="small"
                  label=""
                  id="Search"
                  placeholder="Search"
                  sx={{ width: { xs: "100%", sm: 284 }, maxWidth: "100%" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ color: "#8C8C8C" }}
                      >
                        <SearchOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm="auto">
                <Autocomplete
                  size="small"
                  id="filterList"
                  options={filterList}
                  renderInput={(params) => (
                    <TextField {...params} label="Filter" />
                  )}
                  sx={{ width: { xs: "100%", sm: 140 }, maxWidth: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm="auto">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  className="button"
                  onClick={addUsersListDialog}
                  sx={{ width: { xs: "100%", sm: 170 }, maxWidth: "100%" }}
                >
                  ADD
                </Button>
              </Grid>
            </Grid>
          }
        />
        <TableContainer>
          <Table stickyHeader aria-label="Users List">
            <TableHead>
              <TableRow key="headRowUsersList">
                {columnsUsersList.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.sortable ? (
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : "asc"}
                        onClick={() => handleRequestSort(column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    ) : (
                      column.label
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {viewReport?.data?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columnsUsersList.length} align="center">
                    <Typography variant="body1">No data found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                viewReport?.data
                  ?.slice(
                    pageUsersList * rowsPerPageUsersList,
                    pageUsersList * rowsPerPageUsersList + rowsPerPageUsersList
                  )
                  .map((row, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columnsUsersList.map((column) => {
                        const value = row[column.id];
                        const displayValue =
                          column.id === "name"
                            ? `${row.firstname} ${row.lastname}`
                            : column.id === "phone_number"
                            ? `${row.phone_extension} - ${value}`
                            : value;

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "status" ? (
                              <Chip
                                label={value}
                                color={
                                  value === "ACTIVE" ? "primary" : "warning"
                                }
                                variant="outlined"
                                sx={{ width: "100px" }}
                              />
                            ) : column.id === "actions" ? (
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
                            ) : (
                              displayValue
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={total_page}
          rowsPerPage={rowsPerPageUsersList}
          page={page}
          onPageChange={UsersListChangePage}
          onRowsPerPageChange={UsersListChangeRowsPerPage}
        />
      </Card>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidthMd}
        open={addUsersListDialogOpen}
        onClose={addUsersListDialogClose}
      >
        <DialogTitle>Add/Edit User</DialogTitle>
        <IconButton
          className="MuiIconButton-close"
          aria-label="close"
          onClick={addUsersListDialogClose}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent>
          <Grid container direction="row" spacing={{ xs: 3, sm: 6 }}>
            {addDetails
              .filter(
                (column) =>
                  column.id !== "phone_extension" &&
                  column.id !== "phone_number" &&
                  column.id !== "designation" &&
                  column.id !== "location" &&
                  column.id !== "role" &&
                  column.id !== "password" &&
                  column.id !== "confirm_password" &&
                  column.id !== "status"
              )
              .map((column) => (
                <Grid item key={column.id} xs={12} sm={6} md={6}>
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
            <Grid item xs={12} sm={6}>
              <Grid
                container
                direction="row"
                columnSpacing={{ xs: 1, sm: 3 }}
                rowSpacing={{ xs: 3, md: 6 }}
              >
                <Grid item xs={3}>
                  <Autocomplete
                    fullWidth
                    size="small"
                    disableClearable
                    id="phoneExList"
                    options={phoneExList}
                    value={phoneExtention}
                    onChange={handlePhoneEXChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Ex."
                        error={!!validationError.phone_extension}
                        helperText={validationError.phone_extension}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  {addDetails
                    .filter(
                      (column) =>
                        column.id !== "firstname" &&
                        column.id !== "employee_code" &&
                        column.id !== "email" &&
                        column.id !== "lastname" &&
                        column.id !== "phone_extension" &&
                        column.id !== "designation" &&
                        column.id !== "location" &&
                        column.id !== "role" &&
                        column.id !== "password" &&
                        column.id !== "confirm_password" &&
                        column.id !== "status"
                    )
                    .map((column) => (
                      <Grid item key={column.id} xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          size="small"
                          style={{ width: "200px" }}
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
            <Grid item xs={12} sm={6}>
              {addDetails
                .filter(
                  (column) =>
                    column.id !== "firstname" &&
                    column.id !== "email" &&
                    column.id !== "employee_code" &&
                    column.id !== "lastname" &&
                    column.id !== "phone_extension" &&
                    column.id !== "phone_number" &&
                    column.id !== "role" &&
                    column.id !== "password" &&
                    column.id !== "confirm_password" &&
                    column.id !== "status"
                )
                .map((column) => (
                  <Grid item key={column.id} xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      size="small"
                      style={{ width: "300px" }}
                      id={column.id}
                      label={column.label}
                      value={formData[column.id]}
                      onChange={handleInputChange}
                    />
                  </Grid>
                ))}
            </Grid>
            <Grid item sm={6}>
              <Autocomplete
                fullWidth
                size="small"
                id="roleList"
                options={roleList}
                value={rolesList}
                onChange={handleRolesList}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Role"
                    error={!!validationError.phone_extension}
                    helperText={validationError.phone_extension}
                  />
                )}
              />
            </Grid>
            {/* <Grid item sm={6}>
              <Autocomplete
                fullWidth
                size="small"
                id="locationList"
                options={plantFacilityList}
                value={locationList}
                onChange={handleLocationList}
                renderInput={(params) => <TextField {...params} label="LOCATION" />}
              />
            </Grid> */}
            <Grid item sm={6}>
              <Autocomplete
                size="small"
                fullWidth
                multiple
                id="locationList"
                options={plantFacilityList || []} // Ensure it's an array
                value={formData.location || []} // Set the value from formData
                onChange={handleLocationList}
                disableCloseOnSelect
                getOptionLabel={(option) => option} // Since options are strings, use the option directly
                renderOption={(props, option, { selected }) => {
                  const { key, ...optionProps } = props;
                  return (
                    <li key={key} {...optionProps}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                        sx={{ py: 0, px: 0 }}
                      />
                      {option} {/* Display the string directly */}
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="LOCATION"
                    // error={!!validationError.location}
                    // helperText={validationError.location}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {addDetails
                .filter(
                  (column) =>
                    column.id !== "firstname" &&
                    column.id !== "employee_code" &&
                    column.id !== "email" &&
                    column.id !== "lastname" &&
                    column.id !== "phone_number" &&
                    column.id !== "phone_extension" &&
                    column.id !== "designation" &&
                    column.id !== "role" &&
                    column.id !== "status"
                )
                .map((column) => (
                  <Grid item key={column.id} xs={12} sm={10} md={6}>
                    <TextField
                      fullWidth
                      size="small"
                      style={{ width: "200px" }}
                      id={column.id}
                      label={column.label}
                      value={formData[column.id]}
                      onChange={handleInputChange}
                      type={showPassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOffOutlined />
                              ) : (
                                <VisibilityOutlined />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                ))}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                fullWidth
                size="small"
                id="statusList"
                value={status}
                onChange={handleStatusChange}
                options={statusList}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Status"
                    error={validationError.status}
                    helperText={validationError.status}
                  />
                )}
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
                  reset();
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

export default UsersList;
