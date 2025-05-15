import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";

// Adding ExportDetail
export const addNonMonetaryDetail = createAsyncThunk(
  "carbonCal/postAddNonMonetaryDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `workplace/policies_and_penalties/penalty_non_monetary/`,
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
export const viewNonMonetaryDetail = createAsyncThunk(
  "carbonCal/viewNonMonetaryDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `workplace/policies_and_penalties/penalty_non_monetary/?page=${page}&page_size=${page_size}`
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
export const editNonMonetaryDetail = createAsyncThunk(
  "carbonCal/putEditNonMonetaryDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `workplace/policies_and_penalties/penalty_non_monetary/${id}/`,
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
export const deleteNonMonetaryDetail = createAsyncThunk(
  "carbonCal/deleteNonMonetaryDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `workplace/policies_and_penalties/penalty_non_monetary/${id}/`
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
export const filterNonMonetary = createAsyncThunk(
    "carbonCal/filterNonMonetary",
    async ({ page, page_size, Financial_Year }) => {
      try {
        const response = await apiService.get(
          `workplace/policies_and_penalties/penalty_non_monetary/?financial_year=${Financial_Year}&page=${page}&page_size=${page_size}`
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


const NonMonetarySlice = createSlice({
  name: "NonMonetaryDetails",
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
    builder.addCase(addNonMonetaryDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addNonMonetaryDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addNonMonetaryDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });


    builder.addCase(viewNonMonetaryDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewNonMonetaryDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewNonMonetaryDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editNonMonetaryDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editNonMonetaryDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editNonMonetaryDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteNonMonetaryDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deleteNonMonetaryDetail.fulfilled, (state, action) => {
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
    builder.addCase(deleteNonMonetaryDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error);
    });

    builder.addCase(filterNonMonetary.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = "";
      });
      builder.addCase(filterNonMonetary.fulfilled, (state, action) => {
        state.loading = false;
        state.viewReport = action.payload;
        state.total_page = action.payload.count;
      });
      builder.addCase(filterNonMonetary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
  NonMonetarySlice.actions;
export default NonMonetarySlice.reducer;

