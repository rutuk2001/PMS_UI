import React, { useState, useEffect, startTransition } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Stack,
  Pagination,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Add, Edit, Visibility, Delete, LocalPharmacy } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllregisterPatient, deletePatient } from "../../store/patient/patientSlice";
import DeleteConfirmDialog from "../../Components/DeleteConfirmDialog";

const AllPatients = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allRecords, total_records, loading, error } = useSelector(
    (state) => state.patientDetails
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [recordsPerPage] = useState(10);

  useEffect(() => {
    dispatch(getAllregisterPatient({ page: currentPage, limit: recordsPerPage }));
  }, [dispatch, currentPage, recordsPerPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleViewPatient = (id) => {
    startTransition(() => {
      navigate(`/view/patientinfo/${id}`);
    });
  };

  const handleEditPatient = (id) => {
    startTransition(() => {
      navigate(`/edit_patient/${id}`);
    });
  };

  const handleAddPrescription = (id) => {
    startTransition(() => {
      navigate(`/prescription/${id}`);
    });
  };

  const handleDeletePatient = (patient) => {
    setPatientToDelete(patient);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (patientToDelete) {
      try {
        await dispatch(deletePatient(patientToDelete._id)).unwrap();
        // Refresh the current page
        dispatch(getAllregisterPatient({ page: currentPage, limit: recordsPerPage }));
      } catch (error) {
        console.error("Failed to delete patient:", error);
      }
    }
    setDeleteDialogOpen(false);
    setPatientToDelete(null);
  };

  const filteredPatients = allRecords.filter((patient) =>
    patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.unique_patient_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone?.includes(searchTerm) ||
    patient.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(total_records / recordsPerPage);

  if (loading && currentPage === 1) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 4, mb: 4 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">All Patients</Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => startTransition(() => navigate("/add_patient"))}
          >
            Add New Patient
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Search and Filters */}
        <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Search Patients"
                placeholder="Search by name, ID, phone, or email"
                value={searchTerm}
                onChange={handleSearch}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                Total Patients: {total_records || 0}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Patients Table */}
        <Paper elevation={1}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr No</TableCell>
                  <TableCell>Patient ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Phone</TableCell>
                  {/* <TableCell>Email</TableCell> */}
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient, index) => (
                    <TableRow key={patient._id} hover>
                      <TableCell>{(currentPage - 1) * recordsPerPage + index + 1}</TableCell>
                      <TableCell>
                        <Chip
                          label={patient.unique_patient_id || "N/A"}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>{patient.first_name + " " + patient.last_name || "N/A"}</TableCell>
                      <TableCell>{patient.age || "N/A"}</TableCell>
                      <TableCell>{patient.gender || "N/A"}</TableCell>
                      <TableCell>{patient.phone_number || "N/A"}</TableCell>
                      {/* <TableCell>{patient.email || "N/A"}</TableCell> */}
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleViewPatient(patient._id)}
                            title="View Patient"
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="secondary"
                            onClick={() => handleEditPatient(patient._id)}
                            title="Edit Patient"
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="success"
                            onClick={() => handleAddPrescription(patient._id)}
                            title="Add Prescription"
                          >
                            <LocalPharmacy />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeletePatient(patient)}
                            title="Delete Patient"
                          >
                            <Delete />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      {searchTerm ? "No patients found matching your search." : "No patients found."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" p={2}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </Paper>
      </Box>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Patient"
        content={`Are you sure you want to delete patient "${patientToDelete?.name}"? This action cannot be undone.`}
      />
    </Container>
  );
};

export default AllPatients;
