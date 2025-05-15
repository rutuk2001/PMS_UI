import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Button,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addDetailsCorporateSocialResponsibilityDetail, viewDetailsCorporateSocialResponsibilityDetail } from "../../../store/Community/CorporateSocialResponsibility/DetailsCorporateSocialResponsibilitySlice";


const fieldConfig = [
 
  {
    id: "Describe1",
    label:
      "  From which marginalized /vulnerable groups do you procure?",
    minHeight: "80px",
    Model_Name_Corporate: "Marginalized",
    Heading: " Corporate Marginalized",
    Is_Verified: "No",
  },
  {
    id: "Describe2",
    label:
      " What percentage of total procurement (by value) does itconstitute?",
    minHeight: "80px",
    Model_Name_Corporate: "Procurement",
    Heading: "Corporate Procurement",
    Is_Verified: "No",
  },
  
  {
    id: "Describe3",
    label:
      "Do you have a preferential procurement policy where you give preference to purchase from suppliers comprising marginalized/vulnerable groups? (Yes/No) ",
    minHeight: "80px",
    Model_Name_Corporate: "Preferential Procurement",
    Heading: "Preferential",
    Is_Verified: "Yes",
  },
];

function Details() {


  const dispatch = useDispatch();
  const { viewReport, error, success } = useSelector(
    (state) => state.DetailsCorporateSocialResponsibilityDetails
  );
  const [editMode, setEditMode] = useState(false);
  const [fieldValues, setFieldValues] = useState([]);
  const [radioValues, setRadioValues] = useState({});
  const [hasData, setHasData] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [test, setTest] = useState("No");

  useEffect(() => {
    dispatch(viewDetailsCorporateSocialResponsibilityDetail());
  }, []);

  useEffect(() => {
    if (viewReport && viewReport.data && viewReport.data.length > 0) {
      const initialFieldValues = viewReport.data.map(
        (item) => item.Description || ""
      );

      const initialRadioValues = viewReport.data.reduce((acc, item) => {
        if (["Yes", "No"].includes(item.Description)) {
          acc[item.Model_Name_Corporate] = item.Description;
        }
        return acc;
      }, {});
      setFieldValues(initialFieldValues);
      setRadioValues(initialRadioValues);
      setHasData(true);
    } else {
      const initialFieldValues = Array.from(
        { length: fieldConfig.length },
        () => ""
      );
      setFieldValues(initialFieldValues);
      setRadioValues({});
      setHasData(false);
    }
  }, [viewReport, fieldConfig.length]);

  const editFieldButtonPolicies = () => {
    setEditMode(true);
  };

  const cancelFieldButtonPolicies = () => {
    setEditMode(false);
    clearValidationErrors();
  };

  const saveFieldButtonPolicies = () => {
    const isValid = validateFields();
    if (isValid) {
      const payload = fieldConfig
        .map((config, index) => {
          const fieldId = config.id;
          const textValue = fieldValues[index]; // Corresponding text value
          const radioValue = radioValues[config.Model_Name_Corporate]; // Corresponding radio value

          return {
            Model_Name_Corporate: config.Model_Name_Corporate,
            Heading: config.Heading,
            Description: radioValue || textValue || "",
            Is_Verified: config.Is_Verified, // Prioritize textValue, then radioValue
          };
        })
        .filter((item) => item.Description !== ""); // Filter out items with empty Descriptions

      if (hasData) {
        dispatch(addDetailsCorporateSocialResponsibilityDetail(payload));
        toast.success("Data updated successfully.");
      } else {
        dispatch(addDetailsCorporateSocialResponsibilityDetail(payload));
        toast.success("Data inserted successfully.");
        setHasData(true);
      }

      setEditMode(false);
      clearValidationErrors();
    }
  };

  const handleTextFieldChange = (index, value) => {
    const newFieldValues = [...fieldValues];
    newFieldValues[index] = value;
    setFieldValues(newFieldValues);
    clearValidationError(index);
  };

  const handleRadioChange = (field, value) => {
    setRadioValues((prevValues) => ({
      ...prevValues,
      [field.Model_Name_Corporate]: value,
    }));
    clearValidationError(field.id);
  };

  const validateFields = () => {
    const errors = {};
    let isValid = true;

    // Validate text fields
    fieldConfig.forEach((field, index) => {
      if (["Describe3"].includes(field.id)) {
        // Skip radio button fields
        return;
      }

      if (!fieldValues[index] || fieldValues[index].trim() === "") {
        errors[index] = "This field is required";
        isValid = false;
      } else {
        delete errors[index];
      }
    });

    console.log(errors);

    // Validate radio buttons
    fieldConfig.forEach((field) => {
      if (["Describe3"].includes(field.id)) {
        if (
          !radioValues[field.Model_Name_Corporate] ||
          (radioValues[field.Model_Name_Corporate] !== "Yes" &&
            radioValues[field.Model_Name_Corporate] !== "No")
        ) {
          errors[field.Model_Name_Corporate] = "Please select an option";
          isValid = false;
        } else {
          delete errors[field.Model_Name_Corporate];
        }
      }
    });

    // Set validation errors state
    setValidationErrors(errors);

    return isValid;
  };

  const clearValidationError = (index) => {
    const updatedErrors = { ...validationErrors };
    delete updatedErrors[index];
    setValidationErrors(updatedErrors);
  };

  const clearValidationErrors = () => {
    setValidationErrors({});
  };



  // const [editMode, setEditMode] = useState(false);
  // const [valuePpp, setValuePpp] = React.useState("yes");

  // const handlePppChange = (event) => {
  //   setValuePpp(event.target.value);
  // };

  // const editFieldButtonPolicies = () => {
  //   setEditMode(true);
  // };

  // const saveFieldButtonPolicies = () => {
  //   setEditMode(false);
  // };

  // const cancelFieldButtonPolicies = () => {
  //   setEditMode(false);
  // };

  return (
    <>
      <Card className="card" sx={{ height: "100%" }}>
        <CardHeader
          title="Details"
          sx={{ minHeight: "40px" }}
          action={
            !editMode && (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="button"
                onClick={editFieldButtonPolicies}
                sx={{ width: { xs: "100%", sm: 170 }, maxWidth: "100%" }}
              >
               {hasData ? "EDIT" : "ADD"}
              </Button>
            )
          }
        />
        <CardContent>
          {/* <Grid container direction="row" spacing={{ xs: 3, sm: 6 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" color="text.primary" sx={{ mb: 3 }}>
                From which marginalized /vulnerable groups do you procure?
              </Typography>
              <TextField
                fullWidth
                size="small"
                multiline
                rows={8}
                label="Type Here"
                id="Describe1"
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" color="text.primary" sx={{ mb: 3 }}>
                What percentage of total procurement (by value) does it
                constitute?
              </Typography>
              <TextField
                fullWidth
                size="small"
                multiline
                rows={8}
                label="Type Here"
                id="Describe2"
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>
                Do you have a preferential procurement policy where you give
                preference to purchase from suppliers comprising marginalized
                /vulnerable groups? (Yes/No)
              </Typography>
              <RadioGroup row name="yn-buttons">
                <FormControlLabel
                  value="yes"
                  control={<Radio sx={{ p: 0, mr: 2, color: "#A4A4A4" }} />}
                  label="Yes"
                  disabled={!editMode}
                  sx={{ ml: 0, mr: { xs: 4, md: 6 } }}
                  checked={valuePpp === "yes"}
                  onChange={handlePppChange}
                />
                <FormControlLabel
                  value="no"
                  control={<Radio sx={{ p: 0, mr: 2, color: "#A4A4A4" }} />}
                  label="No"
                  disabled={!editMode}
                  sx={{ ml: 0 }}
                  checked={valuePpp === "no"}
                  onChange={handlePppChange}
                />
              </RadioGroup>
            </Grid>
            {editMode && (
              <Grid item xs={12}>
                <Grid container direction="row" spacing={{ xs: 3, sm: 6 }}>
                  <Grid item xs={12} sm="auto">
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={saveFieldButtonPolicies}
                      sx={{ width: { xs: "100%", sm: 188 }, maxWidth: "100%" }}
                    >
                      SAVE CHANGES
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm="auto">
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      onClick={cancelFieldButtonPolicies}
                      sx={{ width: { xs: "100%", sm: 188 }, maxWidth: "100%" }}
                    >
                      CANCEL
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid> */}
              <Grid container direction="row" spacing={{ xs: 3, sm: 6 }}>
          {fieldConfig.map((field, index) => (
            <Grid item xs={12} md={6} key={field.id}>
              <Typography
                variant="body1"
                color="text.primary"
                sx={{ mb: 4, minHeight: field.minHeight, color: "green" }}
              >
                {field.label}
              </Typography>
              {["Describe3"].includes(field.id) ? (
                <RadioGroup
                  row
                  name={field.Model_Name_Corporate}
                  value={radioValues[field.Model_Name_Corporate] || ""}
                  onChange={(e) => handleRadioChange(field, e.target.value)}
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio sx={{ p: 0, mr: 2, color: "#A4A4A4" }} />}
                    label="Yes"
                    sx={{ ml: 0, mr: { xs: 4, md: 6 } }}
                    disabled={!editMode}
                  />
                  <FormControlLabel
                    value="No"
                    control={<Radio sx={{ p: 0, mr: 2, color: "#A4A4A4" }} />}
                    label="No"
                    sx={{ ml: 0 }}
                    disabled={!editMode}
                  />
                  
                </RadioGroup>
              ) : (
                <TextField
                  fullWidth
                  size="small"
                  multiline
                  rows={8}
                  value={fieldValues[index]}
                  error={validationErrors[index] ? true : false}
                  helperText={validationErrors[index]}
                  disabled={!editMode}
                  onChange={(e) => handleTextFieldChange(index, e.target.value)}
                />
              )}
            </Grid>
          ))}
          {editMode && (
            <Grid item xs={12}>
              <Grid container direction="row" spacing={{ xs: 3, sm: 6 }}>
                <Grid item xs={12} sm="auto">
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={saveFieldButtonPolicies}
                    sx={{ width: { xs: "100%", sm: 188 }, maxWidth: "100%" }}
                  >
                    SAVE CHANGES
                  </Button>
                </Grid>
                <Grid item xs={12} sm="auto">
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={cancelFieldButtonPolicies}
                    sx={{ width: { xs: "100%", sm: 188 }, maxWidth: "100%" }}
                  >
                    CANCEL
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default Details;
