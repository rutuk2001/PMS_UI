import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";

// Adding addPercentageofRandDCapexInvestmentDetail
export const addPercentageofRandDCapexInvestmentDetail = createAsyncThunk(
  "carbonCal/addPercentageofRandDCapexInvestmentlDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `environment/sustainability/environmental_impact/percentage_of_R_and_D_and_capex_investments/`,
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

// Viewing PercentageofRandDCapexInvestmentDetail
export const viewPercentageofRandDCapexInvestmentDetail = createAsyncThunk(
  "carbonCal/viewPercentageofRandDCapexInvestmentDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `environment/sustainability/environmental_impact/percentage_of_R_and_D_and_capex_investments/?page=${page}&page_size=${page_size}`
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

// Editing PercentageofRandDCapexInvestmentDetail
export const editPercentageofRandDCapexInvestmentDetail = createAsyncThunk(
  "carbonCal/editPercentageofRandDCapexInvestmentDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `environment/sustainability/environmental_impact/percentage_of_R_and_D_and_capex_investments/${id}/`,
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

// Deleting  PercentageofRandDCapexInvestmentDetail
export const deletePercentageofRandDCapexInvestmentDetails = createAsyncThunk(
  "carbonCal/deletePercentageofRandDCapexInvestmentDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `environment/sustainability/environmental_impact/percentage_of_R_and_D_and_capex_investments/${id}/`
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

const PercentageofRandDCapexInvestmentSlice = createSlice({
  name: "PercentageofRandDCapexInvestmentSliceDetails",
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
    clearPercentageofRandDCapexInvestmentSuccessMessage: (state) => {
      state.success = "";
    },
    clearPercentageofRandDCapexInvestmentErrorMessage: (state) => {
      state.error = "";
    },
    clearStates: (state) => {
      state.data = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      addPercentageofRandDCapexInvestmentDetail.pending,
      (state) => {
        state.loading = true;
        state.error = "";
        state.success = "";
      }
    );
    builder.addCase(
      addPercentageofRandDCapexInvestmentDetail.fulfilled,
      (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      }
    );
    builder.addCase(
      addPercentageofRandDCapexInvestmentDetail.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );

    builder.addCase(
      viewPercentageofRandDCapexInvestmentDetail.pending,
      (state) => {
        state.loading = true;
        state.error = "";
        state.success = "";
      }
    );
    builder.addCase(
      viewPercentageofRandDCapexInvestmentDetail.fulfilled,
      (state, action) => {
        state.loading = false;
        state.viewReport = action.payload;
        state.total_page = action.payload.count;
      }
    );
    builder.addCase(
      viewPercentageofRandDCapexInvestmentDetail.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );

    builder.addCase(
      editPercentageofRandDCapexInvestmentDetail.pending,
      (state) => {
        state.loading = true;
        state.error = "";
        state.success = "";
      }
    );
    builder.addCase(
      editPercentageofRandDCapexInvestmentDetail.fulfilled,
      (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.success = action.payload.message;
      }
    );
    builder.addCase(
      editPercentageofRandDCapexInvestmentDetail.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );

    builder.addCase(
      deletePercentageofRandDCapexInvestmentDetails.pending,
      (state) => {
        state.loading = true;
        state.error = "";
        state.success = "";
      }
    );

    builder.addCase(
      deletePercentageofRandDCapexInvestmentDetails.fulfilled,
      (state, action) => {
        state.loading = false;
        state.data = action.payload;

        state.success = "Data deleted successfully";
      }
    );
    builder.addCase(
      deletePercentageofRandDCapexInvestmentDetails.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(state.error);
      }
    );
  },
});

export const {
  clearPercentageofRandDCapexInvestmentSuccessMessage,
  clearPercentageofRandDCapexInvestmentErrorMessage,
  clearStates,
} = PercentageofRandDCapexInvestmentSlice.actions;
export default PercentageofRandDCapexInvestmentSlice.reducer;
