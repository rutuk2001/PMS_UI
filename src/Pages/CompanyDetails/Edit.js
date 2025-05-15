import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Breadcrumbs,
  Card,
  CardContent,
  Link,
  Grid,
  Typography,
  TextField,
  Autocomplete,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  IconButton,
  Avatar,
  Checkbox,
} from "@mui/material";
import CompanyProfile from "./../../assets/images/company-profile.png";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";

import {
  addCompanyProfileDetail,
  clearErrorMessage,
  clearSuccessMessage,
  corporatelistofCitiesDetail,
  corporatelistofCountriesDetail,
  corporatelistofStatesDetail,
  editCompanyProfileDetail,
  registerlistofCitiesDetail,
  registerlistofCountriesDetail,
  registerlistofStatesDetail,
  viewReportingBoundaryList,
  viewTypeofAssurancesList,
} from "../../store/CompanyDetails/EditCompanyProfile/EditCompanyProfileSlice";
import { toast } from "react-toastify";

import config from "../../config";
const Phone_Ext = ["91", "376", "971", "43", "020"];
const BASE_URL = config.apiUrl;

function EditCompanyDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [companyProfile, setCompanyProfile] = useState({});
  const [file, setFile] = useState();
  const location = useLocation();
  const { action } = location?.state || {};
  const [copyAddress, setCopyAddress] = useState(false);
  const [isDefaultFile, setIsDefaultFile] = useState(false);

  const {
    viewRegisterCountriesDetail,
    viewRegisterStatesDetail,
    viewRegisterCitiesDetail,
    viewCorporateCountriesDetail,
    viewCorporateStatesDetail,
    viewCorporateCitiesDetail,
    typeofAssurancesList,
    reportingBoundaryList,
    viewBoundaryList,
    ViewTypeAssurance,
    success,
    error,
    viewCompanyProfile,
  } = useSelector((state) => state.EditCompanyProfileSliceDetails);

  const [formData, setFormData] = useState({
    Company_Name: "",
    CIN: "",
    Year_of_Incorporation: "",
    Registered_Office_Address_Line1: "",
    Registered_Office_Address_Line2: "",
    Registered_Office_Country: "",
    Registered_Office_State: "",
    Registered_Office_City: "",
    Registered_Office_Pincode: "",
    Corporate_Office_Address_Line1: "",
    Corporate_Office_Address_Line2: "",
    Corporate_Office_Country: "",
    Corporate_Office_State: "",
    Corporate_Office_City: "",
    Corporate_Office_Pincode: "",
    Email: "",
    Website: "",
    Phone_Ext: "",
    Phone_Number: "",
    Shares_Listed_On: "",
    CSR_Applicable: "",
    Reporting_Boundary: "",
    Name_of_Assurance_Provider: "",
    Type_Of_Assurance: "",
  });

  useEffect(() => {
    dispatch(viewTypeofAssurancesList());
    dispatch(viewReportingBoundaryList());
  }, [dispatch]);

  useEffect(() => {
    if (viewCompanyProfile) {
      setCompanyProfile(viewCompanyProfile[0]);
      setFile(viewCompanyProfile[0]?.Company_logo);
      setFormData({
        ...formData,
        Company_Name: viewCompanyProfile[0]?.Company_Name || "",
        CIN: viewCompanyProfile[0]?.CIN || "",
        Year_of_Incorporation:
          viewCompanyProfile[0]?.Year_of_Incorporation || "",
        Registered_Office_Address_Line1:
          viewCompanyProfile[0]?.Registered_Office_Address_Line1 || "",
        Registered_Office_Address_Line2:
          viewCompanyProfile[0]?.Registered_Office_Address_Line2 || "",
        Registered_Office_Country:
          viewCompanyProfile[0]?.Registered_Office_Country || "",
        Registered_Office_State:
          viewCompanyProfile[0]?.Registered_Office_State || "",
        Registered_Office_City:
          viewCompanyProfile[0]?.Registered_Office_City || "",
        Registered_Office_Pincode:
          viewCompanyProfile[0]?.Registered_Office_Pincode || "",
        Corporate_Office_Address_Line1:
          viewCompanyProfile[0]?.Corporate_Office_Address_Line1 || "",
        Corporate_Office_Address_Line2:
          viewCompanyProfile[0]?.Corporate_Office_Address_Line2 || "",
        Corporate_Office_Country:
          viewCompanyProfile[0]?.Corporate_Office_Country || "",
        Corporate_Office_State:
          viewCompanyProfile[0]?.Corporate_Office_State || "",
        Corporate_Office_City:
          viewCompanyProfile[0]?.Corporate_Office_City || "",
        Corporate_Office_Pincode:
          viewCompanyProfile[0]?.Corporate_Office_Pincode || "",
        Email: viewCompanyProfile[0]?.Email || "",
        Website: viewCompanyProfile[0]?.Website || "",
        Phone_Ext: viewCompanyProfile[0]?.Phone_Ext || "",
        Phone_Number: viewCompanyProfile[0]?.Phone_Number || "",
        Shares_Listed_On: viewCompanyProfile[0]?.Shares_Listed_On || "",
        CSR_Applicable: viewCompanyProfile[0]?.CSR_Applicable || "",
        Reporting_Boundary: viewCompanyProfile[0]?.Reporting_Boundary || "",
        Type_Of_Assurance: viewCompanyProfile[0]?.Type_Of_Assurance || "",
        Name_of_Assurance_Provider:
          viewCompanyProfile[0]?.Name_of_Assurance_Provider || "",
      });
    }
  }, [viewCompanyProfile]);

  const validateForm = (fieldName) => {
    const requiredFields = [
      "Company_Name",
      "CIN",
      "Year_of_Incorporation",
      "Registered_Office_Address_Line1",
      "Registered_Office_Address_Line2",
      "Registered_Office_Country",
      "Registered_Office_State",
      "Registered_Office_City",
      "Registered_Office_Pincode",
      "Corporate_Office_Address_Line1",
      "Corporate_Office_Address_Line2",
      "Corporate_Office_Country",
      "Corporate_Office_State",
      "Corporate_Office_City",
      "Corporate_Office_Pincode",
      "Email",
      "Website",
      "Phone_Ext",
      "Phone_Number",
      "Shares_Listed_On",
      "CSR_Applicable",
      "Reporting_Boundary",
      "Type_Of_Assurance",
      "Name_of_Assurance_Provider",
    ];
    const errors = {};

    // Check for required fields
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = "This field is required";
      }
    });

    // Validate Phone_Number (basic validation for digits only)
    if (formData["Phone_Number"] && !/^\d+$/.test(formData["Phone_Number"])) {
      errors["Phone_Number"] = "Phone Number must contain only digits";
    }

    setValidationErrors(errors);

    if (fieldName) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
    }

    return Object.keys(errors).length === 0;
  };

  const resetData = () => {
    setFormData((prevData) => ({
      ...prevData,
      Company_Name: "",
      CIN: "",
      Year_of_Incorporation: "",
      Registered_Office_Address_Line1: "",
      Registered_Office_Address_Line2: "",
      Registered_Office_Country: "",
      Registered_Office_State: "",
      Registered_Office_City: "",
      Registered_Office_Pincode: "",
      Corporate_Office_Address_Line1: "",
      Corporate_Office_Address_Line2: "",
      Corporate_Office_Country: "",
      Corporate_Office_State: "",
      Corporate_Office_City: "",
      Corporate_Office_Pincode: "",
      Email: "",
      Website: "",
      Phone_Ext: "",
      Phone_Number: "",
      Shares_Listed_On: "",
      CSR_Applicable: "",
      Reporting_Boundary: "",
      Name_of_Assurance_Provider: "",
      Type_Of_Assurance: "",
    }));
    setFile();
    setValidationErrors({});
  };
  useEffect(() => {
    dispatch(registerlistofCountriesDetail());
    dispatch(corporatelistofCountriesDetail());
  }, [dispatch]);

  useEffect(() => {
    if (formData.Registered_Office_Country) {
      dispatch(registerlistofStatesDetail(formData.Registered_Office_Country));
    }
  }, [formData.Registered_Office_Country, dispatch, setFormData]);

  useEffect(() => {
    if (formData.Registered_Office_State) {
      dispatch(registerlistofCitiesDetail(formData.Registered_Office_State));
    }
  }, [formData.Registered_Office_State, dispatch, setFormData]);

  useEffect(() => {
    if (formData.Corporate_Office_Country) {
      dispatch(corporatelistofStatesDetail(formData.Corporate_Office_Country));
    }
  }, [formData.Corporate_Office_Country, dispatch, setFormData]);

  useEffect(() => {
    if (formData.Corporate_Office_State) {
      dispatch(corporatelistofCitiesDetail(formData.Corporate_Office_State));
    }
  }, [formData.Corporate_Office_State, dispatch, setFormData]);

  useEffect(() => {
    if (formData.Reporting_Boundary) {
      dispatch(viewReportingBoundaryList(formData.Reporting_Boundary));
    }
  }, [formData.Reporting_Boundary, dispatch, setFormData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Define the validation errors object to store any new validation errors
    const newValidationErrors = { ...validationErrors };

    // Validation for Website
    if (name === "Website") {
      const urlRegex = new RegExp(
        "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
      );
      const isValidUrl = urlRegex.test(value);
      newValidationErrors[name] = isValidUrl ? "" : "Enter a valid URL";
    }

    // Validation for Email
    if (name === "Email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(value);
      newValidationErrors[name] = isValidEmail ? "" : "Enter a valid email";
    }

    // Clear validation error for other fields
    if (name !== "Website" && name !== "Email") {
      newValidationErrors[name] = "";
    }

    // Update the form data and validation errors state
    setFormData((prevData) => {
      if (name === "Registered_Office_Country" && !value) {
        return {
          ...prevData,
          [name]: value,
          Registered_Office_State: "",
          Registered_Office_City: "",
        };
      }
      if (name === "Corporate_Office_Country" && !value) {
        return {
          ...prevData,
          [name]: value,
          Corporate_Office_State: "",
          Corporate_Office_City: "",
        };
      }

      return {
        ...prevData,
        [name]: value,
      };
    });

    setValidationErrors(newValidationErrors);
  };

  const [validationError, setValidationError] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 800 * 1024) {
        setFileError("File size exceeds 800KB limit.");
      } else {
        setFile(file);
        setFileError("");
        setIsDefaultFile(false);
      }
    }
  };

  const handleUseDefault = () => {
    setFile(null);
    setFileError("");
    setIsDefaultFile(true);
  };

  const handleCopyAddress = (e) => {
    e.preventDefault();
    const { checked } = e.target;
    setCopyAddress(checked);
    if (checked) {
      setFormData({
        ...formData,
        Corporate_Office_Address_Line1:
          formData.Registered_Office_Address_Line1,
        Corporate_Office_Address_Line2:
          formData.Registered_Office_Address_Line2,
        Corporate_Office_Country: formData.Registered_Office_Country,
        Corporate_Office_State: formData.Registered_Office_State,
        Corporate_Office_City: formData.Registered_Office_City,
        Corporate_Office_Pincode: formData.Registered_Office_Pincode,
      });
    } else if (!checked) {
      setFormData({
        ...formData,
        Corporate_Office_Address_Line1: "",
        Corporate_Office_Address_Line2: "",
        Corporate_Office_Country: "",
        Corporate_Office_State: "",
        Corporate_Office_City: "",
        Corporate_Office_Pincode: "",
      });
    }
  };

  const renderAvatar = () => {
    if (file) {
      return (
        <Avatar
          alt="Uploaded Image"
          src={
            typeof file == "string"
              ? `${BASE_URL}${file}`
              : URL.createObjectURL(file)
          }
          sx={{
            width: 150,
            height: 150,
            boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
          }}
          variant="rounded"
        />
      );
    } else {
      return (
        <Avatar
          alt="Default Image"
          src={CompanyProfile} // Replace with your default image path
          sx={{
            width: 150,
            height: 150,
            boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
          }}
          variant="rounded"
        />
      );
    }
  };

  async function convertStaticFileToUploadableFile(filePath, fileName) {
    try {
      // Fetch the file from the static directory
      const response = await fetch(filePath);

      // Check if the response is okay
      if (!response.ok) {
        throw new Error(`Failed to fetch the file from ${filePath}`);
      }

      // Convert the response to a blob
      const blob = await response.blob();

      // Create a new File object from the blob
      const file = new File([blob], fileName, { type: blob.type });

      return file;
    } catch (error) {
      console.error(
        "Error while converting static file to uploadable file:",
        error
      );
      return null;
    }
  }

  const handleSaveChanges = async (event) => {
    if (!validateForm()) {
      setValidationError("All fields are required.");
      return;
    }

    let convertedfile;
    const fileName = "company-profile.png";
    if (isDefaultFile) {
      convertedfile = await convertStaticFileToUploadableFile(
        CompanyProfile,
        fileName
      );
    }

    const formdata = new FormData();
    for (let key in formData) {
      formdata.append(key, formData[key]);
    }
    if (typeof file !== "string") {
      if (isDefaultFile && convertedfile) {
        formdata.append("Company_logo", convertedfile);
      } else {
        formdata.append("Company_logo", file);
      }
    }

    if (action === "add") {
      dispatch(addCompanyProfileDetail(formdata));
    } else if (action === "edit") {
      dispatch(
        editCompanyProfileDetail({
          Company_Name: formData.Company_Name,
          data: formdata,
        })
      );
    }

    resetData();

    navigate("edit-company-profile");
  };

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

  const handleBackCompanyProfile = () => {
    resetData();
  };

  const cancelCompanyProfile = () => {
    React.startTransition(() => {
      navigate("/company-profile");
    });
  };

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: { xs: 4, md: 6 } }}>
        <Link underline="hover" color="inherit" href="/company-profile">
          Company Profile
        </Link>
        <Typography>Edit Company Profile</Typography>
      </Breadcrumbs>
      <Card className="card">
        <CardContent sx={{ p: { xs: 4, md: 6 } }}>
          <Grid container direction="row" spacing={{ xs: 3, md: 6 }}>
            <Grid item xs={12}>
              <Grid
                container
                direction="row"
                spacing={{ xs: 3, md: 6 }}
                alignItems="center"
              >
                <Grid item xs="auto">
                  {renderAvatar()}
                </Grid>
                <Grid item xs>
                  <Grid
                    container
                    direction="row"
                    spacing={{ xs: 2, sm: 5 }}
                    sx={{ position: "relative" }}
                  >
                    <Grid item xs={12} sm="auto">
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        component="label"
                        htmlFor="upload-photo"
                        sx={{ width: "218px", maxWidth: "100%" }}
                      >
                        UPLOAD NEW PHOTO
                        <input
                          id="upload-photo"
                          type="file"
                          accept=".png, .jpg, .jpeg"
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                        />
                      </Button>
                      {fileError && (
                        <Typography variant="body2" color="error">
                          {fileError}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm="auto">
                      <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={handleUseDefault}
                        sx={{ width: "218px", maxWidth: "100%" }}
                      >
                        USE DEFAULT
                      </Button>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm="auto"
                      padding={"20px"}
                      sx={{
                        position: "absolute",
                        left: "auto",
                        top: "-24px",
                        right: "-15px",
                        padding: "0px",
                      }}
                    >
                      <IconButton
                        className="MuiIconButton-close"
                        aria-label="close"
                        onClick={cancelCompanyProfile}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        Allowed PNG or JPEG. Max size of 800K.
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="row" spacing={{ xs: 3, md: 6 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Name of the Company"
                    id="Company_Name"
                    name="Company_Name"
                    value={formData.Company_Name}
                    onChange={handleInputChange}
                    error={!!validationErrors.Company_Name}
                    helperText={validationErrors.Company_Name}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Corporate Identity Number"
                    id="CIN"
                    name="CIN"
                    value={formData.CIN}
                    onChange={handleInputChange}
                    error={!!validationErrors.CIN}
                    helperText={validationErrors.CIN}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    label="Year of Incorporation"
                    id="Year_of_Incorporation"
                    name="Year_of_Incorporation"
                    value={formData.Year_of_Incorporation}
                    onChange={handleInputChange}
                    error={!!validationErrors.Year_of_Incorporation}
                    helperText={validationErrors.Year_of_Incorporation}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={copyAddress}
                        color="primary"
                        onChange={handleCopyAddress}
                      />
                    }
                    label="Copy Registered Office Address to Corporate Office Address"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container direction="row" spacing={{ xs: 3, md: 6 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Registered Office Address Line 1"
                    id="Registered_Office_Address_Line1"
                    name="Registered_Office_Address_Line1"
                    value={formData.Registered_Office_Address_Line1}
                    onChange={handleInputChange}
                    error={!!validationErrors.Registered_Office_Address_Line1}
                    helperText={
                      validationErrors.Registered_Office_Address_Line1
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Registered Office Address Line 2"
                    id="Registered_Office_Address_Line2"
                    name="Registered_Office_Address_Line2"
                    value={formData.Registered_Office_Address_Line2}
                    onChange={handleInputChange}
                    error={!!validationErrors.Registered_Office_Address_Line2}
                    helperText={
                      validationErrors.Registered_Office_Address_Line2
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} xl={4}>
                  <Autocomplete
                    size="small"
                    fullWidth
                    id="Registered_Office_Country"
                    name="Registered_Office_Country"
                    value={formData.Registered_Office_Country}
                    options={
                      viewRegisterCountriesDetail.length > 0
                        ? viewRegisterCountriesDetail
                        : []
                    }
                    onChange={(event, value) => {
                      handleInputChange({
                        target: { name: "Registered_Office_Country", value },
                      });
                      setValidationErrors((prevErrors) => ({
                        ...prevErrors,
                        Registered_Office_Country: "",
                      }));
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Country"
                        error={!!validationErrors.Registered_Office_Country}
                        helperText={validationErrors.Registered_Office_Country}
                        onChange={(e) => {
                          handleInputChange({
                            target: {
                              name: "Registered_Office_Country",
                              value: e.target.value,
                            },
                          });
                          setValidationErrors((prevErrors) => ({
                            ...prevErrors,
                            Registered_Office_Country: "",
                          }));
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} xl={4}>
                  <Autocomplete
                    size="small"
                    fullWidth
                    id="Registered_Office_State"
                    name="Registered_Office_State"
                    value={formData.Registered_Office_State}
                    options={
                      viewRegisterStatesDetail.length > 0
                        ? viewRegisterStatesDetail
                        : []
                    }
                    onChange={(event, value) => {
                      handleInputChange({
                        target: { name: "Registered_Office_State", value },
                      });
                      setValidationErrors((prevErrors) => ({
                        ...prevErrors,
                        Registered_Office_State: "",
                      }));
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="State"
                        error={!!validationErrors.Registered_Office_State}
                        helperText={validationErrors.Registered_Office_State}
                        onChange={(e) => {
                          handleInputChange({
                            target: {
                              name: "Registered_Office_State",
                              value: e.target.value,
                            },
                          });
                          setValidationErrors((prevErrors) => ({
                            ...prevErrors,
                            Registered_Office_State: "",
                          }));
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} xl={4}>
                  <Autocomplete
                    size="small"
                    fullWidth
                    id="Registered_Office_City"
                    name="Registered_Office_City"
                    value={formData.Registered_Office_City}
                    options={
                      viewRegisterCitiesDetail.length > 0
                        ? viewRegisterCitiesDetail
                        : []
                    }
                    onChange={(event, value) => {
                      handleInputChange({
                        target: { name: "Registered_Office_City", value },
                      });
                      setValidationErrors((prevErrors) => ({
                        ...prevErrors,
                        Registered_Office_City: "",
                      }));
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="City"
                        error={!!validationErrors.Registered_Office_City}
                        helperText={validationErrors.Registered_Office_City}
                        onChange={(e) => {
                          handleInputChange({
                            target: {
                              name: "Registered_Office_City",
                              value: e.target.value,
                            },
                          });
                          setValidationErrors((prevErrors) => ({
                            ...prevErrors,
                            Registered_Office_City: "",
                          }));
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} xl={4}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Pincode"
                    type="number"
                    id="Registered_Office_Pincode"
                    name="Registered_Office_Pincode"
                    value={formData.Registered_Office_Pincode}
                    onChange={handleInputChange}
                    error={!!validationErrors.Registered_Office_Pincode}
                    helperText={validationErrors.Registered_Office_Pincode}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container direction="row" spacing={{ xs: 3, md: 6 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Corporate Office Address Line 1"
                    id="Corporate_Office_Address_Line1"
                    name="Corporate_Office_Address_Line1"
                    value={formData.Corporate_Office_Address_Line1}
                    onChange={handleInputChange}
                    error={!!validationErrors.Corporate_Office_Address_Line1}
                    helperText={validationErrors.Corporate_Office_Address_Line1}
                    disabled={copyAddress}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Corporate Office Address Line 2"
                    id="Corporate_Office_Address_Line2"
                    name="Corporate_Office_Address_Line2"
                    value={formData.Corporate_Office_Address_Line2}
                    onChange={handleInputChange}
                    error={!!validationErrors.Corporate_Office_Address_Line2}
                    helperText={validationErrors.Corporate_Office_Address_Line2}
                    disabled={copyAddress}
                  />
                </Grid>
                <Grid item xs={12} sm={6} xl={4}>
                  <Autocomplete
                    size="small"
                    fullWidth
                    id="Corporate_Office_Country"
                    name="Corporate_Office_Country"
                    value={formData.Corporate_Office_Country}
                    options={
                      viewCorporateCountriesDetail.length > 0
                        ? viewCorporateCountriesDetail
                        : []
                    }
                    onChange={(event, value) => {
                      handleInputChange({
                        target: { name: "Corporate_Office_Country", value },
                      });
                      setValidationErrors((prevErrors) => ({
                        ...prevErrors,
                        Corporate_Office_Country: "",
                      }));
                    }}
                    disabled={copyAddress}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Country"
                        error={!!validationErrors.Corporate_Office_Country}
                        helperText={validationErrors.Corporate_Office_Country}
                        onChange={(e) => {
                          handleInputChange({
                            target: {
                              name: "Corporate_Office_Country",
                              value: e.target.value,
                            },
                          });
                          setValidationErrors((prevErrors) => ({
                            ...prevErrors,
                            Corporate_Office_Country: "",
                          }));
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} xl={4}>
                  <Autocomplete
                    size="small"
                    fullWidth
                    id="Corporate_Office_State"
                    name="Corporate_Office_State"
                    value={formData.Corporate_Office_State}
                    options={
                      viewCorporateStatesDetail.length > 0
                        ? viewCorporateStatesDetail
                        : []
                    }
                    onChange={(event, value) => {
                      handleInputChange({
                        target: { name: "Corporate_Office_State", value },
                      });
                      setValidationErrors((prevErrors) => ({
                        ...prevErrors,
                        Corporate_Office_State: "",
                      }));
                    }}
                    disabled={copyAddress}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="State"
                        error={!!validationErrors.Corporate_Office_State}
                        helperText={validationErrors.Corporate_Office_State}
                        onChange={(e) => {
                          handleInputChange({
                            target: {
                              name: "Corporate_Office_State",
                              value: e.target.value,
                            },
                          });
                          setValidationErrors((prevErrors) => ({
                            ...prevErrors,
                            Corporate_Office_State: "",
                          }));
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} xl={4}>
                  <Autocomplete
                    size="small"
                    fullWidth
                    id="Corporate_Office_City"
                    name="Corporate_Office_City"
                    value={formData.Corporate_Office_City}
                    options={
                      viewCorporateCitiesDetail.length > 0
                        ? viewCorporateCitiesDetail
                        : []
                    }
                    onChange={(event, value) => {
                      handleInputChange({
                        target: { name: "Corporate_Office_City", value },
                      });
                      setValidationErrors((prevErrors) => ({
                        ...prevErrors,
                        Corporate_Office_City: "",
                      }));
                    }}
                    disabled={copyAddress}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="City"
                        error={!!validationErrors.Corporate_Office_City}
                        helperText={validationErrors.Corporate_Office_City}
                        onChange={(e) => {
                          handleInputChange({
                            target: {
                              name: "Corporate_Office_City",
                              value: e.target.value,
                            },
                          });
                          setValidationErrors((prevErrors) => ({
                            ...prevErrors,
                            Corporate_Office_City: "",
                          }));
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} xl={4}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Pincode"
                    type="number"
                    id="Corporate_Office_Pincode"
                    name="Corporate_Office_Pincode"
                    value={formData.Corporate_Office_Pincode}
                    onChange={handleInputChange}
                    error={!!validationErrors.Corporate_Office_Pincode}
                    helperText={validationErrors.Corporate_Office_Pincode}
                    disabled={copyAddress}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="row" spacing={{ xs: 3, md: 6 }}>
                <Grid item xs={12} md={6} xl={4}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Email"
                    id="Email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleInputChange}
                    error={!!validationErrors.Email}
                    helperText={validationErrors.Email}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Website"
                    id="Website"
                    name="Website"
                    value={formData.Website}
                    onChange={handleInputChange}
                    error={!!validationErrors.Website}
                    helperText={validationErrors.Website}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <Grid container direction="row" spacing={{ xs: 3, md: 6 }}>
                    <Grid item xs={12} sm={5} xl={4}>
                      <Autocomplete
                        size="small"
                        fullWidth
                        id="Phone_Ext"
                        name="Phone_Ext"
                        value={formData.Phone_Ext}
                        options={Phone_Ext}
                        onChange={(event, value) => {
                          handleInputChange({
                            target: { name: "Phone_Ext", value },
                          });
                          setValidationErrors((prevErrors) => ({
                            ...prevErrors,
                            Phone_Ext: "",
                          }));
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Phone Ext"
                            type="number"
                            error={!!validationErrors.Phone_Ext}
                            helperText={validationErrors.Phone_Ext}
                            onChange={(e) => {
                              handleInputChange({
                                target: {
                                  name: "Phone_Ext",
                                  value: e.target.value,
                                },
                              });
                              setValidationErrors((prevErrors) => ({
                                ...prevErrors,
                                Phone_Ext: "",
                              }));
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={7} xl={8}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Phone Number"
                        id="Phone_Number"
                        name="Phone_Number"
                        value={formData.Phone_Number}
                        onChange={handleInputChange}
                        error={!!validationErrors.Phone_Number}
                        helperText={validationErrors.Phone_Number}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Shares Listed on"
                    id="Shares_Listed_On"
                    name="Shares_Listed_On"
                    value={formData.Shares_Listed_On}
                    onChange={handleInputChange}
                    error={!!validationErrors.Shares_Listed_On}
                    helperText={validationErrors.Shares_Listed_On}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography variant="body1" color="text.primary">
                    CSR Applicable as per Section 135 of Company Act, 2013
                  </Typography>
                  <RadioGroup
                    row
                    name="CSR_Applicable"
                    id="CSR_Applicable"
                    value={formData.CSR_Applicable}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel
                      value="Applicable"
                      control={<Radio sx={{ color: "#A4A4A4" }} />}
                      label="Applicable"
                      sx={{ mr: { xs: 4, md: 6 } }}
                    />
                    <FormControlLabel
                      value="Not Applicable"
                      control={<Radio sx={{ color: "#A4A4A4" }} />}
                      label="Not Applicable"
                    />
                    {validationErrors.CSR_Applicable && (
                      <div style={{ color: "red" }}>
                        {validationErrors.CSR_Applicable}
                      </div>
                    )}
                  </RadioGroup>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="row" spacing={{ xs: 3, md: 6 }}>
                <Grid item xs={12} md={6} xl={4}>
                  <Autocomplete
                    size="small"
                    fullWidth
                    id="Reporting_Boundary"
                    name="Reporting_Boundary"
                    value={formData.Reporting_Boundary}
                    options={viewBoundaryList}
                    getOptionLabel={(option) => option.label || option}
                    onChange={(event, value) => {
                      handleInputChange({
                        target: {
                          name: "Reporting_Boundary",
                          value: value || "",
                        },
                      });
                      setValidationErrors((prevErrors) => ({
                        ...prevErrors,
                        Reporting_Boundary: "",
                      }));
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Reporting Boundary"
                        error={!!validationErrors.Reporting_Boundary}
                        helperText={validationErrors.Reporting_Boundary}
                        onChange={(e) => {
                          handleInputChange({
                            target: {
                              name: "Reporting_Boundary",
                              value: e.target.value,
                            },
                          });
                          setValidationErrors((prevErrors) => ({
                            ...prevErrors,
                            Reporting_Boundary: "",
                          }));
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={5} xl={4}>
                  <Autocomplete
                    size="small"
                    fullWidth
                    id="Type_Of_Assurance"
                    name="Type_Of_Assurance"
                    value={formData.Type_Of_Assurance}
                    options={ViewTypeAssurance}
                    onChange={(event, value) => {
                      handleInputChange({
                        target: { name: "Type_Of_Assurance", value },
                      });
                      setValidationErrors((prevErrors) => ({
                        ...prevErrors,
                        Type_Of_Assurance: "",
                      }));
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Type of assurance obtained"
                        error={!!validationErrors.Type_Of_Assurance}
                        helperText={validationErrors.Type_Of_Assurance}
                        onChange={(event, value) => {
                          handleInputChange({
                            target: {
                              name: "Type_Of_Assurance",
                              value: value || "",
                            },
                          });
                          setValidationErrors((prevErrors) => ({
                            ...prevErrors,
                            Type_Of_Assurance: "",
                          }));
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6} xl={4}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Name of Assurance Provider"
                    id="Name_of_Assurance_Provider"
                    name="Name_of_Assurance_Provider"
                    value={formData.Name_of_Assurance_Provider}
                    onChange={handleInputChange}
                    error={!!validationErrors.Name_of_Assurance_Provider}
                    helperText={validationErrors.Name_of_Assurance_Provider}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="row" spacing={{ xs: 3, md: 6 }}>
                <Grid item xs={12} sm="auto">
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ width: "180px", maxWidth: "100%" }}
                    onClick={handleSaveChanges}
                  >
                    SAVE CHANGES
                  </Button>
                </Grid>
                <Grid item xs={12} sm="auto">
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={handleBackCompanyProfile}
                    sx={{ width: "180px", maxWidth: "100%" }}
                  >
                    CANCEL
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default EditCompanyDetails;
