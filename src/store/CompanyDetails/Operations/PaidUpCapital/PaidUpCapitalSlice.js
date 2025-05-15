import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";

// Adding addPaidUpCapitalDetail
export const addPaidUpCapitalDetail = createAsyncThunk(
  "carbonCal/addPaidUpCapitalDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `company_details/operations/paid_up_capital/`,
        data
      );
      if (
        response.status === 400 ||
        response.status === 500 ||
        response.status === 404
      ) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      } else {
        const responseData = await response.json();
        return responseData;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Viewing PaidUpCapitalDetail
export const viewPaidUpCapitalDetail = createAsyncThunk(
  "carbonCal/viewPaidUpCapitalDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `company_details/operations/paid_up_capital/?page=${page}&page_size=${page_size}`
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

// Editing PaidUpCapitalDetail
export const editPaidUpCapitalDetail = createAsyncThunk(
  "carbonCal/editPaidUpCapitalDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `company_details/operations/paid_up_capital/${id}/`,
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

// Deleting  PaidUpCapitalDetail
export const deletePaidUpCapitalDetails = createAsyncThunk(
  "carbonCal/deletePaidUpCapitalDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `company_details/operations/paid_up_capital/${id}/`
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

const PaidUpCapitalSlice = createSlice({
  name: "PaidUpCapitalSliceDetails",
  initialState: {
    success: "",
    error: "",
    loading: false,
    data: [],
    viewReport: [],
    count: [],
    total_page: [],
    addCapitalError:"",
  },
  reducers: {
    clearPaidUpCapitalSuccessMessage: (state) => {
      state.success = "";
    },
    clearPaidUpCapitalErrorMessage: (state) => {
      state.error = "";
      state.addCapitalError = "";
    },
    clearStates: (state) => {
      state.data = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addPaidUpCapitalDetail.pending, (state) => {
      state.loading = true;
      state.addCapitalError = "";
      state.success = "";
    });
    builder.addCase(addPaidUpCapitalDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addPaidUpCapitalDetail.rejected, (state, action) => {
      state.loading = false;
      state.addCapitalError = action.payload;
    });

    builder.addCase(viewPaidUpCapitalDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewPaidUpCapitalDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewPaidUpCapitalDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editPaidUpCapitalDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editPaidUpCapitalDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editPaidUpCapitalDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deletePaidUpCapitalDetails.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deletePaidUpCapitalDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = {
        ...state.viewReport,
        data: state.viewReport.data.filter(
          (item) => item.id !== action.payload.id
        ),
      };
      state.success = "Data deleted successfully";
    });
    builder.addCase(deletePaidUpCapitalDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error);
    });
  },
});

export const {
  clearPaidUpCapitalSuccessMessage,
  clearPaidUpCapitalErrorMessage,
  clearStates,
} = PaidUpCapitalSlice.actions;
export default PaidUpCapitalSlice.reducer;
