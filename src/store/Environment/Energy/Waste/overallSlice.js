import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";

// Adding ExportDetail
export const addWasteAssessmentExternalAgencyDetail = createAsyncThunk(
  "carbonCal/postAddWasteAssessmentExternalAgencyDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `environment/waste/overall/assessment_by_external_agency/`,
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

// Viewing ExportDetail
export const viewWasteAssessmentExternalAgencyDetail = createAsyncThunk(
  "carbonCal/viewWasteAssessmentExternalAgencyDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `environment/waste/overall/assessment_by_external_agency/?page=${page}&page_size=${page_size}`
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

// Editing ExportDetail
export const editWasteAssessmentExternalAgencyDetail = createAsyncThunk(
  "carbonCal/putEditWasteAssessmentExternalAgencyDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `environment/waste/overall/assessment_by_external_agency/${id}/`,
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

// Deleting ExportDetail
export const deleteWasteAssessmentExternalAgencyDetail = createAsyncThunk(
  "carbonCal/deleteWasteAssessmentExternalAgencyDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `environment/waste/overall/assessment_by_external_agency/${id}/`
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

const WasteAssessmentExternalAgencySlice = createSlice({
  name: "WasteAssessmentExternalAgencyDetails",
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
    clearSuccessMessage: (state) => {
      state.success = "";
    },
    clearErrorMessage: (state) => {
      state.error = "";
    },
    clearStates: (state) => {
      state.data = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addWasteAssessmentExternalAgencyDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(
      addWasteAssessmentExternalAgencyDetail.fulfilled,
      (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      }
    );
    builder.addCase(
      addWasteAssessmentExternalAgencyDetail.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );

    builder.addCase(
      viewWasteAssessmentExternalAgencyDetail.pending,
      (state) => {
        state.loading = true;
        state.error = "";
        state.success = "";
      }
    );
    builder.addCase(
      viewWasteAssessmentExternalAgencyDetail.fulfilled,
      (state, action) => {
        state.loading = false;
        state.viewReport = action.payload;
        state.total_page = action.payload.count;
      }
    );
    builder.addCase(
      viewWasteAssessmentExternalAgencyDetail.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );

    builder.addCase(
      editWasteAssessmentExternalAgencyDetail.pending,
      (state) => {
        state.loading = true;
        state.error = "";
        state.success = "";
      }
    );
    builder.addCase(
      editWasteAssessmentExternalAgencyDetail.fulfilled,
      (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.success = action.payload.message;
      }
    );
    builder.addCase(
      editWasteAssessmentExternalAgencyDetail.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );

    builder.addCase(
      deleteWasteAssessmentExternalAgencyDetail.pending,
      (state) => {
        state.loading = true;
        state.error = "";
        state.success = "";
      }
    );
    builder.addCase(
      deleteWasteAssessmentExternalAgencyDetail.fulfilled,
      (state, action) => {
        state.loading = false;
        state.data = action.payload;

        state.success = "Data deleted successfully";
      }
    );
    builder.addCase(
      deleteWasteAssessmentExternalAgencyDetail.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(state.error);
      }
    );
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
  WasteAssessmentExternalAgencySlice.actions;
export default WasteAssessmentExternalAgencySlice.reducer;
