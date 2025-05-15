import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";

// Adding addPPHAndSProjectAndPolicyDetail
export const addPPHAndSProjectAndPolicyDetail = createAsyncThunk(
  "carbonCal/addPPHAndSProjectAndPolicylDetail",
  async (data, { rejectWithValue }) => {
    console.log(data)
    try {
      const response = await apiService.post(
        `workplace/policies_and_penalties/policies_human_safety/`,
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

// Viewing PPHAndSProjectAndPolicyDetail
export const viewPPHAndSProjectAndPolicyDetail = createAsyncThunk(
  "carbonCal/viewPPHAndSProjectAndPolicyDetail",
  async () => {
    try {
      const response = await apiService.get(
        `workplace/policies_and_penalties/policies_human_safety/`
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

const PPHealthAndSafetyProjectAndPolicySlice = createSlice({
  name: "PPHealthAndSafetyProjectAndPolicyDetails",
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
    clearPPHAndSProjectAndPolicySuccessMessage: (state) => {
      state.success = "";
    },
    clearPPHAndSProjectAndPolicyErrorMessage: (state) => {
      state.error = "";
    },
    clearStates: (state) => {
      state.data = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addPPHAndSProjectAndPolicyDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addPPHAndSProjectAndPolicyDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addPPHAndSProjectAndPolicyDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewPPHAndSProjectAndPolicyDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewPPHAndSProjectAndPolicyDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewPPHAndSProjectAndPolicyDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {
  clearPPHAndSProjectAndPolicySuccessMessage,
  clearPPHAndSProjectAndPolicyErrorMessage,
  clearStates,
} = PPHealthAndSafetyProjectAndPolicySlice.actions;
export default PPHealthAndSafetyProjectAndPolicySlice.reducer;
