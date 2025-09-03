import React from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Divider,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  Print,
  Download,
  LocalHospital,
  Person,
  CalendarToday,
  Phone,
  Email,
} from "@mui/icons-material";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PrescriptionFormat = ({ visit, patient, prescription, onClose }) => {
  const prescriptionRef = React.useRef();

  // Print functionality
  const handlePrint = useReactToPrint({
    content: () => prescriptionRef.current,
    pageStyle: `
      @media print {
        @page {
          size: A4;
          margin: 20mm;
        }
        body {
          font-size: 12pt;
        }
        .no-print {
          display: none !important;
        }
      }
    `,
  });

  // Download as PDF functionality
  const handleDownloadPDF = async () => {
    if (prescriptionRef.current) {
      const canvas = await html2canvas(prescriptionRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const fileName = `prescription_${patient?.unique_patient_id || 'patient'}_${new Date(visit?.visit_date).toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getPatientName = () => {
    if (patient?.first_name && patient?.last_name) {
      return `${patient.first_name} ${patient.last_name}`;
    } else if (patient?.name) {
      return patient.name;
    }
    return "N/A";
  };

  const getPatientPhone = () => {
    return patient?.phone_number || patient?.phone || "N/A";
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Action Buttons */}
      <Box className="no-print" sx={{ mb: 2, display: "flex", gap: 2, justifyContent: "center" }}>
        <Button
          variant="contained"
          startIcon={<Print />}
          onClick={handlePrint}
          sx={{ minWidth: 120 }}
        >
          Print
        </Button>
        <Button
          variant="outlined"
          startIcon={<Download />}
          onClick={handleDownloadPDF}
          sx={{ minWidth: 120 }}
        >
          Download PDF
        </Button>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{ minWidth: 120 }}
        >
          Close
        </Button>
      </Box>

      {/* Prescription Format */}
      <Paper
        ref={prescriptionRef}
        elevation={0}
        sx={{
          p: 4,
          maxWidth: "800px",
          mx: "auto",
          border: "2px solid #000",
          backgroundColor: "#fff",
          fontFamily: "serif",
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#000",
              mb: 1,
              fontFamily: "serif",
            }}
          >
            <LocalHospital sx={{ mr: 1, verticalAlign: "middle" }} />
            MEDICAL PRESCRIPTION
          </Typography>
          <Typography variant="body1" sx={{ color: "#666", fontStyle: "italic" }}>
            Dr. {prescription?.prescribed_by || visit?.doctor_name || "Doctor Name"}
          </Typography>
          <Typography variant="body2" sx={{ color: "#666" }}>
            Medical Practitioner
          </Typography>
        </Box>

        <Divider sx={{ mb: 3, borderColor: "#000" }} />

        {/* Patient Information */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Person sx={{ mr: 1, color: "#666" }} />
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Patient Name:
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ ml: 3 }}>
              {getPatientName()}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <CalendarToday sx={{ mr: 1, color: "#666" }} />
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Visit Date:
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ ml: 3 }}>
              {formatDate(visit?.visit_date)} at {formatTime(visit?.visit_date)}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Phone sx={{ mr: 1, color: "#666" }} />
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Phone:
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ ml: 3 }}>
              {getPatientPhone()}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Email sx={{ mr: 1, color: "#666" }} />
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Email:
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ ml: 3 }}>
              {patient?.email || "N/A"}
            </Typography>
          </Grid>
        </Grid>

        {/* Diagnosis */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, textDecoration: "underline" }}>
            DIAGNOSIS:
          </Typography>
          <Typography variant="body1" sx={{ ml: 2 }}>
            {prescription?.diagnosis || visit?.diagnosis || "N/A"}
          </Typography>
        </Box>

        {/* Symptoms/Reason */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, textDecoration: "underline" }}>
            REASON FOR VISIT:
          </Typography>
          <Typography variant="body1" sx={{ ml: 2 }}>
            {visit?.symptoms_or_reason || "N/A"}
          </Typography>
        </Box>

        {/* Medications */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, textDecoration: "underline" }}>
            PRESCRIBED MEDICATIONS:
          </Typography>
          
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell sx={{ fontWeight: "bold", border: "1px solid #ddd" }}>
                    Medication
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", border: "1px solid #ddd" }}>
                    Dosage
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", border: "1px solid #ddd" }}>
                    Frequency
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", border: "1px solid #ddd" }}>
                    Duration
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", border: "1px solid #ddd" }}>
                    Instructions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prescription?.medications?.map((med, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ border: "1px solid #ddd", fontWeight: "bold" }}>
                      {med.name}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #ddd" }}>
                      {med.dosage}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #ddd" }}>
                      {med.frequency}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #ddd" }}>
                      {med.duration}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #ddd" }}>
                      {med.notes || "As directed"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Additional Notes */}
        {prescription?.notes && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, textDecoration: "underline" }}>
              ADDITIONAL NOTES:
            </Typography>
            <Typography variant="body1" sx={{ ml: 2 }}>
              {prescription.notes}
            </Typography>
          </Box>
        )}

        {/* Follow-up */}
        {visit?.follow_up_date && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, textDecoration: "underline" }}>
              FOLLOW-UP APPOINTMENT:
            </Typography>
            <Typography variant="body1" sx={{ ml: 2 }}>
              {formatDate(visit.follow_up_date)}
            </Typography>
          </Box>
        )}

        {/* Doctor Signature Section */}
        <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <Box>
            <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
              Date: {formatDate(visit?.visit_date)}
            </Typography>
            <Typography variant="body2" sx={{ color: "#666" }}>
              Time: {formatTime(visit?.visit_date)}
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: "center" }}>
            <Box
              sx={{
                width: "120px",
                height: "60px",
                borderBottom: "2px solid #000",
                mb: 1,
              }}
            />
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Dr. {prescription?.prescribed_by || visit?.doctor_name || "Doctor Name"}
            </Typography>
            <Typography variant="body2" sx={{ color: "#666" }}>
              Medical Practitioner
            </Typography>
          </Box>
        </Box>

        {/* Footer */}
        <Box sx={{ mt: 4, textAlign: "center", borderTop: "1px solid #ccc", pt: 2 }}>
          <Typography variant="body2" sx={{ color: "#666", fontStyle: "italic" }}>
            This prescription is valid for the specified duration only.
            <br />
            Please consult your doctor before making any changes to the medication.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default PrescriptionFormat;




