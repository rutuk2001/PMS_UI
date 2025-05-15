import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../services/apiService";

// Viewing all User Activity Logs
export const viewUserActivities = createAsyncThunk(
  "carbonCal/viewUserActivities",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `activity_log/?page=${page}&page_size=${page_size}`
      );

      if (response.status === 400) {
        throw new Error("Request failed: " + response.statusText);
      }

      return await response.json();
    } catch (error) {
      console.log(error, "error");
      console.error("Fetch error while fetching the user location:", error);
      throw error;
    }
  }
);

const UserActivitySlice = createSlice({
  name: "UserActivityDetails",
  initialState: {
    success: "",
    error: "",
    loading: false,
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
    builder.addCase(viewUserActivities.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewUserActivities.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewUserActivities.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
  UserActivitySlice.actions;
export default UserActivitySlice.reducer;
