import React, { useState } from "react";
import { Card, CardHeader, Button, Switch, Checkbox } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";

const columnsIrac = [
  { id: "section", label: "SECTION" },
  { id: "pageName", label: "PAGE NAME" },
  { id: "subPageName", label: "SUB PAGE NAME" },
  { id: "menuAccess", label: "MENU ACCESS", disablePadding: true },
  { id: "view", label: "VIEW" },
  { id: "add", label: "ADD" },
  { id: "edit", label: "EDIT" },
  { id: "delete", label: "DELETE" },
];

const rowsIrac = [
  createDataIrac(
    "Environment",
    "Emissions",
    "Employees",
    true,
    true,
    false,
    false,
    false
  ),
  createDataIrac(
    "Environment",
    "Emissions",
    "Employees",
    true,
    true,
    false,
    false,
    false
  ),
  createDataIrac(
    "Environment",
    "Emissions",
    "Employees",
    true,
    true,
    false,
    false,
    false
  ),
  createDataIrac(
    "Environment",
    "Emissions",
    "Employees",
    true,
    true,
    false,
    false,
    false
  ),
  createDataIrac(
    "Environment",
    "Emissions",
    "Employees",
    true,
    true,
    false,
    false,
    false
  ),
  createDataIrac(
    "Environment",
    "Emissions",
    "Employees",
    true,
    true,
    false,
    false,
    false
  ),
  createDataIrac(
    "Environment",
    "Emissions",
    "Employees",
    true,
    true,
    false,
    false,
    false
  ),
  createDataIrac(
    "Environment",
    "Emissions",
    "Employees",
    true,
    true,
    false,
    false,
    false
  ),
  createDataIrac(
    "Environment",
    "Emissions",
    "Employees",
    true,
    true,
    false,
    false,
    false
  ),
  createDataIrac(
    "Environment",
    "Emissions",
    "Employees",
    true,
    true,
    false,
    false,
    false
  ),
];

function createDataIrac(
  section,
  pageName,
  subPageName,
  menuAccess,
  view,
  add,
  edit,
  del
) {
  return {
    section,
    pageName,
    subPageName,
    menuAccess,
    view,
    add,
    edit,
    delete: del,
  };
}

function InvestorRelationsAccessControl() {
  const [pageIrac, setPageIrac] = React.useState(0);
  const [rowsPerPageIrac, setRowsPerPageIrac] = React.useState(5);
  const [editMode, setEditMode] = useState(false);

  const IracChangePage = (event, newPage) => {
    setPageIrac(newPage);
  };

  const IracChangeRowsPerPage = (event) => {
    setRowsPerPageIrac(+event.target.value);
    setPageIrac(0);
  };

  const editFieldButtonIrac = () => {
    setEditMode(true);
  };

  const saveFieldButtonIrac = () => {
    setEditMode(false);
  };

  return (
    <>
      <Card className="card">
        <CardHeader
          title="Company Secretary Access Control"
          action={
            !editMode ? (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="button"
                onClick={editFieldButtonIrac}
                sx={{ width: { xs: 100, sm: 170 }, maxWidth: "100%" }}
              >
                EDIT
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="button"
                onClick={saveFieldButtonIrac}
                sx={{ width: { xs: 100, sm: 170 }, maxWidth: "100%" }}
              >
                SAVE
              </Button>
            )
          }
        />
        <TableContainer>
          <Table stickyHeader aria-label="Investor Relations Access Control">
            <TableHead>
              <TableRow key="headRowIrac">
                {columnsIrac.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsIrac
                .slice(
                  pageIrac * rowsPerPageIrac,
                  pageIrac * rowsPerPageIrac + rowsPerPageIrac
                )
                .map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.section}</TableCell>
                    <TableCell>{row.pageName}</TableCell>
                    <TableCell>{row.subPageName}</TableCell>
                    <TableCell>
                      <Switch
                        defaultChecked={row.menuAccess}
                        disabled={!editMode}
                        inputProps={{ "aria-label": "MENU ACCESS" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        defaultChecked={row.view}
                        disabled={!editMode}
                        sx={{ p: 1 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        defaultChecked={row.add}
                        disabled={!editMode}
                        sx={{ p: 1 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        defaultChecked={row.edit}
                        disabled={!editMode}
                        sx={{ p: 1 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        defaultChecked={row.delete}
                        disabled={!editMode}
                        sx={{ p: 1 }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rowsIrac.length}
          rowsPerPage={rowsPerPageIrac}
          page={pageIrac}
          onPageChange={IracChangePage}
          onRowsPerPageChange={IracChangeRowsPerPage}
        />
      </Card>
    </>
  );
}

export default InvestorRelationsAccessControl;
