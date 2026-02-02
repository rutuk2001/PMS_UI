import React, { useState, useEffect, startTransition } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Alert,
  CircularProgress,
  Pagination,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPatient, getVisitHistory } from "../../store/patient/patientSlice";
import VisitHistoryTable from "./common/visitHistoryTable";
import { Add, Edit, ArrowBack } from "@mui/icons-material";

const ViewPatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { selectedPatient, loading, error } = useSelector((state) => state.patientDetails);
  const { visits, currentPage, totalPages, loading: visitHistoryLoading, error: visitHistoryError } = useSelector((state) => state.patientDetails.visitHistory);

  useEffect(() => {
    if (id) {
      dispatch(getPatient(id));
      dispatch(getVisitHistory({ patientId: id, page: 1, limit: 10 }));
    }
  }, [dispatch, id]);

  const handlePageChange = (event, page) => {
    dispatch(getVisitHistory({ patientId: id, page, limit: 10 }));
  };

  const handleViewVisit = (visit) => {
    // Handle viewing visit details
    console.log("View visit:", visit);
  };

  const handleEditVisit = (visit) => {
    // Navigate to edit prescription page with visitId or prescriptionId
    if (visit.prescription?._id) {
      startTransition(() => {
        navigate(`/prescription/${id}?prescriptionId=${visit.prescription._id}`);
      });
    } else if (visit._id) {
      startTransition(() => {
        navigate(`/prescription/${id}?visitId=${visit._id}`);
      });
    }
  };

  const handleAddPrescription = (visit = null) => {
    if (visit) {
      console.log("Visit:", visit);
      startTransition(() => {
        navigate(`/prescription/${id}?visitId=${visit._id}`);
      });
    } else {  
      console.log("Add prescription",id);
      startTransition(() => {
        navigate(`/prescription/${id}`);
      });
    }
  };

  const handleBackNavigation = () => {
    startTransition(() => {
      navigate("/all_patients");
    });
  };

  const handleEditPatient = () => {
    startTransition(() => {
      navigate(`/edit_patient/${id}`);
    });
  };

  // Helper function to safely render patient data
  const renderPatientValue = (value) => {
    if (value === null || value === undefined) return "N/A";
    if (typeof value === 'object') return "N/A"; // Prevent rendering objects
    return String(value);
  };

  // Helper function to get full name - handles both name formats
  const getFullName = () => {
    if (selectedPatient?.first_name && selectedPatient?.last_name) {
      return `${selectedPatient.first_name} ${selectedPatient.last_name}`;
    } else if (selectedPatient?.name) {
      return selectedPatient.name;
    }
    return "N/A";
  };

  // Helper function to get phone number - handles both formats
  const getPhoneNumber = () => {
    return selectedPatient?.phone_number || selectedPatient?.phone || "N/A";
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!selectedPatient) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="warning">Patient not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Box display="flex" alignItems="center" gap={2}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={handleBackNavigation}
          >
            Back
          </Button>
          <Typography variant="h4">Patient Details</Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<Edit />}
            onClick={handleEditPatient}
          >
            Edit Patient
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleAddPrescription()}
          >
            New Visit & Prescription
          </Button>
        </Stack>
      </Box>

      {/* Patient Information */}
      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Personal Information
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" color="text.secondary">Full Name</Typography>
                <Typography variant="body1" fontWeight="medium">
                  {getFullName()}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Patient ID</Typography>
                <Typography variant="body1" fontWeight="medium">
                  {renderPatientValue(selectedPatient.unique_patient_id)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Age</Typography>
                <Typography variant="body1" fontWeight="medium">
                  {renderPatientValue(selectedPatient.age)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Gender</Typography>
                <Typography variant="body1" fontWeight="medium">
                  {renderPatientValue(selectedPatient.gender)}
                </Typography>
              </Box>
            </Stack>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" color="text.secondary">Phone</Typography>
                <Typography variant="body1" fontWeight="medium">
                  {getPhoneNumber()}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Email</Typography>
                <Typography variant="body1" fontWeight="medium">
                  {renderPatientValue(selectedPatient.email)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Address</Typography>
                <Typography variant="body1" fontWeight="medium">
                  {renderPatientValue(selectedPatient.address)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Emergency Contact</Typography>
                <Typography variant="body1" fontWeight="medium">
                  {renderPatientValue(selectedPatient.emergency_contact)}
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Medical Information */}
      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Medical Information
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Health Issues
              </Typography>
              {selectedPatient.healthIssues && Array.isArray(selectedPatient.healthIssues) && selectedPatient.healthIssues.length > 0 ? (
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {selectedPatient.healthIssues.map((issue, index) => {
                    // Ensure issue is a string or simple value
                    const issueText = typeof issue === 'object' ? 'N/A' : String(issue);
                    return (
                      <Chip key={index} label={issueText} size="small" color="primary" variant="outlined" />
                    );
                  })}
                </Stack>
              ) : (
                <Typography variant="body2" color="text.secondary">No health issues recorded</Typography>
              )}
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Custom Health Issues
              </Typography>
              {selectedPatient.customHealthIssue ? (
                <Typography variant="body1">{renderPatientValue(selectedPatient.customHealthIssue)}</Typography>
              ) : (
                <Typography variant="body2" color="text.secondary">No custom health issues</Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Visit History */}
      <Paper elevation={1} sx={{ p: 3 }}>
        {visitHistoryError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {visitHistoryError}
          </Alert>
        )}
        
        <VisitHistoryTable
          visits={visits}
          onView={handleViewVisit}
          onEdit={handleEditVisit}
          onAddPrescription={handleAddPrescription}
          patient={selectedPatient}
        />
        
        {/* Pagination */}
        {totalPages > 1 && (
          <Box display="flex" justifyContent="center" mt={3}>
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
        
        {visitHistoryLoading && (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress size={24} />
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default ViewPatient;
