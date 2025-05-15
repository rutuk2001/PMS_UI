import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Grid,
  Autocomplete,
  InputAdornment,
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
  TableSortLabel,
} from "@mui/material";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import DeleteConfirmDialog from "./../../../Components/DeleteConfirmDialog";
import { useDispatch, useSelector } from "react-redux";
import { viewUserActivities } from "../../../store/Users/activityLog/activityLogSlice";
import { format } from "date-fns";

const columnsActivityLog = [
  { id: "Name", label: "NAME", sortable: true },
  { id: "Activity", label: "ACTIVITY", sortable: true },
  { id: "Last_Update", label: "LAST UPDATE", sortable: true },
];

const filterList = ["NAME", "ACTIVITY", "LAST UPDATE"];

function ActivityLog() {
  const dispatch = useDispatch();

  const { viewReport, error, success, total_page } = useSelector(
    (state) => state.UserActivityDetails
  );

  useEffect(() => {
    dispatch(viewUserActivities());
  }, [dispatch]);

  const [pageActivityLog, setPageActivityLog] = React.useState(0);
  const [rowsPerPageActivityLog, setRowsPerPageActivityLog] =
    React.useState(10);

  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState("asc");

  const ActivityLogChangePage = (event, newPage) => {
    setPageActivityLog(newPage);
  };

  const ActivityLogChangeRowsPerPage = (event) => {
    setRowsPerPageActivityLog(+event.target.value);
    setPageActivityLog(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd-MM-yyyy, h:mm a");
  };
  
  return (
    <>
      <Card className="card">
        <CardHeader
          title="Activity Log"
          className="MuiCardHeader-action-mddown-fullwidth"
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
            </Grid>
          }
        />
        <TableContainer>
          <Table stickyHeader aria-label="Activity Log">
            <TableHead>
              <TableRow key="headRowActivityLog">
                {columnsActivityLog.map((column) => (
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
                  <TableCell colSpan={columnsActivityLog.length} align="center">
                    <Typography variant="body1">No data found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                viewReport?.data
                  ?.slice(
                    pageActivityLog * rowsPerPageActivityLog,
                    pageActivityLog * rowsPerPageActivityLog +
                      rowsPerPageActivityLog
                  )
                  .map((row, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columnsActivityLog.map((column) => (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "Last_Update"
                            ? formatDate(row[column.id])
                            : row[column.id]}
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
          rowsPerPage={rowsPerPageActivityLog}
          page={pageActivityLog}
          onPageChange={ActivityLogChangePage}
          onRowsPerPageChange={ActivityLogChangeRowsPerPage}
        />
      </Card>
    </>
  );
}

export default ActivityLog;
