import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";

// Adding addOfficesAndPlantsDetail
export const addOfficesAndPlantsDetail = createAsyncThunk(
  "carbonCal/addOfficesAndPlantslDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `company_details/operations/offices_and_plants/`,
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

// Viewing OfficesAndPlantsDetail
export const viewOfficesAndPlantsDetail = createAsyncThunk(
  "carbonCal/viewOfficesAndPlantsDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `company_details/operations/offices_and_plants/?page=${page}&page_size=${page_size}`
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

// Editing OfficesAndPlantsDetail
export const editOfficesAndPlantsDetail = createAsyncThunk(
  "carbonCal/editOfficesAndPlantsDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `company_details/operations/offices_and_plants/${id}/`,
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

// Deleting  OfficesAndPlantsDetail
export const deleteOfficesAndPlantsDetails = createAsyncThunk(
  "carbonCal/deleteOfficesAndPlantsDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `company_details/operations/offices_and_plants/${id}/`
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

const OfficesAndPlantsSlice = createSlice({
  name: "OfficesAndPlantsSliceDetails",
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
    clearOfficesAndPlantsSuccessMessage: (state) => {
      state.success = "";
    },
    clearOfficesAndPlantsdErrorMessage: (state) => {
      state.error = "";
    },
    clearStates: (state) => {
      state.data = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addOfficesAndPlantsDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addOfficesAndPlantsDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addOfficesAndPlantsDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewOfficesAndPlantsDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewOfficesAndPlantsDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewOfficesAndPlantsDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editOfficesAndPlantsDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editOfficesAndPlantsDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editOfficesAndPlantsDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteOfficesAndPlantsDetails.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(
      deleteOfficesAndPlantsDetails.fulfilled,
      (state, action) => {
        state.loading = false;
        state.viewReport = {
          ...state.viewReport,
          data: state.viewReport.data.filter(
            (item) => item.id !== action.payload.id
          ),
        };
        state.success = "Data deleted successfully";
      }
    );
    builder.addCase(deleteOfficesAndPlantsDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error);
    });
  },
});

export const {
  clearOfficesAndPlantsSuccessMessage,
  clearOfficesAndPlantsdErrorMessage,
  clearStates,
} = OfficesAndPlantsSlice.actions;
export default OfficesAndPlantsSlice.reducer;
