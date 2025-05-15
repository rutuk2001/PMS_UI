import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Grid,
  Button,
  TextField,
  Autocomplete,
  Checkbox,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { countryStateCityData } from "./config";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorMessage,
  clearSuccessMessage,
  registerPatient,
} from "../../store/patient/patientSlice";
import { toast } from "react-toastify";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const genders = ["Male", "Female", "Other"];
const bloodGroup = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const healthOptions = [
  { label: "Diabetes", group: "Chronic Diseases" },
  { label: "Hypertension", group: "Chronic Diseases" },
  { label: "Asthma", group: "Chronic Diseases" },
  { label: "Pollen", group: "Allergies" },
  { label: "Dust", group: "Allergies" },
  { label: "Penicillin", group: "Allergies" },
  { label: "Other", group: "Other" },
];

function PatientForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { error, success } = useSelector((state) => state.patientDetails);
  const [patientForm, setPatientForm] = useState({
    first_name: "",
    last_name: "",
    gender: null,
    age: "",
    phone_number: "",
    location: "",
    address: "",
    city: "",
    state: "",
    country: "",
    // email: "",
    blood_group: "",
    symptoms_or_reason: "",
    healthIssues: [],
    customHealthIssue: "",
  });

  useEffect(() => {
    if (patientForm.country) {
      setStates(Object.keys(countryStateCityData[patientForm.country].states));
    } else {
      setStates([]);
    }

    setPatientForm((prev) => ({
      ...prev,
      state: "",
      city: "",
    }));
  }, [patientForm.country]);

  useEffect(() => {
    if (patientForm.state) {
      setCities(
        countryStateCityData[patientForm.country].states[patientForm.state]
      );
    } else {
      setCities([]);
    }

    setPatientForm((prev) => ({
      ...prev,
      city: "",
    }));
  }, [patientForm.state]);

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

  const [validationError, setValidationError] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    age: "",
    phone_number: "",
    location: "",
    address: "",
    city: "",
    state: "",
    country: "",
    // email: "",
    blood_group: "",
    symptoms_or_reason: "",
    healthIssues: [],
    customHealthIssue: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setValidationError({
      ...validationError,
      [name]: "",
    });

    setPatientForm({ ...patientForm, [name]: value }); // Update form state
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientForm({
      ...patientForm,
      [name]: value,
    });
  };

  // Validation function
  const validatePatientForm = (patientForm) => {
    let newErrors = {};
    let valid = true;

    Object.keys(patientForm).forEach((key) => {
      const value = patientForm[key];

      // Skip health issues and custom field from this loop (handled separately)
      if (["healthIssues", "customHealthIssue"].includes(key)) return;

      // Dropdown fields
      if (["gender", "city", "state", "country", "blood_group"].includes(key)) {
        if (!value) {
          newErrors[key] = "This field is required";
          valid = false;
        }
      } else {
        if (!value || (typeof value === "string" && value.trim() === "")) {
          newErrors[key] = "This field is required";
          valid = false;
        }
      }
    });

    // Validate healthIssues
    if (
      !Array.isArray(patientForm.healthIssues) ||
      patientForm.healthIssues.length === 0
    ) {
      newErrors.healthIssues = "At least one health issue is required";
      valid = false;
    }

    // If "Other" is selected, validate customHealthIssue
    const hasOther = patientForm.healthIssues?.some(
      (option) => option.label?.toLowerCase?.() === "other"
    );

    if (
      hasOther &&
      (!patientForm.customHealthIssue ||
        patientForm.customHealthIssue.trim() === "")
    ) {
      newErrors.customHealthIssue = "Please specify the custom health issue";
      valid = false;
    }

    return { errors: newErrors, isValid: valid };
  };

  const handleSaveChanges = () => {
    setFormSubmitted(true);

    const { errors, isValid } = validatePatientForm(patientForm);

    if (!isValid) {
      setValidationError(errors);
      return;
    }

    dispatch(registerPatient(patientForm));
  };

  const showOtherField = patientForm.healthIssues.some(
    (option) => option.label === "Other"
  );
  const handleCancel = () => {
    setPatientForm({
      first_name: "",
      last_name: "",
      gender: null,
      age: "",
      phone_number: "",
      location: "",
      address: "",
      city: "",
      state: "",
      country: "",
      // email: "",
      blood_group: "",
      symptoms_or_reason: "",
      healthIssues: [],
      customHealthIssue: "",
    });

    setValidationError({
      first_name: "",
      last_name: "",
      gender: "",
      age: "",
      phone_number: "",
      location: "",
      address: "",
      city: "",
      state: "",
      country: "",
      email: "",
      blood_group: "",
      symptoms_or_reason: "",
      healthIssues: [],
      customHealthIssue: "",
    });
    setFormSubmitted(false);
  };

  return (
    <>
      <Card className="card">
        <CardHeader
          title="Patient Registration Form"
          action={
            <Grid container direction="row" justifyContent="flex-end"></Grid>
          }
        />

        <Grid container spacing={3} sx={{ padding: 3 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              name="first_name"
              value={patientForm.first_name}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!validationError.first_name}
              helperText={validationError.first_name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              name="last_name"
              value={patientForm.last_name}
              onChange={handleChange}
              fullWidth
              required
              error={!!validationError.last_name}
              helperText={validationError.last_name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              options={genders}
              value={patientForm.gender}
              onChange={(e, newValue) =>
                setPatientForm({ ...patientForm, gender: newValue })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Gender"
                  fullWidth
                  required
                  error={!!validationError.gender}
                  helperText={validationError.gender}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Age"
              name="age"
              value={patientForm.age}
              onChange={handleChange}
              fullWidth
              type="number"
              required
              error={!!validationError.age}
              helperText={validationError.age}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone Number"
              name="phone_number"
              value={patientForm.phone_number}
              onChange={handleChange}
              fullWidth
              type="number"
              required
              error={!!validationError.phone_number}
              helperText={validationError.phone_number}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Location"
              name="location"
              value={patientForm.location}
              onChange={handleChange}
              fullWidth
              required
              error={!!validationError.location}
              helperText={validationError.location}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              name="address"
              value={patientForm.address}
              onChange={handleChange}
              fullWidth
              required
              error={!!validationError.address}
              helperText={validationError.address}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              options={Object.keys(countryStateCityData)}
              value={patientForm.country}
              onChange={(e, newValue) =>
                setPatientForm({ ...patientForm, country: newValue })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country"
                  fullWidth
                  required
                  error={!!validationError.country}
                  helperText={validationError.country}
                />
              )}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              options={states}
              value={patientForm.state}
              onChange={(e, newValue) =>
                setPatientForm({ ...patientForm, state: newValue })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="State"
                  fullWidth
                  required
                  error={!!validationError.state}
                  helperText={validationError.state}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              options={cities}
              value={patientForm.city}
              onChange={(e, newValue) =>
                setPatientForm({ ...patientForm, city: newValue })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="City"
                  fullWidth
                  required
                  error={!!validationError.city}
                  helperText={validationError.city}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Autocomplete
              multiple
              options={healthOptions}
              disableCloseOnSelect
              groupBy={(option) => option.group}
              getOptionLabel={(option) => option.label}
              value={patientForm.healthIssues}
              onChange={(event, newValue) => {
                setPatientForm({
                  ...patientForm,
                  healthIssues: newValue,
                  customHealthIssue: newValue.some(
                    (opt) => opt.label === "Other"
                  )
                    ? patientForm.customHealthIssue
                    : "",
                });
              }}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.label}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Health Conditions"
                  fullWidth
                  required
                  error={formSubmitted && !!validationError.healthIssues}
                  helperText={formSubmitted ? validationError.healthIssues : ""}
                />
              )}
            />
          </Grid>

          {showOtherField && (
            <Grid item xs={12} sm={6}>
              <TextField
                label="Specify Other Condition"
                value={patientForm.customHealthIssue}
                onChange={(e) =>
                  setPatientForm({
                    ...patientForm,
                    customHealthIssue: e.target.value,
                  })
                }
                fullWidth
                required
                error={!!validationError.customHealthIssue}
                helperText={validationError.customHealthIssue}
              />
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <Autocomplete
              options={bloodGroup}
              value={patientForm.blood_group}
              onChange={(e, newValue) =>
                setPatientForm({ ...patientForm, blood_group: newValue })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Blood Group"
                  fullWidth
                  required
                  error={!!validationError.blood_group}
                  helperText={validationError.blood_group}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Symptoms / Reason for Visit"
              name="symptoms_or_reason"
              value={patientForm.symptoms_or_reason}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              required
              error={!!validationError.symptoms_or_reason}
              helperText={validationError.symptoms_or_reason}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveChanges}
              fullWidth
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleCancel}
              fullWidth
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

export default PatientForm;
