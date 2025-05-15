import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../services/apiService";

// Adding addtop10_TIC
export const addtop10_TICDetail = createAsyncThunk(
  "carbonCal/addtop10_TIClDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `community/Top_10_Trade_And_Industry_Chambers/`,
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

// Viewing top10_TICDetail
export const viewtop10_TICDetail = createAsyncThunk(
  "carbonCal/viewtop10_TICDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `community/Top_10_Trade_And_Industry_Chambers/?page=${page}&page_size=${page_size}`
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

// Editing top10_TICDetail
export const edittop10_TICDetail = createAsyncThunk(
  "carbonCal/edittop10_TICDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `community/Top_10_Trade_And_Industry_Chambers/${id}/`,
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

// Deleting  top10_TICDetail
export const deletetop10_TICDetails = createAsyncThunk(
  "carbonCal/deletetop10_TICDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `community/Top_10_Trade_And_Industry_Chambers/${id}/`
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

const top10_TICSlice = createSlice({
  name: "top10_TICSliceDetails",
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
    cleartop10_TICSuccessMessage: (state) => {
      state.success = "";
    },
    cleartop10_TICErrorMessage: (state) => {
      state.error = "";
    },
    clearStates: (state) => {
      state.data = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addtop10_TICDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addtop10_TICDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addtop10_TICDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewtop10_TICDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewtop10_TICDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewtop10_TICDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(edittop10_TICDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(edittop10_TICDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(edittop10_TICDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deletetop10_TICDetails.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deletetop10_TICDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = {
        ...state.viewReport,
        data: state.viewReport.data.filter(
          (item) => item.id !== action.payload.id
        ),
      };
      state.success = "Data deleted successfully";
    });
    builder.addCase(deletetop10_TICDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error);
    });
  },
});

export const {
  cleartop10_TICSuccessMessage,
  cleartop10_TICErrorMessage,
  clearStates,
} = top10_TICSlice.actions;
export default top10_TICSlice.reducer;
