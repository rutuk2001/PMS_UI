import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../services/apiService";


// Adding ExportDetail
export const addDetailsOfSocialImpactAssessmentsDetail = createAsyncThunk(
  "carbonCal/postAddDetailsOfSocialImpactAssessmentsDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `community/details_of_social_impact_assessments/`,
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
export const viewDetailsOfSocialImpactAssessmentsDetail = createAsyncThunk(
  "carbonCal/viewDetailsOfSocialImpactAssessmentsDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `community/details_of_social_impact_assessments/?page=${page}&page_size=${page_size}`
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
export const editDetailsOfSocialImpactAssessmentsDetail = createAsyncThunk(
  "carbonCal/putEditDetailsOfSocialImpactAssessmentsDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `community/details_of_social_impact_assessments/${id}/`,
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
export const deleteDetailsOfSocialImpactAssessmentsDetail = createAsyncThunk(
  "carbonCal/deleteDetailsOfSocialImpactAssessmentsDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `community/details_of_social_impact_assessments/${id}/`
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


const DetailsOfSocialImpactAssessmentsSlice = createSlice({
  name: "DetailsOfSocialImpactAssessmentsDetails",
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
    builder.addCase(addDetailsOfSocialImpactAssessmentsDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addDetailsOfSocialImpactAssessmentsDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addDetailsOfSocialImpactAssessmentsDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });


    builder.addCase(viewDetailsOfSocialImpactAssessmentsDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewDetailsOfSocialImpactAssessmentsDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewDetailsOfSocialImpactAssessmentsDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editDetailsOfSocialImpactAssessmentsDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editDetailsOfSocialImpactAssessmentsDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editDetailsOfSocialImpactAssessmentsDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteDetailsOfSocialImpactAssessmentsDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deleteDetailsOfSocialImpactAssessmentsDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.viewReport = {
          ...state.viewReport,
          data: state.viewReport.data.filter(
            (item) => item.id !== action.payload.id
          ),
        };
        state.success = "Data deleted successfully";
    });
    builder.addCase(deleteDetailsOfSocialImpactAssessmentsDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error);
    });


      
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
  DetailsOfSocialImpactAssessmentsSlice.actions;
export default DetailsOfSocialImpactAssessmentsSlice.reducer;

