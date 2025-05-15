import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../services/apiService";

// Adding addNumberofAffiliations
export const addNumberofAffiliationsDetail = createAsyncThunk(
  "carbonCal/addNumberofAffiliationslDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `community/number_of_affiliations/`,
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

// Viewing NumberofAffiliationsDetail
export const viewNumberofAffiliationsDetail = createAsyncThunk(
  "carbonCal/viewNumberofAffiliationsDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `community/number_of_affiliations/?page=${page}&page_size=${page_size}`
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

// Editing NumberofAffiliationsDetail
export const editNumberofAffiliationsDetail = createAsyncThunk(
  "carbonCal/editNumberofAffiliationsDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `community/number_of_affiliations/${id}/`,
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

// Deleting  NumberofAffiliationsDetail
export const deleteNumberofAffiliationsDetails = createAsyncThunk(
  "carbonCal/deleteNumberofAffiliationsDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `community/number_of_affiliations/${id}/`
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

const NumberofAffiliationsSlice = createSlice({
  name: "NumberofAffiliationsSliceDetails",
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
    clearNumberofAffiliationsSuccessMessage: (state) => {
      state.success = "";
    },
    clearNumberofAffiliationsErrorMessage: (state) => {
      state.error = "";
    },
    clearStates: (state) => {
      state.data = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addNumberofAffiliationsDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(
      addNumberofAffiliationsDetail.fulfilled,
      (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      }
    );
    builder.addCase(addNumberofAffiliationsDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewNumberofAffiliationsDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(
      viewNumberofAffiliationsDetail.fulfilled,
      (state, action) => {
        state.loading = false;
        state.viewReport = action.payload;
        state.total_page = action.payload.count;
      }
    );
    builder.addCase(
      viewNumberofAffiliationsDetail.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );

    builder.addCase(editNumberofAffiliationsDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(
      editNumberofAffiliationsDetail.fulfilled,
      (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.success = action.payload.message;
      }
    );
    builder.addCase(
      editNumberofAffiliationsDetail.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );

    builder.addCase(deleteNumberofAffiliationsDetails.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(
      deleteNumberofAffiliationsDetails.fulfilled,
      (state, action) => {
        state.loading = false;
        state.viewReport = {
          ...state.viewReport,
          data: state.viewReport.data.filter(
            (item) => item.id !== action.payload.id
          ),
        };
        state.success = "Data deleted successfully";
      }
    );
    builder.addCase(
      deleteNumberofAffiliationsDetails.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(state.error);
      }
    );
  },
});

export const {
  clearNumberofAffiliationsSuccessMessage,
  clearNumberofAffiliationsErrorMessage,
  clearStates,
} = NumberofAffiliationsSlice.actions;
export default NumberofAffiliationsSlice.reducer;
