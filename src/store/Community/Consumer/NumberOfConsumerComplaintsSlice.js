import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../services/apiService";

// Adding ExportDetail
export const addNumberOfConsumerComplaintsDetail = createAsyncThunk(
  "carbonCal/postAddNumberOfConsumerComplaintsDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `community/number_of_Consumer_Complaints/`,
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
export const viewNumberOfConsumerComplaintsDetail = createAsyncThunk(
  "carbonCal/viewNumberOfConsumerComplaintsDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `community/number_of_Consumer_Complaints/?page=${page}&page_size=${page_size}`
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
export const editNumberOfConsumerComplaintsDetail = createAsyncThunk(
  "carbonCal/putEditNumberOfConsumerComplaintsDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `community/number_of_Consumer_Complaints/${id}/`,
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
export const deleteNumberOfConsumerComplaintsDetail = createAsyncThunk(
  "carbonCal/deleteNumberOfConsumerComplaintsDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `community/number_of_Consumer_Complaints/${id}/`
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


const NumberOfConsumerComplaintsSlice = createSlice({
  name: "NumberOfConsumerComplaintsDetails",
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
    builder.addCase(addNumberOfConsumerComplaintsDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addNumberOfConsumerComplaintsDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addNumberOfConsumerComplaintsDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });


    builder.addCase(viewNumberOfConsumerComplaintsDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewNumberOfConsumerComplaintsDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewNumberOfConsumerComplaintsDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editNumberOfConsumerComplaintsDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editNumberOfConsumerComplaintsDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editNumberOfConsumerComplaintsDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteNumberOfConsumerComplaintsDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deleteNumberOfConsumerComplaintsDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.viewReport = {
          ...state.viewReport,
          data: state.viewReport.data.filter(
            (item) => item.id !== action.payload.id
          ),
        };
        state.success = "Data deleted successfully";
    });
    builder.addCase(deleteNumberOfConsumerComplaintsDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error);
    });


      
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
  NumberOfConsumerComplaintsSlice.actions;
export default NumberOfConsumerComplaintsSlice.reducer;

