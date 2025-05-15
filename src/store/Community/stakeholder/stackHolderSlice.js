import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../services/apiService";

// Adding addStackHolder
export const addEditStackHolderDetail = createAsyncThunk(
  "carbonCal/addEditStackHolderDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `community/stakeholder_Details/`,
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

// Viewing StackHolderDetail
export const viewStackHolderDetail = createAsyncThunk(
  "carbonCal/viewStackHolderDetail",
  async () => {
    try {
      const response = await apiService.get(`community/stakeholder_Details/`);

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

const StackHolderSlice = createSlice({
  name: "StackHolderSliceDetails",
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
    clearStackHolderSuccessMessage: (state) => {
      state.success = "";
    },
    clearStackHolderErrorMessage: (state) => {
      state.error = "";
    },
    clearStates: (state) => {
      state.data = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addEditStackHolderDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addEditStackHolderDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addEditStackHolderDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewStackHolderDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewStackHolderDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewStackHolderDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {
  clearStackHolderSuccessMessage,
  clearStackHolderErrorMessage,
  clearStates,
} = StackHolderSlice.actions;
export default StackHolderSlice.reducer;
