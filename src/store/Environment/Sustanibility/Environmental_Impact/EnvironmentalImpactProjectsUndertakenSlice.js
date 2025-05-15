
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";



// Adding ExportDetail
export const addEnvImpactProjectsUndertakenDetail = createAsyncThunk(
    "carbonCal/postAddEnvImpactProjectsUndertakenDetail",
    async (data, { rejectWithValue }) => {
      try {
        const response = await apiService.post(
          `environment/sustainability/environmental_impact/environmental_impact_assessments_of_projects_undertaken/`,
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
  export const viewEnvImpactProjectsUndertakenDetail = createAsyncThunk(
    "carbonCal/viewEnvImpactProjectsUndertakenDetail",
    async ({ page, page_size }) => {
      try {
        const response = await apiService.get(
          `environment/sustainability/environmental_impact/environmental_impact_assessments_of_projects_undertaken/?page=${page}&page_size=${page_size}`
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
  export const editEnvImpactProjectsUndertakenDetail = createAsyncThunk(
    "carbonCal/putEditEnvImpactProjectsUndertakenDetail",
    async ({ id, data }, { rejectWithValue }) => {
      try {
        const response = await apiService.put(
          `environment/sustainability/environmental_impact/environmental_impact_assessments_of_projects_undertaken/${id}/`,
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
  export const deleteEnvImpactProjectsUndertakenDetail = createAsyncThunk(
    "carbonCal/deleteEnvImpactProjectsUndertakenDetail",
    async (id, { rejectWithValue }) => {
      try {
        const response = await apiService.delete(
          `environment/sustainability/environmental_impact/environmental_impact_assessments_of_projects_undertaken/${id}/`
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
  

const EnvironmentalImpactProjectsUndertakenSlice = createSlice({
  name: "EnvImpactProjectsUndertakenDetails",
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
    
    builder.addCase(addEnvImpactProjectsUndertakenDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addEnvImpactProjectsUndertakenDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addEnvImpactProjectsUndertakenDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewEnvImpactProjectsUndertakenDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewEnvImpactProjectsUndertakenDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewEnvImpactProjectsUndertakenDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    
    builder.addCase(editEnvImpactProjectsUndertakenDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editEnvImpactProjectsUndertakenDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editEnvImpactProjectsUndertakenDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteEnvImpactProjectsUndertakenDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deleteEnvImpactProjectsUndertakenDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;

      state.success="Data deleted successfully"
    });
    builder.addCase(deleteEnvImpactProjectsUndertakenDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error)
    });
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
  EnvironmentalImpactProjectsUndertakenSlice.actions;
export default EnvironmentalImpactProjectsUndertakenSlice.reducer;



