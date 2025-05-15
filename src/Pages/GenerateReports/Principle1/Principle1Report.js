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
  SectionCP1ReportAPi,
  clearSuccessMessage,
} from "../../../store/GenerateReports/GenerateReportsSlice";
import ScrollToTop from "../../../Components/ScrollToTop";
import { toast } from "react-toastify";
import RemarkBox from "../../../Components/RemarkBox";
import { processTextWithLinksCombined } from "../../../utils/linkAccessibility";

function Principle1Report({
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
        printWindow.document.write("<html><head><title>REPORT P1</title>");
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
          '<div class="footer footerPrint">Annual Integrated P1 Report</div>'
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
  const { viewReport } = useSelector((state) => state.Principle6SliceDetails);

  const { error } = useSelector((state) => state.GenerateReportsDetails);

  const [financialYear, setFinancialYear] = useState(null);
  const handleFinancialYearChange = (event, value) => {
    setFinancialYear(value);
  };
  const [responseData, setResponseData] = useState(
    viewReport?.Section_C_P1 || {}
  );

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
    if (error) {
      toast.error(error);
      dispatch(clearSuccessMessage());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (remarksSuccess && section === "Principle1") {
      toast.success(remarksSuccess);
      dispatch(clearMessage());
    }
  }, [remarksSuccess]);

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
      SectionCP1ReportAPi({ financial_year: financialYear || overAllReportFY })
    )
      .then((result) => {
        if (isSubscribed) {
          setResponseData(result.payload.Section_C_P1 || "");
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

  const rowssectionC1 = [
    { label: "Board of Directors", key: "Principle_1_E1_1_BOD" },
    { label: "Key Managerial Personnel", key: "Principle_1_E1_1_KMP" },
    {
      label: "Employees other than BoD and KMPs",
      key: "Principle_1_E1_1_Emp",
    },
    { label: "Workers ", key: "Principle_1_E1_1_Workers" },
  ];

  const rowssectionC2A = [
    { label: "Penalty/ Fine", key: "Principle_1_E1_2_PD" },
    { label: "Settlement", key: "Principle_1_E1_2_SE" },
    { label: "Compounding fee", key: "Principle_1_E1_2_CF" },
  ];
  const rowssectionC2B = [
    { label: "Imprisonment", key: "Principle_1_E1_2_IMPLS" },
    { label: "Punishment", key: "Principle_1_E1_2_PUNISH" },
  ];

  const rowssectionC5 = [
    { label: "Directors", key: "Principle_1_E1_5_Directors" },
    { label: "KMPs", key: "Principle_1_E1_5_KMPs" },
    { label: "Employees", key: "Principle_1_E1_5_Employees" },
    { label: "Workers ", key: "Principle_1_E1_5_Workers" },
  ];

  const rowssectionC6 = [
    {
      label:
        "Number of complaints received in relation to issues of Conflict of Interest of the Directors",
      key: "Principle_1_EI_6_Directors",
    },
    {
      label:
        "Number of complaints received in relation to issues of Conflict of Interest of the KMPs",
      key: "Principle_1_EI_6_KMPs",
    },
  ];

  const rowssectionC8 = [
    { label: "Number of days of accounts payables ", key: "Principle_1_E1_8" },
  ];

  const rowssectionC9 = [
    {
      incident: "Concentration of Purchases",
      categories: [
        "a. Purchases from trading houses as % of total purchases",
        "b. Number of trading houses where purchases are made from",
        "c. Purchases from top 10 trading houses as % of total purchases from trading houses",
      ],
    },
    {
      incident: "Concentration of Sales",
      categories: [
        "a. Sales to dealers / distributors as % of total sales",
        "b. Number of dealers / distributors to whom sales are made",
        "c. Sales to top 10 dealers / distributors as % of total sales to dealers / distributors ",
      ],
    },
    {
      incident: "Share of RPTs in",
      categories: [
        "a. Purchases (Purchases with related parties / Total Purchases) ",
        "b. Sales (Sales to related parties / Total Sales) ",
        "c. Loans & advances (Loans & advances given to related parties / Total loans & advances) ",
        "d. Investments ( Investments in related parties / Total Investments made) ",
      ],
    },
  ];

  const dataMapping = {
    "Concentration of Purchases": [
      "Principle_1_E1_9_Purchases_a",
      "Principle_1_E1_9_Purchases_b",
      "Principle_1_E1_9_Purchases_c",
    ],
    "Concentration of Sales": [
      "Principle_1_E1_9_Sales_a",
      "Principle_1_E1_9_Sales_b",
      "Principle_1_E1_9_Sales_c",
    ],
    "Share of RPTs in": [
      "Principle_1_E1_9_RPTs_a",
      "Principle_1_E1_9_RPTs_b",
      "Principle_1_E1_9_RPTs_c",
      "Principle_1_E1_9_RPTs_d",
    ],
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
        <h2>
          PRINCIPLE 1: Businesses should conduct and govern themselves with
          integrity, and in a manner that is Ethical, Transparent and
          Accountable.
        </h2>
        <Grid item xs={12} m={3}>
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
              1. Percentage coverage by training and awareness programmes on any
              of the Principles during the financial year:
              <TableContainer component={Paper} style={{ margin: "10px" }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" style={{ fontWeight: "bolder" }}>
                        S. No.
                      </TableCell>
                      <TableCell align="left" style={{ fontWeight: "bolder" }}>
                        Segment
                      </TableCell>
                      <TableCell align="left" style={{ fontWeight: "bolder" }}>
                        Total number of training and awareness programmes held
                      </TableCell>
                      <TableCell align="left" style={{ fontWeight: "bolder" }}>
                        Topics / principles covered under the training
                      </TableCell>
                      <TableCell align="left" style={{ fontWeight: "bolder" }}>
                        %age of persons in respective category covered by the
                        awareness programmes
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {rowssectionC1?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell align="left">{index + 1}</TableCell>
                        <TableCell
                          style={{ fontWeight: row.bold ? "bold" : "normal" }}
                        >
                          {row.label}
                        </TableCell>
                        <TableCell align="left">
                          {responseData[row.key]?.[0]}
                        </TableCell>
                        <TableCell align="left">
                          {processTextWithLinksCombined(
                            responseData[row.key]?.[1]
                          )}
                        </TableCell>
                        {/* <TableCell align="center">
                            {responseData[row.key]?.[2]}
                          </TableCell> */}
                        <TableCell align="left">
                          {responseData[row.key]?.[2]
                            ? `${responseData[row.key][2]}%`
                            : ""}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </FormControl>
          </Grid>
          <RemarkBox
            tableName={`Percentage coverage by training and awareness programmes on any of the Principles during the financial year`}
            tableKey="Awareness_Programmes_On_ESG"
            initialRemark={remarks["Awareness_Programmes_On_ESG"]}
            financialYear={financialYear}
            printMode={printMode}
            overAllPrintMode={overAllPrintMode}
            section={"Principle1"}
          />
          <Grid
            item
            xs={12}
            style={{ fontSize: "17px", marginTop: "20px" }}
            m={3}
            marginBottom={3}
          >
            <FormControl fullWidth>
              2. Details of fines / penalties /punishment/ award/ compounding
              fees/ settlement amount paid in proceedings (by the entity or by
              directors / KMPs) with regulators/ law enforcement agencies/
              judicial institutions, in the financial year, in the following
              format (Note: the entity shall make disclosures on the basis of
              materiality as specified in Regulation 30 of SEBI (Listing
              Obligations and Disclosure Obligations) Regulations, 2015 and as
              disclosed on the entity’s website):{" "}
              <TableContainer component={Paper} style={{ margin: "10px" }}>
                <Table aria-label="monetary table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        colSpan={6}
                        align="center"
                      >
                        Monetary
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        NGRBC Principle
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Name of the regulatory/enforcement agencies/judicial
                        institutions
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Amount (In INR)
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Brief of the Case
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Has an appeal been preferred? (Yes/No)
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {rowssectionC2A?.map((row, index) => (
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

                        <TableCell align="center">
                          {responseData[row.key]?.[3]}
                        </TableCell>
                        <TableCell align="center">
                          {responseData[row.key]?.[4]}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Table aria-label="non-monetary table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        colSpan={6}
                        align="center"
                      >
                        Non-Monetary
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        NGRBC Principle
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Name of the regulatory/enforcement agencies/judicial
                        institutions
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Brief of the Case
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Has an appeal been preferred? (Yes/No)
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {rowssectionC2B?.map((row, index) => (
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
                        <TableCell align="center">
                          {responseData[row.key]?.[3]}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Additional Sections */}
              {/* Map other sections similarly if needed, for example, Section_C_Principle_1_E1_5, Section_C_Principle_1_E1_6, etc. */}
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
              3. Of the instances disclosed in Question 2 above, details of the
              Appeal/ Revision preferred in cases where monetary or non-monetary
              action has been appealed.
              <TableContainer component={Paper} style={{ margin: "10px" }}>
                <Table aria-label="differently abled table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bolder" }}>
                        Case Details
                      </TableCell>
                      <TableCell style={{ fontWeight: "bolder" }}>
                        Name of the regulatory/ enforcement agencies/ judicial
                        institutions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {responseData?.Principle_1_E1_3?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{row.Case_Details}</TableCell>
                        <TableCell align="center">
                          {row.Name_of_Agencies}
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
              4. Does the entity have an anti-corruption or anti-bribery policy?
              If yes, provide details in brief and if available, provide a
              web-link to the policy.
              <div
                style={{
                  color: "black",
                  backgroundColor: "#e4f4ff",
                  border: "1px solid black",
                  padding: "10px",
                  wordWrap: "break-word",
                }}
              >
                {responseData?.Principle_1_E1_4 && (
                  <div>
                    {responseData?.Principle_1_E1_4?.map((item, index) => (
                      <div key={index}>
                        {processTextWithLinksCombined(item)}
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
              5. Number of Directors/KMPs/employees/workers against whom
              disciplinary action was taken by any law enforcement agency for
              the charges of bribery/ corruption:
              <TableContainer component={Paper} style={{ margin: "10px" }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>

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
                    {rowssectionC5?.map((row, index) => (
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
              6. Details of complaints with regard to conflict of interest
              <TableContainer component={Paper} style={{ margin: "10px" }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell
                        align="center"
                        colSpan={2}
                        style={{ fontWeight: "bolder" }}
                      >
                        {financialYear}
                        <br />
                        (Current Financial Year)
                      </TableCell>
                      <TableCell
                        align="center"
                        colSpan={2}
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
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell
                        style={{ fontWeight: "bolder" }}
                        align="center"
                      >
                        Number
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
                        Number
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
                    {rowssectionC6?.map((row, index) => (
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
                        <TableCell align="center">
                          {responseData[row.key]?.[3]}
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
              7. Provide details of any corrective action taken or underway on
              issues related to fines / penalties / action taken by regulators/
              law enforcement agencies/ judicial institutions, on cases of
              corruption and conflicts of interest.
              <div
                style={{
                  color: "black",
                  backgroundColor: "#e4f4ff",
                  border: "1px solid black",
                  padding: "10px",
                  wordWrap: "break-word",
                }}
              >
                {responseData?.Principle_1_E1_7 && (
                  <div>
                    {responseData?.Principle_1_E1_7?.map((item, index) => (
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
              8. Number of days of accounts payables ((Accounts payable *365) /
              Cost of goods/services procured) in the following format:
              <TableContainer component={Paper} style={{ margin: "10px" }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
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
                    {rowssectionC8?.map((row, index) => (
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
                <br />
                9. Open-ness of business Provide details of concentration of
                purchases and sales with trading houses, dealers, and related
                parties along-with loans and advances & investments, with
                related parties, in the following format:
              </div>
              <br />
              {/* <Table aria-label="safety incidents table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bolder" }}>
                        Parameter{" "}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bolder" }}
                      >
                        Metrics
                      </TableCell>
                      <TableCell
                        align="center"
                        colSpan={2}
                        style={{ fontWeight: "bolder" }}
                      >
                        {financialYear}
                        <br />
                        (Current Financial Year)
                      </TableCell>
                      <TableCell
                        align="center"
                        colSpan={2}
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
                    {rowssectionC9.map((row, index) => (
                      <React.Fragment key={index}>
                        {row.categories.map((category, catIndex) => (
                          <TableRow key={`${index}-${catIndex}`}>
                            {catIndex === 0 && (
                              <TableCell
                                rowSpan={row.categories.length}
                                style={
                                  {
                                    // fontWeight: row.bold ? "bold" : "normal",
                                    // backgroundColor: index === 0 ? "#E6F3FF" : "inherit"
                                  }
                                }
                              >
                                {row.incident}
                              </TableCell>
                            )}
                            <TableCell>{category}</TableCell>
                            <TableCell align="center">
                              {
                                responseData[
                                  `EI1_B_${index}_${catIndex}_current_1`
                                ]
                              }
                            </TableCell>
                            <TableCell align="center">
                              {
                                responseData[
                                  `EI1_B_${index}_${catIndex}_current_2`
                                ]
                              }
                            </TableCell>
                            <TableCell align="center">
                              {
                                responseData[
                                  `EI1_B_${index}_${catIndex}_previous_1`
                                ]
                              }
                            </TableCell>
                            <TableCell align="center">
                              {
                                responseData[
                                  `EI1_B_${index}_${catIndex}_previous_2`
                                ]
                              }
                            </TableCell>
                          </TableRow>
                        ))}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table> */}
              {/* <Table aria-label="safety incidents table">
  <TableHead>
    <TableRow>
      <TableCell style={{ fontWeight: "bolder" }}>Parameter</TableCell>
      <TableCell align="center" style={{ fontWeight: "bolder" }}>Metrics</TableCell>
      <TableCell align="center" colSpan={2} style={{ fontWeight: "bolder" }}>
        {financialYear}
        <br />(Current Financial Year)
      </TableCell>
      <TableCell align="center" colSpan={2} style={{ fontWeight: "bolder" }}>
        {financialYear ? `FY${parseInt(financialYear.slice(2, 6), 10) - 1}-${parseInt(financialYear.slice(2, 6), 10)}` : ""}
        <br />(Previous Financial Year)
      </TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {rowssectionC9.map((row, index) => (
      <React.Fragment key={index}>
        {row.categories.map((category, catIndex) => {
          const dataKey = dataMapping[row.incident]?.[catIndex];
          const values = dataKey && responseData[dataKey] ? responseData[dataKey] : ["-", "-"];
          
          return (
            <TableRow key={`${index}-${catIndex}`}>
              {catIndex === 0 && (
                <TableCell rowSpan={row.categories.length}>
                  {row.incident}
                </TableCell>
              )}
              <TableCell>{category}</TableCell>
              <TableCell align="center">{values[0]}</TableCell>
              <TableCell align="center">{values[1]}</TableCell>
              <TableCell align="center">{values[0]}</TableCell>
              <TableCell align="center">{values[1]}</TableCell>
            </TableRow>
          );
        })}
      </React.Fragment>
    ))}
  </TableBody>
</Table> */}

              <Table aria-label="safety incidents table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bolder" }}>
                      Parameter
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bolder" }}>
                      Metrics
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
                  {rowssectionC9.map((row, index) => (
                    <React.Fragment key={index}>
                      {row.categories.map((category, catIndex) => {
                        // Get the data key from the mapping
                        const dataKey = dataMapping[row.incident]?.[catIndex];
                        // Safely access the values array or default to ["-", "-"]
                        const values =
                          dataKey && responseData[dataKey]
                            ? responseData[dataKey]
                            : ["-", "-"];

                        return (
                          <TableRow key={`${index}-${catIndex}`}>
                            {catIndex === 0 && (
                              <TableCell rowSpan={row.categories.length}>
                                {row.incident}
                              </TableCell>
                            )}
                            <TableCell>{category}</TableCell>
                            <TableCell align="center">
                              {values[0]}
                            </TableCell>{" "}
                            {/* Current Year */}
                            <TableCell align="center">
                              {values[1]}
                            </TableCell>{" "}
                            {/* Previous Year */}
                          </TableRow>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </FormControl>
          </Grid>
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
              1. Awareness programmes conducted for value chain partners on any
              of the Principles during the financial year:
              <br />
              <TableContainer component={Paper} style={{ margin: "10px" }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" style={{ fontWeight: "bolder" }}>
                        Total number of awareness programmes held
                      </TableCell>
                      <TableCell align="left" style={{ fontWeight: "bolder" }}>
                        Topics / principles covered under the training
                      </TableCell>
                      <TableCell align="left" style={{ fontWeight: "bolder" }}>
                        %age of value chain partners covered (by value of
                        business done with such partners) under the awareness
                        programmes
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableRow>
                      {responseData?.Principle_1_LI_1 && (
                        <>
                          <TableCell>{`Customer, Dealer Personnel,
Supplier Training: ${responseData?.Principle_1_LI_1?.[0]} training
programmes (4258 man-days) were
conducted in FY 2024`}</TableCell>
                          <TableCell>
                            {responseData?.Principle_1_LI_1?.[1]}
                          </TableCell>
                          <TableCell>{`KPCL has a dedicated Customer Training Centre.
The Company is also putting in place mechanism
to capture the value chain coverage accounting
for ${responseData?.Principle_1_LI_1?.[2]}% of business value.`}</TableCell>
                        </>
                      )}
                    </TableRow>
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
              2. Does the entity have processes in place to avoid/ manage
              conflict of interests involving members of the Board? (Yes/No) If
              Yes, provide details of the same.
              <div
                style={{
                  color: "black",
                  backgroundColor: "#e4f4ff",
                  border: "1px solid black",
                  padding: "10px",
                  wordWrap: "break-word",
                }}
              >
                {responseData?.Principle_1_LI_2 && (
                  <div>
                    {responseData?.Principle_1_LI_2?.map((item, index) => (
                      <div key={index}>{item}</div>
                    ))}
                  </div>
                )}
              </div>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      {showScrollToTop && <ScrollToTop />}
    </>
  );
}

export default Principle1Report;
