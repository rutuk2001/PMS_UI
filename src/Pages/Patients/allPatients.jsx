import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Pagination,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorMessage,
  clearSuccessMessage,
  deletePatient,
  getAllregisterPatient,
} from "../../store/patient/patientSlice";
import { toast } from "react-toastify";

const AllPatients = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 5;

  const { allRecords, total_records, success, error } = useSelector(
    (state) => state.patientDetails
  );

  useEffect(() => {
    dispatch(getAllregisterPatient({ page, limit }));
  }, [dispatch, page]);

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

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDelete = async (id) => {
    if (!id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this patient?"
    );
    if (!confirmDelete) return;

    try {
      const result = await dispatch(deletePatient(id)).unwrap();
      if (result) {
        const newTotal = total_records - 1;
        const newTotalPages = Math.ceil(newTotal / limit);

        const updatedPage = page > newTotalPages ? newTotalPages : page;

        setPage(updatedPage);
        dispatch(getAllregisterPatient({ page: updatedPage, limit }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <CardHeader title="All Patients" />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sr No</TableCell>
              <TableCell>PAT-ID</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Contact No</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allRecords?.map((patient, index) => (
              <TableRow key={patient._id}>
                <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                <TableCell>{patient.unique_patient_id}</TableCell>
                <TableCell>
                  {patient.first_name} {patient.last_name}
                </TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.phone_number}</TableCell>
                <TableCell>
                  {patient.address}, {patient.city}
                </TableCell>
                <TableCell>
                  {new Date(patient.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <IconButton size="small" title="View">
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton size="small" title="Edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    title="Delete"
                    onClick={() => handleDelete(patient._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Component */}
      <Box display="flex" justifyContent="flex-end" padding={2}>
        <Pagination
          count={Math.ceil(total_records / limit)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Card>
  );
};

export default AllPatients;
