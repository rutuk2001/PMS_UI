// import {
//   Autocomplete,
//   Box,
//   Button,
//   FormControl,
//   Grid,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
//   useTheme,
// } from "@mui/material";
// import React, { useEffect, useRef, useState } from "react";
// import { fetchFinancialYear } from "../../../store/CommonApi/CommonApiSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { viewReporting } from "../../../store/Report/Principle6Slice";

// function Principle6Report() {
//   const componentRef = useRef(null);
//   const dispatch = useDispatch();

//   const handlePrint = () => {
//     if (componentRef.current) {
//       const printWindow = window.open("", "_blank");
//       printWindow.document.write("<html><head><title>REPORT P6</title>");
//       printWindow.document.write("<style>");
//       printWindow.document.write(`
//             body {
//                 font-family: Arial, sans-serif;
//                 font-size: 15px;
//                 line-height: 1.6;
//                 margin: 0;
//                 padding: 0;
//             }
//             .container {
//                 margin: 10px;
//                 padding: 20px;
//                 background-color: white;
//                 margin-bottom: 2px; /* Ensure there's space for the footer */
//             }

//             .header{
//                 display: block;
//             }

//             .footer {
//                 display: block;
//                 text-align: center;
//             }

//             h1, h2, h3, h4, h5, h6 {
//                 margin-top: 0;
//             }
//             h4 {
//                 text-align: right;
//                 margin-right: 20px;
//             }
//             table {
//                 border-collapse: collapse;
//                 width: 100%;
//                 margin-bottom: 10px;
//             }
//             th, td {
//                 padding: 8px;
//                 text-align: left;
//                 border-bottom: 2px solid black;
//             }
//             th {
//                 font-weight: bold;
//                 font-size: larger;
//                 color: #598ef4;
//             }
//             td {
//                 border-left: none;
//                 border-right: none;
//             }
//             @media print {
//                 @page {
//                     size: A4;
//                     margin: 20mm;
//                 }
//                 body {
//                     margin: 0;
//                 }
//                 .container {
//                     page-break-inside: avoid;
//                     margin-bottom: 20px;
//                     padding:20px;

//                 }
//                 .header {
//                     display: block;
//                 }

//                 .footerPrint {
//                     position: fixed;
//                     display:block
//                     bottom: 0;
//                     width: 100%;
//                     text-align: center;
//                     font-size: 14px;
//                     color: #598ef4;
// s                }
//             }
//         `);
//       printWindow.document.write("</style></head><body>");

//       printWindow.document.write('<div class="container">');
//       printWindow.document.write("<h4>Annexure I</h4>");
//       printWindow.document.write(componentRef.current.innerHTML);
//       printWindow.document.write("</div>");

//       // Footer content
//       printWindow.document.write(
//         '<div class="footer footerPrint">Annual Integrated P6 Report</div>'
//       );

//       printWindow.document.write("</body></html>");
//       printWindow.document.close();
//       printWindow.print();
//     }
//   };

//   const { finalYear } = useSelector((state) => state.CommonApiDetailSlice);
//   const { viewReport } = useSelector((state) => state.Principle6SliceDetails);
//   const [financialYear, setFinancialYear] = useState(null);
//   const handleFinancialYearChange = (event, value) => {
//     setFinancialYear(value);
//   };

//   const [responseData, setResponseData] = useState(viewReport?.EI || {});
//   useEffect(() => {
//     dispatch(fetchFinancialYear());
//   }, [dispatch]);

//   useEffect(() => {
//     if (!financialYear) {
//       setResponseData({});
//       return;
//     }

//     dispatch(viewReporting({ financial_year: financialYear }))
//       .then((result) => {
//         setResponseData(result.payload.EI || "");
//         console.log(result.payload.EI, "result.payload.EI")
//       })
//       .catch((error) => {
//         console.error("Error fetching report:", error);
//         setResponseData({});
//       });
//   }, [dispatch, financialYear]);

//   const rowsE1 = [
//     { label: "From renewable sources", bold: true },
//     { label: "Total electricity consumption (A)", key: "EI1_A" },
//     { label: "Total fuel consumption (B)", key: "EI1_B" },
//     { label: "Energy consumption through other sources (C)", key: "EI1_C" },
//     {
//       label: "Total energy consumed from renewable sources (A+B+C)",
//       key: "EI1_ABC",
//       bold: true,
//     },
//     { label: "From non-renewable sources", bold: true },
//     { label: "Total electricity consumption (D)", key: "EI1_D" },
//     { label: "Total fuel consumption (E)", key: "EI1_E" },
//     { label: "Total electricity consumption (D)", key: "EI1_F" },
//     {
//       label: "Total energy consumed from non-renewable sources (D+E+F)",
//       key: "EI1_DEF",
//       bold: true,
//     },
//     {
//       label: "Total energy consumed (A+B+C+D+E+F)",
//       key: "EI1_ABCDEF",
//       bold: true,
//     },
//     {
//       label:
//         "Energy intensity per rupee of turnover(Total energy consumed / Revenue from operations)(GJ/₹ Million)",
//       key: "EI1_G",
//     },
//     {
//       label:
//         "Energy intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP) (Total energy consumed / Revenue from operations adjusted for PPP)",
//       key: "EI1_H",
//     },
//     { label: "Energy intensity in terms of physical output", key: "EI1_I" },
//     {
//       label:
//         "Energy intensity (optional) – the relevant metric may be selected by the entity",
//       key: "EI1_J",
//     },
//   ];

//   const rowsE3 = [
//     { label: "Water withdrawal by source (in kilolitres)", bold: true, },
//     { label: "(i) Surface water", key: "EI3_A" },
//     { label: "(ii) Groundwater", key: "EI3_B" },
//     { label: "(iii) Third party water", key: "EI3_C" },
//     { label: "(iv) Seawater / desalinated water", key: "EI3_D" },
//     { label: "(v) Others", key: "EI3_E" },
//     {
//       label:
//         "Total volume of water withdrawal (in kiloliters) (i + ii + iii + iv + v)",
//       key: "EI3_ABCDE", bold: true,
//     },
//     {
//       label: "Total volume of water consumption (in kiloliters)",
//       key: "EI3_F", bold: true,
//     },
//     {
//       label:
//         "Water intensity per rupee of turnover (Total water consumption / Revenue from operations) (kiloliters/₹ Million)",
//       key: "EI3_G", bold: true,
//     },
//     {
//       label:
//         "Water intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP) (Total water consumption / Revenue from operations adjusted for PPP)",
//       key: "EI3_H", bold: true,
//     },
//     { label: "Water intensity in terms of physical output", key: "EI3_I", bold: true, },
//     { label: "Water intensity (optional) – therelevant metric may be selected by the entity", key: "EI3_J", bold: true, },

//   ];

//   const rowsE4 = [
//     {
//       label:
//         "Water discharge by destination and level of treatment (in kiloliters)",
//       bold: true,
//     },
//     { label: "(i) To Surface water", bold: true },
//     { label: "- No treatment", key: "EI4_A1" },
//     {
//       label: "- With treatment – please specify level of treatment",
//       key: "EI4_A2",
//     },
//     { label: "(ii) To Groundwater", bold: true },
//     { label: "- No treatment", key: "EI4_B1" },
//     {
//       label: "- With treatment – please specify level of treatment",
//       key: "EI4_B2",
//     },
//     { label: "(iii) To Seawater", bold: true },
//     { label: "- No treatment", key: "EI4_C1" },
//     {
//       label: "- With treatment – please specify level of treatment",
//       key: "EI4_C2",
//     },
//     { label: "(iv) Sent to third-parties", bold: true },
//     { label: "- No treatment", key: "EI4_D1" },
//     {
//       label: "- With treatment – please specify level of treatment",
//       key: "EI4_D2",
//     },
//     { label: "(v) Others", bold: true },
//     { label: "- No treatment", key: "EI4_E1" },
//     {
//       label: "- With treatment – please specify level of treatment",
//       key: "EI4_E2",
//     },
//     { label: "Total water discharged (in kiloliters)", key: "EI4_F", bold: true },
//   ];

//   const rowsE6 = [
//     { label: "NOx", key: "EI6_A" },
//     { label: "SOx", key: "EI6_B" },
//     { label: "Particulate matter (PM)", key: "EI6_C" },
//     { label: "Persistent organic pollutants (POP)", key: "EI6_D" },
//     { label: "Volatile organic compounds (VOC)", key: "EI6_E" },
//     { label: "Hazardous air pollutants (HAP)", key: "EI6_F" },
//     { label: "Others – please specify", key: "EI6_G" },
//   ];

//   const rowsE7 = [
//     {
//       label: "Total Scope 1 emissions (Break-up of the GHG into CO2, CH4, N2O, HFCs, PFCs,SF6, NF3, if available)",
//       key: "EI7_A",
//     },
//     {
//       label:
//         "Total Scope 2 emissions (Break-up of the GHG into CO2, CH4, N2O, HFCs, PFCs,SF6, NF3, if available)",
//       key: "EI7_B",
//     },
//     {
//       label: "Total Scope 1 and Scope 2 emission intensity per rupee of turnover (Total Scope 1 and Scope 2 GHG emissions / Revenue from operations) (Metric tonnes of CO2/₹ million)",
//       key: "EI7_C",
//     },
//     {
//       label:
//         "Total Scope 1 and Scope 2 emission intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP) (Total Scope 1 and Scope 2 GHG emissions / Revenue from operations adjusted for PPP)",
//       key: "EI7_D",
//     },
//     { label: "Total Scope 1 and Scope 2 emission intensity in terms of physical output", key: "EI7_E" },
//     { label: "Total Scope 1 and Scope 2 emission intensity (optional) – the relevant metric may be selected by the entity", key: "EI7_F" },

//   ];

//   const rowsE9 = [
//     { label: "Total Waste generated (in metric tons)", bold: true },
//     { label: "Plastic waste (A)", key: "EI9_A" },
//     { label: "E-waste (B)", key: "EI9_B" },
//     { label: "Bio-medical waste (C)", key: "EI9_C" },
//     { label: "Construction and demolition waste (D)", key: "EI9_D" },
//     { label: "Battery waste (E)", key: "EI9_E" },
//     { label: "Radioactive waste (F)", key: "EI9_F" },
//     {
//       label: "Other Hazardous waste. Please specify, if any. (G)",
//       key: "EI9_G",
//     },
//     {
//       label:
//         "Other Non-hazardous waste generated (H). Please specify, if any. (Break-up by composition i.e. by materials relevant to the sector)",
//       key: "EI9_H",
//     },
//     { label: "Total (A+B + C + D + E + F + G + H)", key: "EI9_ABCDEFGH" },
//     { label: "Waste intensity per rupee of turnover (Total waste generated / Revenue from operations) (Metric tonners /₹ Million)", key: "EI9_O" },
//     { label: "Waste intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP) (Total waste generated / Revenue from operations adjusted for PPP)", key: "EI9_P" },
//     { label: "Waste intensity in terms of physical output", key: "EI9_Q" },
//     { label: "Waste intensity (optional) – the relevant metric may be selected by the entity", key: "EI9_R" },

//     {
//       label:
//         "For each category of waste generated, total waste recovered through recycling, re-using or other recovery operations (in metric tons) Category of waste",
//       bold: true,
//     },

//     { label: "(i) Recycled", key: "EI9_I" },
//     { label: "(ii) Re-used", key: "EI9_J" },
//     { label: "(iii) Other recovery operations", key: "EI9_K" },
//     { label: "Total", key: "EI9_IJK" },
//     {
//       label:
//         "For each category of waste generated, total waste disposed by nature of disposal method (in metric tons) Category of waste",
//       bold: true,
//     },
//     { label: "(i) Incineration", key: "EI9_L" },
//     { label: "(ii) Landfilling", key: "EI9_M" },
//     { label: "(iii) Other disposal operations", key: "EI9_N" },
//     { label: "Total", key: "EI9_LMN" },
//   ];

//   const rowsL1 = [
//     { label: "Water withdrawal by source (in kiloliters)", bold: true },
//     { label: "(i) To Surface water", key: "LI1_A_A1" },
//     { label: "(ii) Groundwater", key: "LI1_A_A2" },
//     { label: "(iii) Third party water", key: "LI1_A_A3" },
//     { label: "(iv) Seawater / desalinated water", key: "LI1_A_A4" },
//     { label: "(v) Others", key: "LI1_A_A5" },
//     {
//       label: "Total volume of water withdrawal (in kiloliters)",
//       bold: true,
//       key: "LI1_A_Total",
//     },
//     {
//       label: "Total volume of water consumption (in kiloliters)",
//       bold: true,
//       key: "LI1_B",
//     },
//     {
//       label:
//         "Water intensity per rupee of turnover (Water consumed / turnover)",
//       bold: true,
//       key: "LI1_C",
//     },
//     {
//       label:
//         "Water intensity (optional) – the relevant metric may be selected by the entity",
//       bold: true,
//       key: "LI1_D",
//     },
//     {
//       label:
//         "Water discharge by destination and level of treatment (in kiloliters)",
//       bold: true,
//     },
//     { label: "(i) Into Surface water", bold: true },
//     { label: "- No treatment", key: "LI1_E_E1A" },
//     {
//       label: "- With treatment – please specify level of treatment",
//       key: "LI1_E_E1B",
//     },
//     { label: "(ii) Into Groundwater", bold: true },
//     { label: "- No treatment", key: "LI1_E_E2A" },
//     {
//       label: "- With treatment – please specify level of treatment",
//       key: "LI1_E_E2B",
//     },

//     { label: "(iii) Into Seawater", bold: true },
//     { label: "- No treatment", key: "LI1_E_E3A" },
//     {
//       label: "- With treatment – please specify level of treatment",
//       key: "LI1_E_E3B",
//     },

//     { label: "(iv) Sent to third-parties", bold: true },
//     { label: "- No treatment", key: "LI1_E_E4A" },
//     {
//       label: "- With treatment – please specify level of treatment",
//       key: "LI1_E_E4B",
//     },

//     { label: "(v) Others", bold: true },

//     { label: "- No treatment", key: "LI1_E_E5A" },
//     {
//       label: "- With treatment – please specify level of treatment",
//       key: "LI1_E_E5B",
//     },
//     {
//       label: "Total water discharged (in kiloliters)",
//       bold: true,
//       key: "LI1_AllTotal",
//     },
//   ];

//   const rowsL2 = [
//     {
//       label:
//         "Total Scope 3 emissions (Break-up of the GHG into CO2, CH4, N2O, HFCs, PFCs, SF6, NF3, if available)",
//       key: "LI2_A",
//     },
//     {
//       label: "Total Scope 3 emissions per rupee of turnover",
//       key: "LI2_B",
//     },
//     {
//       label:
//         "Total Scope 3 emission intensity (optional) – the relevant metric may be selected by the entity",
//       key: "LI2_C",
//     },
//   ];

//   return (
//     <>
//       <Box m="20px">
//         <Box display="flex" justifyContent="space-between" alignItems="center">
//           <Grid item xs={3}>
//             <Typography
//               variant="h5"
//               marginBottom={1}
//               style={{ fontWeight: "bolder" }}
//             >
//               Select Financial Year
//             </Typography>
//             <Autocomplete
//               options={finalYear || []}
//               value={financialYear}
//               onChange={handleFinancialYearChange}
//               renderInput={(params) => <TextField {...params} fullWidth />}
//             />
//           </Grid>
//           <div>
//             {financialYear && viewReport ? (
//               <Button
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//                 className="button"
//                 onClick={handlePrint}
//                 sx={{ width: { xs: "100%", sm: 200 }, maxWidth: "100%" }}
//               >
//                 Download & Print Reports
//               </Button>
//             ) : null}
//           </div>
//         </Box>
//       </Box>

//       <Grid
//         item
//         xs={12}
//         style={{
//           display: "block",
//           justifyContent: "center",
//           alignItems: "center",
//           margin: "20px",
//           backgroundColor: "white",
//           padding: "20px",
//           marginTop: "5px",
//         }}
//         ref={componentRef}
//       >
//         <Grid item xs={12} m={3}>
//           <h1 style={{ color: "#598ef4", marginBottom: "30px" }}>
//             <u>
//               <center>
//                 BUSINESS RESPONSIBILITY & SUSTAINABILITY REPORTING FORMAT
//               </center>
//             </u>
//           </h1>

//           <h2>
//             PRINCIPLE 6 : Businesses should respect and make efforts to protect
//             and restore the environment
//           </h2>

//           <center style={{ margin: "40px" }}>
//             <h3>Essential Indicators</h3>
//           </center>

//           <Grid
//             item
//             xs={12}
//             style={{ fontSize: "17px", marginTop: "20px" }}
//             m={3}
//             marginBottom={3}
//           >
//             <FormControl fullWidth>
//               1. Details of total energy consumption (in Joules or multiples)
//               and energy intensity, in the following format:
//               <TableContainer component={Paper} style={{ margin: "10px" }}>
//                 <Table aria-label="simple table">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder" }}
//                       >
//                         Parameters
//                       </TableCell>
//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder" }}
//                       >
//                         {financialYear}
//                         <br />
//                         (Current Financial Year)
//                       </TableCell>
//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder" }}
//                       >
//                         {financialYear
//                           ? `FY${parseInt(financialYear.slice(2, 6), 10) - 1
//                           }-${parseInt(financialYear.slice(2, 6), 10)}`
//                           : ""}
//                         <br />
//                         (Previous Financial Year)
//                       </TableCell>
//                     </TableRow>
//                   </TableHead>

//                   <TableBody>
//                     {rowsE1?.map((row, index) => (
//                       <TableRow key={index}>
//                         <TableCell
//                           style={{ fontWeight: row.bold ? "bold" : "normal" }}
//                         >
//                           {row.label}
//                         </TableCell>
//                         <TableCell align="center">
//                           {responseData[row.key]?.[0]}
//                         </TableCell>
//                         <TableCell align="center">
//                           {responseData[row.key]?.[1]}
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//               Note: Indicate if any independent assessment/ evaluation/assurance
//               has been carried out by an external agency? (Y/N) If yes, name of
//               the external agency.
//               <div
//                 style={{
//                   color: "black",
//                   backgroundColor: "#e4f4ff",
//                   border: "1px solid black",
//                   padding: "10px",
//                   wordWrap: "break-word",
//                 }}
//               >
//                 {responseData?.EI1_Ans && (
//                   <div>
//                     {responseData?.EI1_Ans?.map((item, index) => (
//                       <div key={index}>{item}</div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </FormControl>
//           </Grid>

//           <Grid
//             item
//             xs={12}
//             style={{ fontSize: "17px", marginTop: "20px" }}
//             m={3}
//             marginBottom={3}
//           >
//             <FormControl fullWidth>
//               2. Does the entity have any sites / facilities identified as
//               designated consumers (DCs) under the Performance, Achieve and
//               Trade (PAT) Scheme of the Government of India? (Y/N) If yes,
//               disclose whether targets set under the PAT scheme have been
//               achieved. In case targets have not been achieved, provide the
//               remedial action taken, if any.
//               <div
//                 style={{
//                   color: "black",
//                   backgroundColor: "#e4f4ff",
//                   border: "1px solid black",
//                   padding: "10px",
//                   wordWrap: "break-word",
//                 }}
//               >
//                 {responseData?.EI2_Ans && (
//                   <div>
//                     {responseData?.EI2_Ans?.map((item, index) => (
//                       <div key={index}>{item}</div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </FormControl>
//           </Grid>

//           <Grid
//             item
//             xs={12}
//             style={{ fontSize: "17px", marginTop: "20px" }}
//             m={3}
//             marginBottom={3}
//           >
//             <FormControl fullWidth>
//               3. Provide details of the following disclosures related to water, in the following format:
//               <TableContainer component={Paper} style={{ margin: "10px" }}>
//                 <Table aria-label="simple table">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder" }}
//                       >
//                         Parameters
//                       </TableCell>
//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder" }}
//                       >
//                         {financialYear}
//                         <br />
//                         (Current Financial Year)
//                       </TableCell>
//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder" }}
//                       >
//                         {financialYear
//                           ? `FY${parseInt(financialYear.slice(2, 6), 10) - 1
//                           }-${parseInt(financialYear.slice(2, 6), 10)}`
//                           : ""}
//                         <br />
//                         (Previous Financial Year)
//                       </TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {rowsE3?.map((row, index) => (
//                       <TableRow key={index}>
//                         <TableCell
//                           style={{ fontWeight: row.bold ? "bold" : "normal" }}
//                         >
//                           {row.label}
//                         </TableCell>
//                         <TableCell align="center">
//                           {responseData[row.key]?.[0]}
//                         </TableCell>
//                         <TableCell align="center">
//                           {responseData[row.key]?.[1]}
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//               Note: Indicate if any independent assessment/ evaluation/assurance has been carried out by an external
//               agency? (Y/N) If yes, name of the external agency.
//               <div
//                 style={{
//                   color: "black",
//                   backgroundColor: "#e4f4ff",
//                   border: "1px solid black",
//                   padding: "10px",
//                   wordWrap: "break-word",
//                 }}
//               >
//                 {responseData?.EI3_Ans && (
//                   <div>
//                     {responseData?.EI3_Ans?.map((item, index) => (
//                       <div key={index}>{item}</div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </FormControl>
//           </Grid>

//           <Grid
//             item
//             xs={12}
//             style={{ fontSize: "17px", marginTop: "20px" }}
//             m={3}
//             marginBottom={3}
//           >
//             <FormControl fullWidth>
//               4. Provide details of the following disclosures related to water, in the following format:
//               <TableContainer component={Paper} style={{ margin: "10px" }}>
//                 <Table aria-label="simple table">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder" }}
//                       >
//                         Parameters
//                       </TableCell>

//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder" }}
//                       >
//                         {financialYear}
//                         <br />
//                         (Current Financial Year)
//                       </TableCell>
//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder" }}
//                       >
//                         {financialYear
//                           ? `FY${parseInt(financialYear.slice(2, 6), 10) - 1
//                           }-${parseInt(financialYear.slice(2, 6), 10)}`
//                           : ""}
//                         <br />
//                         (Previous Financial Year)
//                       </TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {rowsE4?.map((row, index) => (
//                       <TableRow key={index}>
//                         <TableCell
//                           style={{ fontWeight: row.bold ? "bold" : "normal" }}
//                         >
//                           {row.label}
//                         </TableCell>
//                         <TableCell align="center">
//                           {responseData[row.key]?.[0]}
//                         </TableCell>
//                         <TableCell align="center">
//                           {responseData[row.key]?.[1]}
//                         </TableCell>

//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//               Note: Indicate if any independent assessment/ evaluation/assurance
//               has been carried out by an external agency? (Y/N) If yes, name of
//               the external agency.
//               <div
//                 style={{
//                   color: "black",
//                   backgroundColor: "#e4f4ff",
//                   border: "1px solid black",
//                   padding: "10px",
//                   wordWrap: "break-word",
//                 }}
//               >
//                 {responseData?.EI4_Ans && (
//                   <div>
//                     {responseData?.EI4_Ans?.map((item, index) => (
//                       <div key={index}>{item}</div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </FormControl>
//           </Grid>

//           <Grid
//             item
//             xs={12}
//             style={{ fontSize: "17px", marginTop: "20px" }}
//             m={3}
//             marginBottom={3}
//           >
//             <FormControl fullWidth>
//               5. Has the entity implemented a mechanism for Zero Liquid Discharge? If yes, provide details
//               of its coverage and implementation.
//               <div
//                 style={{
//                   color: "black",
//                   backgroundColor: "#e4f4ff",
//                   border: "1px solid black",
//                   padding: "10px",
//                   wordWrap: "break-word",
//                 }}
//               >
//                 {responseData?.EI5_Ans && (
//                   <div>
//                     {responseData?.EI5_Ans?.map((item, index) => (
//                       <div key={index}>{item}</div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </FormControl>
//           </Grid>

//           <Grid
//             item
//             xs={12}
//             style={{ fontSize: "17px", marginTop: "20px" }}
//             m={3}
//             marginBottom={3}
//           >
//             <FormControl fullWidth>
//               6. Please provide details of air emissions (other than GHG emissions) by the entity, in the
//               following format: <TableContainer component={Paper} style={{ margin: "10px" }}>
//                 <Table aria-label="simple table">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder" }}
//                       >
//                         Parameters
//                       </TableCell>

//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder" }}
//                       >
//                         Unit
//                       </TableCell>

//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder" }}
//                       >
//                         {financialYear}
//                         <br />
//                         (Current Financial Year)
//                       </TableCell>
//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder" }}
//                       >
//                         {financialYear
//                           ? `FY${parseInt(financialYear.slice(2, 6), 10) - 1
//                           }-${parseInt(financialYear.slice(2, 6), 10)}`
//                           : ""}
//                         <br />
//                         (Previous Financial Year)
//                       </TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {rowsE6?.map((row, index) => (
//                       <TableRow key={index}>
//                         <TableCell
//                           style={{ fontWeight: row.bold ? "bold" : "normal" }}
//                         >
//                           {row.label}
//                         </TableCell>
//                         <TableCell align="center">
//                           {responseData[row.key]?.[0]}
//                         </TableCell>
//                         <TableCell align="center">
//                           {responseData[row.key]?.[1]}
//                         </TableCell>

//                         <TableCell align="center">
//                           {responseData[row.key]?.[2]}
//                         </TableCell>

//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//               Note: Indicate if any independent assessment/ evaluation/assurance
//               has been carried out by an external agency? (Y/N) If yes, name of
//               the external agency.
//               <div
//                 style={{
//                   color: "black",
//                   backgroundColor: "#e4f4ff",
//                   border: "1px solid black",
//                   padding: "10px",
//                   wordWrap: "break-word",
//                 }}
//               >
//                 {responseData?.EI6_Ans && (
//                   <div>
//                     {responseData?.EI6_Ans?.map((item, index) => (
//                       <div key={index}>{item}</div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </FormControl>
//           </Grid>

//           <Grid
//             item
//             xs={12}
//             style={{ fontSize: "17px", marginTop: "20px" }}
//             m={3}
//             marginBottom={3}
//           >
//             <FormControl fullWidth>
//               7. Provide details of greenhouse gas emissions (Scope 1 and Scope 2 emissions) & its
//               intensity, in the following format:
//               <TableContainer component={Paper} style={{ margin: "10px" }}>
//                 <Table aria-label="simple table">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder" }}
//                       >
//                         Parameters
//                       </TableCell>
//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder" }}
//                       >
//                         Unit
//                       </TableCell>
//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder" }}
//                       >
//                         {financialYear}
//                         <br />
//                         (Current Financial Year)
//                       </TableCell>
//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder" }}
//                       >
//                         {financialYear
//                           ? `FY${parseInt(financialYear.slice(2, 6), 10) - 1
//                           }-${parseInt(financialYear.slice(2, 6), 10)}`
//                           : ""}
//                         <br />
//                         (Previous Financial Year)
//                       </TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {rowsE7?.map((row, index) => (
//                       <TableRow key={index}>
//                         <TableCell
//                           style={{ fontWeight: row.bold ? "bold" : "normal" }}
//                         >
//                           {row.label}
//                         </TableCell>
//                         <TableCell align="center">
//                           {responseData[row.key]?.[0]}
//                         </TableCell>
//                         <TableCell align="center">
//                           {responseData[row.key]?.[1]}
//                         </TableCell>
//                         <TableCell align="center">
//                           {responseData[row.key]?.[2]}
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//               Note: Indicate if any independent assessment/ evaluation/assurance has been carried out by an external
//               agency? (Y/N) If yes, name of the external agency.
//               <div
//                 style={{
//                   color: "black",
//                   backgroundColor: "#e4f4ff",
//                   border: "1px solid black",
//                   padding: "10px",
//                   wordWrap: "break-word",
//                 }}
//               >
//                 {responseData?.EI7_Ans && (
//                   <div>
//                     {responseData?.EI7_Ans?.map((item, index) => (
//                       <div key={index}>{item}</div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </FormControl>
//           </Grid>

//           <Grid
//             item
//             xs={12}
//             style={{ fontSize: "17px", marginTop: "20px" }}
//             m={3}
//             marginBottom={3}
//           >
//             <FormControl fullWidth>
//               8. Does the entity have any project related to reducing Green House Gas emission? If Yes,
//               then provide details.
//               <div
//                 style={{
//                   color: "black",
//                   backgroundColor: "#e4f4ff",
//                   border: "1px solid black",
//                   padding: "10px",
//                   wordWrap: "break-word",
//                 }}
//               >
//                 {responseData?.EI8_Ans && (
//                   <div>
//                     {responseData?.EI8_Ans?.map((item, index) => (
//                       <div key={index}>{item}</div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </FormControl>
//           </Grid>

//           <Grid
//             item
//             xs={12}
//             style={{ fontSize: "17px", marginTop: "20px" }}
//             m={3}
//             marginBottom={3}
//           >
//             <FormControl fullWidth>
//               9. . Provide details related to waste management by the entity, in the following format:
//               <TableContainer component={Paper} style={{ margin: "10px" }}>
//                 <Table aria-label="simple table">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder" }}
//                       >
//                         Parameters
//                       </TableCell>
//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder" }}
//                       >
//                         {financialYear}
//                         <br />
//                         (Current Financial Year)
//                       </TableCell>
//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder" }}
//                       >
//                         {financialYear
//                           ? `FY${parseInt(financialYear.slice(2, 6), 10) - 1
//                           }-${parseInt(financialYear.slice(2, 6), 10)}`
//                           : ""}
//                         <br />
//                         (Previous Financial Year)
//                       </TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {rowsE9?.map((row, index) => (
//                       <TableRow key={index}>
//                         <TableCell
//                           style={{ fontWeight: row.bold ? "bold" : "normal" }}
//                         >
//                           {row.label}
//                         </TableCell>
//                         <TableCell align="center">
//                           {responseData[row.key]?.[0]}
//                         </TableCell>
//                         <TableCell align="center">
//                           {responseData[row.key]?.[1]}
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//               Note: Indicate if any independent assessment/ evaluation/assurance has been carried out by an external
//               agency? (Y/N) If yes, name of the external agency
//               <div
//                 style={{
//                   color: "black",
//                   backgroundColor: "#e4f4ff",
//                   border: "1px solid black",
//                   padding: "10px",
//                   wordWrap: "break-word",
//                 }}
//               >
//                 {responseData?.EI9_Ans && (
//                   <div>
//                     {responseData?.EI9_Ans?.map((item, index) => (
//                       <div key={index}>{item}</div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </FormControl>
//           </Grid>

//           <Grid
//             item
//             xs={12}
//             style={{ fontSize: "17px", marginTop: "20px" }}
//             m={3}
//             marginBottom={3}
//           >
//             <FormControl fullWidth>
//               10. Briefly describe the waste management practices adopted in your
//               establishments. Describe the strategy adopted by your company to
//               reduce usage of hazardous and toxic chemicals in your products and
//               processes and the practices adopted to manage such wastes.
//               <div
//                 style={{
//                   color: "black",
//                   backgroundColor: "#e4f4ff",
//                   border: "1px solid black",
//                   padding: "10px",
//                   wordWrap: "break-word",
//                 }}
//               >
//                 {responseData?.EI10_Ans && (
//                   <div>
//                     {responseData?.EI10_Ans?.map((item, index) => (
//                       <div key={index}>{item}</div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </FormControl>
//           </Grid>

//           <Grid
//             item
//             xs={12}
//             style={{ fontSize: "17px", marginTop: "20px" }}
//             m={3}
//             marginBottom={3}
//           >
//             <FormControl fullWidth>
//               11. If the entity has operations/offices in/around ecologically
//               sensitive areas (such as National parks, Wildlife Sanctuaries,
//               Biosphere reserves, Wetlands, Biodiversity hotspots, Forests,
//               Coastal regulation zones etc.) where environmental approvals /
//               clearances are required, please specify details in the following
//               format:
//               <TableContainer component={Paper} style={{ margin: "10px" }}>
//                 <Table aria-label="simple table">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder", width: "100px" }}
//                       >
//                         Sr.No
//                       </TableCell>
//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder" }}
//                       >
//                         Location of operations/offices
//                       </TableCell>
//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder" }}
//                       >
//                         Type of operations
//                       </TableCell>
//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder" }}
//                       >
//                         Whether the conditions of environmental approval /
//                         clearance are being complied with? (Y/N) If no, the
//                         reasons thereof and corrective action taken, if any.
//                       </TableCell>
//                     </TableRow>
//                   </TableHead>

//                   <TableBody>
//                     {responseData?.EI11_Ans?.map((item, index) => (
//                       <TableRow key={index}>
//                         <TableCell align="center">{index + 1}</TableCell>
//                         <TableCell align="center">{item.Facility}</TableCell>
//                         <TableCell align="center">{item.Operation}</TableCell>
//                         <TableCell align="center">
//                           {item.Clearance === "yes" ? "Yes" : "No"}
//                           {item.Reason && <div> Reason: {item.Reason} </div>}
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </FormControl>
//           </Grid>

//           <Grid
//             item
//             xs={12}
//             style={{ fontSize: "17px", marginTop: "20px" }}
//             m={3}
//             marginBottom={3}
//           >
//             <FormControl fullWidth>
//               12. Details of environmental impact assessments of projects
//               undertaken by the entity based on applicable laws, in the current
//               financial year:
//               <TableContainer component={Paper} style={{ margin: "10px" }}>
//                 <Table aria-label="simple table">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder" }}
//                       >
//                         Sr.No
//                       </TableCell>
//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder" }}
//                       >
//                         Name and brief details of project
//                       </TableCell>
//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder" }}
//                       >
//                         EIA Notification No.
//                       </TableCell>
//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder" }}
//                       >
//                         Date
//                       </TableCell>
//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder" }}
//                       >
//                         Whether conducted by independent external agency (Yes /
//                         No)
//                       </TableCell>

//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder" }}
//                       >
//                         Results communicated in public domain (Yes / No)
//                       </TableCell>

//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder" }}
//                       >
//                         Relevant Web link
//                       </TableCell>
//                     </TableRow>
//                   </TableHead>

//                   <TableBody>
//                     {responseData?.EI12_Ans?.map((item, index) => (
//                       <TableRow key={index}>
//                         <TableCell align="center">{index + 1}</TableCell>
//                         <TableCell align="center">
//                           {item.Name_of_project}
//                         </TableCell>
//                         <TableCell align="center">
//                           {item.Eia_notification_no}
//                         </TableCell>
//                         <TableCell align="center" width="150px">
//                           {item.Date}
//                         </TableCell>
//                         <TableCell align="center">
//                           {item.Conducted_by_external_agency}
//                         </TableCell>
//                         <TableCell align="center">
//                           {item.In_public_domain}
//                         </TableCell>
//                         <TableCell align="center">{item.Results}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </FormControl>
//           </Grid>

//           <Grid
//             item
//             xs={12}
//             style={{ fontSize: "17px", marginTop: "20px" }}
//             m={3}
//             marginBottom={3}
//           >
//             <FormControl fullWidth>
//               13. Is the entity compliant with the applicable environmental law/
//               regulations/ guidelines in India; such as the Water (Prevention
//               and Control of Pollution) Act, Air (Prevention and Control of
//               Pollution) Act, Environment protection act and rules thereunder
//               (Y/N). If not, provide details of all such non-compliances, in the
//               following format:
//               <TableContainer component={Paper} style={{ margin: "10px" }}>
//                 <Table aria-label="simple table">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder", width: "100px" }}
//                       >
//                         Sr.No.
//                       </TableCell>
//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder" }}
//                       >
//                         Specify the law / regulation / guidelines which was not
//                         complied with
//                       </TableCell>
//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder" }}
//                       >
//                         Provide details of the non- compliance
//                       </TableCell>
//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder" }}
//                       >
//                         Any fines / penalties / action taken by regulatory
//                         agencies such as pollution control boards or by courts
//                       </TableCell>

//                       <TableCell
//                         align="center"
//                         style={{ fontWeight: "bolder" }}
//                       >
//                         Corrective action taken, if any
//                       </TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {responseData?.EI13_Ans?.map((item, index) => (
//                       <TableRow key={index}>
//                         <TableCell align="center">{index + 1}</TableCell>
//                         <TableCell align="center">
//                           {
//                             item.The_law_regulations_guidlines_which_was_not_complied_with
//                           }
//                         </TableCell>
//                         <TableCell align="center">
//                           {item.Details_of_non_compliance}
//                         </TableCell>
//                         <TableCell align="center">
//                           {item.Any_fine_penalties_action}
//                         </TableCell>
//                         <TableCell align="center">
//                           {item.Corrective_action_taken_if_any}
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </FormControl>
//           </Grid>
//         </Grid>

//         <center style={{ margin: "40px" }}>
//           <h3>Leadership Indicators</h3>
//         </center>

//         <Grid
//           item
//           xs={12}
//           style={{ fontSize: "17px", marginTop: "20px" }}
//           m={3}
//           marginBottom={3}
//         >
//           <FormControl fullWidth>
//             1. Water withdrawal, consumption, and discharge in areas of water
//             stress (in kiloliters): For each facility / plant located in areas
//             of water stress, provide the following information:
//             <div> (i) Name of the area</div>
//             <div>(ii) Nature of operations </div>
//             <div>
//               (iii) Water withdrawal, consumption, and discharge in the
//               following format:
//             </div>
//             <TableContainer component={Paper} style={{ margin: "10px" }}>
//               <Table aria-label="simple table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell align="center" style={{ fontWeight: "bolder" }}>
//                       Parameters
//                     </TableCell>
//                     <TableCell align="center" style={{ fontWeight: "bolder" }}>
//                       {financialYear}
//                       <br />
//                       (Current Financial Year)
//                     </TableCell>
//                     <TableCell align="center" style={{ fontWeight: "bolder" }}>
//                       {financialYear
//                         ? `FY${parseInt(financialYear.slice(2, 6), 10) - 1
//                         }-${parseInt(financialYear.slice(2, 6), 10)}`
//                         : ""}
//                       <br />
//                       (Previous Financial Year)
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {rowsL1?.map((row, index) => (
//                     <TableRow key={index}>
//                       <TableCell
//                         style={{ fontWeight: row.bold ? "bold" : "normal" }}
//                       >
//                         {row.label}
//                       </TableCell>
//                       <TableCell align="center">
//                         {responseData[row.key]?.[0]}
//                       </TableCell>
//                       <TableCell align="center">
//                         {responseData[row.key]?.[1]}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//             Note: Indicate if any independent assessment/ evaluation/assurance
//             has been carried out by an external agency? (Y/N) If yes, name of
//             the external agency.
//             <div
//               style={{
//                 color: "black",
//                 backgroundColor: "#e4f4ff",
//                 border: "1px solid black",
//                 padding: "10px",
//                 wordWrap: "break-word",
//               }}
//             >
//               {responseData?.LI1_Ans && (
//                 <div>
//                   {responseData?.LI1_Ans?.map((item, index) => (
//                     <div key={index}>{item}</div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </FormControl>
//         </Grid>

//         <Grid
//           item
//           xs={12}
//           style={{ fontSize: "17px", marginTop: "20px" }}
//           m={3}
//           marginBottom={3}
//         >
//           <FormControl fullWidth>
//             2. Please provide details of total Scope 3 emissions & its
//             intensity, in the following format:
//             <TableContainer component={Paper} style={{ margin: "10px" }}>
//               <Table aria-label="simple table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell align="center" style={{ fontWeight: "bolder" }}>
//                       Parameters
//                     </TableCell>
//                     <TableCell align="center" style={{ fontWeight: "bolder" }}>
//                       Unit
//                     </TableCell>
//                     <TableCell align="center" style={{ fontWeight: "bolder" }}>
//                       {financialYear}
//                       <br />
//                       (Current Financial Year)
//                     </TableCell>
//                     <TableCell align="center" style={{ fontWeight: "bolder" }}>
//                       {financialYear
//                         ? `FY${parseInt(financialYear.slice(2, 6), 10) - 1
//                         }-${parseInt(financialYear.slice(2, 6), 10)}`
//                         : ""}
//                       <br />
//                       (Previous Financial Year)
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {rowsL2?.map((row, index) => (
//                     <TableRow key={index}>
//                       <TableCell
//                         style={{ fontWeight: row.bold ? "bold" : "normal" }}
//                       >
//                         {row.label}
//                       </TableCell>
//                       <TableCell align="center">
//                         {responseData[row.key]?.[0]}
//                       </TableCell>
//                       <TableCell align="center">
//                         {responseData[row.key]?.[1]}
//                       </TableCell>
//                       <TableCell align="center">
//                         {responseData[row.key]?.[2]}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//             Note: Indicate if any independent assessment/ evaluation/assurance
//             has been carried out by an external agency? (Y/N) If yes, name of
//             the external agency.
//             <div
//               style={{
//                 color: "black",
//                 backgroundColor: "#e4f4ff",
//                 border: "1px solid black",
//                 padding: "10px",
//                 wordWrap: "break-word",
//               }}
//             >
//               {responseData?.LI2_Ans && (
//                 <div>
//                   {responseData?.LI2_Ans?.map((item, index) => (
//                     <div key={index}>{item}</div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </FormControl>
//         </Grid>

//         <Grid
//           item
//           xs={12}
//           style={{ fontSize: "17px", marginTop: "20px" }}
//           m={3}
//           marginBottom={3}
//         >
//           <FormControl fullWidth>
//             3. With respect to the ecologically sensitive areas reported at
//             Question 10 of Essential Indicators above, provide details of
//             significant direct & indirect impact of the entity on biodiversity
//             in such areas along-with prevention and remediation activities.
//             <div
//               style={{
//                 color: "black",
//                 backgroundColor: "#e4f4ff",
//                 border: "1px solid black",
//                 padding: "10px",
//                 wordWrap: "break-word",
//               }}
//             >
//               {responseData?.LI3_Ans && (
//                 <div>
//                   {responseData?.LI3_Ans?.map((item, index) => (
//                     <div key={index}>{item}</div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </FormControl>
//         </Grid>

//         <Grid
//           item
//           xs={12}
//           style={{ fontSize: "17px", marginTop: "20px" }}
//           m={3}
//           marginBottom={3}
//         >
//           <FormControl fullWidth>
//             4. If the entity has undertaken any specific initiatives or used
//             innovative technology or solutions to improve resource efficiency,
//             or reduce impact due to emissions / effluent discharge / waste
//             generated, please provide details of the same as well as outcome of
//             such initiatives, as per the following format:
//             <TableContainer component={Paper} style={{ margin: "10px" }}>
//               <Table aria-label="simple table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell
//                       align="center"
//                       style={{ fontWeight: "bolder", width: "100px" }}
//                     >
//                       Sr.No.
//                     </TableCell>
//                     <TableCell align="center" style={{ fontWeight: "bolder" }}>
//                       Initiative undertaken
//                     </TableCell>
//                     <TableCell align="center" style={{ fontWeight: "bolder" }}>
//                       Details of the initiative (Web-link, if any, may be
//                       provided along-with summary)
//                     </TableCell>
//                     <TableCell align="center" style={{ fontWeight: "bolder" }}>
//                       Outcome of the initiative
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {responseData?.LI4_Ans?.map((item, index) => (
//                     <TableRow key={index}>
//                       <TableCell align="center">{index + 1}</TableCell>
//                       <TableCell align="center">
//                         {item.Initiative_undertaken}
//                       </TableCell>
//                       <TableCell align="center">
//                         {item.Details_of_the_initiative}
//                       </TableCell>
//                       <TableCell align="center">
//                         {item.Outcome_of_the_initiative}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </FormControl>
//         </Grid>

//         <Grid
//           item
//           xs={12}
//           style={{ fontSize: "17px", marginTop: "20px" }}
//           m={3}
//           marginBottom={3}
//         >
//           <FormControl fullWidth>
//             5. Does the entity have a business continuity and disaster
//             management plan? Give details in 100 words/ web link.
//             <div
//               style={{
//                 color: "black",
//                 backgroundColor: "#e4f4ff",
//                 border: "1px solid black",
//                 padding: "10px",
//                 wordWrap: "break-word",
//               }}
//             >
//               {responseData?.LI5_Ans && (
//                 <div>
//                   {responseData?.LI5_Ans?.map((item, index) => (
//                     <div key={index}>{item}</div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </FormControl>
//         </Grid>

//         <Grid
//           item
//           xs={12}
//           style={{ fontSize: "17px", marginTop: "20px" }}
//           m={3}
//           marginBottom={3}
//         >
//           <FormControl fullWidth>
//             6. Disclose any significant adverse impact to the environment,
//             arising from the value chain of the entity. What mitigation or
//             adaptation measures have been taken by the entity in this regard.
//             <div
//               style={{
//                 color: "black",
//                 backgroundColor: "#e4f4ff",
//                 border: "1px solid black",
//                 padding: "10px",
//                 wordWrap: "break-word",
//               }}
//             >
//               {responseData?.LI6_Ans && (
//                 <div>
//                   {responseData?.LI6_Ans?.map((item, index) => (
//                     <div key={index}>{item}</div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </FormControl>
//         </Grid>

//         <Grid
//           item
//           xs={12}
//           style={{ fontSize: "17px", marginTop: "20px" }}
//           m={3}
//           marginBottom={3}
//         >
//           <FormControl fullWidth>
//             7. Percentage of value chain partners (by value of business done
//             with such partners) that were assessed for environmental impacts
//             <div
//               style={{
//                 color: "black",
//                 backgroundColor: "#e4f4ff",
//                 border: "1px solid black",
//                 padding: "10px",
//                 wordWrap: "break-word",
//               }}
//             >
//               {responseData?.LI7_Ans && (
//                 <div>
//                   {responseData?.LI7_Ans?.map((item, index) => (
//                     <div key={index}>{item}</div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </FormControl>
//         </Grid>
//       </Grid>
//     </>
//   );
// }

// export default Principle6Report;

import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  clearMessage,
  fetchFinancialYear,
  fetchRemarks,
} from "../../../store/CommonApi/CommonApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  viewReporting,
  clearSuccessMessage,
} from "../../../store/Report/Principle6Slice";
import ScrollToTop from "../../../Components/ScrollToTop";
import { toast } from "react-toastify";
import RemarkBox from "../../../Components/RemarkBox";

function Principle6Report({
  showFinancialYear = true,
  showHeading = true,
  overAllReportFY,
  showScrollToTop = true,
  showPrintButton = true,
  onLoad,
  showLoader = true,
  onError,
  overAllPrintMode,
}) {
  const componentRef = useRef(null);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [remarks, setRemarks] = useState({});
  const [printMode, setPrintMode] = useState(false);

  const handlePrint = () => {
    if (componentRef.current) {
      setPrintMode(true);

      setTimeout(() => {
        const printWindow = window.open("", "_blank");
        printWindow.document.write("<html><head><title>REPORT P6</title>");
        printWindow.document.write("<style>");
        printWindow.document.write(`
            body {
                font-family: Arial, sans-serif;
                font-size: 15px;
                line-height: 1.6;
                margin: 0;
                padding: 0;
            }
            .container {
                margin: 10px;
                padding: 20px;
                background-color: white;
                margin-bottom: 2px; /* Ensure there's space for the footer */
            }
           
            .header{
                display: block;
            }

            .footer {
                display: block;
                text-align: center;
            }
            
            h1, h2, h3, h4, h5, h6 {
                margin-top: 0;
            }
            h4 {
                text-align: right;
                margin-right: 20px;
            }
            table {
                border-collapse: collapse;
                width: 100%;
                margin-bottom: 10px;
            }
            th, td {
                padding: 8px;
                text-align: left;
                border-bottom: 2px solid black;
            }
            th {
                font-weight: bold;
                font-size: larger;
                color: #598ef4;
            }
            td {
                border-left: none;
                border-right: none;
            }
            @media print {
                @page {
                    size: A4;
                    margin: 20mm;
                }
                body {
                    margin: 0;
                }
                .container {
                    page-break-inside: avoid;
                    margin-bottom: 20px;
                    padding:20px;

                }
                .header {
                    display: block;
                }
                  
                .footerPrint {
                    position: fixed;
                    display:block
                    bottom: 0;
                    width: 100%;
                    text-align: center;
                    font-size: 14px;
                    color: #598ef4;
s                }
            }
        `);
        printWindow.document.write("</style></head><body>");

        printWindow.document.write('<div class="container">');
        printWindow.document.write("<h4>Annexure I</h4>");
        printWindow.document.write(componentRef.current.innerHTML);
        printWindow.document.write("</div>");

        // Footer content
        printWindow.document.write(
          '<div class="footer footerPrint">Annual Integrated P6 Report</div>'
        );

        printWindow.document.write("</body></html>");
        printWindow.document.close();
        printWindow.print();
        setPrintMode(false);
      }, 100);
    }
  };

  const {
    finalYear,
    remarkData,
    error: remarksError,
    success: remarksSuccess,
    section,
  } = useSelector((state) => state.CommonApiDetailSlice);
  const { viewReport, error } = useSelector(
    (state) => state.Principle6SliceDetails
  );
  const [financialYear, setFinancialYear] = useState(null);
  const handleFinancialYearChange = (event, value) => {
    setFinancialYear(value);
  };

  const [responseData, setResponseData] = useState(viewReport?.EI || {});
  useEffect(() => {
    if (showFinancialYear) {
      dispatch(fetchFinancialYear());
    } else {
      setFinancialYear(overAllReportFY);
    }
    if (!overAllReportFY) {
      setFinancialYear(null);
    }
  }, [dispatch, overAllReportFY]);

  useEffect(() => {
    if (remarkData && remarkData.length > 0) {
      const remarksMap = {};
      remarkData.forEach((remark) => {
        remarksMap[remark.recommendation_key] = remark.recommendation_value;
      });
      setRemarks(remarksMap);
    }
  }, [remarkData]);

  useEffect(() => {
    if (
      showFinancialYear &&
      Object.keys(responseData).length > 0 &&
      financialYear
    ) {
      toast.success("Data Has been Fetched successfully");
    }
  }, [responseData]);

  useEffect(() => {
    if (remarksSuccess && section === "Principle6") {
      toast.success(remarksSuccess);
      dispatch(clearMessage());
    }
  }, [remarksSuccess]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearSuccessMessage());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (remarksError) {
      toast.error(`Remark error - ${remarksError}`);
      dispatch(clearMessage());
    }
  }, [remarksError, dispatch]);

  useEffect(() => {
    let isSubscribed = true;

    if (!financialYear) {
      setResponseData({});
      setRemarks({});
      return;
    }
    if (!overAllReportFY && !showFinancialYear) {
      setResponseData({});
      setRemarks({});
      return;
    }

    setLoader(true);
    dispatch(
      viewReporting({ financial_year: financialYear || overAllReportFY })
    )
      .then((result) => {
        if (isSubscribed) {
          setResponseData(result.payload.EI || "");
          setLoader(false);
          dispatch(fetchRemarks(financialYear || overAllReportFY));
          if (overAllReportFY) {
            onLoad();
          }
        }
      })
      .catch((error) => {
        if (isSubscribed) {
          setResponseData({});
          setLoader(false);
          if (overAllReportFY) {
            onError();
          }
        }
      });

    return () => {
      isSubscribed = false;
      setLoader(false);
    };
  }, [dispatch, financialYear, overAllReportFY]);

  const rowsE1 = [
    { label: "From renewable sources", bold: true },
    { label: "Total electricity consumption (A)", key: "EI1_A" },
    { label: "Total fuel consumption (B)", key: "EI1_B" },
    { label: "Energy consumption through other sources (C)", key: "EI1_C" },
    {
      label: "Total energy consumed from renewable sources (A+B+C)",
      key: "EI1_ABC",
      bold: true,
    },
    { label: "From non-renewable sources", bold: true },
    { label: "Total electricity consumption (D)", key: "EI1_D" },
    { label: "Total fuel consumption (E)", key: "EI1_E" },
    { label: "Total electricity consumption (D)", key: "EI1_F" },
    {
      label: "Total energy consumed from non-renewable sources (D+E+F)",
      key: "EI1_DEF",
      bold: true,
    },
    {
      label: "Total energy consumed (A+B+C+D+E+F)",
      key: "EI1_ABCDEF",
      bold: true,
    },
    {
      label:
        "Energy intensity per rupee of turnover(Total energy consumed / Revenue from operations)(GJ/₹ Million)",
      key: "EI1_G",
    },
    {
      label:
        "Energy intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP) (Total energy consumed / Revenue from operations adjusted for PPP)",
      key: "EI1_H",
    },
    { label: "Energy intensity in terms of physical output", key: "EI1_I" },
    {
      label:
        "Energy intensity (optional) – the relevant metric may be selected by the entity",
      key: "EI1_J",
    },
  ];

  const rowsE3 = [
    { label: "Water withdrawal by source (in kilolitres)", bold: true },
    { label: "(i) Surface water", key: "EI3_A" },
    { label: "(ii) Groundwater", key: "EI3_B" },
    { label: "(iii) Third party water", key: "EI3_C" },
    { label: "(iv) Seawater / desalinated water", key: "EI3_D" },
    { label: "(v) Others", key: "EI3_E" },
    {
      label:
        "Total volume of water withdrawal (in kiloliters) (i + ii + iii + iv + v)",
      key: "EI3_ABCDE",
      bold: true,
    },
    {
      label: "Total volume of water consumption (in kiloliters)",
      key: "EI3_F",
      bold: true,
    },
    {
      label:
        "Water intensity per rupee of turnover (Total water consumption / Revenue from operations) (kiloliters/₹ Million)",
      key: "EI3_G",
      bold: true,
    },
    {
      label:
        "Water intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP) (Total water consumption / Revenue from operations adjusted for PPP)",
      key: "EI3_H",
      bold: true,
    },
    {
      label: "Water intensity in terms of physical output",
      key: "EI3_I",
      bold: true,
    },
    {
      label:
        "Water intensity (optional) – therelevant metric may be selected by the entity",
      key: "EI3_J",
      bold: true,
    },
  ];

  const rowsE4 = [
    {
      label:
        "Water discharge by destination and level of treatment (in kiloliters)",
      bold: true,
    },
    { label: "(i) To Surface water", bold: true },
    { label: "- No treatment", key: "EI4_A1" },
    {
      label: "- With treatment – please specify level of treatment",
      key: "EI4_A2",
    },
    { label: "(ii) To Groundwater", bold: true },
    { label: "- No treatment", key: "EI4_B1" },
    {
      label: "- With treatment – please specify level of treatment",
      key: "EI4_B2",
    },
    { label: "(iii) To Seawater", bold: true },
    { label: "- No treatment", key: "EI4_C1" },
    {
      label: "- With treatment – please specify level of treatment",
      key: "EI4_C2",
    },
    { label: "(iv) Sent to third-parties", bold: true },
    { label: "- No treatment", key: "EI4_D1" },
    {
      label: "- With treatment – please specify level of treatment",
      key: "EI4_D2",
    },
    { label: "(v) Others", bold: true },
    { label: "- No treatment", key: "EI4_E1" },
    {
      label: "- With treatment – please specify level of treatment",
      key: "EI4_E2",
    },
    {
      label: "Total water discharged (in kiloliters)",
      key: "EI4_F",
      bold: true,
    },
  ];

  const rowsE6 = [
    { label: "NOx", key: "EI6_A" },
    { label: "SOx", key: "EI6_B" },
    { label: "Particulate matter (PM)", key: "EI6_C" },
    { label: "Persistent organic pollutants (POP)", key: "EI6_D" },
    { label: "Volatile organic compounds (VOC)", key: "EI6_E" },
    { label: "Hazardous air pollutants (HAP)", key: "EI6_F" },
    { label: "Others – please specify", key: "EI6_G" },
  ];

  const rowsE7 = [
    {
      label:
        "Total Scope 1 emissions (Break-up of the GHG into CO2, CH4, N2O, HFCs, PFCs,SF6, NF3, if available)",
      key: "EI7_A",
    },
    {
      label:
        "Total Scope 2 emissions (Break-up of the GHG into CO2, CH4, N2O, HFCs, PFCs,SF6, NF3, if available)",
      key: "EI7_B",
    },
    {
      label:
        "Total Scope 1 and Scope 2 emission intensity per rupee of turnover (Total Scope 1 and Scope 2 GHG emissions / Revenue from operations) (Metric tonnes of CO2/₹ million)",
      key: "EI7_C",
    },
    {
      label:
        "Total Scope 1 and Scope 2 emission intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP) (Total Scope 1 and Scope 2 GHG emissions / Revenue from operations adjusted for PPP)",
      key: "EI7_D",
    },
    {
      label:
        "Total Scope 1 and Scope 2 emission intensity in terms of physical output",
      key: "EI7_E",
    },
    {
      label:
        "Total Scope 1 and Scope 2 emission intensity (optional) – the relevant metric may be selected by the entity",
      key: "EI7_F",
    },
  ];

  const rowsE9 = [
    { label: "Total Waste generated (in metric tons)", bold: true },
    { label: "Plastic waste (A)", key: "EI9_A" },
    { label: "E-waste (B)", key: "EI9_B" },
    { label: "Bio-medical waste (C)", key: "EI9_C" },
    { label: "Construction and demolition waste (D)", key: "EI9_D" },
    { label: "Battery waste (E)", key: "EI9_E" },
    { label: "Radioactive waste (F)", key: "EI9_F" },
    {
      label: "Other Hazardous waste. Please specify, if any. (G)",
      key: "EI9_G",
    },
    {
      label:
        "Other Non-hazardous waste generated (H). Please specify, if any. (Break-up by composition i.e. by materials relevant to the sector)",
      key: "EI9_H",
    },
    { label: "Total (A+B + C + D + E + F + G + H)", key: "EI9_ABCDEFGH" },
    {
      label:
        "Waste intensity per rupee of turnover (Total waste generated / Revenue from operations) (Metric tonners /₹ Million)",
      key: "EI9_O",
    },
    {
      label:
        "Waste intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP) (Total waste generated / Revenue from operations adjusted for PPP)",
      key: "EI9_P",
    },
    { label: "Waste intensity in terms of physical output", key: "EI9_Q" },
    {
      label:
        "Waste intensity (optional) – the relevant metric may be selected by the entity",
      key: "EI9_R",
    },

    {
      label:
        "For each category of waste generated, total waste recovered through recycling, re-using or other recovery operations (in metric tons) Category of waste",
      bold: true,
    },

    { label: "(i) Recycled", key: "EI9_I" },
    { label: "(ii) Re-used", key: "EI9_J" },
    { label: "(iii) Other recovery operations", key: "EI9_K" },
    { label: "Total", key: "EI9_IJK" },
    {
      label:
        "For each category of waste generated, total waste disposed by nature of disposal method (in metric tons) Category of waste",
      bold: true,
    },
    { label: "(i) Incineration", key: "EI9_L" },
    { label: "(ii) Landfilling", key: "EI9_M" },
    { label: "(iii) Other disposal operations", key: "EI9_N" },
    { label: "Total", key: "EI9_LMN" },
  ];

  const rowsL1 = [
    { label: "Water withdrawal by source (in kiloliters)", bold: true },
    { label: "(i) To Surface water", key: "LI1_A_A1" },
    { label: "(ii) Groundwater", key: "LI1_A_A2" },
    { label: "(iii) Third party water", key: "LI1_A_A3" },
    { label: "(iv) Seawater / desalinated water", key: "LI1_A_A4" },
    { label: "(v) Others", key: "LI1_A_A5" },
    {
      label: "Total volume of water withdrawal (in kiloliters)",
      bold: true,
      key: "LI1_A_Total",
    },
    {
      label: "Total volume of water consumption (in kiloliters)",
      bold: true,
      key: "LI1_B",
    },
    {
      label:
        "Water intensity per rupee of turnover (Water consumed / turnover)",
      bold: true,
      key: "LI1_C",
    },
    {
      label:
        "Water intensity (optional) – the relevant metric may be selected by the entity",
      bold: true,
      key: "LI1_D",
    },
    {
      label:
        "Water discharge by destination and level of treatment (in kiloliters)",
      bold: true,
    },
    { label: "(i) Into Surface water", bold: true },
    { label: "- No treatment", key: "LI1_E_E1A" },
    {
      label: "- With treatment – please specify level of treatment",
      key: "LI1_E_E1B",
    },
    { label: "(ii) Into Groundwater", bold: true },
    { label: "- No treatment", key: "LI1_E_E2A" },
    {
      label: "- With treatment – please specify level of treatment",
      key: "LI1_E_E2B",
    },

    { label: "(iii) Into Seawater", bold: true },
    { label: "- No treatment", key: "LI1_E_E3A" },
    {
      label: "- With treatment – please specify level of treatment",
      key: "LI1_E_E3B",
    },

    { label: "(iv) Sent to third-parties", bold: true },
    { label: "- No treatment", key: "LI1_E_E4A" },
    {
      label: "- With treatment – please specify level of treatment",
      key: "LI1_E_E4B",
    },

    { label: "(v) Others", bold: true },

    { label: "- No treatment", key: "LI1_E_E5A" },
    {
      label: "- With treatment – please specify level of treatment",
      key: "LI1_E_E5B",
    },
    {
      label: "Total water discharged (in kiloliters)",
      bold: true,
      key: "LI1_AllTotal",
    },
  ];

  const rowsL2 = [
    {
      label:
        "Total Scope 3 emissions (Break-up of the GHG into CO2, CH4, N2O, HFCs, PFCs, SF6, NF3, if available)",
      key: "LI2_A",
    },
    {
      label: "Total Scope 3 emissions per rupee of turnover",
      key: "LI2_B",
    },
    {
      label:
        "Total Scope 3 emission intensity (optional) – the relevant metric may be selected by the entity",
      key: "LI2_C",
    },
  ];

  return (
    <>
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {showFinancialYear && (
            <Grid item xs={3}>
              <Typography
                variant="h5"
                marginBottom={1}
                style={{ fontWeight: "bolder" }}
              >
                Select Financial Year
              </Typography>
              <Autocomplete
                options={finalYear || []}
                value={financialYear}
                onChange={handleFinancialYearChange}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
          )}
          <div>
            {financialYear &&
            Object.keys(responseData).length > 0 &&
            showPrintButton ? (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="button"
                onClick={handlePrint}
                sx={{ width: { xs: "100%", sm: 200 }, maxWidth: "100%" }}
              >
                Download & Print Reports
              </Button>
            ) : null}
          </div>
        </Box>
      </Box>
      <Grid
        item
        xs={12}
        style={{
          display: "block",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px",
          backgroundColor: "white",
          padding: "20px",
          marginTop: "5px",
        }}
        ref={componentRef}
      >
        {loader && showLoader && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
        <Grid item xs={12} m={3}>
          <h2>
            PRINCIPLE 6 : Businesses should respect and make efforts to protect
            and restore the environment
          </h2>

          <center style={{ margin: "40px" }}>
            <h3>Essential Indicators</h3>
          </center>

          <Grid
            item
            xs={12}
            style={{ fontSize: "17px", marginTop: "20px" }}
            m={3}
            marginBottom={3}
          >
            <FormControl fullWidth>
              1. Details of total energy consumption (in Joules or multiples)
              and energy intensity, in the following format:
              <TableContainer component={Paper} style={{ margin: "10px" }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Parameters
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        {financialYear}
                        <br />
                        (Current Financial Year)
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        {financialYear
                          ? `FY${
                              parseInt(financialYear.slice(2, 6), 10) - 1
                            }-${parseInt(financialYear.slice(2, 6), 10)}`
                          : ""}
                        <br />
                        (Previous Financial Year)
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {rowsE1?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell
                          style={{ fontWeight: row.bold ? "bold" : "normal" }}
                        >
                          {row.label}
                        </TableCell>
                        <TableCell align="center">
                          {responseData[row.key]?.[0]}
                        </TableCell>
                        <TableCell align="center">
                          {responseData[row.key]?.[1]}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              Note: Indicate if any independent assessment/ evaluation/assurance
              has been carried out by an external agency? (Y/N) If yes, name of
              the external agency.
              <div
                style={{
                  color: "black",
                  backgroundColor: "#e4f4ff",
                  border: "1px solid black",
                  padding: "10px",
                  wordWrap: "break-word",
                }}
              >
                {responseData?.EI1_Ans && (
                  <div>
                    {responseData?.EI1_Ans?.map((item, index) => (
                      <div key={index}>{item}</div>
                    ))}
                  </div>
                )}
              </div>
            </FormControl>
          </Grid>
          <RemarkBox
            tableName={`Details of total energy consumption (in Joules or multiples) and energy intensity`}
            tableKey="Total_Energy_Consumption"
            initialRemark={remarks["Total_Energy_Consumption"]}
            financialYear={financialYear}
            printMode={printMode}
            overAllPrintMode={overAllPrintMode}
            section={"Principle6"}
          />
          <Grid
            item
            xs={12}
            style={{ fontSize: "17px", marginTop: "20px" }}
            m={3}
            marginBottom={3}
          >
            <FormControl fullWidth>
              2. Does the entity have any sites / facilities identified as
              designated consumers (DCs) under the Performance, Achieve and
              Trade (PAT) Scheme of the Government of India? (Y/N) If yes,
              disclose whether targets set under the PAT scheme have been
              achieved. In case targets have not been achieved, provide the
              remedial action taken, if any.
              <div
                style={{
                  color: "black",
                  backgroundColor: "#e4f4ff",
                  border: "1px solid black",
                  padding: "10px",
                  wordWrap: "break-word",
                }}
              >
                {responseData?.EI2_Ans && (
                  <div>
                    {responseData?.EI2_Ans?.map((item, index) => (
                      <div key={index}>{item}</div>
                    ))}
                  </div>
                )}
              </div>
            </FormControl>
          </Grid>
          <RemarkBox
            tableName={`Achieve and Trade (PAT) Scheme of the Government of India`}
            tableKey="Project_and_Policy_Details_PAT"
            initialRemark={remarks["Project_and_Policy_Details_PAT"]}
            financialYear={financialYear}
            printMode={printMode}
            overAllPrintMode={overAllPrintMode}
            section={"Principle6"}
          />
          <Grid
            item
            xs={12}
            style={{ fontSize: "17px", marginTop: "20px" }}
            m={3}
            marginBottom={3}
          >
            <FormControl fullWidth>
              3. Provide details of the following disclosures related to water,
              in the following format:
              <TableContainer component={Paper} style={{ margin: "10px" }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Parameters
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        {financialYear}
                        <br />
                        (Current Financial Year)
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        {financialYear
                          ? `FY${
                              parseInt(financialYear.slice(2, 6), 10) - 1
                            }-${parseInt(financialYear.slice(2, 6), 10)}`
                          : ""}
                        <br />
                        (Previous Financial Year)
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rowsE3?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell
                          style={{ fontWeight: row.bold ? "bold" : "normal" }}
                        >
                          {row.label}
                        </TableCell>
                        <TableCell align="center">
                          {responseData[row.key]?.[0]}
                        </TableCell>
                        <TableCell align="center">
                          {responseData[row.key]?.[1]}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              Note: Indicate if any independent assessment/ evaluation/assurance
              has been carried out by an external agency? (Y/N) If yes, name of
              the external agency.
              <div
                style={{
                  color: "black",
                  backgroundColor: "#e4f4ff",
                  border: "1px solid black",
                  padding: "10px",
                  wordWrap: "break-word",
                }}
              >
                {responseData?.EI3_Ans && (
                  <div>
                    {responseData?.EI3_Ans?.map((item, index) => (
                      <div key={index}>{item}</div>
                    ))}
                  </div>
                )}
              </div>
            </FormControl>
          </Grid>
          <RemarkBox
            tableName={`Disclosures related to water`}
            tableKey="Disclosures_related_to_water"
            initialRemark={remarks["Disclosures_related_to_water"]}
            financialYear={financialYear}
            printMode={printMode}
            overAllPrintMode={overAllPrintMode}
            section={"Principle6"}
          />
          <Grid
            item
            xs={12}
            style={{ fontSize: "17px", marginTop: "20px" }}
            m={3}
            marginBottom={3}
          >
            <FormControl fullWidth>
              4. Provide details of the following disclosures related to water,
              in the following format:
              <TableContainer component={Paper} style={{ margin: "10px" }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Parameters
                      </TableCell>

                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        {financialYear}
                        <br />
                        (Current Financial Year)
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        {financialYear
                          ? `FY${
                              parseInt(financialYear.slice(2, 6), 10) - 1
                            }-${parseInt(financialYear.slice(2, 6), 10)}`
                          : ""}
                        <br />
                        (Previous Financial Year)
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rowsE4?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell
                          style={{ fontWeight: row.bold ? "bold" : "normal" }}
                        >
                          {row.label}
                        </TableCell>
                        <TableCell align="center">
                          {responseData[row.key]?.[0]}
                        </TableCell>
                        <TableCell align="center">
                          {responseData[row.key]?.[1]}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              Note: Indicate if any independent assessment/ evaluation/assurance
              has been carried out by an external agency? (Y/N) If yes, name of
              the external agency.
              <div
                style={{
                  color: "black",
                  backgroundColor: "#e4f4ff",
                  border: "1px solid black",
                  padding: "10px",
                  wordWrap: "break-word",
                }}
              >
                {responseData?.EI4_Ans && (
                  <div>
                    {responseData?.EI4_Ans?.map((item, index) => (
                      <div key={index}>{item}</div>
                    ))}
                  </div>
                )}
              </div>
            </FormControl>
          </Grid>

          <RemarkBox
            tableName={`Water Discharge to Destination`}
            tableKey="Water_Discharge_to_Destination"
            initialRemark={remarks["Water_Discharge_to_Destination"]}
            financialYear={financialYear}
            printMode={printMode}
            overAllPrintMode={overAllPrintMode}
            section={"Principle6"}
          />
          <Grid
            item
            xs={12}
            style={{ fontSize: "17px", marginTop: "20px" }}
            m={3}
            marginBottom={3}
          >
            <FormControl fullWidth>
              5. Has the entity implemented a mechanism for Zero Liquid
              Discharge? If yes, provide details of its coverage and
              implementation.
              <div
                style={{
                  color: "black",
                  backgroundColor: "#e4f4ff",
                  border: "1px solid black",
                  padding: "10px",
                  wordWrap: "break-word",
                }}
              >
                {responseData?.EI5_Ans && (
                  <div>
                    {responseData?.EI5_Ans?.map((item, index) => (
                      <div key={index}>{item}</div>
                    ))}
                  </div>
                )}
              </div>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            style={{ fontSize: "17px", marginTop: "20px" }}
            m={3}
            marginBottom={3}
          >
            <FormControl fullWidth>
              6. Please provide details of air emissions (other than GHG
              emissions) by the entity, in the following format:{" "}
              <TableContainer component={Paper} style={{ margin: "10px" }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Parameters
                      </TableCell>

                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Unit
                      </TableCell>

                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        {financialYear}
                        <br />
                        (Current Financial Year)
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        {financialYear
                          ? `FY${
                              parseInt(financialYear.slice(2, 6), 10) - 1
                            }-${parseInt(financialYear.slice(2, 6), 10)}`
                          : ""}
                        <br />
                        (Previous Financial Year)
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rowsE6?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell
                          style={{ fontWeight: row.bold ? "bold" : "normal" }}
                        >
                          {row.label}
                        </TableCell>
                        <TableCell align="center">
                          {responseData[row.key]?.[0]}
                        </TableCell>
                        <TableCell align="center">
                          {responseData[row.key]?.[1]}
                        </TableCell>

                        <TableCell align="center">
                          {responseData[row.key]?.[2]}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              Note: Indicate if any independent assessment/ evaluation/assurance
              has been carried out by an external agency? (Y/N) If yes, name of
              the external agency.
              <div
                style={{
                  color: "black",
                  backgroundColor: "#e4f4ff",
                  border: "1px solid black",
                  padding: "10px",
                  wordWrap: "break-word",
                }}
              >
                {responseData?.EI6_Ans && (
                  <div>
                    {responseData?.EI6_Ans?.map((item, index) => (
                      <div key={index}>{item}</div>
                    ))}
                  </div>
                )}
              </div>
            </FormControl>
          </Grid>

          <RemarkBox
            tableName={`Details of air emissions`}
            tableKey="Air_Emissions_other_than_GHG_Emissions"
            initialRemark={remarks["Air_Emissions_other_than_GHG_Emissions"]}
            financialYear={financialYear}
            printMode={printMode}
            overAllPrintMode={overAllPrintMode}
            section={"Principle6"}
          />
          <Grid
            item
            xs={12}
            style={{ fontSize: "17px", marginTop: "20px" }}
            m={3}
            marginBottom={3}
          >
            <FormControl fullWidth>
              7. Provide details of greenhouse gas emissions (Scope 1 and Scope
              2 emissions) & its intensity, in the following format:
              <TableContainer component={Paper} style={{ margin: "10px" }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Parameters
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Unit
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        {financialYear}
                        <br />
                        (Current Financial Year)
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        {financialYear
                          ? `FY${
                              parseInt(financialYear.slice(2, 6), 10) - 1
                            }-${parseInt(financialYear.slice(2, 6), 10)}`
                          : ""}
                        <br />
                        (Previous Financial Year)
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rowsE7?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell
                          style={{ fontWeight: row.bold ? "bold" : "normal" }}
                        >
                          {row.label}
                        </TableCell>
                        <TableCell align="center">
                          {responseData[row.key]?.[0]}
                        </TableCell>
                        <TableCell align="center">
                          {responseData[row.key]?.[1]}
                        </TableCell>
                        <TableCell align="center">
                          {responseData[row.key]?.[2]}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              Note: Indicate if any independent assessment/ evaluation/assurance
              has been carried out by an external agency? (Y/N) If yes, name of
              the external agency.
              <div
                style={{
                  color: "black",
                  backgroundColor: "#e4f4ff",
                  border: "1px solid black",
                  padding: "10px",
                  wordWrap: "break-word",
                }}
              >
                {responseData?.EI7_Ans && (
                  <div>
                    {responseData?.EI7_Ans?.map((item, index) => (
                      <div key={index}>{item}</div>
                    ))}
                  </div>
                )}
              </div>
            </FormControl>
          </Grid>
          <RemarkBox
            tableName={`Details of greenhouse gas emissions`}
            tableKey="Scope1_and_Scope2_Emissions"
            initialRemark={remarks["Scope1_and_Scope2_Emissions"]}
            financialYear={financialYear}
            printMode={printMode}
            overAllPrintMode={overAllPrintMode}
            section={"Principle6"}
          />
          <Grid
            item
            xs={12}
            style={{ fontSize: "17px", marginTop: "20px" }}
            m={3}
            marginBottom={3}
          >
            <FormControl fullWidth>
              8. Does the entity have any project related to reducing Green
              House Gas emission? If Yes, then provide details.
              <div
                style={{
                  color: "black",
                  backgroundColor: "#e4f4ff",
                  border: "1px solid black",
                  padding: "10px",
                  wordWrap: "break-word",
                }}
              >
                {responseData?.EI8_Ans && (
                  <div>
                    {responseData?.EI8_Ans?.map((item, index) => (
                      <div key={index}>{item}</div>
                    ))}
                  </div>
                )}
              </div>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            style={{ fontSize: "17px", marginTop: "20px" }}
            m={3}
            marginBottom={3}
          >
            <FormControl fullWidth>
              9. . Provide details related to waste management by the entity, in
              the following format:
              <TableContainer component={Paper} style={{ margin: "10px" }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Parameters
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        {financialYear}
                        <br />
                        (Current Financial Year)
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        {financialYear
                          ? `FY${
                              parseInt(financialYear.slice(2, 6), 10) - 1
                            }-${parseInt(financialYear.slice(2, 6), 10)}`
                          : ""}
                        <br />
                        (Previous Financial Year)
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rowsE9?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell
                          style={{ fontWeight: row.bold ? "bold" : "normal" }}
                        >
                          {row.label}
                        </TableCell>
                        <TableCell align="center">
                          {responseData[row.key]?.[0]}
                        </TableCell>
                        <TableCell align="center">
                          {responseData[row.key]?.[1]}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              Note: Indicate if any independent assessment/ evaluation/assurance
              has been carried out by an external agency? (Y/N) If yes, name of
              the external agency
              <div
                style={{
                  color: "black",
                  backgroundColor: "#e4f4ff",
                  border: "1px solid black",
                  padding: "10px",
                  wordWrap: "break-word",
                }}
              >
                {responseData?.EI9_Ans && (
                  <div>
                    {responseData?.EI9_Ans?.map((item, index) => (
                      <div key={index}>{item}</div>
                    ))}
                  </div>
                )}
              </div>
            </FormControl>
          </Grid>
          <RemarkBox
            tableName={`Details related to waste management`}
            tableKey="Waste_Management"
            initialRemark={remarks["Waste_Management"]}
            financialYear={financialYear}
            printMode={printMode}
            overAllPrintMode={overAllPrintMode}
            section={"Principle6"}
          />
          <Grid
            item
            xs={12}
            style={{ fontSize: "17px", marginTop: "20px" }}
            m={3}
            marginBottom={3}
          >
            <FormControl fullWidth>
              10. Briefly describe the waste management practices adopted in
              your establishments. Describe the strategy adopted by your company
              to reduce usage of hazardous and toxic chemicals in your products
              and processes and the practices adopted to manage such wastes.
              <div
                style={{
                  color: "black",
                  backgroundColor: "#e4f4ff",
                  border: "1px solid black",
                  padding: "10px",
                  wordWrap: "break-word",
                }}
              >
                {responseData?.EI10_Ans && (
                  <div>
                    {responseData?.EI10_Ans?.map((item, index) => (
                      <div key={index}>{item}</div>
                    ))}
                  </div>
                )}
              </div>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            style={{ fontSize: "17px", marginTop: "20px" }}
            m={3}
            marginBottom={3}
          >
            <FormControl fullWidth>
              11. If the entity has operations/offices in/around ecologically
              sensitive areas (such as National parks, Wildlife Sanctuaries,
              Biosphere reserves, Wetlands, Biodiversity hotspots, Forests,
              Coastal regulation zones etc.) where environmental approvals /
              clearances are required, please specify details in the following
              format:
              <TableContainer component={Paper} style={{ margin: "10px" }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder", width: "100px" }}
                      >
                        Sr.No
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Location of operations/offices
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Type of operations
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Whether the conditions of environmental approval /
                        clearance are being complied with? (Y/N) If no, the
                        reasons thereof and corrective action taken, if any.
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {responseData?.EI11_Ans?.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{item.Facility}</TableCell>
                        <TableCell align="center">{item.Operation}</TableCell>
                        <TableCell align="center">
                          {item.Clearance === "yes" ? "Yes" : "No"}
                          {item.Reason && <div> Reason: {item.Reason} </div>}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </FormControl>
          </Grid>
          <RemarkBox
            tableName={`If the entity has operations/offices in/around ecologically sensitive areas`}
            tableKey="Operations_in_ecologically_sensitive_areas"
            initialRemark={
              remarks["Operations_in_ecologically_sensitive_areas"]
            }
            financialYear={financialYear}
            printMode={printMode}
            overAllPrintMode={overAllPrintMode}
            section={"Principle6"}
          />
          <Grid
            item
            xs={12}
            style={{ fontSize: "17px", marginTop: "20px" }}
            m={3}
            marginBottom={3}
          >
            <FormControl fullWidth>
              12. Details of environmental impact assessments of projects
              undertaken by the entity based on applicable laws, in the current
              financial year:
              <TableContainer component={Paper} style={{ margin: "10px" }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Sr.No
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Name and brief details of project
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        EIA Notification No.
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Date
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Whether conducted by independent external agency (Yes /
                        No)
                      </TableCell>

                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Results communicated in public domain (Yes / No)
                      </TableCell>

                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Relevant Web link
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {Array.isArray(responseData?.EI12_Ans?.[0]) &&
                      responseData?.EI12_Ans?.[0].length > 0 &&
                      responseData?.EI12_Ans?.[0]?.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">
                            {item.Name_of_project}
                          </TableCell>
                          <TableCell align="center">
                            {item.Eia_notification_no}
                          </TableCell>
                          <TableCell align="center" width="150px">
                            {item.Date}
                          </TableCell>
                          <TableCell align="center">
                            {item.Conducted_by_external_agency}
                          </TableCell>
                          <TableCell align="center">
                            {item.In_public_domain}
                          </TableCell>
                          <TableCell align="center">{item.Results}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </FormControl>
          </Grid>
          <RemarkBox
            tableName={`Details of environmental impact assessments of projects`}
            tableKey="Environmental_impact_assessments_of_projects_undertaken"
            initialRemark={
              remarks[
                "Water_WithdrawalEnvironmental_impact_assessments_of_projects_undertaken_by_Source"
              ]
            }
            financialYear={financialYear}
            printMode={printMode}
            overAllPrintMode={overAllPrintMode}
            section={"Principle6"}
          />
          <Grid
            item
            xs={12}
            style={{ fontSize: "17px", marginTop: "20px" }}
            m={3}
            marginBottom={3}
          >
            <FormControl fullWidth>
              13. Is the entity compliant with the applicable environmental law/
              regulations/ guidelines in India; such as the Water (Prevention
              and Control of Pollution) Act, Air (Prevention and Control of
              Pollution) Act, Environment protection act and rules thereunder
              (Y/N). If not, provide details of all such non-compliances, in the
              following format:
              <TableContainer component={Paper} style={{ margin: "10px" }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder", width: "100px" }}
                      >
                        Sr.No.
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Specify the law / regulation / guidelines which was not
                        complied with
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Provide details of the non- compliance
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Any fines / penalties / action taken by regulatory
                        agencies such as pollution control boards or by courts
                      </TableCell>

                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Corrective action taken, if any
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(responseData?.EI13_Ans?.[0]) &&
                      responseData?.EI13_Ans?.[0].length > 0 &&
                      responseData?.EI13_Ans?.[0]?.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">
                            {
                              item.The_law_regulations_guidlines_which_was_not_complied_with
                            }
                          </TableCell>
                          <TableCell align="center">
                            {item.Details_of_non_compliance}
                          </TableCell>
                          <TableCell align="center">
                            {item.Any_fine_penalties_action}
                          </TableCell>
                          <TableCell align="center">
                            {item.Corrective_action_taken_if_any}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </FormControl>
          </Grid>
        </Grid>
        <RemarkBox
          tableName={`Is the entity compliant with the applicable environmental law/ regulations/ guidelines in India`}
          tableKey="Non_compliance_with_the_applicable_environmental_law"
          initialRemark={
            remarks["Non_compliance_with_the_applicable_environmental_law"]
          }
          financialYear={financialYear}
          printMode={printMode}
          overAllPrintMode={overAllPrintMode}
          section={"Principle6"}
        />

        <center style={{ margin: "40px" }}>
          <h3>Leadership Indicators</h3>
        </center>

        <Grid
          item
          xs={12}
          style={{ fontSize: "17px", marginTop: "20px" }}
          m={3}
          marginBottom={3}
        >
          <FormControl fullWidth>
            1. Water withdrawal, consumption, and discharge in areas of water
            stress (in kiloliters): For each facility / plant located in areas
            of water stress, provide the following information:
            <div style={{ display: "flex", gap: "15px" }}>
              <div> (i) Name of the area</div>
              {"-"}
              <div>{responseData?.LI1_1?.[0]?.Facility}</div>
            </div>
            <div style={{ display: "flex", gap: "15px" }}>
              <div> (ii) Nature of operations</div>
              {"-"}
              <div>{responseData?.LI1_2?.[0]?.Operation}</div>
            </div>
            <div> </div>
            <div>
              (iii) Water withdrawal, consumption, and discharge in the
              following format:
            </div>
            <TableContainer component={Paper} style={{ margin: "10px" }}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{ fontWeight: "bolder" }}>
                      Parameters
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bolder" }}>
                      {financialYear}
                      <br />
                      (Current Financial Year)
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bolder" }}>
                      {financialYear
                        ? `FY${
                            parseInt(financialYear.slice(2, 6), 10) - 1
                          }-${parseInt(financialYear.slice(2, 6), 10)}`
                        : ""}
                      <br />
                      (Previous Financial Year)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowsL1?.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell
                        style={{ fontWeight: row.bold ? "bold" : "normal" }}
                      >
                        {row.label}
                      </TableCell>
                      <TableCell align="center">
                        {responseData[row.key]?.[0]}
                      </TableCell>
                      <TableCell align="center">
                        {responseData[row.key]?.[1]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            Note: Indicate if any independent assessment/ evaluation/assurance
            has been carried out by an external agency? (Y/N) If yes, name of
            the external agency.
            <div
              style={{
                color: "black",
                backgroundColor: "#e4f4ff",
                border: "1px solid black",
                padding: "10px",
                wordWrap: "break-word",
              }}
            >
              {responseData?.LI1_Ans && (
                <div>
                  {responseData?.LI1_Ans?.map((item, index) => (
                    <div key={index}>{item}</div>
                  ))}
                </div>
              )}
            </div>
          </FormControl>
        </Grid>
        <RemarkBox
          tableName={`Water withdrawal, consumption, and discharge in areas of water stress (in kiloliters)`}
          tableKey="Water_Withdrawal_by_Source"
          initialRemark={remarks["Water_Withdrawal_by_Source"]}
          financialYear={financialYear}
          printMode={printMode}
          overAllPrintMode={overAllPrintMode}
          section={"Principle6"}
        />
        <Grid
          item
          xs={12}
          style={{ fontSize: "17px", marginTop: "20px" }}
          m={3}
          marginBottom={3}
        >
          <FormControl fullWidth>
            2. Please provide details of total Scope 3 emissions & its
            intensity, in the following format:
            <TableContainer component={Paper} style={{ margin: "10px" }}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{ fontWeight: "bolder" }}>
                      Parameters
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bolder" }}>
                      Unit
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bolder" }}>
                      {financialYear}
                      <br />
                      (Current Financial Year)
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bolder" }}>
                      {financialYear
                        ? `FY${
                            parseInt(financialYear.slice(2, 6), 10) - 1
                          }-${parseInt(financialYear.slice(2, 6), 10)}`
                        : ""}
                      <br />
                      (Previous Financial Year)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowsL2?.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell
                        style={{ fontWeight: row.bold ? "bold" : "normal" }}
                      >
                        {row.label}
                      </TableCell>
                      <TableCell align="center">
                        {responseData[row.key]?.[0]}
                      </TableCell>
                      <TableCell align="center">
                        {responseData[row.key]?.[1]}
                      </TableCell>
                      <TableCell align="center">
                        {responseData[row.key]?.[2]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            Note: Indicate if any independent assessment/ evaluation/assurance
            has been carried out by an external agency? (Y/N) If yes, name of
            the external agency.
            <div
              style={{
                color: "black",
                backgroundColor: "#e4f4ff",
                border: "1px solid black",
                padding: "10px",
                wordWrap: "break-word",
              }}
            >
              {responseData?.LI2_Ans && (
                <div>
                  {responseData?.LI2_Ans?.map((item, index) => (
                    <div key={index}>{item}</div>
                  ))}
                </div>
              )}
            </div>
          </FormControl>
        </Grid>
        <RemarkBox
          tableName={`Details of total Scope 3 emissions`}
          tableKey="Scope3_Emissions"
          initialRemark={remarks["Scope3_Emissions"]}
          financialYear={financialYear}
          printMode={printMode}
          overAllPrintMode={overAllPrintMode}
          section={"Principle6"}
        />
        <Grid
          item
          xs={12}
          style={{ fontSize: "17px", marginTop: "20px" }}
          m={3}
          marginBottom={3}
        >
          <FormControl fullWidth>
            3. With respect to the ecologically sensitive areas reported at
            Question 10 of Essential Indicators above, provide details of
            significant direct & indirect impact of the entity on biodiversity
            in such areas along-with prevention and remediation activities.
            <div
              style={{
                color: "black",
                backgroundColor: "#e4f4ff",
                border: "1px solid black",
                padding: "10px",
                wordWrap: "break-word",
              }}
            >
              {responseData?.LI3_Ans && (
                <div>
                  {responseData?.LI3_Ans?.map((item, index) => (
                    <div key={index}>{item}</div>
                  ))}
                </div>
              )}
            </div>
          </FormControl>
        </Grid>

        <Grid
          item
          xs={12}
          style={{ fontSize: "17px", marginTop: "20px" }}
          m={3}
          marginBottom={3}
        >
          <FormControl fullWidth>
            4. If the entity has undertaken any specific initiatives or used
            innovative technology or solutions to improve resource efficiency,
            or reduce impact due to emissions / effluent discharge / waste
            generated, please provide details of the same as well as outcome of
            such initiatives, as per the following format:
            <TableContainer component={Paper} style={{ margin: "10px" }}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      style={{ fontWeight: "bolder", width: "100px" }}
                    >
                      Sr.No.
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bolder" }}>
                      Initiative undertaken
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bolder" }}>
                      Details of the initiative (Web-link, if any, may be
                      provided along-with summary)
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bolder" }}>
                      Outcome of the initiative
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {responseData?.LI4_Ans?.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">
                        {item.Initiative_undertaken}
                      </TableCell>
                      <TableCell align="center">
                        {item.Details_of_the_initiative}
                      </TableCell>
                      <TableCell align="center">
                        {item.Outcome_of_the_initiative}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </FormControl>
        </Grid>

        <Grid
          item
          xs={12}
          style={{ fontSize: "17px", marginTop: "20px" }}
          m={3}
          marginBottom={3}
        >
          <FormControl fullWidth>
            5. Does the entity have a business continuity and disaster
            management plan? Give details in 100 words/ web link.
            <div
              style={{
                color: "black",
                backgroundColor: "#e4f4ff",
                border: "1px solid black",
                padding: "10px",
                wordWrap: "break-word",
              }}
            >
              {responseData?.LI5_Ans && (
                <div>
                  {responseData?.LI5_Ans?.map((item, index) => (
                    <div key={index}>{item}</div>
                  ))}
                </div>
              )}
            </div>
          </FormControl>
        </Grid>

        <Grid
          item
          xs={12}
          style={{ fontSize: "17px", marginTop: "20px" }}
          m={3}
          marginBottom={3}
        >
          <FormControl fullWidth>
            6. Disclose any significant adverse impact to the environment,
            arising from the value chain of the entity. What mitigation or
            adaptation measures have been taken by the entity in this regard.
            <div
              style={{
                color: "black",
                backgroundColor: "#e4f4ff",
                border: "1px solid black",
                padding: "10px",
                wordWrap: "break-word",
              }}
            >
              {responseData?.LI6_Ans && (
                <div>
                  {responseData?.LI6_Ans?.map((item, index) => (
                    <div key={index}>{item}</div>
                  ))}
                </div>
              )}
            </div>
          </FormControl>
        </Grid>

        <Grid
          item
          xs={12}
          style={{ fontSize: "17px", marginTop: "20px" }}
          m={3}
          marginBottom={3}
        >
          <FormControl fullWidth>
            7. Percentage of value chain partners (by value of business done
            with such partners) that were assessed for environmental impacts
            <div
              style={{
                color: "black",
                backgroundColor: "#e4f4ff",
                border: "1px solid black",
                padding: "10px",
                wordWrap: "break-word",
              }}
            >
              {responseData?.LI7_Ans && (
                <div>
                  {responseData?.LI7_Ans?.map((item, index) => (
                    <div key={index}>{item}</div>
                  ))}
                </div>
              )}
            </div>
          </FormControl>
        </Grid>
      </Grid>
      {showScrollToTop && <ScrollToTop />}
    </>
  );
}

export default Principle6Report;
