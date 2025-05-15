import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";

// Adding addpoliciesAndProjectDetail
export const addpoliciesAndProjectDetail = createAsyncThunk(
  "carbonCal/addpoliciesAndProjectlDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `descriptions/descriptions_project_policies/`,
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

// Viewing policiesAndProjectDetail
export const viewpoliciesAndProjectDetail = createAsyncThunk(
  "carbonCal/viewpoliciesAndProjectDetail",
  async () => {
    try {
      const response = await apiService.get(
        `descriptions/descriptions_project_policies/`
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

const policiesAndProjectSlice = createSlice({
  name: "policiesAndProjectSliceDetails",
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
    clearpoliciesAndProjectSuccessMessage: (state) => {
      state.success = "";
    },
    clearpoliciesAndProjectErrorMessage: (state) => {
      state.error = "";
    },
    clearStates: (state) => {
      state.data = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addpoliciesAndProjectDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addpoliciesAndProjectDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addpoliciesAndProjectDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewpoliciesAndProjectDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewpoliciesAndProjectDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewpoliciesAndProjectDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {
  clearpoliciesAndProjectSuccessMessage,
  clearpoliciesAndProjectErrorMessage,
  clearStates,
} = policiesAndProjectSlice.actions;
export default policiesAndProjectSlice.reducer;
