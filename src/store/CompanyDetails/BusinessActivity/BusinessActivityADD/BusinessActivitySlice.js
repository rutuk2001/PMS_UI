import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";



// Adding BusinessActivitySliceDetails
export const addBusinessActivitySliceDetails = createAsyncThunk(
  "carbonCal/postBusinessActivitySliceDetails",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `company_details/business_activity/business_activity/`,
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

// Viewing BusinessActivitySliceDetails
export const viewBusinessActivitySliceDetails = createAsyncThunk(
  "carbonCal/viewBusinessActivitySliceDetails",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `company_details/business_activity/business_activity/?page=${page}&page_size=${page_size}`
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

// Editing BusinessActivitySliceDetails
export const editBusinessActivitySliceDetails = createAsyncThunk(
  "carbonCal/putEditBusinessActivitySliceDetails",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `company_details/business_activity/business_activity/${id}/`,
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

// Deleting BusinessActivitySliceDetails
export const deleteBusinessActivitySliceDetails = createAsyncThunk(
  "carbonCal/deleteBusinessActivitySliceDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `company_details/business_activity/business_activity/${id}/`
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

const BusinessActivitySlice = createSlice({
  name: "BASliceDetails",
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
    
    builder.addCase(addBusinessActivitySliceDetails.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addBusinessActivitySliceDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addBusinessActivitySliceDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewBusinessActivitySliceDetails.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewBusinessActivitySliceDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewBusinessActivitySliceDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editBusinessActivitySliceDetails.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editBusinessActivitySliceDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editBusinessActivitySliceDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteBusinessActivitySliceDetails.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deleteBusinessActivitySliceDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = {
        ...state.viewReport,
        data: state.viewReport.data.filter(item => item.id !== action.payload.id)
      };
      state.success="Data deleted successfully"
    });
    builder.addCase(deleteBusinessActivitySliceDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error)
    });
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
  BusinessActivitySlice.actions;
export default BusinessActivitySlice.reducer;
