import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../services/apiService";

// Adding ExportDetail
export const addOngoingRehabandResettlementDetail = createAsyncThunk(
  "carbonCal/postAddOngoingRehabandResettlementDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `community/ongoing_rehabilitation_and_resettlement/`,
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
export const viewOngoingRehabandResettlementDetail = createAsyncThunk(
  "carbonCal/viewOngoingRehabandResettlementDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `community/ongoing_rehabilitation_and_resettlement/?page=${page}&page_size=${page_size}`
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
export const editOngoingRehabandResettlementDetail = createAsyncThunk(
  "carbonCal/putEditOngoingRehabandResettlementDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `community/ongoing_rehabilitation_and_resettlement/${id}/`,
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
export const deleteOngoingRehabandResettlementDetail = createAsyncThunk(
  "carbonCal/deleteOngoingRehabandResettlementDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `community/ongoing_rehabilitation_and_resettlement/${id}/`
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


const OngoingRehabilitationAndResettlementSlice = createSlice({
  name: "OngoingRehabilitationAndResettlementDetails",
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
    builder.addCase(addOngoingRehabandResettlementDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addOngoingRehabandResettlementDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addOngoingRehabandResettlementDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });


    builder.addCase(viewOngoingRehabandResettlementDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewOngoingRehabandResettlementDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewOngoingRehabandResettlementDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editOngoingRehabandResettlementDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editOngoingRehabandResettlementDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editOngoingRehabandResettlementDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteOngoingRehabandResettlementDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deleteOngoingRehabandResettlementDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.viewReport = {
          ...state.viewReport,
          data: state.viewReport.data.filter(
            (item) => item.id !== action.payload.id
          ),
        };
        state.success = "Data deleted successfully";
    });
    builder.addCase(deleteOngoingRehabandResettlementDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error);
    });


      
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
OngoingRehabilitationAndResettlementSlice.actions;
export default OngoingRehabilitationAndResettlementSlice.reducer;

