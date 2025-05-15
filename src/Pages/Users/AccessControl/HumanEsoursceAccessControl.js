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

const columnsHeac = [
  { id: "section", label: "SECTION" },
  { id: "pageName", label: "PAGE NAME" },
  { id: "subPageName", label: "SUB PAGE NAME" },
  { id: "menuAccess", label: "MENU ACCESS", disablePadding: true },
  { id: "view", label: "VIEW" },
  { id: "add", label: "ADD" },
  { id: "edit", label: "EDIT" },
  { id: "delete", label: "DELETE" },
];

const rowsHeac = [
  createDataHeac(
    "Environment",
    "Emissions",
    "Employees",
    true,
    true,
    false,
    false,
    false
  ),
  createDataHeac(
    "Environment",
    "Emissions",
    "Employees",
    true,
    true,
    false,
    false,
    false
  ),
  createDataHeac(
    "Environment",
    "Emissions",
    "Employees",
    true,
    true,
    false,
    false,
    false
  ),
  createDataHeac(
    "Environment",
    "Emissions",
    "Employees",
    true,
    true,
    false,
    false,
    false
  ),
  createDataHeac(
    "Environment",
    "Emissions",
    "Employees",
    true,
    true,
    false,
    false,
    false
  ),
  createDataHeac(
    "Environment",
    "Emissions",
    "Employees",
    true,
    true,
    false,
    false,
    false
  ),
  createDataHeac(
    "Environment",
    "Emissions",
    "Employees",
    true,
    true,
    false,
    false,
    false
  ),
  createDataHeac(
    "Environment",
    "Emissions",
    "Employees",
    true,
    true,
    false,
    false,
    false
  ),
  createDataHeac(
    "Environment",
    "Emissions",
    "Employees",
    true,
    true,
    false,
    false,
    false
  ),
  createDataHeac(
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

function createDataHeac(
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

function HumanEsoursceAccessControl() {
  const [pageHeac, setPageHeac] = React.useState(0);
  const [rowsPerPageHeac, setRowsPerPageHeac] = React.useState(5);
  const [editMode, setEditMode] = useState(false);

  const HeacChangePage = (event, newPage) => {
    setPageHeac(newPage);
  };

  const HeacChangeRowsPerPage = (event) => {
    setRowsPerPageHeac(+event.target.value);
    setPageHeac(0);
  };

  const editFieldButtonHeac = () => {
    setEditMode(true);
  };

  const saveFieldButtonHeac = () => {
    setEditMode(false);
  };

  return (
    <>
      <Card className="card">
        <CardHeader
          title="Human Resource Access Control"
          action={
            !editMode ? (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="button"
                onClick={editFieldButtonHeac}
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
                onClick={saveFieldButtonHeac}
                sx={{ width: { xs: 100, sm: 170 }, maxWidth: "100%" }}
              >
                SAVE
              </Button>
            )
          }
        />
        <TableContainer>
          <Table stickyHeader aria-label="Human Esoursce Access Control">
            <TableHead>
              <TableRow key="headRowHeac">
                {columnsHeac.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsHeac
                .slice(
                  pageHeac * rowsPerPageHeac,
                  pageHeac * rowsPerPageHeac + rowsPerPageHeac
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
          count={rowsHeac.length}
          rowsPerPage={rowsPerPageHeac}
          page={pageHeac}
          onPageChange={HeacChangePage}
          onRowsPerPageChange={HeacChangeRowsPerPage}
        />
      </Card>
    </>
  );
}

export default HumanEsoursceAccessControl;
