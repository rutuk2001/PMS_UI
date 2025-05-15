import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";

// Adding ExportDetail
export const addDetailsAppealReviPrefCasesDetail = createAsyncThunk(
  "carbonCal/postAddDetailsAppealReviPrefCasesDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `workplace/policies_and_penalties/details_of_appeal/`,
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
export const viewDetailsAppealReviPrefCasesDetail = createAsyncThunk(
  "carbonCal/viewDetailsAppealReviPrefCasesDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `workplace/policies_and_penalties/details_of_appeal/?page=${page}&page_size=${page_size}`
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
export const editDetailsAppealReviPrefCasesDetail = createAsyncThunk(
  "carbonCal/putEditDetailsAppealReviPrefCasesDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `workplace/policies_and_penalties/details_of_appeal/${id}/`,
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
export const deleteDetailsAppealReviPrefCasesDetail = createAsyncThunk(
  "carbonCal/deleteDetailsAppealReviPrefCasesDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `workplace/policies_and_penalties/details_of_appeal/${id}/`
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


const DetailsAppealRevisionPreferredCasesSlice = createSlice({
  name: "DetailsAppealRevisionPreferredCasesDetails",
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
    builder.addCase(addDetailsAppealReviPrefCasesDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addDetailsAppealReviPrefCasesDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addDetailsAppealReviPrefCasesDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });


    builder.addCase(viewDetailsAppealReviPrefCasesDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewDetailsAppealReviPrefCasesDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewDetailsAppealReviPrefCasesDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editDetailsAppealReviPrefCasesDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editDetailsAppealReviPrefCasesDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editDetailsAppealReviPrefCasesDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteDetailsAppealReviPrefCasesDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deleteDetailsAppealReviPrefCasesDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
  
        state.success = "Data deleted successfully";
    });
    builder.addCase(deleteDetailsAppealReviPrefCasesDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error);
    });


      
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
  DetailsAppealRevisionPreferredCasesSlice.actions;
export default DetailsAppealRevisionPreferredCasesSlice.reducer;

