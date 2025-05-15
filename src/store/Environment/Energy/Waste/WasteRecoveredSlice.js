import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";

// Adding ExportDetail
export const addWasteRecoveredDetail = createAsyncThunk(
  "carbonCal/postAddWasteRecoveredDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `environment/waste/waste_recovered/`,
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
export const viewWasteRecoveredDetail = createAsyncThunk(
  "carbonCal/viewWasteRecoveredDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `environment/waste/waste_recovered/?page=${page}&page_size=${page_size}`
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
export const editWasteRecoveredDetail = createAsyncThunk(
  "carbonCal/putEditWasteRecoveredDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `environment/waste/waste_recovered/${id}/`,
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
export const deleteWasteRecoveredDetail = createAsyncThunk(
  "carbonCal/deleteWasteRecoveredDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `environment/waste/waste_recovered/${id}/`
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

//filterFacilityWithdrawal

export const filterWasteRecovered = createAsyncThunk(
  "carbonCal/filterWasteRecovered",
  async ({ Facility, page, page_size }) => {
    try {
      const response = await apiService.get(
        `environment/waste/waste_recovered/?Facility=${Facility}&page=${page}&page_size=${page_size}`
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

export const fetchWasteRecoveredCategoryList = createAsyncThunk(
  "carbonCal/fetchWasteRecoveredCategoryList",
  async () => {
    try {
      const response = await apiService.get(
        `environment/waste/recovered_category/`
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

const WasteRecoveredSlice = createSlice({
  name: "WasteRecoveredDetails",
  initialState: {
    success: "",
    error: "",
    loading: false,
    data: [],
    viewReport: [],
    wasteRecoveredCategory: [],
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
    builder.addCase(addWasteRecoveredDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addWasteRecoveredDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addWasteRecoveredDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewWasteRecoveredDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewWasteRecoveredDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewWasteRecoveredDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editWasteRecoveredDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editWasteRecoveredDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editWasteRecoveredDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteWasteRecoveredDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deleteWasteRecoveredDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;

      state.success = "Data deleted successfully";
    });
    builder.addCase(deleteWasteRecoveredDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error);
    });

    builder.addCase(filterWasteRecovered.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(filterWasteRecovered.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(filterWasteRecovered.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchWasteRecoveredCategoryList.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(
      fetchWasteRecoveredCategoryList.fulfilled,
      (state, action) => {
        state.loading = false;
        state.wasteRecoveredCategory = action.payload;
      }
    );
    builder.addCase(
      fetchWasteRecoveredCategoryList.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
  WasteRecoveredSlice.actions;
export default WasteRecoveredSlice.reducer;
