import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";

// Adding ExportDetail
export const addMonetaryDetail = createAsyncThunk(
  "carbonCal/postAddMonetaryDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `workplace/policies_and_penalties/penalty_Monetary/`,
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
export const viewMonetaryDetail = createAsyncThunk(
  "carbonCal/viewMonetaryDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `workplace/policies_and_penalties/penalty_Monetary/?page=${page}&page_size=${page_size}`
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
export const editMonetaryDetail = createAsyncThunk(
  "carbonCal/putEditMonetaryDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `workplace/policies_and_penalties/penalty_Monetary/${id}/`,
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
export const deleteMonetaryDetail = createAsyncThunk(
  "carbonCal/deleteMonetaryDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `workplace/policies_and_penalties/penalty_Monetary/${id}/`
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
export const filterMonetary = createAsyncThunk(
    "carbonCal/filterMonetary",
    async ({ page, page_size, Financial_Year }) => {
      try {
        const response = await apiService.get(
          `workplace/policies_and_penalties/penalty_Monetary/?financial_year=${Financial_Year}&page=${page}&page_size=${page_size}`
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


const MonetarySlice = createSlice({
  name: "MonetaryDetails",
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
    builder.addCase(addMonetaryDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addMonetaryDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addMonetaryDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });


    builder.addCase(viewMonetaryDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewMonetaryDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewMonetaryDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editMonetaryDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editMonetaryDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editMonetaryDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteMonetaryDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deleteMonetaryDetail.fulfilled, (state, action) => {
        state.loading = false;
        // state.viewReport = {
        //   ...state.viewReport,
        //   data: state.viewReport.data.filter(
        //     (item) => item.id !== action.payload.id
        //   ),
        // };
        state.data = action.payload;

        state.success = "Data deleted successfully";
    });
    builder.addCase(deleteMonetaryDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error);
    });

    builder.addCase(filterMonetary.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = "";
      });
      builder.addCase(filterMonetary.fulfilled, (state, action) => {
        state.loading = false;
        state.viewReport = action.payload;
        state.total_page = action.payload.count;
      });
      builder.addCase(filterMonetary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
  MonetarySlice.actions;
export default MonetarySlice.reducer;

