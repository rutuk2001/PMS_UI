

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";



// Adding ExportDetail
export const addAssmentExtAgencyEmissionDetail = createAsyncThunk(
    "carbonCal/postAddAssmentExtAgencyEmissionDetail",
    async (data, { rejectWithValue }) => {
      try {
        const response = await apiService.post(
          `environment/emissions/Overall/Assessment_By_External_Agency/`,
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
  export const viewAssmentExtAgencyEmissionDetail = createAsyncThunk(
    "carbonCal/viewAssmentExtAgencyEmissionDetail",
    async ({ page, page_size }) => {
      try {
        const response = await apiService.get(
          `environment/emissions/Overall/Assessment_By_External_Agency/?page=${page}&page_size=${page_size}`
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
  export const editAssmentExtAgencyEmissionDetail = createAsyncThunk(
    "carbonCal/putEditAssmentExtAgencyEmissionDetail",
    async ({ id, data }, { rejectWithValue }) => {
      try {
        const response = await apiService.put(
          `environment/emissions/Overall/Assessment_By_External_Agency/${id}/`,
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
  export const deleteAssmentExtAgencyEmissionDetail = createAsyncThunk(
    "carbonCal/deleteAssmentExtAgencyEmissionDetail",
    async (id, { rejectWithValue }) => {
      try {
        const response = await apiService.delete(
          `environment/emissions/Overall/Assessment_By_External_Agency/${id}/`
        );
        if (
          response.status === 400 ||
          response.status === 500 ||
          response.status === 404
        ) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        } 
        
        else if (response.status === 204) {
          return { id };
        }
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  

const AssessmentExternalAgencyEmissionSlice = createSlice({
  name: "AssessmentExternalAgencyEmissionDetail",
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
    
    builder.addCase(addAssmentExtAgencyEmissionDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addAssmentExtAgencyEmissionDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addAssmentExtAgencyEmissionDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewAssmentExtAgencyEmissionDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewAssmentExtAgencyEmissionDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewAssmentExtAgencyEmissionDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    
    builder.addCase(editAssmentExtAgencyEmissionDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editAssmentExtAgencyEmissionDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editAssmentExtAgencyEmissionDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteAssmentExtAgencyEmissionDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deleteAssmentExtAgencyEmissionDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;

      state.success="Data deleted successfully"
    });
    builder.addCase(deleteAssmentExtAgencyEmissionDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error)
    });
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
  AssessmentExternalAgencyEmissionSlice.actions;
export default AssessmentExternalAgencyEmissionSlice.reducer;
