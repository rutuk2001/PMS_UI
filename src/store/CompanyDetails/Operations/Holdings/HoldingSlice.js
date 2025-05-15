import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";

// Adding addHoldingsDetail
export const addHoldingsDetail = createAsyncThunk(
  "carbonCal/addHoldingslDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `company_details/operations/holdings/`,
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

// Viewing HoldingsDetail
export const viewHoldingsDetail = createAsyncThunk(
  "carbonCal/viewHoldingsDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `company_details/operations/holdings/?page=${page}&page_size=${page_size}`
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

// Editing HoldingsDetail
export const editHoldingsDetail = createAsyncThunk(
  "carbonCal/editHoldingsDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `company_details/operations/holdings/${id}/`,
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

// Deleting  HoldingsDetail
export const deleteHoldingsDetails = createAsyncThunk(
  "carbonCal/deleteHoldingsDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `company_details/operations/holdings/${id}/`
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

const HoldingsSlice = createSlice({
  name: "HoldingsSliceDetails",
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
    clearHoldingsSuccessMessage: (state) => {
      state.success = "";
    },
    clearHoldingsErrorMessage: (state) => {
      state.error = "";
    },
    clearStates: (state) => {
      state.data = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addHoldingsDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addHoldingsDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addHoldingsDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewHoldingsDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewHoldingsDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewHoldingsDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editHoldingsDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editHoldingsDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editHoldingsDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteHoldingsDetails.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deleteHoldingsDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = {
        ...state.viewReport,
        data: state.viewReport.data.filter(
          (item) => item.id !== action.payload.id
        ),
      };
      state.success = "Data deleted successfully";
    });
    builder.addCase(deleteHoldingsDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error);
    });
  },
});

export const {
  clearHoldingsSuccessMessage,
  clearHoldingsErrorMessage,
  clearStates,
} = HoldingsSlice.actions;
export default HoldingsSlice.reducer;
