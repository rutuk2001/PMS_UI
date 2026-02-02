import React, { useState, useEffect, startTransition } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Paper,
  Divider,
  Box,
  CircularProgress,
  Alert,
  Stack,
  MenuItem,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Add, Delete, ArrowBack, Receipt } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { prescriptionPost, getVisitById, updatePrescription, getPrescriptionById, clearSuccessMessage, clearErrorMessage } from "../../store/patient/patientSlice";
import PrescriptionFormat from "../../Components/PrescriptionFormat";

const CreatePrescriptionForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const visitId = searchParams.get("visitId");
  const prescriptionId = searchParams.get("prescriptionId");
  
  const { loading, error, success } = useSelector((state) => state.patientDetails || {});
  const { selectedVisit, selectedVisitLoading, selectedPrescription, selectedPrescriptionLoading } = useSelector((state) => state.patientDetails || {});

  const [formData, setFormData] = useState({
    patient: "",
    visit_date: new Date().toISOString().split("T")[0],
    diagnosis: "",
    prescribed_by: "Dr. Nilesh Choudhari",
    medications: [
      { name: "", dosage: "", frequency: "", duration: "", notes: "" },
    ],
    follow_up_date: "",
    notes: "",
    symptoms_or_reason: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPrescriptionDialog, setShowPrescriptionDialog] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Clear success/error messages on component mount
  useEffect(() => {
    dispatch(clearSuccessMessage());
    dispatch(clearErrorMessage());
    setHasSubmitted(false);
  }, [dispatch]);

  // Auto-fill patient ID from route
  useEffect(() => {
    if (id) {
      setFormData((prev) => ({ ...prev, patient: id }));
    }
  }, [id]);

  // Load existing visit data if editing via visitId
  useEffect(() => {
    if (visitId) {
      setIsEditing(true);
      dispatch(getVisitById(visitId));
    }
  }, [visitId, dispatch]);

  // Load existing prescription data if editing via prescriptionId
  useEffect(() => {
    if (prescriptionId) {
      setIsEditing(true);
      dispatch(getPrescriptionById(prescriptionId));
    }
  }, [prescriptionId, dispatch]);

  // Populate form with existing visit data
  useEffect(() => {
    if (selectedVisit && isEditing) {
      const visit = selectedVisit;
      const prescription = visit.prescription;
      
      setFormData({
        patient: visit.patient?._id || visit.patient || "",
        visit_date: visit.visit_date
          ? new Date(visit.visit_date).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        diagnosis: prescription?.diagnosis || visit.diagnosis || "",
        prescribed_by:
          prescription?.prescribed_by ||
          visit.doctor_name ||
          "Dr. Nilesh Choudhari",
        medications:
          prescription?.medications?.length > 0
            ? prescription.medications.map((med) => ({
                name: med.name || "",
                dosage: med.dosage || "",
                frequency: med.frequency || "",
                duration: med.duration || "",
                notes: med.notes || "",
              }))
            : [{ name: "", dosage: "", frequency: "", duration: "", notes: "" }],
        follow_up_date: (prescription?.follow_up_date || visit.follow_up_date)
          ? new Date(prescription?.follow_up_date || visit.follow_up_date).toISOString().split("T")[0]
          : "",
        notes: prescription?.notes || visit.notes || "",
        symptoms_or_reason: visit.symptoms_or_reason || "",
      });
    }
  }, [selectedVisit, isEditing]);

  // Populate form when loading directly by prescriptionId
  useEffect(() => {
    if (selectedPrescription && prescriptionId && !isEditing) {
      setIsEditing(true);
    }
    if (selectedPrescription && prescriptionId) {
      const rx = selectedPrescription;
      const patientIdFromRx =
        rx.patient?._id || rx.patient?.id || rx.patient || id || "";
      setFormData({
        patient: patientIdFromRx,
        visit_date: rx.visit_date
          ? new Date(rx.visit_date).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        diagnosis: rx.diagnosis || "",
        prescribed_by: rx.prescribed_by || "Dr. Nilesh Choudhari",
        medications:
          rx.medications?.length > 0
            ? rx.medications.map((med) => ({
                name: med.name || "",
                dosage: med.dosage || "",
                frequency: med.frequency || "",
                duration: med.duration || "",
                notes: med.notes || "",
              }))
            : [{ name: "", dosage: "", frequency: "", duration: "", notes: "" }],
        follow_up_date: rx.follow_up_date
          ? new Date(rx.follow_up_date).toISOString().split("T")[0]
          : "",
        notes: rx.notes || "",
        symptoms_or_reason: rx.symptoms_or_reason || rx.visit?.symptoms_or_reason || "",
      });
    }
  }, [selectedPrescription, prescriptionId, id]);

  // Show toast notifications for success and error
  useEffect(() => {
    if (success && hasSubmitted) {
      toast.success(success);
      dispatch(clearSuccessMessage());
      // For create flow, open preview automatically; for edit flow, show success and allow viewing
      if (!isEditing) {
        setShowPrescriptionDialog(true);
      }
    }
  }, [success, hasSubmitted, isEditing, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrorMessage());
    }
  }, [error, dispatch]);

  const validateForm = () => {
    const errors = {};

    if (!formData.diagnosis.trim()) errors.diagnosis = "Diagnosis is required";
    if (!formData.prescribed_by.trim())
      errors.prescribed_by = "Prescribed By is required";
    if (!formData.visit_date) errors.visit_date = "Visit date is required";
    if (!formData.symptoms_or_reason.trim())
      errors.symptoms_or_reason = "Reason for visit is required";

    if (formData.medications.length === 0) {
      errors.medications = "At least one medication is required";
    } else {
      const medsErrors = formData.medications.map((med) => {
        const medErr = {};
        if (!med.name.trim()) medErr.name = "Name is required";
        if (!med.dosage.trim()) medErr.dosage = "Dosage is required";
        if (!med.frequency.trim()) medErr.frequency = "Frequency is required";
        if (!med.duration.trim()) medErr.duration = "Duration is required";
        return medErr;
      });
      errors.medications = medsErrors;
    }

    if (formData.follow_up_date) {
      const visitDate = new Date(formData.visit_date);
      const followUpDate = new Date(formData.follow_up_date);
      if (followUpDate < visitDate) {
        errors.follow_up_date = "Follow-up date cannot be before visit date";
      }
    }

    setFormErrors(errors);

    return (
      Object.keys(errors).length === 0 ||
      (Object.keys(errors).length === 1 &&
        errors.medications &&
        errors.medications.every((m) => Object.keys(m).length === 0))
    );
  };

  const handleChange = (e, index, field) => {
    if (typeof index === "number") {
      const newMeds = [...formData.medications];
      newMeds[index][field] = e.target.value;
      setFormData({ ...formData, medications: newMeds });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const addMedication = () => {
    setFormData({
      ...formData,
      medications: [
        ...formData.medications,
        { name: "", dosage: "", frequency: "", duration: "", notes: "" },
      ],
    });
  };

  const removeMedication = (index) => {
    const newMeds = formData.medications.filter((_, i) => i !== index);
    setFormData({ ...formData, medications: newMeds });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setHasSubmitted(true);
    if (validateForm()) {
      const existingPrescriptionId =
        prescriptionId || selectedVisit?.prescription?._id || selectedPrescription?._id;

      if (existingPrescriptionId) {
        const updateData = {
          diagnosis: formData.diagnosis,
          prescribed_by: formData.prescribed_by,
          medications: formData.medications,
          follow_up_date: formData.follow_up_date || null,
          notes: formData.notes || "",
          visit_date: formData.visit_date,
          symptoms_or_reason: formData.symptoms_or_reason,
        };
        dispatch(updatePrescription({ prescriptionId: existingPrescriptionId, updateData }));
      } else {
        dispatch(prescriptionPost({ id, formData }));
      }
    } else {
      console.log("Form validation failed", formErrors);
      setHasSubmitted(false);
    }
  };

  const handleBackNavigation = () => {
    startTransition(() => {
      navigate(-1);
    });
  };

  const handleViewPrescription = () => {
    setShowPrescriptionDialog(true);
  };

  const handleClosePrescriptionDialog = () => {
    setShowPrescriptionDialog(false);
    // Navigate to patient details after viewing prescription
    startTransition(() => {
      const patientTarget = formData.patient || id;
      if (patientTarget) {
        navigate(`/view/patientinfo/${patientTarget}`);
      } else {
        navigate(-1);
      }
    });
  };

  // Create a mock visit object for the prescription format
  const createMockVisit = () => ({
    visit_date: formData.visit_date,
    symptoms_or_reason: formData.symptoms_or_reason,
    follow_up_date: formData.follow_up_date,
    notes: formData.notes,
    doctor_name: formData.prescribed_by,
  });

  // Create a mock prescription object for the prescription format
  const createMockPrescription = () => ({
    diagnosis: formData.diagnosis,
    prescribed_by: formData.prescribed_by,
    medications: formData.medications,
    notes: formData.notes,
  });

  if (selectedVisitLoading || selectedPrescriptionLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Paper elevation={1} sx={{ p: { xs: 2, md: 3 } }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h5" gutterBottom>
                  {isEditing ? "Edit Prescription" : "Create Prescription"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Patient ID: {formData.patient || id || "N/A"}
                </Typography>
                {isEditing && selectedVisit && (
                  <Typography variant="body2" color="text.secondary">
                    Visit Date: {new Date(selectedVisit.visit_date).toLocaleDateString()}
                  </Typography>
                )}
              </Box>
              <Box>
                <Button
                  variant="outlined"
                  color="inherit"
                  startIcon={<ArrowBack />}
                  onClick={handleBackNavigation}
                >
                  Back
                </Button>
              </Box>
            </Box>

            {error && (
              <Alert severity="error">{String(error)}</Alert>
            )}
            {success && (
              <Alert severity="success">
                {String(success)}
                <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                  <Button
                    variant="contained"
                    startIcon={<Receipt />}
                    onClick={handleViewPrescription}
                    size="small"
                  >
                    View Prescription
                  </Button>
                  {isEditing && (
                    <Button
                      variant="outlined"
                      onClick={() => {
                        const patientTarget = formData.patient || id;
                        if (patientTarget) {
                          navigate(`/view/patientinfo/${patientTarget}`);
                        }
                      }}
                      size="small"
                    >
                      Back to Patient Details
                    </Button>
                  )}
                </Box>
              </Alert>
            )}

            <Divider />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Visit Date"
                  name="visit_date"
                  type="date"
                  fullWidth
                  value={formData.visit_date}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  error={formSubmitted && !!formErrors.visit_date}
                  helperText={formSubmitted && formErrors.visit_date}
                  disabled={isEditing} // Disable date editing for existing visits
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Reason for Visit"
                  name="symptoms_or_reason"
                  fullWidth
                  value={formData.symptoms_or_reason}
                  onChange={handleChange}
                  error={formSubmitted && !!formErrors.symptoms_or_reason}
                  helperText={formSubmitted && formErrors.symptoms_or_reason}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Diagnosis"
                  name="diagnosis"
                  fullWidth
                  value={formData.diagnosis}
                  onChange={handleChange}
                  error={formSubmitted && !!formErrors.diagnosis}
                  helperText={formSubmitted && formErrors.diagnosis}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Prescribed By"
                  name="prescribed_by"
                  fullWidth
                  value={formData.prescribed_by}
                  onChange={handleChange}
                  error={formSubmitted && !!formErrors.prescribed_by}
                  helperText={formSubmitted && formErrors.prescribed_by}
                />
              </Grid>
            </Grid>

            <Divider />

            <Box>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                <Typography variant="h6">Medications</Typography>
                <Button onClick={addMedication} startIcon={<Add />} variant="outlined">
                  Add Medication
                </Button>
              </Box>

              <Stack spacing={2}>
                {formData.medications.map((med, index) => {
                  const medErrors =
                    (formErrors.medications && formErrors.medications[index]) || {};
                  const canRemove = formData.medications.length > 1;
                  return (
                    <Paper key={index} variant="outlined" sx={{ p: 2 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={3}>
                          <TextField
                            label="Name"
                            fullWidth
                            value={med.name}
                            onChange={(e) => handleChange(e, index, "name")}
                            error={formSubmitted && !!medErrors.name}
                            helperText={formSubmitted && medErrors.name}
                          />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <TextField
                            label="Dosage"
                            placeholder="e.g., 500 mg"
                            fullWidth
                            value={med.dosage}
                            onChange={(e) => handleChange(e, index, "dosage")}
                            error={formSubmitted && !!medErrors.dosage}
                            helperText={formSubmitted && medErrors.dosage}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <TextField
                            select
                            label="Frequency"
                            fullWidth
                            value={med.frequency}
                            onChange={(e) => handleChange(e, index, "frequency")}
                            error={formSubmitted && !!medErrors.frequency}
                            helperText={formSubmitted && medErrors.frequency}
                          >
                            <MenuItem value="">Select</MenuItem>
                            <MenuItem value="Once daily">Once daily</MenuItem>
                            <MenuItem value="Twice daily (BID)">Twice daily (BID)</MenuItem>
                            <MenuItem value="Thrice daily (TID)">Thrice daily (TID)</MenuItem>
                            <MenuItem value="Four times daily (QID)">Four times daily (QID)</MenuItem>
                            <MenuItem value="Every 6 hours">Every 6 hours</MenuItem>
                            <MenuItem value="Every 8 hours">Every 8 hours</MenuItem>
                            <MenuItem value="As needed (PRN)">As needed (PRN)</MenuItem>
                          </TextField>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <TextField
                            label="Duration"
                            placeholder="e.g., 5 days"
                            fullWidth
                            value={med.duration}
                            onChange={(e) => handleChange(e, index, "duration")}
                            error={formSubmitted && !!medErrors.duration}
                            helperText={formSubmitted && medErrors.duration}
                          />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <TextField
                            label="Notes"
                            placeholder="Optional"
                            fullWidth
                            value={med.notes}
                            onChange={(e) => handleChange(e, index, "notes")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={"auto"}>
                          <IconButton
                            onClick={() => canRemove && removeMedication(index)}
                            color="error"
                            disabled={!canRemove}
                            aria-label="remove medication"
                          >
                            <Delete />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Paper>
                  );
                })}
              </Stack>
            </Box>

            <Divider />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Follow-up Date"
                  name="follow_up_date"
                  type="date"
                  fullWidth
                  value={formData.follow_up_date}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  error={formSubmitted && !!formErrors.follow_up_date}
                  helperText={formSubmitted && formErrors.follow_up_date}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Additional Notes"
                  name="notes"
                  fullWidth
                  multiline
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                disabled={loading}
              >
                {loading ? (
                  <Box display="flex" alignItems="center" gap={1}>
                    <CircularProgress size={20} color="inherit" />
                    {isEditing ? "Updating..." : "Submitting..."}
                  </Box>
                ) : (
                  isEditing ? "Update Prescription" : "Submit Prescription"
                )}
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>

      {/* Prescription Format Dialog */}
      <Dialog
        open={showPrescriptionDialog}
        onClose={handleClosePrescriptionDialog}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          Prescription Format;
        </DialogTitle>
        <DialogContent>
          <PrescriptionFormat
            visit={createMockVisit()}
            patient={{ _id: id }}
            prescription={createMockPrescription()}
            onClose={handleClosePrescriptionDialog}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreatePrescriptionForm;
