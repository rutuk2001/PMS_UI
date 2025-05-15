import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addSocietyDetailsDetail, viewSocietyDetailsDetail } from "../../../store/Community/Society/SocietyDetailsSlice";


const fieldConfig = [

  
  {
    id: "Describe1",
    label:
      " Describe the mechanisms to receive and redress grievances of the community.",
    minHeight: "60px",
    Model_Name_Society: "Grievances of the community",
    Heading: "Grievances",
  },
 
];


function DescribeMechanisms() {
  const dispatch = useDispatch();

  const { viewReport, error, success } = useSelector(
    (state) => state.SocietyDetailDetails
  );
console.log("object",viewReport)
  const [editMode, setEditMode] = useState(false);

  const [fieldValues, setFieldValues] = useState([]);

  const [hasData, setHasData] = useState(false);

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    dispatch(viewSocietyDetailsDetail());
  }, [dispatch]);

  useEffect(() => {
    if (viewReport && viewReport.data && viewReport.data.length > 0) {
      const initialFieldValues = viewReport.data.map(
        (item) => item.Description || ""
      );
      setFieldValues(initialFieldValues);
      setHasData(true); // Set to true if data is fetched and not empty
    } else {
      const initialFieldValues = Array.from(
        { length: fieldConfig.length },
        () => ""
      );
      setFieldValues(initialFieldValues);
      setHasData(false); // No data found
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
      const payload = fieldValues.map((value, index) => ({
        Model_Name_Society: fieldConfig[index].Model_Name_Society,
        Heading: fieldConfig[index].Heading,
        Description: value,
      }));

      if (hasData) {
        dispatch(addSocietyDetailsDetail(payload));
        toast.success("Data updated successfully.");
      } else {
        dispatch(addSocietyDetailsDetail(payload));
        toast.success("Data inserted successfully.");
        setHasData(true);
      }

      setEditMode(false);
      clearValidationErrors();
    } else {
    }
  };

  const handleTextFieldChange = (index, value) => {
    const newFieldValues = [...fieldValues];
    newFieldValues[index] = value;
    setFieldValues(newFieldValues);
    clearValidationError(index);
  };

  const validateFields = () => {
    const errors = {};
    let isValid = true;

    fieldValues.forEach((value, index) => {
      if (!value.trim()) {
        errors[index] = "This field id required";
        isValid = false;
      }
    });

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
          title=""
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
        {/* <CardContent>
          <Grid container direction="row" spacing={{ xs: 3, sm: 6 }}>
            <Grid item xs={12}>
              <Typography variant="body1" color="text.primary" sx={{ mb: 3 }}>
                Describe the mechanisms to receive and redress grievances of the
                community.
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
        </CardContent> */}
      </Card>
    </>
  );
}

export default DescribeMechanisms;
