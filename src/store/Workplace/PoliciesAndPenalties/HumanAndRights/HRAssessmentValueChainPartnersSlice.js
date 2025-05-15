
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";

// Adding ExportDetail
export const addHRAssessmentValueChainPartnersDetail = createAsyncThunk(
  "carbonCal/postAddHRAssessmentValueChainPartnersDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `workplace/policies_and_penalties/assessment_of_value_chain_partners/`,
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
export const viewHRAssessmentValueChainPartnersDetail = createAsyncThunk(
  "carbonCal/viewHRAssessmentValueChainPartnersDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `workplace/policies_and_penalties/assessment_of_value_chain_partners/?page=${page}&page_size=${page_size}`
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
export const editHRAssessmentValueChainPartnersDetail = createAsyncThunk(
  "carbonCal/putEditHRAssessmentValueChainPartnersDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `workplace/policies_and_penalties/assessment_of_value_chain_partners/${id}/`,
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
export const deleteHRAssessmentValueChainPartnersDetail = createAsyncThunk(
  "carbonCal/deleteHRAssessmentValueChainPartnersDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `workplace/policies_and_penalties/assessment_of_value_chain_partners/${id}/`
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


const HRAssessmentValueChainPartnersSlice = createSlice({
  name: "HRAssessmentValueChainPartnersDetails",
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
    builder.addCase(addHRAssessmentValueChainPartnersDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addHRAssessmentValueChainPartnersDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addHRAssessmentValueChainPartnersDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });


    builder.addCase(viewHRAssessmentValueChainPartnersDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewHRAssessmentValueChainPartnersDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewHRAssessmentValueChainPartnersDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editHRAssessmentValueChainPartnersDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editHRAssessmentValueChainPartnersDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editHRAssessmentValueChainPartnersDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteHRAssessmentValueChainPartnersDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deleteHRAssessmentValueChainPartnersDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
  
        state.success = "Data deleted successfully";
    });
    builder.addCase(deleteHRAssessmentValueChainPartnersDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error);
    });


      
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
  HRAssessmentValueChainPartnersSlice.actions;
export default HRAssessmentValueChainPartnersSlice.reducer;

