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
import {
  addEditStackHolderDetail,
  viewStackHolderDetail,
} from "../../../store/Community/stakeholder/stackHolderSlice";
import { toast } from "react-toastify";

const fieldConfig = [
  {
    id: "Describe1",
    label:
      "Describe the processes for identifying key stakeholder groups of the entity.",
    minHeight: "40px",
    Model_Name_Stakeholder: "Stakeholder Groups",
    Heading: "Stakeholder Group",
  },
  {
    id: "Describe2",
    label:
      "Provide details of instances of engagement with, and actions taken to, address the concerns of vulnerable/ marginalized stakeholder groups.",
    minHeight: "40px",
    Model_Name_Stakeholder: "Marginalized Stakeholder Groups",
    Heading: "Marginalized Groups",
  },
  {
    id: "Describe3",
    label:
      "Whether stakeholder consultation is used to support the identification and management of environmental, and social topics (Yes / No). If so, provide details of instances as to how the inputs received from stakeholders on these topics were incorporated into policies and activities of the entity.",
    minHeight: "40px",
    Model_Name_Stakeholder: "Stakeholder Consultation",
    Heading: "Consultation",
  },
  {
    id: "Describe4",
    label:
      "Provide the processes for consultation between stakeholders and the Board on economic, environmental, and social topics or if consultation is delegated, how is feedback from such consultations provided to the Board.",
    minHeight: "80px",
    Model_Name_Stakeholder: "Processes for Consultation",
    Heading: "Process",
  },
];

function Stakeholders() {
  const dispatch = useDispatch();
  const { viewReport, error, success } = useSelector(
    (state) => state.StackHolderSliceDetails
  );
  const [editMode, setEditMode] = useState(false);
  const [fieldValues, setFieldValues] = useState([]);
  const [hasData, setHasData] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    dispatch(viewStackHolderDetail());
  }, [dispatch]);

  useEffect(() => {
    if (viewReport && viewReport.data && viewReport.data.length > 0) {
      const initialFieldValues = viewReport.data.map(
        (item) => item.Description || ""
      );
      setFieldValues(initialFieldValues);
      setHasData(true);
    } else {
      const initialFieldValues = Array.from(
        { length: fieldConfig.length },
        () => ""
      );
      setFieldValues(initialFieldValues);
      setHasData(false);
    }
  }, [viewReport, fieldConfig.length]);

  const editFieldButtonPD = () => {
    setEditMode(true);
  };

  const saveFieldButtonPD = () => {
    setEditMode(false);
  };

  const cancelFieldButtonPD = () => {
    setEditMode(false);
    clearValidationErrors();
  };

  const saveFieldButtonPAPD = () => {
    const isValid = validateFields();

    if (isValid) {
      const payload = fieldValues.map((value, index) => ({
        Model_Name_Stakeholder: fieldConfig[index].Model_Name_Stakeholder,
        Heading: fieldConfig[index].Heading,
        Description: value,
      }));

      if (hasData) {
        dispatch(addEditStackHolderDetail(payload));
        toast.success("Data updated successfully.");
      } else {
        dispatch(addEditStackHolderDetail(payload));
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
      <Card className="card">
        <CardHeader
          title="Stakeholders"
          sx={{ minHeight: "40px" }}
          action={
            !editMode && (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="button"
                onClick={editFieldButtonPD}
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
                      onClick={saveFieldButtonPAPD}
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
                      onClick={cancelFieldButtonPD}
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

export default Stakeholders;
