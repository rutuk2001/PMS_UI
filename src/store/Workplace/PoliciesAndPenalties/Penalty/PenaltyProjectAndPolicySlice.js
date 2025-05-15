import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";

// Adding addPenaltyProjectAndPolicyDetail
export const addPenaltyProjectAndPolicyDetail = createAsyncThunk(
  "carbonCal/addPenaltyProjectAndPolicylDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `workplace/policies_and_penalties/policies_penalty/`,
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

// Viewing PenaltyProjectAndPolicyDetail
export const viewPenaltyProjectAndPolicyDetail = createAsyncThunk(
  "carbonCal/viewPenaltyProjectAndPolicyDetail",
  async () => {
    try {
      const response = await apiService.get(
        `workplace/policies_and_penalties/policies_penalty/`
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

const PenaltyProjectAndPolicySlice = createSlice({
  name: "PenaltyProjectAndPolicyDetails",
  initialState: {
    success: "",
    error: "",
    loading: false,
    data: [],
    viewReport: "",
    count: [],
    total_page: [],
  },
  reducers: {
    clearPenaltyProjectAndPolicySuccessMessage: (state) => {
      state.success = "";
    },
    clearPenaltyProjectAndPolicyErrorMessage: (state) => {
      state.error = "";
    },
    clearStates: (state) => {
      state.data = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addPenaltyProjectAndPolicyDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addPenaltyProjectAndPolicyDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addPenaltyProjectAndPolicyDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewPenaltyProjectAndPolicyDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewPenaltyProjectAndPolicyDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewPenaltyProjectAndPolicyDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {
  clearPenaltyProjectAndPolicySuccessMessage,
  clearPenaltyProjectAndPolicyErrorMessage,
  clearStates,
} = PenaltyProjectAndPolicySlice.actions;
export default PenaltyProjectAndPolicySlice.reducer;
