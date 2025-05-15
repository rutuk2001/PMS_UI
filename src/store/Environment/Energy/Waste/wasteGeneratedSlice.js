import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";

// Adding addwasteGeneratedDetails
export const addwasteGeneratedDetails = createAsyncThunk(
  "carbonCal/addwasteGeneratedDetails",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `environment/waste/waste_generated/`,
        data
      );
      if (
        response.status === 400 ||
        response.status === 500 ||
        response.status === 404
      ) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      } else {
        const responseData = await response.json();
        return responseData;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Viewing wasteGenerated
export const viewwasteGeneratedData = createAsyncThunk(
  "carbonCal/viewwasteGeneratedData",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `environment/waste/waste_generated/?page=${page}&page_size=${page_size}`
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

// Editing wasteGenerated
export const editwasteGeneratedetail = createAsyncThunk(
  "carbonCal/editwasteGeneratedetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `environment/waste/waste_generated/${id}/`,
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

// Deleting  wasteGenerated
export const deletewasteGeneratedDetails = createAsyncThunk(
  "carbonCal/deletewasteGeneratedDetails",
  async (id, { rejectWithValue }) => {
    try {
      console.log(id, "from slice");
      const response = await apiService.delete(
        `environment/waste/waste_generated/${id}/`
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

export const viewwasteGeneratedTypeData = createAsyncThunk(
  "carbonCal/viewwasteGeneratedTypeData",
  async () => {
    try {
      const response = await apiService.get(
        `environment/waste/generated_type/`
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

//filter api
export const filterWasteGeneratedData = createAsyncThunk(
  "carbonCal/filterWasteGeneratedData",
  async ({ Facility, page, page_size }) => {
    try {
      console.log(Facility, "from slice");
      const response = await apiService.get(
        `environment/waste/waste_generated/?Facility=${Facility}&page=${page}&page_size=${page_size}`
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

const wasteGeneratedSlice = createSlice({
  name: "wasteGeneratedDetails",
  initialState: {
    success: "",
    error: "",
    loading: false,
    data: [],
    viewReport: [],
    count: [],
    total_page: [],
    WGTypeData: [],
  },
  reducers: {
    clearwasteGeneratedSuccessMessage: (state) => {
      state.success = "";
    },
    clearwasteGeneratedErrorMessage: (state) => {
      state.error = "";
    },
    clearStates: (state) => {
      state.data = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addwasteGeneratedDetails.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addwasteGeneratedDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
    });
    builder.addCase(addwasteGeneratedDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewwasteGeneratedData.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewwasteGeneratedData.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewwasteGeneratedData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editwasteGeneratedetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editwasteGeneratedetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(editwasteGeneratedetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deletewasteGeneratedDetails.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deletewasteGeneratedDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;

      state.success = "Data deleted successfully";
    });
    builder.addCase(deletewasteGeneratedDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error);
    });

    builder.addCase(viewwasteGeneratedTypeData.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewwasteGeneratedTypeData.fulfilled, (state, action) => {
      state.loading = false;
      state.WGTypeData = action.payload;
    });
    builder.addCase(viewwasteGeneratedTypeData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(filterWasteGeneratedData.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(filterWasteGeneratedData.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(filterWasteGeneratedData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {
  clearwasteGeneratedSuccessMessage,
  clearwasteGeneratedErrorMessage,
  clearStates,
} = wasteGeneratedSlice.actions;
export default wasteGeneratedSlice.reducer;
