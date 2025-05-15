import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";

// Adding addPPHumanAndRightsPolicyDetail
export const addPPHumanAndRightsPolicyDetail = createAsyncThunk(
  "carbonCal/addPPHumanAndRightsPolicylDetail",
  async (data, { rejectWithValue }) => {
    console.log(data)
    try {
      const response = await apiService.post(
        `workplace/policies_and_penalties/policies_human_rights/`,
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

// Viewing PPHumanAndRightsPolicyDetail
export const viewPPHumanAndRightsPolicyDetail = createAsyncThunk(
  "carbonCal/viewPPHumanAndRightsPolicyDetail",
  async () => {
    try {
      const response = await apiService.get(
        `workplace/policies_and_penalties/policies_human_rights/`
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

const PPHumanAndRightsPolicySlice = createSlice({
  name: "PPHumanAndRightsPolicyDetails",
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
    clearPPHumanAndRightsPolicySuccessMessage: (state) => {
      state.success = "";
    },
    clearPPHumanAndRightsPolicyErrorMessage: (state) => {
      state.error = "";
    },
    clearStates: (state) => {
      state.data = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addPPHumanAndRightsPolicyDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addPPHumanAndRightsPolicyDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addPPHumanAndRightsPolicyDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewPPHumanAndRightsPolicyDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewPPHumanAndRightsPolicyDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewPPHumanAndRightsPolicyDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {
  clearPPHumanAndRightsPolicySuccessMessage,
  clearPPHumanAndRightsPolicyErrorMessage,
  clearStates,
} = PPHumanAndRightsPolicySlice.actions;
export default PPHumanAndRightsPolicySlice.reducer;
