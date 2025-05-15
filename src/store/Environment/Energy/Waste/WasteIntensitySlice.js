import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";

// Viewing ExportDetail
export const viewWasteIntensityDetail = createAsyncThunk(
  "carbonCal/viewWasteIntensityDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `environment/waste/overall/waste_intensity/?page=${page}&page_size=${page_size}`
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


const WasteIntensitySlice = createSlice({
  name: "WasteIntensityDetails",
  initialState: {
    success: "",
    error: "",
    loading: false,
    data: [],
    WasteIntensityData: [],
    count: [],
    total_page_WasteIntensity: [],
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
    builder.addCase(viewWasteIntensityDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewWasteIntensityDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.WasteIntensityData = action.payload;
      state.total_page_WasteIntensity = action.payload.count;
    });
    builder.addCase(viewWasteIntensityDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
  WasteIntensitySlice.actions;
export default WasteIntensitySlice.reducer;
