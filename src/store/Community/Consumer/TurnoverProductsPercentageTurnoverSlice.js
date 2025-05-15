import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../services/apiService";

// Adding ExportDetail
export const addTurnoverProdPrcentTurnoverDetail = createAsyncThunk(
  "carbonCal/postAddTurnoverProdPrcentTurnoverDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `community/turnover_Of_Products_As_A_Percentage_Of_Turnover/`,
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
export const viewTurnoverProdPrcentTurnoverDetail = createAsyncThunk(
  "carbonCal/viewTurnoverProdPrcentTurnoverDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `community/turnover_Of_Products_As_A_Percentage_Of_Turnover/?page=${page}&page_size=${page_size}`
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
export const editTurnoverProdPrcentTurnoverDetail = createAsyncThunk(
  "carbonCal/putEditTurnoverProdPrcentTurnoverDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `community/turnover_Of_Products_As_A_Percentage_Of_Turnover/${id}/`,
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
export const deleteTurnoverProdPrcentTurnoverDetail = createAsyncThunk(
  "carbonCal/deleteTurnoverProdPrcentTurnoverDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `community/turnover_Of_Products_As_A_Percentage_Of_Turnover/${id}/`
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


const TurnoverProductsPercentageTurnoverSlice = createSlice({
  name: "TurnoverProductsPercentageTurnoverDetails",
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
    builder.addCase(addTurnoverProdPrcentTurnoverDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addTurnoverProdPrcentTurnoverDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addTurnoverProdPrcentTurnoverDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });


    builder.addCase(viewTurnoverProdPrcentTurnoverDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewTurnoverProdPrcentTurnoverDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewTurnoverProdPrcentTurnoverDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editTurnoverProdPrcentTurnoverDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editTurnoverProdPrcentTurnoverDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editTurnoverProdPrcentTurnoverDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteTurnoverProdPrcentTurnoverDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deleteTurnoverProdPrcentTurnoverDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.viewReport = {
          ...state.viewReport,
          data: state.viewReport.data.filter(
            (item) => item.id !== action.payload.id
          ),
        };
        state.success = "Data deleted successfully";
    });
    builder.addCase(deleteTurnoverProdPrcentTurnoverDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error);
    });


      
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
  TurnoverProductsPercentageTurnoverSlice.actions;
export default TurnoverProductsPercentageTurnoverSlice.reducer;

