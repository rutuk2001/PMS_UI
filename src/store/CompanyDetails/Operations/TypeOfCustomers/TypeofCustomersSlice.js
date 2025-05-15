import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";

// Adding TypeOfCustomerDetail
export const addTypeOfCustomerDetail = createAsyncThunk(
  "carbonCal/addTypeOfCustomerDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(`descriptions/`, data);
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

// Viewing TypeOfCustomerDetail
export const viewTypeOfCustomerDetail = createAsyncThunk(
  "carbonCal/viewTypeOfCustomerDetail",
  async () => {
    try {
      const response = await apiService.get(`descriptions/`);

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

//Editing TypeOfCustomerDetail
export const editTypeOfCustomerDetail = createAsyncThunk(
  "carbonCal/editTypeOfCustomerDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(`descriptions/${id}/`, data);
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

const TypesOfCustomersSlice = createSlice({
  name: "TypesOfCustomersDetailsSlice",
  initialState: {
    success: "",
    error: "",
    loading: false,
    data: [],
    viewReport: [],
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
    builder.addCase(addTypeOfCustomerDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addTypeOfCustomerDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addTypeOfCustomerDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewTypeOfCustomerDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewTypeOfCustomerDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewTypeOfCustomerDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editTypeOfCustomerDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editTypeOfCustomerDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editTypeOfCustomerDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
  TypesOfCustomersSlice.actions;
export default TypesOfCustomersSlice.reducer;
