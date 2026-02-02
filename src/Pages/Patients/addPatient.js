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
import { useNavigate, useParams } from "react-router-dom";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { countryStateCityData } from "./config";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorMessage,
  clearSuccessMessage,
  registerPatient,
  updatePatient,
  getPatient,
} from "../../store/patient/patientSlice";
import { toast } from "react-toastify";

// Constants
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
  const { error, success, selectedPatient } = useSelector((state) => state.patientDetails);
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

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
    blood_group: "",
    health_issues_initial: [],
    customHealthIssue: "",
  });

  const [validationError, setValidationError] = useState({});

  // Load patient details in edit mode
  useEffect(() => {
    if (isEditMode) {
      dispatch(getPatient(id));
    }
  }, [dispatch, id, isEditMode]);

  // Populate form when patient data is available
  useEffect(() => {
    if (isEditMode && selectedPatient) {
      setPatientForm({
        first_name: selectedPatient.first_name || "",
        last_name: selectedPatient.last_name || "",
        gender: selectedPatient.gender || null,
        age: selectedPatient.age || "",
        phone_number: selectedPatient.phone_number || "",
        location: selectedPatient.location || "",
        address: selectedPatient.address || "",
        city: selectedPatient.city || "",
        state: selectedPatient.state || "",
        country: selectedPatient.country || "",
        blood_group: selectedPatient.blood_group || "",
        health_issues_initial: selectedPatient.health_issues_initial || [],
        customHealthIssue: selectedPatient.customHealthIssue || "",
      });
      setFormSubmitted(false);
      setValidationError({});
    }
  }, [isEditMode, selectedPatient]);

  // Update States based on Country
  useEffect(() => {
    const selectedCountry = patientForm.country;
    if (selectedCountry) {
      setStates(Object.keys(countryStateCityData[selectedCountry].states));
      setPatientForm((prev) => {
        if (prev.country === selectedCountry) return prev;
        return { ...prev, state: "", city: "" };
      });
    } else {
      setStates([]);
      setPatientForm((prev) => ({ ...prev, state: "", city: "" }));
    }
  }, [patientForm.country]);

  // Update Cities based on State
  useEffect(() => {
    const selectedState = patientForm.state;
    if (selectedState && patientForm.country) {
      setCities(
        countryStateCityData[patientForm.country].states[selectedState]
      );
      setPatientForm((prev) => {
        if (prev.state === selectedState) return prev;
        return { ...prev, city: "" };
      });
    } else {
      setCities([]);
      setPatientForm((prev) => ({ ...prev, city: "" }));
    }
  }, [patientForm.state]);

  // Toast messages
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

  // Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientForm((prev) => ({ ...prev, [name]: value }));
    setValidationError((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate all fields
  const validatePatientForm = () => {
    let errors = {};
    let isValid = true;

    const requiredFields = ["first_name", "last_name", "gender", "age", "location", "address"];

    requiredFields.forEach((key) => {
      const value = patientForm[key];
      if (!value || (typeof value === "string" && value.trim() === "")) {
        errors[key] = "This field is required";
        isValid = false;
      }
    });

    return { errors, isValid };
  };

  // Submit handler
  const handleSaveChanges = async () => {
    setFormSubmitted(true);
    const { errors, isValid } = validatePatientForm();

    if (!isValid) {
      setValidationError(errors);
      return;
    }

    try {
      if (isEditMode) {
        await dispatch(updatePatient({ id, data: patientForm })).unwrap();
        navigate(`/view/patientinfo/${id}`);
      } else {
        const response = await dispatch(registerPatient(patientForm)).unwrap();
        if (response && response.data._id) {
          navigate("/all_patients");
        }
      }
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

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
      blood_group: "",
      health_issues_initial: [],
      customHealthIssue: "",
    });
    setValidationError({});
    setFormSubmitted(false);
  };

  const showOtherField = patientForm.health_issues_initial.some(
    (option) => option.label === "Other"
  );

  return (
    <Card className="card">
      <CardHeader title={isEditMode ? "Edit Patient" : "Patient Registration Form"} />
      <Grid container spacing={3} sx={{ padding: 3 }}>
        {/* First & Last Name */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            name="first_name"
            value={patientForm.first_name}
            onChange={handleChange}
            fullWidth
            required
            error={formSubmitted && !!validationError.first_name}
            helperText={formSubmitted ? validationError.first_name : ""}
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
            error={formSubmitted && !!validationError.last_name}
            helperText={formSubmitted ? validationError.last_name : ""}
          />
        </Grid>

        {/* Gender */}
        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={genders}
            value={patientForm.gender}
            onChange={(e, newValue) => {
              setPatientForm((prev) => ({ ...prev, gender: newValue }));
              setValidationError((prev) => ({ ...prev, gender: "" }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Gender"
                fullWidth
                required
                error={formSubmitted && !!validationError.gender}
                helperText={formSubmitted ? validationError.gender : ""}
              />
            )}
          />
        </Grid>

        {/* Age */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Age"
            name="age"
            value={patientForm.age}
            onChange={handleChange}
            fullWidth
            type="number"
            required
            error={formSubmitted && !!validationError.age}
            helperText={formSubmitted ? validationError.age : ""}
          />
        </Grid>

        {/* Phone Number */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone Number"
            name="phone_number"
            value={patientForm.phone_number}
            onChange={handleChange}
            fullWidth
            type="tel"
            error={formSubmitted && !!validationError.phone_number}
            helperText={formSubmitted ? validationError.phone_number : ""}
          />
        </Grid>

        {/* Location */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Location"
            name="location"
            value={patientForm.location}
            onChange={handleChange}
            fullWidth
            required
            error={formSubmitted && !!validationError.location}
            helperText={formSubmitted ? validationError.location : ""}
          />
        </Grid>

        {/* Address */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Address"
            name="address"
            value={patientForm.address}
            onChange={handleChange}
            fullWidth
            required
            error={formSubmitted && !!validationError.address}
            helperText={formSubmitted ? validationError.address : ""}
          />
        </Grid>

        {/* Country, State, City */}
        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={Object.keys(countryStateCityData)}
            value={patientForm.country}
            onChange={(e, newValue) => {
              setPatientForm((prev) => ({ ...prev, country: newValue }));
              setValidationError((prev) => ({ ...prev, country: "" }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Country"
                fullWidth
                error={formSubmitted && !!validationError.country}
                helperText={formSubmitted ? validationError.country : ""}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={states}
            value={patientForm.state}
            onChange={(e, newValue) => {
              setPatientForm((prev) => ({ ...prev, state: newValue }));
              setValidationError((prev) => ({ ...prev, state: "" }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="State"
                fullWidth
                error={formSubmitted && !!validationError.state}
                helperText={formSubmitted ? validationError.state : ""}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={cities}
            value={patientForm.city}
            onChange={(e, newValue) => {
              setPatientForm((prev) => ({ ...prev, city: newValue }));
              setValidationError((prev) => ({ ...prev, city: "" }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="City"
                fullWidth
                error={formSubmitted && !!validationError.city}
                helperText={formSubmitted ? validationError.city : ""}
              />
            )}
          />
        </Grid>

        {/* Health Issues */}
        <Grid item xs={12} sm={6}>
          <Autocomplete
            multiple
            options={healthOptions}
            disableCloseOnSelect
            groupBy={(option) => option.group}
            getOptionLabel={(option) => option.label}
            value={patientForm.health_issues_initial}
            onChange={(e, newValue) => {
              setPatientForm((prev) => ({
                ...prev,
                health_issues_initial: newValue,
                customHealthIssue: newValue.some((opt) => opt.label === "Other")
                  ? prev.customHealthIssue
                  : "",
              }));
              setValidationError((prev) => ({
                ...prev,
                health_issues_initial: "",
              }));
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
                error={formSubmitted && !!validationError.health_issues_initial}
                helperText={
                  formSubmitted ? validationError.health_issues_initial : ""
                }
              />
            )}
          />
        </Grid>

        {/* Custom Health Issue */}
        {showOtherField && (
          <Grid item xs={12} sm={6}>
            <TextField
              label="Specify Other Condition"
              value={patientForm.customHealthIssue}
              onChange={(e) => {
                const val = e.target.value;
                setPatientForm((prev) => ({ ...prev, customHealthIssue: val }));
                setValidationError((prev) => ({
                  ...prev,
                  customHealthIssue: "",
                }));
              }}
              fullWidth
              error={formSubmitted && !!validationError.customHealthIssue}
              helperText={
                formSubmitted ? validationError.customHealthIssue : ""
              }
            />
          </Grid>
        )}

        {/* Blood Group */}
        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={bloodGroup}
            value={patientForm.blood_group}
            onChange={(e, newValue) => {
              setPatientForm((prev) => ({ ...prev, blood_group: newValue }));
              setValidationError((prev) => ({ ...prev, blood_group: "" }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Blood Group"
                fullWidth
                error={formSubmitted && !!validationError.blood_group}
                helperText={formSubmitted ? validationError.blood_group : ""}
              />
            )}
          />
        </Grid>

        {/* Buttons */}
        <Grid item xs={12} sm={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSaveChanges}
          >
            Submit
          </Button>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}

export default PatientForm;
