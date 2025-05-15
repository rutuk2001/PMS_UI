import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../services/apiService";

// Adding addAPVCP
export const addAPVCPDetail = createAsyncThunk(
  "carbonCal/addAPVCPlDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `community/awareness_programmes_for_value_chain_partners/`,
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

// Viewing APVCPDetail
export const viewAPVCPDetail = createAsyncThunk(
  "carbonCal/viewAPVCPDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `community/awareness_programmes_for_value_chain_partners/?page=${page}&page_size=${page_size}`
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

// Editing APVCPDetail
export const editAPVCPDetail = createAsyncThunk(
  "carbonCal/editAPVCPDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `community/awareness_programmes_for_value_chain_partners/${id}/`,
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

// Deleting  APVCPDetail
export const deleteAPVCPDetails = createAsyncThunk(
  "carbonCal/deleteAPVCPDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `community/awareness_programmes_for_value_chain_partners/${id}/`
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

export const filterAPVCP = createAsyncThunk(
  "carbonCal/filterAPVCP",
  async ({ Facility, page, page_size }) => {
    try {
      const response = await apiService.get(
        `community/awareness_programmes_for_value_chain_partners/filter/?page=${page}&page_size=${page_size}&facility=${Facility}`
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

const APVCPSlice = createSlice({
  name: "APVCPSliceDetails",
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
    clearAPVCPSuccessMessage: (state) => {
      state.success = "";
    },
    clearAPVCPErrorMessage: (state) => {
      state.error = "";
    },
    clearStates: (state) => {
      state.data = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addAPVCPDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addAPVCPDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addAPVCPDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewAPVCPDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewAPVCPDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewAPVCPDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editAPVCPDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editAPVCPDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editAPVCPDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteAPVCPDetails.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deleteAPVCPDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = {
        ...state.viewReport,
        data: state.viewReport.data.filter(
          (item) => item.id !== action.payload.id
        ),
      };
      state.success = "Data deleted successfully";
    });
    builder.addCase(deleteAPVCPDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error);
    });

    builder.addCase(filterAPVCP.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(filterAPVCP.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(filterAPVCP.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearAPVCPSuccessMessage, clearAPVCPErrorMessage, clearStates } =
  APVCPSlice.actions;
export default APVCPSlice.reducer;
