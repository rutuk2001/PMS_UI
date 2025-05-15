import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../services/apiService";

// Adding addDetailsCorporateSocialResponsibilityDetail
export const addDetailsCorporateSocialResponsibilityDetail = createAsyncThunk(
  "carbonCal/addDetailsCorporateSocialResponsibilitylDetail",
  async (data, { rejectWithValue }) => {
    console.log(data)
    try {
      const response = await apiService.post(
        `community/corporate_Social_Responsibility_Details/`,
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

// Viewing DetailsCorporateSocialResponsibilityDetail
export const viewDetailsCorporateSocialResponsibilityDetail = createAsyncThunk(
  "carbonCal/viewDetailsCorporateSocialResponsibilityDetail",
  async () => {
    try {
      const response = await apiService.get(
        `community/corporate_Social_Responsibility_Details/`
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

const DetailsCorporateSocialResponsibilitySlice = createSlice({
  name: "DetailsCorporateSocialResponsibilityDetails",
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
    clearDetailsCorporateSocialResponsibilitySuccessMessage: (state) => {
      state.success = "";
    },
    clearDetailsCorporateSocialResponsibilityErrorMessage: (state) => {
      state.error = "";
    },
    clearStates: (state) => {
      state.data = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addDetailsCorporateSocialResponsibilityDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addDetailsCorporateSocialResponsibilityDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addDetailsCorporateSocialResponsibilityDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewDetailsCorporateSocialResponsibilityDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewDetailsCorporateSocialResponsibilityDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewDetailsCorporateSocialResponsibilityDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {
  clearDetailsCorporateSocialResponsibilitySuccessMessage,
  clearDetailsCorporateSocialResponsibilityErrorMessage,
  clearStates,
} = DetailsCorporateSocialResponsibilitySlice.actions;
export default DetailsCorporateSocialResponsibilitySlice.reducer;
