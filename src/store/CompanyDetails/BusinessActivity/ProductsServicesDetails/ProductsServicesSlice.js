import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";



// Adding ProductsServicesDetail
export const addProductsServicesDetail = createAsyncThunk(
  "carbonCal/postAddProductsServicesDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `company_details/business_activity/products_services_details/`,
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

// Viewing ProductsServicesDetail
export const viewProductsServicesDetail = createAsyncThunk(
  "carbonCal/viewProductsServicesDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `company_details/business_activity/products_services_details/?page=${page}&page_size=${page_size}`
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

// Editing ProductsServicesDetail
export const editProductsServicesDetail = createAsyncThunk(
  "carbonCal/putEditProductsServicesDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `company_details/business_activity/products_services_details/${id}/`,
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

// Deleting ProductsServicesDetail
export const deleteProductsServicesDetail = createAsyncThunk(
  "carbonCal/deleteProductsServicesDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `company_details/business_activity/products_services_details/${id}/`
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

const ProductsServicesSlice = createSlice({
  name: "ProductsServicesDetailsSlice",
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
    
    builder.addCase(addProductsServicesDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addProductsServicesDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addProductsServicesDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewProductsServicesDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewProductsServicesDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewProductsServicesDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editProductsServicesDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editProductsServicesDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editProductsServicesDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteProductsServicesDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deleteProductsServicesDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = {
        ...state.viewReport,
        data: state.viewReport.data.filter(item => item.id !== action.payload.id)
      };
      state.success="Data deleted successfully"
    });
    builder.addCase(deleteProductsServicesDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error)
    });
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
  ProductsServicesSlice.actions;
export default ProductsServicesSlice.reducer;
