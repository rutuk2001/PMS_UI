import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";

// Adding Consumption
export const addConsumption = createAsyncThunk(
  "carbonCal/postAddConsumption",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `environment/water/water_consumption/`,
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

// Viewing Consumption
export const viewConsumption = createAsyncThunk(
  "carbonCal/viewConsumption",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `environment/water/water_consumption/?page=${page}&page_size=${page_size}`
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

// Editing Consumption
export const editConsumption = createAsyncThunk(
  "carbonCal/putEditConsumption",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `environment/water/water_consumption/${id}/`,
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

// Deleting Consumption
export const deleteConsumption = createAsyncThunk(
  "carbonCal/deleteConsumption",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `environment/water/water_consumption/${id}/`
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

//filterFacilityConsumption

export const filterFacilityConsumption = createAsyncThunk(
  "carbonCal/filterFacilityConsumption",
  async ({ Facility, page, page_size }) => {
    try {
      const response = await apiService.get(
        `environment/water/water_consumption/?Facility=${Facility}&page=${page}&page_size=${page_size}`
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

const ConsumptionSlice = createSlice({
  name: "ConsumptionSliceDetails",
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
    builder.addCase(addConsumption.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addConsumption.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addConsumption.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewConsumption.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewConsumption.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewConsumption.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editConsumption.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editConsumption.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editConsumption.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteConsumption.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deleteConsumption.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = "Data deleted successfully";
    });
    builder.addCase(deleteConsumption.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error);
    });

    builder.addCase(filterFacilityConsumption.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(filterFacilityConsumption.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
    });
    builder.addCase(filterFacilityConsumption.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
  ConsumptionSlice.actions;
export default ConsumptionSlice.reducer;
