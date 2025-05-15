import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";

// Adding addAssessmentbyExternalAgencyDetail
export const addAssessmentbyExternalAgencyDetail = createAsyncThunk(
  "carbonCal/addAssessmentbyExternalAgencylDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `environment/water/overall/assessment_by_external_agency/`,
        data
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

// Viewing AssessmentbyExternalAgencyDetail
export const viewAssessmentbyExternalAgencyDetail = createAsyncThunk(
  "carbonCal/viewAssessmentbyExternalAgencyDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `environment/water/overall/assessment_by_external_agency/?page=${page}&page_size=${page_size}`
      );

      if (response.status === 400) {
        throw new Error("Request failed: " + response.statusText);
      }

      return await response.json();
    } catch (error) {
      console.error("Fetch error while fetching the user location:", error);
      throw error;
    }
  }
);

// Editing AssessmentbyExternalAgencyDetail
export const editAssessmentbyExternalAgencyDetail = createAsyncThunk(
  "carbonCal/editAssessmentbyExternalAgencyDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `environment/water/overall/assessment_by_external_agency/${id}/`,
        data
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

// Deleting  AssessmentbyExternalAgencyDetail
export const deleteAssessmentbyExternalAgencyDetails = createAsyncThunk(
  "carbonCal/deleteAssessmentbyExternalAgencyDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `environment/water/overall/assessment_by_external_agency/${id}/`
      );
      if (
        response.status === 400 ||
        response.status === 500 ||
        response.status === 404
      ) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      } else if (response.status === 204) {
        return { id };
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const AssessmentbyExternalAgencySlice = createSlice({
  name: "AssessmentbyExternalAgencySliceDetails",
  initialState: {
    success: "",
    error: "",
    loading: false,
    data: [],
    viewReport: [],
    count: [],
    total_page: [],
  },
  reducers: {
    clearAssessmentbyExternalAgencySuccessMessage: (state) => {
      state.success = "";
    },
    clearAssessmentbyExternalAgencyErrorMessage: (state) => {
      state.error = "";
    },
    clearStates: (state) => {
      state.data = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addAssessmentbyExternalAgencyDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(
      addAssessmentbyExternalAgencyDetail.fulfilled,
      (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      }
    );
    builder.addCase(
      addAssessmentbyExternalAgencyDetail.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );

    builder.addCase(viewAssessmentbyExternalAgencyDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(
      viewAssessmentbyExternalAgencyDetail.fulfilled,
      (state, action) => {
        state.loading = false;
        state.viewReport = action.payload;
        state.total_page = action.payload.count;
      }
    );
    builder.addCase(
      viewAssessmentbyExternalAgencyDetail.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );

    builder.addCase(editAssessmentbyExternalAgencyDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(
      editAssessmentbyExternalAgencyDetail.fulfilled,
      (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.success = action.payload.message;
      }
    );
    builder.addCase(
      editAssessmentbyExternalAgencyDetail.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );

    builder.addCase(
      deleteAssessmentbyExternalAgencyDetails.pending,
      (state) => {
        state.loading = true;
        state.error = "";
        state.success = "";
      }
    );
    builder.addCase(
      deleteAssessmentbyExternalAgencyDetails.fulfilled,
      (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.success = "Data deleted successfully";
      }
    );
    builder.addCase(
      deleteAssessmentbyExternalAgencyDetails.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(state.error);
      }
    );
  },
});

export const {
  clearAssessmentbyExternalAgencySuccessMessage,
  clearAssessmentbyExternalAgencyErrorMessage,
  clearStates,
} = AssessmentbyExternalAgencySlice.actions;
export default AssessmentbyExternalAgencySlice.reducer;
