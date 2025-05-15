
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";



// Adding ExportDetail
export const addNonComplianceWithAppEnvLawDetail = createAsyncThunk(
    "carbonCal/postAddNonComplianceWithAppEnvLawDetail",
    async (data, { rejectWithValue }) => {
      try {
        const response = await apiService.post(
          `environment/sustainability/environmental_impact/non_compliance_with_the_applicable_environmental_law/`,
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
  export const viewNonComplianceWithAppEnvLawDetail = createAsyncThunk(
    "carbonCal/viewNonComplianceWithAppEnvLawDetail",
    async ({ page, page_size }) => {
      try {
        const response = await apiService.get(
          `environment/sustainability/environmental_impact/non_compliance_with_the_applicable_environmental_law/?page=${page}&page_size=${page_size}`
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
  export const editNonComplianceWithAppEnvLawDetail = createAsyncThunk(
    "carbonCal/putEditNonComplianceWithAppEnvLawDetail",
    async ({ id, data }, { rejectWithValue }) => {
      try {
        const response = await apiService.put(
          `environment/sustainability/environmental_impact/non_compliance_with_the_applicable_environmental_law/${id}/`,
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
  export const deleteNonComplianceWithAppEnvLawDetail = createAsyncThunk(
    "carbonCal/deleteNonComplianceWithAppEnvLawDetail",
    async (id, { rejectWithValue }) => {
      try {
        const response = await apiService.delete(
          `environment/sustainability/environmental_impact/non_compliance_with_the_applicable_environmental_law/${id}/`
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
  

const NonComplianceWithAppEnvLawsSlice = createSlice({
  name: "NonComplianceWithAppEnvLawDetails",
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
    
    builder.addCase(addNonComplianceWithAppEnvLawDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addNonComplianceWithAppEnvLawDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addNonComplianceWithAppEnvLawDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewNonComplianceWithAppEnvLawDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewNonComplianceWithAppEnvLawDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewNonComplianceWithAppEnvLawDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    
    builder.addCase(editNonComplianceWithAppEnvLawDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editNonComplianceWithAppEnvLawDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editNonComplianceWithAppEnvLawDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteNonComplianceWithAppEnvLawDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deleteNonComplianceWithAppEnvLawDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;

      state.success="Data deleted successfully"
    });
    builder.addCase(deleteNonComplianceWithAppEnvLawDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error)
    });
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
  NonComplianceWithAppEnvLawsSlice.actions;
export default NonComplianceWithAppEnvLawsSlice.reducer;



