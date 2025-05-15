import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../services/apiService";

// Adding addListStackholder
export const addListStackholderDetail = createAsyncThunk(
  "carbonCal/addListStackholderlDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `community/list_stakeholder_groups/`,
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

// Viewing ListStackholderDetail
export const viewListStackholderDetail = createAsyncThunk(
  "carbonCal/viewListStackholderDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `community/list_stakeholder_groups/?page=${page}&page_size=${page_size}`
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

// Editing ListStackholderDetail
export const editListStackholderDetail = createAsyncThunk(
  "carbonCal/editListStackholderDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `community/list_stakeholder_groups/${id}/`,
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

// Deleting  ListStackholderDetail
export const deleteListStackholderDetails = createAsyncThunk(
  "carbonCal/deleteListStackholderDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `community/list_stakeholder_groups/${id}/`
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

// Viewing ListStackholderDetail
export const ListStackholderDetail = createAsyncThunk(
  "carbonCal/ListStackholderDetail",
  async () => {
    try {
      const response = await apiService.get(`community/stakeholder_group/`);

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

const ListStackholderSlice = createSlice({
  name: "ListStackholderSliceDetails",
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
    clearListStackholderSuccessMessage: (state) => {
      state.success = "";
    },
    clearListStackholderErrorMessage: (state) => {
      state.error = "";
    },
    clearStates: (state) => {
      state.data = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addListStackholderDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addListStackholderDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addListStackholderDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewListStackholderDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewListStackholderDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewListStackholderDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editListStackholderDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editListStackholderDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editListStackholderDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteListStackholderDetails.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deleteListStackholderDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = {
        ...state.viewReport,
        data: state.viewReport.data.filter(
          (item) => item.id !== action.payload.id
        ),
      };
      state.success = "Data deleted successfully";
    });
    builder.addCase(deleteListStackholderDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(ListStackholderDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(ListStackholderDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.stackHolderList = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(ListStackholderDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {
  clearListStackholderSuccessMessage,
  clearListStackholderErrorMessage,
  clearStates,
} = ListStackholderSlice.actions;
export default ListStackholderSlice.reducer;
