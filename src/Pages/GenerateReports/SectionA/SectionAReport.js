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
  clearSuccessMessage,
  SectionAReportAPi,
} from "../../../store/GenerateReports/GenerateReportsSlice";
import ScrollToTop from "../../../Components/ScrollToTop";
import { toast } from "react-toastify";
import RemarkBox from "../../../Components/RemarkBox";
import {
  formatLink,
  processTextWithLinks,
} from "../../../utils/linkAccessibility";

function SectionAReport({
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
  const [products16activities, setProducts16activities] = useState([]);
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
           .remark{
           margin-left: 10px;
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
    (state) => state.GenerateReportsDetails
  );
  const [financialYear, setFinancialYear] = useState(null);
  const handleFinancialYearChange = (event, value) => {
    setFinancialYear(value);
  };

  const [responseData, setResponseData] = useState(viewReport?.Section_A || {});

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
    if (showFinancialYear && Object.keys(responseData).length > 0) {
      toast.success("Data Has been Fetched successfully");
    }
  }, [responseData]);

  useEffect(() => {
    if (remarksSuccess && section === "SectionA") {
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
      SectionAReportAPi({ financial_year: financialYear || overAllReportFY })
    )
      .then((result) => {
        if (isSubscribed) {
          setResponseData(result.payload.Section_A || "");
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

  const rowsE = [
    { label: "", bold: true },
    { label: "", key: "EI1_B" },
    { label: "", key: "EI1_B" },
    { label: "", key: "Section_A_" },
  ];
  const rowsDetailentry = [
    {
      label: "1. Corporate Identity Number (CIN) of the Listed Entity ",
      key: "Section_A_1",
    },
    { label: " 2. Name of the Listed Entity ", key: "Section_A_2" },
    { label: " 3. Year of incorporation ", key: "Section_A_3" },
    { label: " 4. Registered office address ", key: "Section_A_4" },
    { label: " 5. Corporate address ", key: "Section_A_5" },
    { label: " 6. E-mail ", key: "Section_A_6" },
    { label: " 7. Telephone ", key: "Section_A_7" },
    { label: " 8. Website ", key: "Section_A_8" },
    {
      label: "9. Financial year for which reporting is being done ",
      key: "Section_A_9",
    },
    {
      label: " 10. Name of the Stock Exchange(s) where shares are listed ",
      key: "Section_A_10",
    },
    { label: "  11. Paid-up Capital", key: "Section_A_11" },
    {
      label:
        "12. Name and contact details (telephone, email address) of the person who may be contacted in case of any queries on the BRSR report    ",
      key: "Section_A_12",
    },
    {
      label:
        " 13. Reporting boundary - Are the disclosures under this report made on a standalone basis (i.e. only for the entity) or on a consolidated basis (i.e. for the entity and all the entities which form a part of its consolidated financial statements, taken together).",
      key: "Section_A_13",
    },
    { label: "14. Name of assurance provider ", key: "Section_A_14" },
    { label: "15. Type of assurance obtained ", key: "Section_A_15" },
  ];
  const rowssectionA18 = [
    { label: "National", bold: true, key: "Section_A_18_National" },
    { label: "International", bold: true, key: "Section_A_18_International" },
  ];
  const rowssectionA19 = [
    {
      label: "National (No. of States)",
      bold: true,
      key: "Section_A_19_National",
    },
    {
      label: "International (No. of Countries)",
      bold: true,
      key: "Section_A_19_International",
    },
  ];
  const rowssectionA20A = [
    { label: "Permanent (D)" },
    { label: "Other than Permanent (E)" },
    { label: "Total employees (D + E)", bold: true },
  ];
  const rowssectionA20B = [
    { label: "Permanent (F)" },
    { label: "Other than Permanent (G)" },
    { label: "Total employees (F + G)", bold: true },
  ];
  const rowssectionA20bA = [
    { label: "Permanent (D)" },
    { label: "Other than Permanent (E)" },
    { label: "Total employees (D + E)", bold: true },
  ];
  const rowssectionA20bB = [
    { label: "Permanent (F)" },
    { label: "Other than Permanent (G)" },
    { label: "Total employees (F + G)", bold: true },
  ];
  const rowssectionA21 = [
    { label: "Board of Directors" },
    { label: "Key Management Personnel" },
  ];
  const rowssectionA22 = [
    { label: "Permanent Employees", key: "Section_A_22_Permanent_Emp" },
    { label: "Permanent Workers", key: "Section_A_22_Permanent_Wkr" },
  ];
  const rowssectionA25 = [
    { label: "Communities", key: "Section_A_25_Com" },
    { label: "Investors (other than shareholders)", key: "Section_A_25_Inv" },
    { label: "Shareholders", key: "Section_A_25_Share" },
    { label: "Employees and workers", key: "Section_A_25_Emp" },
    { label: "Customers", key: "Section_A_25_Cus" },
    { label: "Value Chain Partners", key: "Section_A_25_Value" },
    { label: "Other (please specify)", key: "Section_A_25_Other" },
  ];
  const handleChangeSectionA12 = (obj) => {
    if (obj) {
      const modifiedData = Object.entries(obj[0]);

      return (
        <div>
          {modifiedData.map(([key, value]) => (
            <div key={key}>
              <strong>{key}:</strong> {processTextWithLinks(value)}
            </div>
          ))}
        </div>
      );
    }
  };

  const formatWithRupeeAndCr = (value) => {
    if (!value) return "";
    return `₹ ${value}`; // Format: ₹ <value> Cr
  };

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
          {showHeading && (
            <h1 style={{ color: "#598ef4", marginBottom: "30px" }}>
              <u>
                <center>
                  BUSINESS RESPONSIBILITY & SUSTAINABILITY REPORTING FORMAT
                </center>
              </u>
            </h1>
          )}

          <center style={{ margin: "40px" }}>
            <h3>SECTION A: GENERAL DISCLOSURES</h3>
          </center>
          <Grid
            item
            xs={12}
            style={{ fontSize: "17px", marginTop: "20px" }}
            m={3}
            marginBottom={3}
          >
            <FormControl fullWidth>
              I. Details of the listed entity
              <TableContainer component={Paper} style={{ margin: "10px" }}>
                <Table aria-label="simple table">
                  {/* <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                        colSpan={2}
                      >
                        FY _____ (Current Financial Year)
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                        colSpan={2}
                      >
                        FY _____ (Previous Financial Year)
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell style={{ fontWeight: "bolder" }}>
                        Number
                      </TableCell>
                      <TableCell style={{ fontWeight: "bolder" }}>
                        Remarks
                      </TableCell>
                      <TableCell style={{ fontWeight: "bolder" }}>
                        Number
                      </TableCell>
                      <TableCell style={{ fontWeight: "bolder" }}>
                        Remarks
                      </TableCell>
                    </TableRow>
                  </TableHead> */}

                  {/* <TableBody>
                    {rowsDetailentry?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell
                          style={{
                            fontWeight: row.bold ? "bold" : "normal",
                            width: "180px",
                          }}
                        >
                          {row.label}
                        </TableCell>
                        <TableCell align="left" style={{ width: "90px" }}>
                          {row.key === "Section_A_12"
                            ? handleChangeSectionA12(responseData[row.key])
                            : responseData[row.key]}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody> */}
                  <TableBody>
                    {rowsDetailentry?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell
                          style={{
                            fontWeight: row.bold ? "bold" : "normal",
                            width: "180px",
                          }}
                        >
                          {row.label}
                        </TableCell>
                        <TableCell align="left" style={{ width: "90px" }}>
                          {row.key === "Section_A_11"
                            ? formatWithRupeeAndCr(responseData[row.key]) // Show ₹ <value> Cr for Section_A_11
                            : row.key === "Section_A_12"
                            ? handleChangeSectionA12(responseData[row.key])
                            : row.key === "Section_A_6" ||
                              row.key === "Section_A_8"
                            ? formatLink(responseData[row.key]?.[0])
                            : responseData[row.key]}
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
              {/* <u style={{ fontSize: "17px", marginBottom: "30px" }}>
                I. Details of the listed entity
              </u> */}
              {/* <div>
                {" "}
                1. Corporate Identity Number (CIN) of the Listed Entity
              </div>
              <div>
                1. Corporate Identity Number (CIN) of the Listed Entity 
                2. Name of the Listed Entity 
                3. Year of incorporation 
                4. Registered office address 
                5. Corporate address 
                6. E-mail 
                7. Telephone 
                8. Website 
                9. Financial year for which reporting is being done 
                10. Name of the Stock Exchange(s) where shares are listed 
                11. Paid-up Capital
                12. Name and contact details (telephone, email address) of the person who may be contacted in case of any queries on the BRSR report    
                13. Reporting boundary - Are the disclosures under this report made on a standalone basis (i.e. only for the entity) or on a consolidated basis (i.e. for the entity and all the entities which form a part of its consolidated financial statements, taken together).
                14. Name of assurance provider 
                15. Type of assurance obtained 
              </div> */}
              <u style={{ fontSize: "17px", margin: "30px" }}>
                II. Products/services
              </u>
              <div>
                16. Details of business activities (accounting for 90% of the
                turnover):
              </div>
              <TableContainer component={Paper} style={{ margin: "10px" }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        S. No.
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Description of Main Activity
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Description of Business Activity
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        % of Turnover of the entity
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {responseData?.Section_A_16?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell
                          style={{ fontWeight: row.bold ? "bold" : "normal" }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell align="center">{row.Description}</TableCell>
                        <TableCell align="center">
                          {row.Name_of_Business_Activity}
                        </TableCell>
                        {/* <TableCell align="center">
                          {row.Percent_Turnover}
                        </TableCell> */}
                        <TableCell align="center">
                          {row.Percent_Turnover
                            ? `${row.Percent_Turnover}%`
                            : ""}
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
              17. Products/Services sold by the entity (accounting for 90% of
              the entity’s Turnover):
              <TableContainer component={Paper} style={{ margin: "10px" }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        S. No.
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Product/Service
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        NIC Code
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        % of total Turnover contributed
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {responseData?.Section_A_17?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell
                          style={{ fontWeight: row.bold ? "bold" : "normal" }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell align="center">
                          {row.Name_of_Product_Service}
                        </TableCell>
                        <TableCell align="center">{row.NIC_Code}</TableCell>
                        {/* <TableCell align="center">
                          {row.Percent_Turnover}
                        </TableCell> */}
                        <TableCell align="center">
                          {row.Percent_Turnover
                            ? `${row.Percent_Turnover}%`
                            : ""}
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
              <u style={{ fontSize: "17px", margin: "30px" }}>
                III. Operations
              </u>
              <div>
                18. Number of locations where plants and/or operations/offices
                of the entity are situated:
              </div>
              <TableContainer component={Paper} style={{ margin: "10px" }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Location
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Number of plants
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Number of offices
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Total
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {rowssectionA18?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell
                          style={{
                            fontWeight: row.bold ? "bold" : "normal",
                          }}
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
            </FormControl>
          </Grid>
          <RemarkBox
            tableName={`Number of locations where plants and/or operations/offices
                of the entity are situated`}
            tableKey="Offices_and_Plants"
            initialRemark={remarks["Offices_and_Plants"]}
            financialYear={financialYear}
            printMode={printMode}
            overAllPrintMode={overAllPrintMode}
            section={"SectionA"}
          />
          <Grid
            item
            xs={12}
            style={{ fontSize: "17px", marginTop: "20px" }}
            m={3}
            marginBottom={3}
          >
            <FormControl fullWidth>
              19. Markets served by the entity:
              <div>a. Number of locations</div>
              <TableContainer component={Paper} style={{ margin: "10px" }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bolder" }}>
                        Location
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        Number
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rowssectionA19?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell
                          style={{
                            fontWeight: row.bold ? "bold" : "normal",
                          }}
                        >
                          {row.label}
                        </TableCell>
                        <TableCell align="center">
                          {responseData[row.key]?.[0]}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </FormControl>
          </Grid>
          <RemarkBox
            tableName="Markets served by the entity"
            tableKey="Markets_Served"
            initialRemark={remarks["Markets_Served"]}
            financialYear={financialYear}
            printMode={printMode}
            section={"SectionA"}
          />
          <Grid
            item
            xs={12}
            style={{ fontSize: "17px", marginTop: "20px" }}
            m={3}
            marginBottom={3}
          >
            <FormControl fullWidth>
              b. What is the contribution of exports as a percentage of the
              total turnover of the entity?
              <div
                style={{
                  color: "black",
                  backgroundColor: "#e4f4ff",
                  border: "1px solid black",
                  padding: "10px",
                  wordWrap: "break-word",
                }}
              >
                {responseData?.Section_A_19_b && (
                  <div>
                    {responseData?.Section_A_19_b?.map((item, index) => (
                      <div key={index}>
                        Exports contribute {item} % of the total turnover of the
                        Company
                      </div>
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
              c. A brief on types of customers
              <div
                style={{
                  color: "black",
                  backgroundColor: "#e4f4ff",
                  border: "1px solid black",
                  padding: "10px",
                  wordWrap: "break-word",
                }}
              >
                {responseData?.Section_A_19_c && (
                  <div>
                    {responseData?.Section_A_19_c?.map((item, index) => (
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
              <div>
                IV. Employees
                <br />
                20. Details as at the end of Financial Year:
                <br />
                a. Employees and workers (including differently abled):
                <br />
              </div>

              <TableContainer component={Paper} style={{ margin: "10px" }}>
                <Table aria-label="employees and workers table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bolder" }}>
                        S. No
                      </TableCell>
                      <TableCell style={{ fontWeight: "bolder" }}>
                        Particulars
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        Total (A)
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        colSpan={2}
                        align="center"
                      >
                        Male
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        colSpan={2}
                        align="center"
                      >
                        Female
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        No. (B)
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        % (B / A)
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        No. (C)
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        % (C / A)
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        style={{ fontWeight: "bold", textAlign: "center" }}
                      >
                        EMPLOYEES
                      </TableCell>
                    </TableRow>
                    {rowssectionA20A.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell
                          style={{ fontWeight: row.bold ? "bold" : "normal" }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: row.bold ? "bold" : "normal" }}
                        >
                          {row.label}
                        </TableCell>
                        <TableCell align="center">
                          {row.label === "Permanent (D)"
                            ? responseData?.Section_A_20_a_Employees?.[0]
                                ?.total_permanent
                            : row.label === "Other than Permanent (E)"
                            ? responseData?.Section_A_20_a_Employees?.[0]
                                ?.total_non_permanent
                            : row.label === "Total employees (D + E)"
                            ? responseData?.Section_A_20_a_Employees?.[0]
                                ?.total_employees
                            : null}
                        </TableCell>
                        <TableCell align="center">
                          {row.label === "Permanent (D)"
                            ? responseData?.Section_A_20_a_Employees?.[0]
                                ?.male_permanent
                            : row.label === "Other than Permanent (E)"
                            ? responseData?.Section_A_20_a_Employees?.[0]
                                ?.male_non_permanent
                            : row.label === "Total employees (D + E)"
                            ? responseData?.Section_A_20_a_Employees?.[0]
                                ?.total_male
                            : null}
                        </TableCell>
                        {/* <TableCell align="center">
                          {row.label === "Permanent (D)"
                            ? responseData?.Section_A_20_a_Employees?.[0]
                                ?.male_permanent_percent
                            : row.label === "Other than Permanent (E)"
                            ? responseData?.Section_A_20_a_Employees?.[0]
                                ?.male_non_permanent_percent
                            : row.label === "Total employees (D + E)"
                            ? responseData?.Section_A_20_a_Employees?.[0]
                                ?.male_total_percent
                            : null}
                        </TableCell> */}
                        <TableCell align="center">
                          {row.label === "Permanent (D)"
                            ? `${
                                responseData?.Section_A_20_a_Employees?.[0]
                                  ?.male_permanent_percent ?? ""
                              }%`
                            : row.label === "Other than Permanent (E)"
                            ? `${
                                responseData?.Section_A_20_a_Employees?.[0]
                                  ?.male_non_permanent_percent ?? ""
                              }%`
                            : row.label === "Total employees (D + E)"
                            ? `${
                                responseData?.Section_A_20_a_Employees?.[0]
                                  ?.male_total_percent ?? ""
                              }%`
                            : null}
                        </TableCell>

                        <TableCell align="center">
                          {row.label === "Permanent (D)"
                            ? responseData?.Section_A_20_a_Employees?.[0]
                                ?.female_permanent
                            : row.label === "Other than Permanent (E)"
                            ? responseData?.Section_A_20_a_Employees?.[0]
                                ?.female_non_permanent
                            : row.label === "Total employees (D + E)"
                            ? responseData?.Section_A_20_a_Employees?.[0]
                                ?.total_female
                            : null}
                        </TableCell>
                        {/* <TableCell align="center">
                          {row.label === "Permanent (D)"
                            ? responseData?.Section_A_20_a_Employees?.[0]
                                ?.female_permanent_percent
                            : row.label === "Other than Permanent (E)"
                            ? responseData?.Section_A_20_a_Employees?.[0]
                                ?.female_non_permanent_percent
                            : row.label === "Total employees (D + E)"
                            ? responseData?.Section_A_20_a_Employees?.[0]
                                ?.female_total_percent
                            : null}
                        </TableCell> */}
                        <TableCell align="center">
                          {row.label === "Permanent (D)"
                            ? `${
                                responseData?.Section_A_20_a_Employees?.[0]
                                  ?.female_permanent_percent ?? ""
                              }%`
                            : row.label === "Other than Permanent (E)"
                            ? `${
                                responseData?.Section_A_20_a_Employees?.[0]
                                  ?.female_non_permanent_percent ?? ""
                              }%`
                            : row.label === "Total employees (D + E)"
                            ? `${
                                responseData?.Section_A_20_a_Employees?.[0]
                                  ?.female_total_percent ?? ""
                              }%`
                            : null}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>

                  <TableBody>
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        style={{ fontWeight: "bold", textAlign: "center" }}
                      >
                        WORKERS
                      </TableCell>
                    </TableRow>
                    {rowssectionA20B.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell
                          style={{ fontWeight: row.bold ? "bold" : "normal" }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: row.bold ? "bold" : "normal" }}
                        >
                          {row.label}
                        </TableCell>
                        <TableCell align="center">
                          {row.label === "Permanent (F)"
                            ? responseData?.Section_A_20_a_Workers?.[0]
                                ?.total_permanent
                            : row.label === "Other than Permanent (G)"
                            ? responseData?.Section_A_20_a_Workers?.[0]
                                ?.total_non_permanent
                            : row.label === "Total employees (F + G)"
                            ? responseData?.Section_A_20_a_Workers?.[0]
                                ?.total_workers
                            : null}
                        </TableCell>
                        <TableCell align="center">
                          {row.label === "Permanent (F)"
                            ? responseData?.Section_A_20_a_Workers?.[0]
                                ?.male_permanent
                            : row.label === "Other than Permanent (G)"
                            ? responseData?.Section_A_20_a_Workers?.[0]
                                ?.male_non_permanent
                            : row.label === "Total employees (F + G)"
                            ? responseData?.Section_A_20_a_Workers?.[0]
                                ?.total_male
                            : null}
                        </TableCell>
                        {/* <TableCell align="center">
                          {row.label === "Permanent (F)"
                            ? responseData?.Section_A_20_a_Workers?.[0]
                                ?.male_permanent_percent
                            : row.label === "Other than Permanent (G)"
                            ? responseData?.Section_A_20_a_Workers?.[0]
                                ?.male_non_permanent_percent
                            : row.label === "Total employees (F + G)"
                            ? responseData?.Section_A_20_a_Workers?.[0]
                                ?.male_total_percent
                            : null}
                        </TableCell> */}
                        <TableCell align="center">
                          {row.label === "Permanent (F)"
                            ? `${
                                responseData?.Section_A_20_a_Workers?.[0]
                                  ?.male_permanent_percent ?? ""
                              }%`
                            : row.label === "Other than Permanent (G)"
                            ? `${
                                responseData?.Section_A_20_a_Workers?.[0]
                                  ?.male_non_permanent_percent ?? ""
                              }%`
                            : row.label === "Total employees (F + G)"
                            ? `${
                                responseData?.Section_A_20_a_Workers?.[0]
                                  ?.male_total_percent ?? ""
                              }%`
                            : null}
                        </TableCell>

                        <TableCell align="center">
                          {row.label === "Permanent (F)"
                            ? responseData?.Section_A_20_a_Workers?.[0]
                                ?.female_permanent
                            : row.label === "Other than Permanent (G)"
                            ? responseData?.Section_A_20_a_Workers?.[0]
                                ?.female_non_permanent
                            : row.label === "Total employees (F + G)"
                            ? responseData?.Section_A_20_a_Workers?.[0]
                                ?.total_female
                            : null}
                        </TableCell>
                        {/* <TableCell align="center">
                          {row.label === "Permanent (F)"
                            ? responseData?.Section_A_20_a_Workers?.[0]
                                ?.female_permanent_percent
                            : row.label === "Other than Permanent (G)"
                            ? responseData?.Section_A_20_a_Workers?.[0]
                                ?.female_non_permanent_percent
                            : row.label === "Total employees (F + G)"
                            ? responseData?.Section_A_20_a_Workers?.[0]
                                ?.female_total_percent
                            : null}
                        </TableCell> */}
                        <TableCell align="center">
                          {row.label === "Permanent (F)"
                            ? `${
                                responseData?.Section_A_20_a_Workers?.[0]
                                  ?.female_permanent_percent ?? ""
                              }%`
                            : row.label === "Other than Permanent (G)"
                            ? `${
                                responseData?.Section_A_20_a_Workers?.[0]
                                  ?.female_non_permanent_percent ?? ""
                              }%`
                            : row.label === "Total employees (F + G)"
                            ? `${
                                responseData?.Section_A_20_a_Workers?.[0]
                                  ?.female_total_percent ?? ""
                              }%`
                            : null}
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
              <div>b. Differently abled Employees and Workers:</div>
              <TableContainer component={Paper} style={{ margin: "10px" }}>
                <Table aria-label="differently abled table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bolder" }}>
                        S. No
                      </TableCell>
                      <TableCell style={{ fontWeight: "bolder" }}>
                        Particulars
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        Total (A)
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        colSpan={2}
                        align="center"
                      >
                        Male
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        colSpan={2}
                        align="center"
                      >
                        Female
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        No. (B)
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        % (B / A)
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        No. (C)
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        % (C / A)
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        style={{ fontWeight: "bold", textAlign: "center" }}
                      >
                        DIFFERENTLY ABLED EMPLOYEES
                      </TableCell>
                    </TableRow>
                    {rowssectionA20bA.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell
                          style={{ fontWeight: row.bold ? "bold" : "normal" }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: row.bold ? "bold" : "normal" }}
                        >
                          {row.label}
                        </TableCell>
                        <TableCell align="center">
                          {row.label === "Permanent (D)"
                            ? responseData
                                ?.Section_A_20_b_Diff_Abled_Employees?.[0]
                                ?.Total_Permanent
                            : row.label === "Other than Permanent (E)"
                            ? responseData
                                ?.Section_A_20_b_Diff_Abled_Employees?.[0]
                                ?.Total_Non_Permanent
                            : row.label === "Total employees (D + E)"
                            ? responseData
                                ?.Section_A_20_b_Diff_Abled_Employees?.[0]
                                ?.Total_Employees
                            : null}
                        </TableCell>
                        <TableCell align="center">
                          {row.label === "Permanent (D)"
                            ? responseData
                                ?.Section_A_20_b_Diff_Abled_Employees?.[0]
                                ?.Permanent_Male
                            : row.label === "Other than Permanent (E)"
                            ? responseData
                                ?.Section_A_20_b_Diff_Abled_Employees?.[0]
                                ?.Non_Permanent_Male
                            : row.label === "Total employees (D + E)"
                            ? responseData
                                ?.Section_A_20_b_Diff_Abled_Employees?.[0]
                                ?.Total_Male
                            : null}
                        </TableCell>
                        {/* <TableCell align="center">
                          {row.label === "Permanent (D)"
                            ? responseData
                                ?.Section_A_20_b_Diff_Abled_Employees?.[0]
                                ?.Permanent_Male_Percent
                            : row.label === "Other than Permanent (E)"
                            ? responseData
                                ?.Section_A_20_b_Diff_Abled_Employees?.[0]
                                ?.Non_Permanent_Male_Percent
                            : row.label === "Total employees (D + E)"
                            ? responseData
                                ?.Section_A_20_b_Diff_Abled_Employees?.[0]
                                ?.Total_Male_Percent
                            : null}
                        </TableCell> */}
                        <TableCell align="center">
                          {row.label === "Permanent (D)"
                            ? `${
                                responseData
                                  ?.Section_A_20_b_Diff_Abled_Employees?.[0]
                                  ?.Permanent_Male_Percent ?? ""
                              }%`
                            : row.label === "Other than Permanent (E)"
                            ? `${
                                responseData
                                  ?.Section_A_20_b_Diff_Abled_Employees?.[0]
                                  ?.Non_Permanent_Male_Percent ?? ""
                              }%`
                            : row.label === "Total employees (D + E)"
                            ? `${
                                responseData
                                  ?.Section_A_20_b_Diff_Abled_Employees?.[0]
                                  ?.Total_Male_Percent ?? ""
                              }%`
                            : null}
                        </TableCell>

                        <TableCell align="center">
                          {row.label === "Permanent (D)"
                            ? responseData
                                ?.Section_A_20_b_Diff_Abled_Employees?.[0]
                                ?.Permanent_Female
                            : row.label === "Other than Permanent (E)"
                            ? responseData
                                ?.Section_A_20_b_Diff_Abled_Employees?.[0]
                                ?.Non_Permanent_Female
                            : row.label === "Total employees (D + E)"
                            ? responseData
                                ?.Section_A_20_b_Diff_Abled_Employees?.[0]
                                ?.Total_Female
                            : null}
                        </TableCell>
                        {/* <TableCell align="center">
                          {row.label === "Permanent (D)"
                            ? responseData
                                ?.Section_A_20_b_Diff_Abled_Employees?.[0]
                                ?.Permanent_Female_Percent
                            : row.label === "Other than Permanent (E)"
                            ? responseData
                                ?.Section_A_20_b_Diff_Abled_Employees?.[0]
                                ?.Non_Permanent_Female_Percent
                            : row.label === "Total employees (D + E)"
                            ? responseData
                                ?.Section_A_20_b_Diff_Abled_Employees?.[0]
                                ?.Total_Female_Percent
                            : null}
                        </TableCell> */}
                        <TableCell align="center">
                          {row.label === "Permanent (D)"
                            ? `${
                                responseData
                                  ?.Section_A_20_b_Diff_Abled_Employees?.[0]
                                  ?.Permanent_Female_Percent ?? ""
                              }%`
                            : row.label === "Other than Permanent (E)"
                            ? `${
                                responseData
                                  ?.Section_A_20_b_Diff_Abled_Employees?.[0]
                                  ?.Non_Permanent_Female_Percent ?? ""
                              }%`
                            : row.label === "Total employees (D + E)"
                            ? `${
                                responseData
                                  ?.Section_A_20_b_Diff_Abled_Employees?.[0]
                                  ?.Total_Female_Percent ?? ""
                              }%`
                            : null}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        style={{ fontWeight: "bold", textAlign: "center" }}
                      >
                        DIFFERENTLY ABLED WORKERS
                      </TableCell>
                    </TableRow>
                    {rowssectionA20bB.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell
                          style={{ fontWeight: row.bold ? "bold" : "normal" }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: row.bold ? "bold" : "normal" }}
                        >
                          {row.label}
                        </TableCell>
                        <TableCell align="center">
                          {row.label === "Permanent (F)"
                            ? responseData
                                ?.Section_A_20_b_Diff_Abled_Workers?.[0]
                                ?.Total_Permanent
                            : row.label === "Other than Permanent (G)"
                            ? responseData
                                ?.Section_A_20_b_Diff_Abled_Workers?.[0]
                                ?.Total_Non_Permanent
                            : row.label === "Total employees (F + G)"
                            ? responseData
                                ?.Section_A_20_b_Diff_Abled_Workers?.[0]
                                ?.Total_Employees
                            : null}
                        </TableCell>
                        <TableCell align="center">
                          {row.label === "Permanent (F)"
                            ? responseData
                                ?.Section_A_20_b_Diff_Abled_Workers?.[0]
                                ?.Permanent_Male
                            : row.label === "Other than Permanent (G)"
                            ? responseData
                                ?.Section_A_20_b_Diff_Abled_Workers?.[0]
                                ?.Non_Permanent_Male
                            : row.label === "Total employees (F + G)"
                            ? responseData
                                ?.Section_A_20_b_Diff_Abled_Workers?.[0]
                                ?.Total_Male
                            : null}
                        </TableCell>
                        {/* <TableCell align="center">
                          {row.label === "Permanent (F)"
                            ? responseData
                                ?.Section_A_20_b_Diff_Abled_Workers?.[0]
                                ?.Permanent_Male_Percent
                            : row.label === "Other than Permanent (G)"
                            ? responseData
                                ?.Section_A_20_b_Diff_Abled_Workers?.[0]
                                ?.Non_Permanent_Male_Percent
                            : row.label === "Total employees (F + G)"
                            ? responseData
                                ?.Section_A_20_b_Diff_Abled_Workers?.[0]
                                ?.Total_Male_Percent
                            : null}
                        </TableCell> */}
                        <TableCell align="center">
                          {row.label === "Permanent (F)"
                            ? `${
                                responseData
                                  ?.Section_A_20_b_Diff_Abled_Workers?.[0]
                                  ?.Permanent_Male_Percent ?? ""
                              }%`
                            : row.label === "Other than Permanent (G)"
                            ? `${
                                responseData
                                  ?.Section_A_20_b_Diff_Abled_Workers?.[0]
                                  ?.Non_Permanent_Male_Percent ?? ""
                              }%`
                            : row.label === "Total employees (F + G)"
                            ? `${
                                responseData
                                  ?.Section_A_20_b_Diff_Abled_Workers?.[0]
                                  ?.Total_Male_Percent ?? ""
                              }%`
                            : null}
                        </TableCell>

                        <TableCell align="center">
                          {row.label === "Permanent (F)"
                            ? responseData
                                ?.Section_A_20_b_Diff_Abled_Workers?.[0]
                                ?.Permanent_Female
                            : row.label === "Other than Permanent (G)"
                            ? responseData
                                ?.Section_A_20_b_Diff_Abled_Workers?.[0]
                                ?.Non_Permanent_Female
                            : row.label === "Total employees (F + G)"
                            ? responseData
                                ?.Section_A_20_b_Diff_Abled_Workers?.[0]
                                ?.Total_Female
                            : null}
                        </TableCell>
                        {/* <TableCell align="center">
                          {row.label === "Permanent (F)"
                            ? responseData
                                ?.Section_A_20_b_Diff_Abled_Workers?.[0]
                                ?.Permanent_Female_Percent
                            : row.label === "Other than Permanent (G)"
                            ? responseData
                                ?.Section_A_20_b_Diff_Abled_Workers?.[0]
                                ?.Non_Permanent_Female_Percent
                            : row.label === "Total employees (F + G)"
                            ? responseData
                                ?.Section_A_20_b_Diff_Abled_Workers?.[0]
                                ?.Total_Female_Percent
                            : null}
                        </TableCell> */}
                        <TableCell align="center">
                          {row.label === "Permanent (F)"
                            ? `${
                                responseData
                                  ?.Section_A_20_b_Diff_Abled_Workers?.[0]
                                  ?.Permanent_Female_Percent ?? ""
                              }%`
                            : row.label === "Other than Permanent (G)"
                            ? `${
                                responseData
                                  ?.Section_A_20_b_Diff_Abled_Workers?.[0]
                                  ?.Non_Permanent_Female_Percent ?? ""
                              }%`
                            : row.label === "Total employees (F + G)"
                            ? `${
                                responseData
                                  ?.Section_A_20_b_Diff_Abled_Workers?.[0]
                                  ?.Total_Female_Percent ?? ""
                              }%`
                            : null}
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
              <div>21. Participation/Inclusion/Representation of women </div>

              {/* <TableContainer component={Paper} style={{ margin: "10px" }}>
                <Table aria-label="differently abled table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bolder" }}></TableCell>
                      <TableCell style={{ fontWeight: "bolder" }}>
                        Total (A)
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        colSpan={2}
                        align="center"
                      >
                        No. and percentage of Females
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell style={{ fontWeight: "bolder" }}>
                        No. (B)
                      </TableCell>
                      <TableCell style={{ fontWeight: "bolder" }}>
                        % (B / A)
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rowssectionA21.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell
                          style={{ fontWeight: row.bold ? "bold" : "normal" }}
                        >
                          {row.label}
                        </TableCell>
                        <TableCell align="center">
                          {row.label === "Board of Directors"
                            ? responseData?.Section_A_21_Management?.[0]
                                ?.Total_Board_of_Directors
                            : row.label === "Key Management Personnel"
                            ? responseData?.Section_A_21_Management?.[0]
                                ?.Total_Key_Management_Personnel
                            : null}
                        </TableCell>
                        <TableCell align="center">
                          {row.label === "Board of Directors"
                            ? responseData?.Section_A_21_Management?.[0]
                                ?.Board_of_Directors_Female
                            : row.label === "Key Management Personnel"
                            ? responseData?.Section_A_21_Management?.[0]
                                ?.Key_Management_Personnel_Female
                            : null}
                        </TableCell>
                        <TableCell align="center">
                          {row.label === "Board of Directors"
                            ? responseData?.Section_A_21_Management?.[0]
                                ?.Percent_Board_of_Directors_Females
                            : row.label === "Key Management Personnel"
                            ? responseData?.Section_A_21_Management?.[0]
                                ?.Percent_Key_Management_Personnel_Females
                            : null}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer> */}
              <TableContainer component={Paper} style={{ margin: "10px" }}>
                <Table aria-label="differently abled table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bolder" }}></TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        Total (A)
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        colSpan={2}
                        align="center"
                      >
                        No. and percentage of Females
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        No. (B)
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        % (B / A)
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rowssectionA21.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell
                          style={{ fontWeight: row.bold ? "bold" : "normal" }}
                        >
                          {row.label}
                        </TableCell>
                        <TableCell align="center">
                          {row.label === "Board of Directors"
                            ? responseData?.Section_A_21_Management?.[0]
                                ?.Total_Board_of_Directors
                            : row.label === "Key Management Personnel"
                            ? responseData?.Section_A_21_Management?.[0]
                                ?.Total_Key_Management_Personnel
                            : null}
                        </TableCell>
                        <TableCell align="center">
                          {row.label === "Board of Directors"
                            ? responseData?.Section_A_21_Management?.[0]
                                ?.Board_of_Directors_Female
                            : row.label === "Key Management Personnel"
                            ? responseData?.Section_A_21_Management?.[0]
                                ?.Key_Management_Personnel_Female
                            : null}
                        </TableCell>
                        <TableCell align="center">
                          {row.label === "Board of Directors"
                            ? responseData?.Section_A_21_Management?.[0]
                                ?.Percent_Board_of_Directors_Females
                              ? `${responseData.Section_A_21_Management[0].Percent_Board_of_Directors_Females}%`
                              : ""
                            : row.label === "Key Management Personnel"
                            ? responseData?.Section_A_21_Management?.[0]
                                ?.Percent_Key_Management_Personnel_Females !==
                              undefined
                              ? `${responseData.Section_A_21_Management[0].Percent_Key_Management_Personnel_Females}%`
                              : ""
                            : null}
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
              <div>
                22. Turnover rate for permanent employees and workers
                <br />
                (Disclose trends for the past 3 years)
              </div>
              <TableContainer component={Paper} style={{ margin: "10px" }}>
                <Table aria-label="turnover rate table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bolder" }}></TableCell>
                      <TableCell
                        align="center"
                        colSpan={3}
                        style={{ fontWeight: "bolder" }}
                      >
                        {financialYear}
                        <br />
                        (Turnover rate in current Financial Year)
                      </TableCell>
                      <TableCell
                        align="center"
                        colSpan={3}
                        style={{ fontWeight: "bolder" }}
                      >
                        {financialYear
                          ? `FY${
                              parseInt(financialYear?.slice(2, 6), 10) - 1
                            }-${parseInt(financialYear?.slice(2, 6), 10)}`
                          : ""}
                        <br />
                        (Turnover rate in Previous Financial Year)
                      </TableCell>
                      <TableCell
                        align="center"
                        colSpan={3}
                        style={{ fontWeight: "bolder" }}
                      >
                        {financialYear
                          ? `FY${
                              parseInt(financialYear?.slice(2, 6), 10) - 2
                            }-${parseInt(financialYear?.slice(2, 6), 10) - 1}`
                          : ""}
                        <br />
                        (Turnover rate in the year prior to the previous
                        Financial Year)
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        Male
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        Female
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        Total
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        Male
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        Female
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        Total
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        Male
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        Female
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        Total
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rowssectionA22?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell
                          style={{
                            fontWeight: row.bold ? "bold" : "normal",
                          }}
                        >
                          {row.label}
                        </TableCell>
                        {responseData[row.key]?.[0]?.map((item) => {
                          return <TableCell align="center">{item}</TableCell>;
                        })}
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
              <div>
                V. Holding, Subsidiary and Associate Companies (including joint
                ventures)
                <br />
                23. (a) Names of holding / subsidiary / associate companies /
                joint ventures
              </div>

              <TableContainer component={Paper} style={{ margin: "10px" }}>
                <Table aria-label="differently abled table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        S. No.
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        Name of the holding / subsidiary / associate companies /
                        joint ventures (A)
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        Indicate whether holding/ Subsidiary/ Associate/ Joint
                        Venture
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        % of shares held by listed entity
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        Does the entity indicated at column A, participate in
                        the Business Responsibility initiatives of the listed
                        entity? (Yes/No)
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {responseData?.Section_A_23 &&
                    responseData.Section_A_23.length > 0 ? (
                      responseData.Section_A_23.some(
                        (row) =>
                          row.Name_of_Holding !== "-" &&
                          row.Type_of_Holding !== "-" &&
                          row.Percent_of_Share_Held !== "-" &&
                          row.Participates_in_Business_Responsibility !== "-"
                      ) ? (
                        responseData.Section_A_23.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell
                              style={{
                                fontWeight: row.bold ? "bold" : "normal",
                              }}
                            >
                              {index + 1}
                            </TableCell>
                            <TableCell align="center">
                              {row.Name_of_Holding}
                            </TableCell>
                            <TableCell align="center">
                              {row.Type_of_Holding}
                            </TableCell>
                            <TableCell align="center">
                              {row.Percent_of_Share_Held
                                ? `${row.Percent_of_Share_Held}%`
                                : ""}
                            </TableCell>
                            <TableCell align="center">
                              {row.Participates_in_Business_Responsibility}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={1} align="center">
                            1
                          </TableCell>
                          <TableCell colSpan={5} align="left">
                            KPCL does not have any holding / subsidiary /
                            associate companies / joint ventures.
                          </TableCell>
                        </TableRow>
                      )
                    ) : null}
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
              VI. CSR Details <br />
              24. (i) Whether CSR is applicable as per section 135 of Companies
              Act, 2013: (Yes/No)
              <br />
              <div
                style={{
                  color: "black",
                  backgroundColor: "#e4f4ff",
                  border: "1px solid black",
                  padding: "10px",
                  wordWrap: "break-word",
                }}
              >
                {responseData?.Section_A_24_1 && (
                  <div>
                    {responseData?.Section_A_24_1?.map((item, index) => (
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
              (ii) Turnover (In Rs Cr.)
              <div
                style={{
                  color: "black",
                  backgroundColor: "#e4f4ff",
                  border: "1px solid black",
                  padding: "10px",
                  wordWrap: "break-word",
                }}
              >
                {responseData?.Section_A_24_2 && (
                  <div>
                    {responseData?.Section_A_24_2?.map((item, index) => (
                      <div key={index}>{item} ₹ </div>
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
              (iii) Net worth (In Rs Cr.)
              <div
                style={{
                  color: "black",
                  backgroundColor: "#e4f4ff",
                  border: "1px solid black",
                  padding: "10px",
                  wordWrap: "break-word",
                }}
              >
                {responseData?.Section_A_24_3 && (
                  <div>
                    {responseData?.Section_A_24_3?.map((item, index) => (
                      <div key={index}>{item} ₹</div>
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
              <div>
                VII. Transparency and Disclosures Compliances
                <br />
                25. Complaints/Grievances on any of the principles (Principles 1
                to 9) under the National Guidelines on Responsible Business
                Conduct:
                <br />
              </div>

              <TableContainer component={Paper} style={{ margin: "10px" }}>
                <Table aria-label="turnover rate table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bolder" }}>
                        Stakeholder group from whom complaint is received
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        Grievance Redressal Mechanism in Place (Yes/No) (If Yes,
                        then provide web-link for grievance redress policy){" "}
                      </TableCell>
                      <TableCell
                        align="center"
                        colSpan={3}
                        style={{ fontWeight: "bolder" }}
                      >
                        {financialYear}
                        <br />
                        (Turnover rate in current Financial Year)
                      </TableCell>
                      <TableCell
                        align="center"
                        colSpan={3}
                        style={{ fontWeight: "bolder" }}
                      >
                        {financialYear
                          ? `FY${
                              parseInt(financialYear.slice(2, 6), 10) - 1
                            }-${parseInt(financialYear.slice(2, 6), 10)}`
                          : ""}
                        <br />
                        (Turnover rate in Previous Financial Year)
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        Number of complaints filed during the year
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        Number of complaints pending resolution at close of the
                        year
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        Remarks
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        Number of complaints filed during the year
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        Number of complaints pending resolution at close of the
                        year
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        Remarks
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {rowssectionA25?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell
                          style={{
                            fontWeight: row.bold ? "bold" : "normal",
                          }}
                        >
                          {row.label}
                        </TableCell>
                        <TableCell align="center">
                          {responseData[row.key]?.[1]}
                        </TableCell>
                        <TableCell align="center">
                          {responseData[row.key]?.[0]}
                        </TableCell>
                        <TableCell align="center">
                          {responseData[row.key]?.[2]}
                        </TableCell>
                        <TableCell align="center">
                          {responseData[row.key]?.[3]}
                        </TableCell>
                        <TableCell align="center">
                          {responseData[row.key]?.[4]}
                        </TableCell>
                        <TableCell align="center">
                          {responseData[row.key]?.[5]}
                        </TableCell>
                        <TableCell align="center">
                          {responseData[row.key]?.[6]}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </FormControl>
          </Grid>
          <RemarkBox
            tableName="Transparency and Disclosures Compliances"
            tableKey="Transparency_and_Disclosures_Compliances"
            initialRemark={remarks["Transparency_and_Disclosures_Compliances"]}
            financialYear={financialYear}
            printMode={printMode}
            section={"SectionA"}
          />
          <Grid
            item
            xs={12}
            style={{ fontSize: "17px", marginTop: "20px" }}
            m={3}
            marginBottom={3}
          >
            <FormControl fullWidth>
              26. Overview of the entity’s material responsible business conduct
              issues
              <br />
              Please indicate material responsible business conduct and
              sustainability issues pertaining to environmental and social
              matters that present a risk or an opportunity to your business,
              rationale for identifying the same, approach to adapt or mitigate
              the risk along-with its financial implications, as per the
              following format
              <TableContainer component={Paper} style={{ margin: "10px" }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        S. No.
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Material issue identified
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Indicate whether risk or opportunity (R/O)
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Rationale for identifying the risk / opportunity
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        In case of risk, approach to adapt or mitigate
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Financial implications of the risk or opportunity
                        (Indicate positive or negative implications)
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  {responseData?.Section_A_26?.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="left">
                        {row.Material_Issue_Identified}
                      </TableCell>
                      <TableCell align="left">
                        {row.Risk_or_Opportunity}
                      </TableCell>
                      <TableCell align="left">
                        {row.Rationale_for_Identification}
                      </TableCell>
                      <TableCell align="left">
                        {row.Approach_to_Adapt_or_Mitigate}
                      </TableCell>
                      <TableCell align="left">
                        {row.Positive_and_Negative_Financial_Implications}
                      </TableCell>
                    </TableRow>
                  ))}
                </Table>
              </TableContainer>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      {showScrollToTop && <ScrollToTop />}
    </>
  );
}

export default SectionAReport;
