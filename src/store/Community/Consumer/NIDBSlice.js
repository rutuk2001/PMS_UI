import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../services/apiService";

// Adding ExportDetail
export const addNIDBDetail = createAsyncThunk(
  "carbonCal/postAddNIDBDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `community/number_of_instance_of_data_breache/`,
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
export const viewNIDBDetail = createAsyncThunk(
  "carbonCal/viewNIDBDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `community/number_of_instance_of_data_breache/?page=${page}&page_size=${page_size}`
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
export const editNIDBDetail = createAsyncThunk(
  "carbonCal/putEditNIDBDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `community/number_of_instance_of_data_breache/${id}/`,
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
export const deleteNIDBDetail = createAsyncThunk(
  "carbonCal/deleteNIDBDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `community/number_of_instance_of_data_breache/${id}/`
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

const NIDBSlice = createSlice({
  name: "NIDBDetails",
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
    builder.addCase(addNIDBDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addNIDBDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addNIDBDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewNIDBDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewNIDBDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewNIDBDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editNIDBDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editNIDBDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editNIDBDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteNIDBDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deleteNIDBDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = {
        ...state.viewReport,
        data: state.viewReport.data.filter(
          (item) => item.id !== action.payload.id
        ),
      };
      state.success = "Data deleted successfully";
    });
    builder.addCase(deleteNIDBDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error);
    });
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
  NIDBSlice.actions;
export default NIDBSlice.reducer;
