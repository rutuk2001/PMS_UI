import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";

// Adding ExportDetail
export const addWDWithoutTreatmentDetail = createAsyncThunk(
  "carbonCal/postAddWDWithoutTreatmentDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `environment/water/water_discharge_to_destination_without_treatment/`,
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
export const viewWDWithoutTreatmentDetail = createAsyncThunk(
  "carbonCal/viewWDWithoutTreatmentDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `environment/water/water_discharge_to_destination_without_treatment/?page=${page}&page_size=${page_size}`
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
export const filterWDWithoutTreatmentDetail = createAsyncThunk(
  "carbonCal/filterWDWithoutTreatmentDetail",
  async ({ Facility, page, page_size }) => {
    try {
      const response = await apiService.get(
        `environment/water/water_discharge_to_destination_without_treatment/?Facility=${Facility}&page=${page}&page_size=${page_size}`
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
export const editWDWithoutTreatmentDetail = createAsyncThunk(
  "carbonCal/putEditWDWithoutTreatmentDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `environment/water/water_discharge_to_destination_without_treatment/${id}/`,
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
export const deleteWDWithoutTreatmentDetail = createAsyncThunk(
  "carbonCal/deleteWDWithoutTreatmentDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `/environment/water/water_discharge_to_destination_without_treatment/${id}/`
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

const WaterDischargeWithoutTreatmentSlice = createSlice({
  name: "WaterDischargeWithoutTreatmentDetails",
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
    builder.addCase(addWDWithoutTreatmentDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addWDWithoutTreatmentDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addWDWithoutTreatmentDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewWDWithoutTreatmentDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewWDWithoutTreatmentDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewWDWithoutTreatmentDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(filterWDWithoutTreatmentDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(
      filterWDWithoutTreatmentDetail.fulfilled,
      (state, action) => {
        state.loading = false;
        state.viewReport = action.payload;
        // state.total_page = action.payload.count;
      }
    );
    builder.addCase(
      filterWDWithoutTreatmentDetail.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(editWDWithoutTreatmentDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editWDWithoutTreatmentDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editWDWithoutTreatmentDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteWDWithoutTreatmentDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(
      deleteWDWithoutTreatmentDetail.fulfilled,
      (state, action) => {
        state.loading = false;
        state.data = action.payload;

        state.success = "Data deleted successfully";
      }
    );
    builder.addCase(
      deleteWDWithoutTreatmentDetail.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(state.error);
      }
    );
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
  WaterDischargeWithoutTreatmentSlice.actions;
export default WaterDischargeWithoutTreatmentSlice.reducer;
