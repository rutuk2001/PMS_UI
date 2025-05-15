import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../services/apiService";

// Adding addConsumerDetailsDetail
export const addConsumerDetailsDetail = createAsyncThunk(
  "carbonCal/addConsumerDetailslDetail",
  async (data, { rejectWithValue }) => {
    console.log(data)
    try {
      const response = await apiService.post(
        `community/consumer_Details/`,
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

// Viewing ConsumerDetailsDetail
export const viewConsumerDetailsDetail = createAsyncThunk(
  "carbonCal/viewConsumerDetailsDetail",
  async () => {
    try {
      const response = await apiService.get(
        `community/consumer_Details/`
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

const ConsumerDetailsSlice = createSlice({
  name: "ConsumerDetailsDetails",
  initialState: {
    success: "",
    error: "",
    loading: false,
    data: [],
    viewReport: "",
    count: [],
    total_page: [],
  },
  reducers: {
    clearConsumerDetailsSuccessMessage: (state) => {
      state.success = "";
    },
    clearConsumerDetailsErrorMessage: (state) => {
      state.error = "";
    },
    clearStates: (state) => {
      state.data = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addConsumerDetailsDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addConsumerDetailsDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addConsumerDetailsDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewConsumerDetailsDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewConsumerDetailsDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewConsumerDetailsDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {
  clearConsumerDetailsSuccessMessage,
  clearConsumerDetailsErrorMessage,
  clearStates,
} = ConsumerDetailsSlice.actions;
export default ConsumerDetailsSlice.reducer;
