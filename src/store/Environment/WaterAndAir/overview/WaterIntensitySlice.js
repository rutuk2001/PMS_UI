import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";

// Viewing ExportDetail
export const viewWaterIntensityDetail = createAsyncThunk(
  "carbonCal/viewWaterIntensityDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `environment/water/overall/water_intensity/?page=${page}&page_size=${page_size}`
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


const WaterIntensitySlice = createSlice({
  name: "WaterIntensityDetails",
  initialState: {
    success: "",
    error: "",
    loading: false,
    data: [],
    WaterIntensityData: [],
    count: [],
    total_page_WaterIntensity: [],
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
    builder.addCase(viewWaterIntensityDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewWaterIntensityDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.WaterIntensityData = action.payload;
      state.total_page_WaterIntensity = action.payload.count;
    });
    builder.addCase(viewWaterIntensityDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
  WaterIntensitySlice.actions;
export default WaterIntensitySlice.reducer;
