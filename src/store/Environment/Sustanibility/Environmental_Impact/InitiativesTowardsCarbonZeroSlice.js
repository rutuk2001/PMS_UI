
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";



// Adding ExportDetail
export const addInitiativesTowardsCarbonZeroDetail = createAsyncThunk(
    "carbonCal/postAddInitiativesTowardsCarbonZeroDetail",
    async (data, { rejectWithValue }) => {
      try {
        const response = await apiService.post(
          `environment/sustainability/environmental_impact/initiatives_towards_carbon_zero/`,
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
  export const viewInitiativesTowardsCarbonZeroDetail = createAsyncThunk(
    "carbonCal/viewInitiativesTowardsCarbonZeroDetail",
    async ({ page, page_size }) => {
      try {
        const response = await apiService.get(
          `environment/sustainability/environmental_impact/initiatives_towards_carbon_zero/?page=${page}&page_size=${page_size}`
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
  export const editInitiativesTowardsCarbonZeroDetail = createAsyncThunk(
    "carbonCal/putEditInitiativesTowardsCarbonZeroDetail",
    async ({ id, data }, { rejectWithValue }) => {
      try {
        const response = await apiService.put(
          `environment/sustainability/environmental_impact/initiatives_towards_carbon_zero/${id}/`,
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
  export const deleteInitiativesTowardsCarbonZeroDetail = createAsyncThunk(
    "carbonCal/deleteInitiativesTowardsCarbonZeroDetail",
    async (id, { rejectWithValue }) => {
      try {
        const response = await apiService.delete(
          `environment/sustainability/environmental_impact/initiatives_towards_carbon_zero/${id}/`
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
  

const InitiativesTowardsCarbonZeroSlice = createSlice({
  name: "InitiativesTowardsCarbonZeroDetails",
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
    
    builder.addCase(addInitiativesTowardsCarbonZeroDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addInitiativesTowardsCarbonZeroDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addInitiativesTowardsCarbonZeroDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewInitiativesTowardsCarbonZeroDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewInitiativesTowardsCarbonZeroDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewInitiativesTowardsCarbonZeroDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    
    builder.addCase(editInitiativesTowardsCarbonZeroDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editInitiativesTowardsCarbonZeroDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editInitiativesTowardsCarbonZeroDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteInitiativesTowardsCarbonZeroDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deleteInitiativesTowardsCarbonZeroDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;

      state.success="Data deleted successfully"
    });
    builder.addCase(deleteInitiativesTowardsCarbonZeroDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error)
    });
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
  InitiativesTowardsCarbonZeroSlice.actions;
export default InitiativesTowardsCarbonZeroSlice.reducer;



