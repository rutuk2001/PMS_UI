import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../services/apiService";

export const registerPatient = createAsyncThunk(
  "carbonCal/registerPatient",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(`createNewPatient/`, data);
      if (
        response.status === 400 ||
        response.status === 500 ||
        response.status === 404
      ) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      } else {
        const responseData = await response.json();
        return responseData;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllregisterPatient = createAsyncThunk(
  "carbonCal/getAllregisterPatient",
  async ({ page, limit }) => {
    try {
      const response = await apiService.get(
        `getAllPatients?page=${page}&limit=${limit}`
      );

      const respData = await response.json();
      if (
        response.status === 400 ||
        response.status === 500 ||
        response.status === 404
      ) {
        throw new Error(respData.error);
      } else {
        return respData;
      }
    } catch (error) {
      console.error("Fetch error while fetching the user location:", error);
      throw error;
    }
  }
);

export const getPatient = createAsyncThunk(
  "carbonCal/getPatient",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.get(`getPatient/${id}`);
      
      if (response.status === 400 || response.status === 500 || response.status === 404) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      } else {
        const responseData = await response.json();
        return responseData;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePatient = createAsyncThunk(
  "carbonCal/updatePatient",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(`updatePatient/${id}`, data);
      
      if (
        response.status === 400 ||
        response.status === 500 ||
        response.status === 404
      ) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      } else {
        const responseData = await response.json();
        return responseData;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePatient = createAsyncThunk(
  "carbonCal/deletePatient",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(`deletePatient/${id}`);

      // Assuming apiService returns { data, message, statusCode }
      if (
        response.statusCode === 404 ||
        response.statusCode === 400 ||
        response.statusCode === 500
      ) {
        return rejectWithValue(response.message || "Something went wrong");
      }

      return response; // return full response object
    } catch (error) {
      return rejectWithValue(error?.message || "Network error");
    }
  }
);

export const prescriptionPost = createAsyncThunk(
  "carbonCal/prescriptionPost",
  async ({ formData, id }, { rejectWithValue }) => {
    console.log(formData, id);
    try {
      const response = await apiService.put(
        `visits/${id}/prescription`,
        formData
      );
      if (
        response.status === 400 ||
        response.status === 500 ||
        response.status === 404
      ) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      } else {
        const responseData = await response.json();
        return responseData;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// New async thunks for visit history
export const getVisitHistory = createAsyncThunk(
  "carbonCal/getVisitHistory",
  async ({ patientId, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await apiService.get(
        `api/history/${patientId}?page=${page}&limit=${limit}`
      );
      
      if (response.status === 400 || response.status === 500 || response.status === 404) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      } else {
        const responseData = await response.json();
        return responseData;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getVisitById = createAsyncThunk(
  "carbonCal/getVisitById",
  async (visitId, { rejectWithValue }) => {
    try {
      const response = await apiService.get(`api/visits/${visitId}`);
      
      if (response.status === 400 || response.status === 500 || response.status === 404) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      } else {
        const responseData = await response.json();
        return responseData;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateVisit = createAsyncThunk(
  "carbonCal/updateVisit",
  async ({ visitId, updateData }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(`api/visits/${visitId}`, updateData);
      
      if (response.status === 400 || response.status === 500 || response.status === 404) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      } else {
        const responseData = await response.json();
        return responseData;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePrescription = createAsyncThunk(
  "carbonCal/updatePrescription",
  async ({ prescriptionId, updateData }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(`api/prescriptions/${prescriptionId}`, updateData);
      
      if (response.status === 400 || response.status === 500 || response.status === 404) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      } else {
        const responseData = await response.json();
        return responseData;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getPrescriptionById = createAsyncThunk(
  "carbonCal/getPrescriptionById",
  async (prescriptionId, { rejectWithValue }) => {
    try {
      const response = await apiService.get(`api/prescriptions/${prescriptionId}`);
      
      if (response.status === 400 || response.status === 500 || response.status === 404) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      } else {
        const responseData = await response.json();
        return responseData;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const patientSlice = createSlice({
  name: "patientDetails",
  initialState: {
    success: "",
    error: "",
    loading: false,
    allRecords: [],
    total_records: "",
    selectedPatient: null,
    // New state for visit history
    visitHistory: {
      visits: [],
      currentPage: 1,
      totalPages: 1,
      totalRecords: 0,
      recordsPerPage: 10,
      loading: false,
      error: "",
    },
    selectedVisit: null,
    selectedVisitLoading: false,
    selectedVisitError: "",
    selectedPrescription: null,
    selectedPrescriptionLoading: false,
    selectedPrescriptionError: "",
  },
  reducers: {
    clearSuccessMessage: (state) => {
      state.success = "";
    },
    clearErrorMessage: (state) => {
      state.error = "";
    },
    clearVisitHistoryError: (state) => {
      state.visitHistory.error = "";
    },
    clearSelectedVisitError: (state) => {
      state.selectedVisitError = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerPatient.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(registerPatient.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
      state.token = action.payload.access;
    });
    builder.addCase(registerPatient.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getAllregisterPatient.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(getAllregisterPatient.fulfilled, (state, action) => {
      state.loading = false;
      state.allRecords = action.payload.data.allPatients;

      state.total_records = action.payload.data.totalRecords;
    });
    builder.addCase(getAllregisterPatient.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getPatient.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(getPatient.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedPatient = action.payload.data;
      state.success = action.payload.message || "Patient fetched successfully";
    });
    builder.addCase(getPatient.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updatePatient.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(updatePatient.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message || "Patient updated successfully";
    });
    builder.addCase(updatePatient.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deletePatient.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deletePatient.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message || "Patient deleted successfully";
    });
    builder.addCase(deletePatient.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    builder.addCase(prescriptionPost.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(prescriptionPost.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
      state.token = action.payload.access;
    });
    builder.addCase(prescriptionPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // New cases for visit history
    builder.addCase(getVisitHistory.pending, (state) => {
      state.visitHistory.loading = true;
      state.visitHistory.error = "";
    });
    builder.addCase(getVisitHistory.fulfilled, (state, action) => {
      state.visitHistory.loading = false;
      state.visitHistory.visits = action.payload.data.visits;
      state.visitHistory.currentPage = action.payload.data.currentPage;
      state.visitHistory.totalPages = action.payload.data.totalPages;
      state.visitHistory.totalRecords = action.payload.data.totalRecords;
      state.visitHistory.recordsPerPage = action.payload.data.recordsPerPage;
    });
    builder.addCase(getVisitHistory.rejected, (state, action) => {
      state.visitHistory.loading = false;
      state.visitHistory.error = action.payload;
    });

    builder.addCase(getVisitById.pending, (state) => {
      state.selectedVisitLoading = true;
      state.selectedVisitError = "";
    });
    builder.addCase(getVisitById.fulfilled, (state, action) => {
      state.selectedVisitLoading = false;
      state.selectedVisit = action.payload.data;
    });
    builder.addCase(getVisitById.rejected, (state, action) => {
      state.selectedVisitLoading = false;
      state.selectedVisitError = action.payload;
    });

    builder.addCase(getPrescriptionById.pending, (state) => {
      state.selectedPrescriptionLoading = true;
      state.selectedPrescriptionError = "";
      state.selectedPrescription = null;
    });
    builder.addCase(getPrescriptionById.fulfilled, (state, action) => {
      state.selectedPrescriptionLoading = false;
      state.selectedPrescription = action.payload.data;
    });
    builder.addCase(getPrescriptionById.rejected, (state, action) => {
      state.selectedPrescriptionLoading = false;
      state.selectedPrescriptionError = action.payload;
    });

    builder.addCase(updateVisit.pending, (state) => {
      state.visitHistory.loading = true;
      state.visitHistory.error = "";
    });
    builder.addCase(updateVisit.fulfilled, (state, action) => {
      state.visitHistory.loading = false;
      state.success = "Visit updated successfully";
      // Update the visit in the list
      const updatedVisit = action.payload.data;
      const visitIndex = state.visitHistory.visits.findIndex(
        visit => visit._id === updatedVisit._id
      );
      if (visitIndex !== -1) {
        state.visitHistory.visits[visitIndex] = updatedVisit;
      }
    });
    builder.addCase(updateVisit.rejected, (state, action) => {
      state.visitHistory.loading = false;
      state.visitHistory.error = action.payload;
    });

    builder.addCase(updatePrescription.pending, (state) => {
      state.visitHistory.loading = true;
      state.visitHistory.error = "";
    });
    builder.addCase(updatePrescription.fulfilled, (state, action) => {
      state.visitHistory.loading = false;
      state.success = "Prescription updated successfully";
    });
    builder.addCase(updatePrescription.rejected, (state, action) => {
      state.visitHistory.loading = false;
      state.visitHistory.error = action.payload;
    });
  },
});

export const { 
  clearSuccessMessage, 
  clearErrorMessage, 
  clearVisitHistoryError, 
  clearSelectedVisitError 
} = patientSlice.actions;
export default patientSlice.reducer;
