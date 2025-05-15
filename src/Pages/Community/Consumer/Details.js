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
  FormHelperText,
  FormControl,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import {
  addConsumerDetailsDetail,
  viewConsumerDetailsDetail,
} from "../../../store/Community/Consumer/ConsumerDetailsSlice";

const fieldConfig = [
  {
    id: "Describe1",
    label:
      " Describe the mechanisms in place to receive and respond to consumer complaints and feedback",
    minHeight: "80px",
    Model_Name_Consumer: "Describe the mechanisms",
    Heading: "Mechnisms",
    Is_Verified: "No",
  },
  {
    id: "Describe2",
    label:
      " Provide details of any corrective actions taken or underway on  issues relating to advertising, and delivery of essential services; cyber security and data privacy of customers; re-occurrence of instances of product recalls; penalty / action  taken by regulatory authorities on safety of products /services.",
    minHeight: "80px",
    Model_Name_Consumer: "Details of any corrective actions",
    Heading: "Corrective Actions",
    Is_Verified: "No",
  },
  {
    id: "Describe3",
    label:
      "Channels / platforms where information on products and services of the entity can be accessed (provide web link, if available).",
    minHeight: "80px",
    Model_Name_Consumer: "Information on Products",
    Heading: "Information",
    Is_Verified: "No",
  },
  {
    id: "Describe4",
    label:
      " Does the entity have a framework/ policy on cyber security and risks related to data privacy? (Yes/No) If available, provide a web-link of the policy.",
    minHeight: "80px",
    Model_Name_Consumer: "Data privacy",
    Heading: "Data",
    Is_Verified: "Yes",
  },
  {
    id: "Describe5",
    label:
      "Does the entity display product information on the product over and above what is mandated as per local laws? (Yes/No/Not Applicable) If yes, provide details in brief ",
    minHeight: "40px",
    Model_Name_Consumer: "Display Product Information",
    Heading: "Display",
    Is_Verified: "Yes",
  },

  {
    id: "Describe6",
    label:
      " Do you have a preferential procurement policy where you give preference to purchase from suppliers comprising marginalized /vulnerable groups? (Yes/No)",
    minHeight: "40px",
    Model_Name_Consumer: "Vulnerable Groups",
    Heading: "Vulnerable",
    Is_Verified: "Yes",
  },
  {
    id: "Describe7",
    label:
      "Did your entity carry out any survey with regard to consumer satisfaction relating to the major products / services of the entity, significant locations of operation of the entity or the entity as a whole? (Yes/No)",
    minHeight: "80px",
    Model_Name_Consumer: "Survey",
    Heading: "Data Survey",
    Is_Verified: "Yes",
  },
  {
    id: "Describe8",
    label:
      " Steps taken to inform and educate consumers about safe and responsible usage of products and/or services",
    minHeight: "80px",
    Model_Name_Consumer: "Inform and Educate Consumers",
    Heading: "Consumers",
    Is_Verified: "No",
  },
  {
    id: "Describe9",
    label:
      "   Mechanisms in place to inform consumers of any risk of disruption/discontinuation of essential services.",
    minHeight: "80px",
    Model_Name_Consumer: "Discontinuation of Essential Services",
    Heading: "Services",
    Is_Verified: "No",
  },
];

function Details() {
  const dispatch = useDispatch();
  const { viewReport, error, success } = useSelector(
    (state) => state.ConsumerDetailsDetails
  );
  const [editMode, setEditMode] = useState(false);
  const [fieldValues, setFieldValues] = useState([]);
  const [radioValues, setRadioValues] = useState({});
  const [hasData, setHasData] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [test, setTest] = useState("No");

  useEffect(() => {
    dispatch(viewConsumerDetailsDetail());
  }, []);

  useEffect(() => {
    if (viewReport && viewReport.data && viewReport.data.length > 0) {
      const initialFieldValues = viewReport.data.map((item) => {
        return item.Description_consumer !== "No" ? item.Description_consumer || "" : "";
      });
      
      const initialRadioValues = viewReport.data.reduce((acc, item) => {
        if (item.Description_consumer === "No") {
          acc[item.Model_Name_Consumer] = "No";
        }else{
          acc[item.Model_Name_Consumer] = "Yes";
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
          let textValue = fieldValues[index]; // Corresponding text value
          let radioValue = radioValues[config.Model_Name_Consumer]; // Corresponding radio value
          // if(radioValue === "Yes" && config.Model_Name_Consumer === "Vulnerable Groups"){
          //   textValue = "Yes";
          // }
          return {
            Model_Name_Consumer: config.Model_Name_Consumer,
            Heading: config.Heading,
            Description_consumer: radioValue === "No" && config.Is_Verified === "Yes" ? radioValue : textValue,
            Is_Verified: config.Is_Verified,
          };
        })
        .filter((item) => item.Description !== ""); // Filter out items with empty Descriptions

      if (hasData) {
        dispatch(addConsumerDetailsDetail(payload));
        toast.success("Data updated successfully.");
      } else {
        dispatch(addConsumerDetailsDetail(payload));
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
    // if(value === "No"){
    //   setFieldValues((prevState) => ({
    //    ...prevState,
    //     [field.Model_Name_Consumer]: "",
    //   }));
    // }
    setRadioValues((prevValues) => ({
      ...prevValues,
      [field.Model_Name_Consumer]: value,
    }));
    setValidationErrors((prevErrors)=>({
      ...prevErrors,
      [field.Model_Name_Consumer]: "",
    }))
    // clearValidationError(field.id);
  };

  const validateFields = () => {
    const errors = {};
    let isValid = true;

    fieldConfig.forEach((field, index) => {
      if([
        "Describe4",
        "Describe5",
        "Describe6",
        "Describe7",
      ].includes(field.id)){
        const description = fieldValues[index] || "";
      if (radioValues[field.Model_Name_Consumer] === "Yes" && description.trim() === "") {
        errors[index] = "Description is mandatory when 'Yes' is selected.";
        isValid = false;
      }
      }
    });

    // Validate text fields
    fieldConfig.forEach((field, index) => {
      if([
        "Describe1",
        "Describe2",
        "Describe3",
        "Describe8",
        "Describe9",
      ].includes(field.id)){
        if (!fieldValues[index] || fieldValues[index].trim() === "") {
          errors[index] = "This field is required";
          isValid = false;
        } else {
          delete errors[index];
        }
      }
    });

    
    // Validate radio buttons
    fieldConfig.forEach((field) => {
      if (
        ["Describe4", "Describe5", "Describe6", "Describe7"].includes(field.id)
      ) {
        if (
          !radioValues[field.Model_Name_Consumer] ||
          (radioValues[field.Model_Name_Consumer] !== "Yes" &&
            radioValues[field.Model_Name_Consumer] !== "No")
        ) {
          errors[field.Model_Name_Consumer] = "Please select an option";
          isValid = false;
        } else {
          delete errors[field.Model_Name_Consumer];
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
                {["Describe4", "Describe5", "Describe6", "Describe7"].includes(
                  field.id
                ) ? (
                  <>
                  <FormControl sx={{ m: 3 }} error={validationErrors[field.Model_Name_Consumer]} variant="standard">
                    <RadioGroup
                      row
                      name={field.Model_Name_Consumer}
                      value={radioValues[field.Model_Name_Consumer] || ""}
                      onChange={(e) => handleRadioChange(field, e.target.value)}
                      
                    >
                      <FormControlLabel
                        value="Yes"
                        control={
                          <Radio sx={{ p: 0, mr: 2, color: "#A4A4A4" }} />
                        }
                        label="Yes"
                        sx={{ ml: 0, mr: { xs: 4, md: 6 } }}
                        disabled={!editMode}
                      />
                      <FormControlLabel
                        value="No"
                        control={
                          <Radio sx={{ p: 0, mr: 2, color: "#A4A4A4" }} />
                        }
                        label="No"
                        sx={{ ml: 0 }}
                        disabled={!editMode}
                      />
                    </RadioGroup>
                    <FormHelperText>{validationErrors[field.Model_Name_Consumer]}</FormHelperText>
                    </FormControl>
                    {["Describe4", "Describe5","Describe6","Describe7"].includes(field.id) &&
                      radioValues[field.Model_Name_Consumer] === "Yes" && (
                        <TextField
                          fullWidth
                          size="small"
                          multiline
                          rows={8}
                          value={fieldValues[index]}
                          error={validationErrors[index] ? true : false}
                          helperText={validationErrors[index]}
                          disabled={!editMode}
                          onChange={(e) =>
                            handleTextFieldChange(index, e.target.value)
                          }
                          sx={{ mt: 2 }} // Add margin top to separate from radio buttons
                        />
                      )}
                  </>
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
                    onChange={(e) =>
                      handleTextFieldChange(index, e.target.value)
                    }
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