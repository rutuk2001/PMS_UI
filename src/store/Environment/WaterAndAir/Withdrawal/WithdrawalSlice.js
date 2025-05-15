import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";

// Adding Withdrawal
export const addWithdrawal = createAsyncThunk(
  "carbonCal/postAddWithdrawal",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `environment/water/water_withdrawal_by_source/`,
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

// Viewing Withdrawal
export const viewWithdrawal = createAsyncThunk(
  "carbonCal/viewWithdrawal",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `environment/water/water_withdrawal_by_source/?page=${page}&page_size=${page_size}`
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

// Editing Withdrawal
export const editWithdrawal = createAsyncThunk(
  "carbonCal/putEditWithdrawal",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `environment/water/water_withdrawal_by_source/${id}/`,
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

// Deleting Withdrawal
export const deleteWithdrawal = createAsyncThunk(
  "carbonCal/deleteWithdrawal",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `environment/water/water_withdrawal_by_source/${id}/`
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

export const filterFacilityWithdrawal = createAsyncThunk(
  "carbonCal/filterFacilityWithdrawal",
  async ({ Facility, page, page_size }) => {
    try {
      const response = await apiService.get(
        `environment/water/water_withdrawal_by_source/?Facility=${Facility}&page=${page}&page_size=${page_size}`
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

const WithdrawalSlice = createSlice({
  name: "WithdrawalDetails",
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
    builder.addCase(addWithdrawal.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addWithdrawal.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addWithdrawal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewWithdrawal.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewWithdrawal.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewWithdrawal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editWithdrawal.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editWithdrawal.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editWithdrawal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteWithdrawal.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deleteWithdrawal.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = "Data deleted successfully";
    });
    builder.addCase(deleteWithdrawal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error);
    });

    builder.addCase(filterFacilityWithdrawal.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(filterFacilityWithdrawal.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
    });
    builder.addCase(filterFacilityWithdrawal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
  WithdrawalSlice.actions;
export default WithdrawalSlice.reducer;
