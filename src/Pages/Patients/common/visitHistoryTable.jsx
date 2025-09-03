import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  useMediaQuery,
  Box,
  Chip,
  Collapse,
  IconButton,
  Card,
  CardContent,
  Grid,
  Divider,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Visibility,
  Edit,
  LocalPharmacy,
  CalendarToday,
  Person,
  Description,
  Receipt,
} from "@mui/icons-material";
import PrescriptionFormat from "../../../Components/PrescriptionFormat";

const VisitHistoryTable = ({ visits, onView, onEdit, onAddPrescription, patient }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [expandedRows, setExpandedRows] = useState({});
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [prescriptionDialogOpen, setPrescriptionDialogOpen] = useState(false);
  const [selectedPrescriptionVisit, setSelectedPrescriptionVisit] = useState(null);

  const handleRowExpand = (visitId) => {
    setExpandedRows(prev => ({
      ...prev,
      [visitId]: !prev[visitId]
    }));
  };

  const handleViewDetails = (visit) => {
    setSelectedVisit(visit);
    setDetailDialogOpen(true);
  };

  const handleViewPrescription = (visit) => {
    setSelectedPrescriptionVisit(visit);
    setPrescriptionDialogOpen(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const VisitDetailRow = ({ visit }) => {
    const hasPrescription = visit.prescription;
    
    return (
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={expandedRows[visit._id]} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Grid container spacing={2}>
                {/* Visit Details */}
                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Visit Details
                      </Typography>
                      <Stack spacing={1}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <CalendarToday fontSize="small" color="action" />
                          <Typography variant="body2">
                            <strong>Visit Date:</strong> {formatDateTime(visit.visit_date)}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Person fontSize="small" color="action" />
                          <Typography variant="body2">
                            <strong>Doctor:</strong> {visit.doctor_name || visit.prescription?.prescribed_by || "N/A"}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Description fontSize="small" color="action" />
                          <Typography variant="body2">
                            <strong>Reason:</strong> {visit.symptoms_or_reason}
                          </Typography>
                        </Box>
                        {visit.diagnosis && (
                          <Box display="flex" alignItems="center" gap={1}>
                            <Description fontSize="small" color="action" />
                            <Typography variant="body2">
                              <strong>Diagnosis:</strong> {visit.diagnosis}
                            </Typography>
                          </Box>
                        )}
                        {visit.follow_up_date && (
                          <Box display="flex" alignItems="center" gap={1}>
                            <CalendarToday fontSize="small" color="action" />
                            <Typography variant="body2">
                              <strong>Follow-up:</strong> {formatDate(visit.follow_up_date)}
                            </Typography>
                          </Box>
                        )}
                        {visit.notes && (
                          <Typography variant="body2">
                            <strong>Notes:</strong> {visit.notes}
                          </Typography>
                        )}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Prescription Details */}
                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Prescription Details
                      </Typography>
                      {hasPrescription ? (
                        <Stack spacing={1}>
                          <Box display="flex" alignItems="center" gap={1}>
                            <LocalPharmacy fontSize="small" color="action" />
                            <Typography variant="body2">
                              <strong>Status:</strong> 
                              <Chip 
                                label={visit.prescription.prescription_status || 'active'} 
                                size="small" 
                                color={getStatusColor(visit.prescription.prescription_status)}
                                sx={{ ml: 1 }}
                              />
                            </Typography>
                          </Box>
                          {visit.prescription.medications && visit.prescription.medications.length > 0 && (
                            <Box>
                              <Typography variant="body2" fontWeight="bold" gutterBottom>
                                Medications:
                              </Typography>
                              <Stack spacing={1}>
                                {visit.prescription.medications.map((med, index) => (
                                  <Paper key={index} variant="outlined" sx={{ p: 1 }}>
                                    <Typography variant="body2" fontWeight="bold">
                                      {med.name}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      {med.dosage} • {med.frequency} • {med.duration}
                                    </Typography>
                                    {med.notes && (
                                      <Typography variant="caption" display="block">
                                        Notes: {med.notes}
                                      </Typography>
                                    )}
                                  </Paper>
                                ))}
                              </Stack>
                            </Box>
                          )}
                          <Box sx={{ mt: 2 }}>
                            <Button
                              variant="contained"
                              size="small"
                              startIcon={<Receipt />}
                              onClick={() => handleViewPrescription(visit)}
                              fullWidth
                            >
                              View Prescription
                            </Button>
                          </Box>
                        </Stack>
                      ) : (
                        <Box textAlign="center" py={2}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            No prescription available
                          </Typography>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<LocalPharmacy />}
                            onClick={() => onAddPrescription(visit)}
                          >
                            Add Prescription
                          </Button>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Visit History</Typography>
        <Button
          variant="contained"
          startIcon={<LocalPharmacy />}
          onClick={() => onAddPrescription()}
        >
          New Visit & Prescription
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="visit history table" size={isMobile ? "small" : "medium"}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" />
              <TableCell>Visit Date</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visits && visits.length > 0 ? (
              visits.map((visit, index) => (
                <React.Fragment key={visit._id || index}>
                  <TableRow hover>
                    <TableCell padding="checkbox">
                      <IconButton
                        size="small"
                        onClick={() => handleRowExpand(visit._id)}
                      >
                        {expandedRows[visit._id] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      {formatDateTime(visit.visit_date)}
                    </TableCell>
                    <TableCell>
                      {visit.doctor_name || visit.prescription?.prescribed_by || "N/A"}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                        {visit.symptoms_or_reason}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={visit.status || 'completed'}
                        size="small"
                        color={getStatusColor(visit.status)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleViewDetails(visit)}
                          title="View Details"
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="secondary"
                          onClick={() => onEdit(visit)}
                          title="Edit Visit"
                        >
                          <Edit />
                        </IconButton>
                        {visit.prescription && (
                          <IconButton
                            size="small"
                            color="success"
                            onClick={() => handleViewPrescription(visit)}
                            title="View Prescription"
                          >
                            <Receipt />
                          </IconButton>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                  <VisitDetailRow visit={visit} />
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body2" color="text.secondary" py={3}>
                    No visit history found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Detail Dialog */}
      <Dialog
        open={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Visit Details - {selectedVisit && formatDate(selectedVisit.visit_date)}
        </DialogTitle>
        <DialogContent>
          {selectedVisit && (
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Visit Information</Typography>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Visit Date</Typography>
                      <Typography variant="body1">{formatDateTime(selectedVisit.visit_date)}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Doctor</Typography>
                      <Typography variant="body1">
                        {selectedVisit.doctor_name || selectedVisit.prescription?.prescribed_by || "N/A"}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Reason for Visit</Typography>
                      <Typography variant="body1">{selectedVisit.symptoms_or_reason}</Typography>
                    </Box>
                    {selectedVisit.diagnosis && (
                      <Box>
                        <Typography variant="body2" color="text.secondary">Diagnosis</Typography>
                        <Typography variant="body1">{selectedVisit.diagnosis}</Typography>
                      </Box>
                    )}
                    {selectedVisit.follow_up_date && (
                      <Box>
                        <Typography variant="body2" color="text.secondary">Follow-up Date</Typography>
                        <Typography variant="body1">{formatDate(selectedVisit.follow_up_date)}</Typography>
                      </Box>
                    )}
                    {selectedVisit.notes && (
                      <Box>
                        <Typography variant="body2" color="text.secondary">Notes</Typography>
                        <Typography variant="body1">{selectedVisit.notes}</Typography>
                      </Box>
                    )}
                  </Stack>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Prescription</Typography>
                  {selectedVisit.prescription ? (
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">Status</Typography>
                        <Chip 
                          label={selectedVisit.prescription.prescription_status || 'active'} 
                          color={getStatusColor(selectedVisit.prescription.prescription_status)}
                        />
                      </Box>
                      {selectedVisit.prescription.medications && selectedVisit.prescription.medications.length > 0 && (
                        <Box>
                          <Typography variant="body2" color="text.secondary" gutterBottom>Medications</Typography>
                          <Stack spacing={1}>
                            {selectedVisit.prescription.medications.map((med, index) => (
                              <Paper key={index} variant="outlined" sx={{ p: 2 }}>
                                <Typography variant="subtitle2" fontWeight="bold">
                                  {med.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {med.dosage} • {med.frequency} • {med.duration}
                                </Typography>
                                {med.notes && (
                                  <Typography variant="body2" sx={{ mt: 1 }}>
                                    {med.notes}
                                  </Typography>
                                )}
                              </Paper>
                            ))}
                          </Stack>
                        </Box>
                      )}
                      <Box>
                        <Button
                          variant="contained"
                          startIcon={<Receipt />}
                          onClick={() => {
                            setDetailDialogOpen(false);
                            handleViewPrescription(selectedVisit);
                          }}
                          fullWidth
                        >
                          View Prescription
                        </Button>
                      </Box>
                    </Stack>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No prescription available for this visit.
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailDialogOpen(false)}>Close</Button>
          {selectedVisit && (
            <Button 
              variant="contained" 
              onClick={() => {
                setDetailDialogOpen(false);
                onEdit(selectedVisit);
              }}
            >
              Edit Visit
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Prescription Format Dialog */}
      <Dialog
        open={prescriptionDialogOpen}
        onClose={() => setPrescriptionDialogOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          Prescription - {selectedPrescriptionVisit && formatDate(selectedPrescriptionVisit.visit_date)}
        </DialogTitle>
        <DialogContent>
          {selectedPrescriptionVisit && (
            <PrescriptionFormat
              visit={selectedPrescriptionVisit}
              patient={patient}
              prescription={selectedPrescriptionVisit.prescription}
              onClose={() => setPrescriptionDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default VisitHistoryTable;
