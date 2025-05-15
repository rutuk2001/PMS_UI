import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";

// Adding ExportDetail
export const addWDWithTreatmentDetail = createAsyncThunk(
  "carbonCal/postAddWDWithTreatmentDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `environment/water/water_discharge_to_destination_with_treatment/`,
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
export const viewWDWithTreatmentDetail = createAsyncThunk(
  "carbonCal/viewWDWithTreatmentDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `environment/water/water_discharge_to_destination_with_treatment/?page=${page}&page_size=${page_size}`
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
// Filter With Treatment
export const filterWDWithTreatmentDetail = createAsyncThunk(
  "carbonCal/filterWDWithTreatmentDetail",
  async ({ Facility, page, page_size }) => {
    try {
      const response = await apiService.get(
        `environment/water/water_discharge_to_destination_with_treatment/?Facility=${Facility}&page=${page}&page_size=${page_size}`
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
export const editWDWithTreatmentDetail = createAsyncThunk(
  "carbonCal/putEditWDWithTreatmentDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `environment/water/water_discharge_to_destination_with_treatment/${id}/`,
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
export const deleteWDWithTreatmentDetail = createAsyncThunk(
  "carbonCal/deleteWDWithTreatmentDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `/environment/water/water_discharge_to_destination_with_treatment/${id}/`
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

const WaterDischargeWithTreatmentSlice = createSlice({
  name: "WaterDischargeWithTreatmentDetails",
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
    builder.addCase(addWDWithTreatmentDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addWDWithTreatmentDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addWDWithTreatmentDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewWDWithTreatmentDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewWDWithTreatmentDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewWDWithTreatmentDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(filterWDWithTreatmentDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(filterWDWithTreatmentDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      // state.total_page = action.payload.count;
    });
    builder.addCase(filterWDWithTreatmentDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editWDWithTreatmentDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editWDWithTreatmentDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editWDWithTreatmentDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteWDWithTreatmentDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deleteWDWithTreatmentDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;

      state.success = "Data deleted successfully";
    });
    builder.addCase(deleteWDWithTreatmentDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error);
    });
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
  WaterDischargeWithTreatmentSlice.actions;
export default WaterDischargeWithTreatmentSlice.reducer;
