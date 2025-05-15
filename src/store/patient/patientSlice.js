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

const patientSlice = createSlice({
  name: "patientDetails",
  initialState: {
    success: "",
    error: "",
    loading: false,
    allRecords: [],
    total_records: "",
  },
  reducers: {
    clearSuccessMessage: (state) => {
      state.success = "";
    },
    clearErrorMessage: (state) => {
      state.error = "";
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
  },
});

export const { clearSuccessMessage, clearErrorMessage } = patientSlice.actions;
export default patientSlice.reducer;
