import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../services/apiService";

// Adding addTDC
export const addTDCDetail = createAsyncThunk(
  "carbonCal/addTDClDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `community/transparency_and_disclosure_compliances/`,
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

// Viewing TDCDetail
export const viewTDCDetail = createAsyncThunk(
  "carbonCal/viewTDCDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `community/transparency_and_disclosure_compliances/?page=${page}&page_size=${page_size}`
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

// Editing TDCDetail
export const editTDCDetail = createAsyncThunk(
  "carbonCal/editTDCDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `community/transparency_and_disclosure_compliances/${id}/`,
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

// Deleting  TDCDetail
export const deleteTDCDetails = createAsyncThunk(
  "carbonCal/deleteTDCDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `community/transparency_and_disclosure_compliances/${id}/`
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

const TDCSlice = createSlice({
  name: "TDCSliceDetails",
  initialState: {
    success: "",
    error: "",
    loading: false,
    data: [],
    viewReport: [],
    stackHolderList: [],
    count: [],
    total_page: [],
  },
  reducers: {
    clearTDCSuccessMessage: (state) => {
      state.success = "";
    },
    clearTDCErrorMessage: (state) => {
      state.error = "";
    },
    clearStates: (state) => {
      state.data = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTDCDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addTDCDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addTDCDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewTDCDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewTDCDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewTDCDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editTDCDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editTDCDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editTDCDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteTDCDetails.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deleteTDCDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = {
        ...state.viewReport,
        data: state.viewReport.data.filter(
          (item) => item.id !== action.payload.id
        ),
      };
      state.success = "Data deleted successfully";
    });
    builder.addCase(deleteTDCDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearTDCSuccessMessage, clearTDCErrorMessage, clearStates } =
  TDCSlice.actions;
export default TDCSlice.reducer;
