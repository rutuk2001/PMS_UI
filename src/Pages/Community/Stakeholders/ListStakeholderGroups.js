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
  Checkbox,
  requirePropFactory,
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
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DeleteConfirmDialog from "./../../../Components/DeleteConfirmDialog";
import { useDispatch, useSelector } from "react-redux";
import { fetchFrequencyEngagement } from "../../../store/CommonApi/CommonApiSlice";
import {
  addListStackholderDetail,
  clearListStackholderErrorMessage,
  clearListStackholderSuccessMessage,
  deleteListStackholderDetails,
  editListStackholderDetail,
  ListStackholderDetail,
  viewListStackholderDetail,
} from "../../../store/Community/stakeholder/ListStackholderSlice";
import { toast } from "react-toastify";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const columnsLsgs = [
  { id: "Stack_Holder_Group", label: "STAKE HOLDER GROUP", width: "17%" },
  {
    id: "Vulnerable_And_Marginalized",
    label: "VULNERABLE & MARGINALIZED GROUP",
    width: "15%",
  },
  {
    id: "Channels_Of_Communication",
    label: "CHANNELS OF COMMUNICATION",
    width: "20%",
  },
  {
    id: "Frequency_Of_Engagement",
    label: "FREQUENCY OF ENGAGEMENT",
    width: "12%",
  },
  {
    id: "Purpose_And_Scope_Of_Engagement",
    label: "PURPOSE AND SCOPE OF ENGAGEMENT",
    width: "34%",
  },
  { id: "actions", label: "ACTION", align: "right", width: "90px" },
];

const addDetails = [
  { id: "Stack_Holder_Group", label: "STAKE HOLDER GROUP", width: "17%" },
  {
    id: "Vulnerable_And_Marginalized",
    label: "VULNERABLE & MARGINALIZED GROUP",
    width: "15%",
  },
  {
    id: "Channels_Of_Communication",
    label: "CHANNELS OF COMMUNICATION",
    width: "20%",
  },
  {
    id: "Frequency_Of_Engagement",
    label: "FREQUENCY OF ENGAGEMENT",
    width: "12%",
  },
  {
    id: "Purpose_And_Scope_Of_Engagement",
    label: "PURPOSE AND SCOPE OF ENGAGEMENT",
    width: "34%",
  },
  { id: "actions", label: "ACTION", align: "right", width: "90px" },
];

const channelsCommunicationList = [
  { title: "Select All" },
  { title: "E-mail" },
  { title: "SMS" },
  { title: "Newspaper" },
  { title: "Community Meetings" },
  { title: "Advertisement" },
  { title: "Contractor Meetings" },
  { title: "Customer Visits" },
  { title: "Virtual discussions" },
  { title: "Website" },
  { title: "Other" },
  { title: "Notices" },
  { title: "Displays," },
  { title: "Meetings" },
  { title: "Intranet" },
  { title: "Review Meetings" },
  { title: "Performance Appraisal Dialogues" },
  { title: "KORE Platform (e-Learning Management System)" },
  { title: "Trainings" },
  { title: "Theme Based Virtual Round Tables" },
  { title: "MD’s Address." },
  { title: "In-House Magazine (Impeller)" },
  { title: "Employee Engagement Activities" },
  { title: "Get-togethers, Cultural Activities" },
  { title: "HR Dip-stick Survey" },
  { title: "Employee Engagement Survey" },
  { title: "Annual General Meetings" },
  { title: "Annual Reports" },
  { title: "Press Releases," },
  { title: "Media Interactions" },
  { title: "Investor Presentations" },
  { title: "Earnings Calls" },
  { title: "Stock Exchange Filings" },
  { title: "Notices to Shareholders" },
  { title: "Postal Ballots" },
  { title: "Investor Meets" },
  { title: "One-to-one Interactions" },
  { title: "Telephonic conversations" },
  { title: "i-Supplier Web Portal," },
  { title: "Virtual Meetingss" },
  { title: "Visits and Workshops." },
  { title: "Supplier Meets" },
  { title: "Vendor Satisfaction Survey" },
  { title: "Visits and Interactionss" },
  { title: "O & M Manuals" },
  { title: "Dealer Meets" },
  { title: "Customer Satisfaction Survey" },
  { title: "Interactions with District and State Authorities" },
  { title: "Central Government" },
  { title: "Pollution Control Boards" },
  { title: "Stock Exchanges and SEBI" },
  { title: "Direct and Indirect Tax Officials" },
  { title: "Economic Publications in Journals" },
  { title: "Seminars" },
  { title: "Media Reports" },
  { title: "Consortium Meetings" },
  { title: "Periodical Meetings with the member banks" },
  { title: "In-person interactions by CSR Team" },
  { title: "Volunteers" },
  { title: "Partners" },
  { title: "CSR Field Visits" },
  { title: "Society (CSR) Perception Survey and Focused Group Discussions." },
];
const frequencyEngagementstaticList = [
  { title: "Monthly" },
  { title: "Quarterly" },
  { title: "Half Yearly" },
  { title: "Yearly" },
  { title: "As and when scheduled" },
  { title: "Alternate Year" },
  { title: "Continuous" },
  { title: "Frequently" },
  { title: "On-going" },
  { title: "Need based" },
];

const vulnerableMarginalizedGroupList = ["Yes", "No"];

function ListStakeholderGroups() {
  const dispatch = useDispatch();
  const { viewReport, error, success, total_page, stackHolderList, loading } =
    useSelector((state) => state.ListStackholderSliceDetails);

  const { frequencyEngagementList } = useSelector(
    (state) => state.CommonApiDetailSlice
  );

  const [validationError, setValidationError] = useState({
    Purpose_And_Scope_Of_Engagement: "",
  });

  const [stackHolderGroup, setstackHolderGroup] = useState(null);
  const [vulnerableMarginalizedGroup, setvulnerableMarginalizedGroup] =
    useState(null);
  const [communicationChannel, setcommunicationChannel] = useState([]);
  const [frequencyEngagement, setfrequencyEngagement] = useState([]);

  useEffect(() => {
    dispatch(fetchFrequencyEngagement());
    dispatch(ListStackholderDetail());
  }, [dispatch]);

  const handleStackHolderGroup = (event, value) => {
    setstackHolderGroup(value);
    setValidationError({
      ...validationError,
      Stack_Holder_Group: "",
    });
  };

  const handleVulnerableMarginalizedGroup = (event, value) => {
    setvulnerableMarginalizedGroup(value);
    setValidationError({
      ...validationError,
      Vulnerable_And_Marginalized: "",
    });
  };

  const handlecommunicationChannel = (event, value) => {
    const hasSelectAll = value.some((item) => item.title === "Select All");

    if (hasSelectAll) {
      if (
        communicationChannel.length ===
        channelsCommunicationList.length - 1
      ) {
        setcommunicationChannel([]);
      } else {
        const allChannels = channelsCommunicationList.filter(
          (item) => item.title !== "Select All"
        );
        setcommunicationChannel(allChannels.map((item) => item));
      }
    } else {
      setcommunicationChannel(value.map((item) => item));
    }
    setValidationError({
      ...validationError,
      Channels_Of_Communication: "",
    });
  };
  console.log(communicationChannel);

  const handleFrequencyEngagement = (event, value) => {
    setfrequencyEngagement(value);
    setValidationError({
      ...validationError,
      Frequency_Of_Engagement: "",
    });
  };

  const [formData, setFormData] = useState({
    Purpose_And_Scope_Of_Engagement: "",
  });

  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [addLsgsDialogOpen, setAddLsgsDialogOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidthMd] = React.useState("md");

  const [pageLsgs, setPageLsgs] = React.useState(0);
  const [rowsPerPageLsgs, setRowsPerPageLsgs] = React.useState(5);
  const [page, setPage] = useState(0);
  const [currentEditId, setCurrentEditId] = useState(null);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 1,
  });
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const LsgsChangePage = (event, newPage) => {
    setPage(newPage);
    const newPaginationModel = { ...paginationModel, page: newPage + 1 };
    setPaginationModel(newPaginationModel);
    dispatch(
      viewListStackholderDetail({
        page: newPage + 1,
        page_size: rowsPerPage,
      })
    );
  };

  const LsgsChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(+event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPageLsgs(0);
    const newPaginationModel = {
      ...paginationModel,
      page: 1,
      pageSize: newRowsPerPage,
    };
    setPaginationModel(newPaginationModel);

    dispatch(
      viewListStackholderDetail({
        page: 1,
        page_size: rowsPerPage,
      })
    );
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;

    setFormData({ ...formData, [id]: value });
    setValidationError({ ...validationError, [id]: "" });
  };

  const addLsgsDialog = () => {
    setAddLsgsDialogOpen(true);
  };

  const addLsgsDialogClose = () => {
    setAddLsgsDialogOpen(false);
    setCurrentEditId(null);
    setFormData({
      Purpose_And_Scope_Of_Engagement: "",
    });
    setValidationError({
      Purpose_And_Scope_Of_Engagement: "",
      Stack_Holder_Group: "",
      Vulnerable_And_Marginalized: "",
      Channels_Of_Communication: "",
      Frequency_Of_Engagement: "",
    });
    setfrequencyEngagement([]);
    setvulnerableMarginalizedGroup(null);
    setcommunicationChannel([]);
    setstackHolderGroup(null);
  };

  const resetData = () => {
    if (currentEditId) {
      setFormData({
        Purpose_And_Scope_Of_Engagement: "",
      });
      setcommunicationChannel([]);
      setfrequencyEngagement([]);
      setstackHolderGroup(null);
    } else {
      setvulnerableMarginalizedGroup(null);
      setcommunicationChannel([]);
      setfrequencyEngagement([]);
      setstackHolderGroup(null);
      setstackHolderGroup(stackHolderGroup);
    }
    setFormData({
      Purpose_And_Scope_Of_Engagement: "",
    });
    setValidationError({
      Stack_Holder_Group: "",
      Vulnerable_And_Marginalized: "",
      Channels_Of_Communication: "",
      Frequency_Of_Engagement: "",
    });
  };

  const handleSaveChanges = () => {
    let newErrors = {
      Purpose_And_Scope_Of_Engagement: "",
      Stack_Holder_Group: "",
      Vulnerable_And_Marginalized: "",
      Channels_Of_Communication: "",
      Frequency_Of_Engagement: "",
    };

    console.log(
      stackHolderGroup,
      vulnerableMarginalizedGroup,
      communicationChannel,
      frequencyEngagement,
      formData.Purpose_And_Scope_Of_Engagement
    );
    let valid = true;
    if (!stackHolderGroup) {
      newErrors.Stack_Holder_Group = "This Field is required";
      valid = false;
    }

    if (!vulnerableMarginalizedGroup) {
      newErrors.Vulnerable_And_Marginalized = "This Field is required";
      valid = false;
    }

    // if (!communicationChannel || communicationChannel.length === 0) {
    //   newErrors.Channels_Of_Communication = "This Field is required";
    //   valid = false;
    // }

    // if (!frequencyEngagement || frequencyEngagement.length === 0) {
    //   newErrors.Frequency_Of_Engagement = "This Field is required";
    //   valid = false;
    // }

    // if (!formData.Purpose_And_Scope_Of_Engagement) {
    //   newErrors.Purpose_And_Scope_Of_Engagement = "This Field is Required";
    //   valid = false;
    // }

    setValidationError(newErrors);

    if (!valid) {
      return;
    }
    const data = {
      Frequency_Of_Engagement: frequencyEngagement.map((item) => item.title),
      Channels_Of_Communication: communicationChannel.map(
        (items) => items.title
      ),
      Vulnerable_And_Marginalized: vulnerableMarginalizedGroup,
      Stack_Holder_Group: stackHolderGroup,
      Purpose_And_Scope_Of_Engagement: formData.Purpose_And_Scope_Of_Engagement,
    };
    console.log(data, "data for saving");
    const editDataCheck = {
      id: currentEditId,
      ...data,
    };
    console.log();
    if (currentEditId) {
      dispatch(
        editListStackholderDetail({
          id: currentEditId,
          data: editDataCheck,
        })
      ).then(() => {
        dispatch(
          viewListStackholderDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );

        resetData();
      });
    } else {
      dispatch(addListStackholderDetail(data)).then(() => {
        resetData();
        dispatch(
          viewListStackholderDetail({
            page: paginationModel.page,
            page_size: paginationModel.pageSize,
          })
        );
      });
    }

    addLsgsDialogClose();
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
    dispatch(deleteListStackholderDetails(currentEditId)).then(() => {
      dispatch(
        viewListStackholderDetail({
          page: 1,
          page_size: 5,
        })
      );
    });
  };

  const handleEdit = (row) => {
    console.log(row);
    const communicationChannelList = row.Channels_Of_Communication.map(
      (channel) =>
        channelsCommunicationList.find((option) => option.title === channel)
    ).filter(Boolean);

    const frequencyManage = row.Frequency_Of_Engagement.map((channel) =>
      frequencyEngagementstaticList.find((option) => option.title === channel)
    ).filter(Boolean);

    setCurrentEditId(row.id);
    setstackHolderGroup(row.Stack_Holder_Group);
    setvulnerableMarginalizedGroup(row.Vulnerable_And_Marginalized);
    setcommunicationChannel(communicationChannelList);
    setfrequencyEngagement(frequencyManage);
    setFormData({
      Purpose_And_Scope_Of_Engagement: row.Purpose_And_Scope_Of_Engagement,
    });
    addLsgsDialog();
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(clearListStackholderSuccessMessage());
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearListStackholderErrorMessage());
    }
  }, [error, dispatch]);

  return (
    <>
      <Card className="card">
        <CardHeader
          title="List Stakeholder Groups"
          className="MuiCardHeader-action-smdown-fullwidth"
          action={
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="button"
              onClick={addLsgsDialog}
              sx={{ width: { xs: "100%", sm: 170 }, maxWidth: "100%" }}
            >
              ADD
            </Button>
          }
        />
        <TableContainer>
          <Table stickyHeader aria-label="List Stakeholder Groups">
            <TableHead>
              <TableRow key="headRowLsgs">
                {columnsLsgs.map((column) => (
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
                  <TableCell colSpan={columnsLsgs.length} align="center">
                    <Typography variant="body1">No data found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                viewReport?.data
                  ?.slice(
                    pageLsgs * rowsPerPageLsgs,
                    pageLsgs * rowsPerPageLsgs + rowsPerPageLsgs
                  )
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {columnsLsgs.map((column) => {
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
                              ) : column.format ? (
                                column.format(value)
                              ) : column.id === "Frequency_Of_Engagement" ||
                                column.id === "Channels_Of_Communication" ? (
                                Array.isArray(value) ? (
                                  value.join(", ")
                                ) : (
                                  value
                                )
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
          rowsPerPage={rowsPerPageLsgs}
          page={page}
          onPageChange={LsgsChangePage}
          onRowsPerPageChange={LsgsChangeRowsPerPage}
        />
      </Card>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidthMd}
        open={addLsgsDialogOpen}
        onClose={addLsgsDialogClose}
      >
        <DialogTitle>
          {currentEditId
            ? "Edit List Stakeholder Groups"
            : "Add List Stakeholder Groups"}

          <IconButton
            className="MuiIconButton-close"
            aria-label="close"
            onClick={addLsgsDialogClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <IconButton
          className="MuiIconButton-close"
          aria-label="close"
          onClick={addLsgsDialogClose}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Grid container direction="row" spacing={{ xs: 3, sm: 6 }}>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                size="small"
                fullWidth
                id="stakeholderGroupList"
                options={stackHolderList || []}
                value={stackHolderGroup || ""}
                disabled={!!currentEditId}
                onChange={handleStackHolderGroup}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Stakeholder Group"
                    error={!!validationError.Stack_Holder_Group}
                    helperText={validationError.Stack_Holder_Group}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                size="small"
                fullWidth
                id="vulnerableMarginalizedGroupList"
                options={vulnerableMarginalizedGroupList || []}
                value={vulnerableMarginalizedGroup}
                onChange={handleVulnerableMarginalizedGroup}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Vulnerable & Marginalized Group"
                    error={!!validationError.Vulnerable_And_Marginalized}
                    helperText={validationError.Vulnerable_And_Marginalized}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete
                size="small"
                fullWidth
                multiple
                id="frequencyEngagementstaticList"
                options={frequencyEngagementstaticList || []}
                onChange={handleFrequencyEngagement}
                disableCloseOnSelect
                defaultValue={frequencyEngagement}
                getOptionLabel={(option) => option.title}
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
                      {option.title}
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Frequency of engagement"
                    error={!!validationError.Frequency_Of_Engagement}
                    helperText={validationError.Frequency_Of_Engagement}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                  <Autocomplete
                    size="small"
                    fullWidth
                    multiple
                    id="channelsCommunicationList"
                    options={channelsCommunicationList || []}
                    onChange={handlecommunicationChannel}
                    disableCloseOnSelect
                    value={communicationChannel}
                    defaultValue={communicationChannel}
                    getOptionLabel={(option) => option.title}
                    renderOption={(props, option, { selected }) => {
                      const { key, ...optionProps } = props;
                      return (
                        <li key={key} {...optionProps}>
                          <Checkbox
                            checked={selected}
                            style={{ marginRight: 8 }}
                            sx={{ py: 0, px: 0 }}
                          />
                          {option.title}
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Channels of communication"
                        error={!!validationError.Channels_Of_Communication}
                        helperText={validationError.Channels_Of_Communication}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="row" spacing={{ xs: 3, sm: 6 }}>
                {addDetails
                  .filter(
                    (column) =>
                      column.id !== "Stack_Holder_Group" &&
                      column.id !== "actions" &&
                      column.id !== "Vulnerable_And_Marginalized" &&
                      column.id !== "Channels_Of_Communication" &&
                      column.id !== "Frequency_Of_Engagement"
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

export default ListStakeholderGroups;
