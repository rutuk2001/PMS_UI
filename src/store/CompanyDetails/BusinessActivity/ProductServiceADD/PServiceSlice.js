import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";



// Adding PServicesDetail
export const addPServicesDetail = createAsyncThunk(
  "carbonCal/postAddPServicesDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `company_details/business_activity/products_services/`,
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

// Viewing PServicesDetail
export const viewPServicesDetail = createAsyncThunk(
  "carbonCal/viewPServicesDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `company_details/business_activity/products_services/?page=${page}&page_size=${page_size}`
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

// Editing PServicesDetail
export const editPServicesDetail = createAsyncThunk(
  "carbonCal/putEditPServicesDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `company_details/business_activity/products_services/${id}/`,
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

// Deleting PServicesDetail
export const deletePServicesDetail = createAsyncThunk(
  "carbonCal/deletePServicesDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `company_details/business_activity/products_services/${id}/`
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

const PServicesSlice = createSlice({
  name: "PServiceSliceDetail",
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
    
    builder.addCase(addPServicesDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addPServicesDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addPServicesDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewPServicesDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewPServicesDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewPServicesDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editPServicesDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editPServicesDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editPServicesDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deletePServicesDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deletePServicesDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = {
        ...state.viewReport,
        data: state.viewReport.data.filter(item => item.id !== action.payload.id)
      };
      state.success="Data deleted successfully"
    });
    builder.addCase(deletePServicesDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error)
    });
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
  PServicesSlice.actions;
export default PServicesSlice.reducer;
