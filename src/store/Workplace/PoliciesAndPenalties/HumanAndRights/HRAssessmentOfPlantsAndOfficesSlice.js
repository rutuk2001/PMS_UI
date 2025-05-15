
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";

// Adding ExportDetail
export const addHRAssessmentOfPlantsAndOfficesDetail = createAsyncThunk(
  "carbonCal/postAddHRAssessmentOfPlantsAndOfficesDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `workplace/policies_and_penalties/assessment_of_plants_and_offices/`,
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
export const viewHRAssessmentOfPlantsAndOfficesDetail = createAsyncThunk(
  "carbonCal/viewHRAssessmentOfPlantsAndOfficesDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `workplace/policies_and_penalties/assessment_of_plants_and_offices/?page=${page}&page_size=${page_size}`
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
export const editHRAssessmentOfPlantsAndOfficesDetail = createAsyncThunk(
  "carbonCal/putEditHRAssessmentOfPlantsAndOfficesDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `workplace/policies_and_penalties/assessment_of_plants_and_offices/${id}/`,
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
export const deleteHRAssessmentOfPlantsAndOfficesDetail = createAsyncThunk(
  "carbonCal/deleteHRAssessmentOfPlantsAndOfficesDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `workplace/policies_and_penalties/assessment_of_plants_and_offices/${id}/`
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


const HRAssessmentOfPlantsAndOfficesSlice = createSlice({
  name: "HRAssessmentOfPlantsAndOfficesDetails",
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
    builder.addCase(addHRAssessmentOfPlantsAndOfficesDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addHRAssessmentOfPlantsAndOfficesDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addHRAssessmentOfPlantsAndOfficesDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });


    builder.addCase(viewHRAssessmentOfPlantsAndOfficesDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewHRAssessmentOfPlantsAndOfficesDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewHRAssessmentOfPlantsAndOfficesDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editHRAssessmentOfPlantsAndOfficesDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editHRAssessmentOfPlantsAndOfficesDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editHRAssessmentOfPlantsAndOfficesDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteHRAssessmentOfPlantsAndOfficesDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deleteHRAssessmentOfPlantsAndOfficesDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
  
        state.success = "Data deleted successfully";
    });
    builder.addCase(deleteHRAssessmentOfPlantsAndOfficesDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error);
    });


      
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
  HRAssessmentOfPlantsAndOfficesSlice.actions;
export default HRAssessmentOfPlantsAndOfficesSlice.reducer;

