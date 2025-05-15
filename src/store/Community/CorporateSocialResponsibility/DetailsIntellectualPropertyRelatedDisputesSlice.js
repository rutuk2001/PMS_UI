import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../services/apiService";

// Adding ExportDetail
export const addDetailsIntProtyRtdDisputesDetail = createAsyncThunk(
  "carbonCal/postAddDetailsIntProtyRtdDisputesDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `community/details_Of_Intellectual_Property_Related_Disputes/`,
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
export const viewDetailsIntProtyRtdDisputesDetail = createAsyncThunk(
  "carbonCal/viewDetailsIntProtyRtdDisputesDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `community/details_Of_Intellectual_Property_Related_Disputes/?page=${page}&page_size=${page_size}`
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
export const editDetailsIntProtyRtdDisputesDetail = createAsyncThunk(
  "carbonCal/putEditDetailsIntProtyRtdDisputesDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `community/details_Of_Intellectual_Property_Related_Disputes/${id}/`,
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
export const deleteDetailsIntProtyRtdDisputesDetail = createAsyncThunk(
  "carbonCal/deleteDetailsIntProtyRtdDisputesDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `community/details_Of_Intellectual_Property_Related_Disputes/${id}/`
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


const DetailsIntellectualPropertyRelatedDisputesSlice = createSlice({
  name: "DetailsIntellectualPropertyRelatedDisputesDetails",
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
    builder.addCase(addDetailsIntProtyRtdDisputesDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addDetailsIntProtyRtdDisputesDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addDetailsIntProtyRtdDisputesDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });


    builder.addCase(viewDetailsIntProtyRtdDisputesDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewDetailsIntProtyRtdDisputesDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewDetailsIntProtyRtdDisputesDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editDetailsIntProtyRtdDisputesDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editDetailsIntProtyRtdDisputesDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editDetailsIntProtyRtdDisputesDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteDetailsIntProtyRtdDisputesDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deleteDetailsIntProtyRtdDisputesDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.viewReport = {
          ...state.viewReport,
          data: state.viewReport.data.filter(
            (item) => item.id !== action.payload.id
          ),
        };
        state.success = "Data deleted successfully";
    });
    builder.addCase(deleteDetailsIntProtyRtdDisputesDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error);
    });


      
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
  DetailsIntellectualPropertyRelatedDisputesSlice.actions;
export default DetailsIntellectualPropertyRelatedDisputesSlice.reducer;

