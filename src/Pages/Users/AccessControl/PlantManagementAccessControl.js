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

const columnsPmac = [
  { id: "section", label: "SECTION" },
  { id: "pageName", label: "PAGE NAME" },
  { id: "subPageName", label: "SUB PAGE NAME" },
  { id: "menuAccess", label: "MENU ACCESS", disablePadding: true },
  { id: "view", label: "VIEW" },
  { id: "add", label: "ADD" },
  { id: "edit", label: "EDIT" },
  { id: "delete", label: "DELETE" },
];

const rowsPmac = [
  createDataPmac(
    "Environment",
    "Emissions",
    "Employees",
    true,
    true,
    false,
    false,
    false
  ),
  createDataPmac(
    "Environment",
    "Emissions",
    "Employees",
    true,
    true,
    false,
    false,
    false
  ),
  createDataPmac(
    "Environment",
    "Emissions",
    "Employees",
    true,
    true,
    false,
    false,
    false
  ),
  createDataPmac(
    "Environment",
    "Emissions",
    "Employees",
    true,
    true,
    false,
    false,
    false
  ),
  createDataPmac(
    "Environment",
    "Emissions",
    "Employees",
    true,
    true,
    false,
    false,
    false
  ),
  createDataPmac(
    "Environment",
    "Emissions",
    "Employees",
    true,
    true,
    false,
    false,
    false
  ),
  createDataPmac(
    "Environment",
    "Emissions",
    "Employees",
    true,
    true,
    false,
    false,
    false
  ),
  createDataPmac(
    "Environment",
    "Emissions",
    "Employees",
    true,
    true,
    false,
    false,
    false
  ),
  createDataPmac(
    "Environment",
    "Emissions",
    "Employees",
    true,
    true,
    false,
    false,
    false
  ),
  createDataPmac(
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

function createDataPmac(
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

function PlantManagementAccessControl() {
  const [pagePmac, setPagePmac] = React.useState(0);
  const [rowsPerPagePmac, setRowsPerPagePmac] = React.useState(5);
  const [editMode, setEditMode] = useState(false);

  const PmacChangePage = (event, newPage) => {
    setPagePmac(newPage);
  };

  const PmacChangeRowsPerPage = (event) => {
    setRowsPerPagePmac(+event.target.value);
    setPagePmac(0);
  };

  const editFieldButtonPmac = () => {
    setEditMode(true);
  };

  const saveFieldButtonPmac = () => {
    setEditMode(false);
  };

  return (
    <>
      <Card className="card">
        <CardHeader
          title="Plant Operation Access Control"
          action={
            !editMode ? (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="button"
                onClick={editFieldButtonPmac}
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
                onClick={saveFieldButtonPmac}
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
              <TableRow key="headRowPmac">
                {columnsPmac.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsPmac
                .slice(
                  pagePmac * rowsPerPagePmac,
                  pagePmac * rowsPerPagePmac + rowsPerPagePmac
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
          count={rowsPmac.length}
          rowsPerPage={rowsPerPagePmac}
          page={pagePmac}
          onPageChange={PmacChangePage}
          onRowsPerPageChange={PmacChangeRowsPerPage}
        />
      </Card>
    </>
  );
}

export default PlantManagementAccessControl;
