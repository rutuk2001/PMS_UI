import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";

// Adding addWaterStressAreasDetail
export const addWaterStressAreasDetail = createAsyncThunk(
  "carbonCal/addWaterStressAreaslDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `environment/water/overall/water_stress_areas/`,
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

// Viewing WaterStressAreasDetail
export const viewWaterStressAreasDetail = createAsyncThunk(
  "carbonCal/viewWaterStressAreasDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `environment/water/overall/water_stress_areas/?page=${page}&page_size=${page_size}`
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

// Editing WaterStressAreasDetail
export const editWaterStressAreasDetail = createAsyncThunk(
  "carbonCal/editWaterStressAreasDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `environment/water/overall/water_stress_areas/${id}/`,
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

// Deleting  WaterStressAreasDetail
export const deleteWaterStressAreasDetails = createAsyncThunk(
  "carbonCal/deleteWaterStressAreasDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `environment/water/overall/water_stress_areas/${id}/`
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

const WaterStressAreasSlice = createSlice({
  name: "WaterStressAreasSliceDetails",
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
    clearWaterStressAreasSuccessMessage: (state) => {
      state.success = "";
    },
    clearWaterStressAreasErrorMessage: (state) => {
      state.error = "";
    },
    clearStates: (state) => {
      state.data = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addWaterStressAreasDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addWaterStressAreasDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addWaterStressAreasDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewWaterStressAreasDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewWaterStressAreasDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewWaterStressAreasDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editWaterStressAreasDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editWaterStressAreasDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editWaterStressAreasDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteWaterStressAreasDetails.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(
      deleteWaterStressAreasDetails.fulfilled,
      (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.success = "Data deleted successfully";
      }
    );
    builder.addCase(deleteWaterStressAreasDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error);
    });
  },
});

export const {
  clearWaterStressAreasSuccessMessage,
  clearWaterStressAreasErrorMessage,
  clearStates,
} = WaterStressAreasSlice.actions;
export default WaterStressAreasSlice.reducer;
