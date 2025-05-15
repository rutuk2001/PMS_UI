import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";

// Adding addOIESADetail
export const addOIESADetail = createAsyncThunk(
  "carbonCal/addOIESAlDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `environment/sustainability/environmental_impact/operations_in_ecologically_sensitive_areas/`,
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

// Viewing OIESADetail
export const viewOIESADetail = createAsyncThunk(
  "carbonCal/viewOIESADetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `environment/sustainability/environmental_impact/operations_in_ecologically_sensitive_areas/?page=${page}&page_size=${page_size}`
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

// Editing OIESADetail
export const editOIESADetail = createAsyncThunk(
  "carbonCal/editOIESADetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `environment/sustainability/environmental_impact/operations_in_ecologically_sensitive_areas/${id}/`,
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

// Deleting  OIESADetail
export const deleteOIESADetails = createAsyncThunk(
  "carbonCal/deleteOIESADetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `environment/sustainability/environmental_impact/operations_in_ecologically_sensitive_areas/${id}/`
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

const OIESASlice = createSlice({
  name: "OIESASliceDetails",
  initialState: {
    success: "",
    error: "",
    loading: false,
    data: [],
    viewReport: [],
    count: [],
    total_page: "",
  },
  reducers: {
    clearOIESASuccessMessage: (state) => {
      state.success = "";
    },
    clearOIESAErrorMessage: (state) => {
      state.error = "";
    },
    clearStates: (state) => {
      state.data = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addOIESADetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addOIESADetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addOIESADetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewOIESADetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewOIESADetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewOIESADetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editOIESADetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editOIESADetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editOIESADetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteOIESADetails.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deleteOIESADetails.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;

      state.success = "Data deleted successfully";
    });
    builder.addCase(deleteOIESADetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error);
    });
  },
});

export const { clearOIESASuccessMessage, clearOIESAErrorMessage, clearStates } =
  OIESASlice.actions;
export default OIESASlice.reducer;
