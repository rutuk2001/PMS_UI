import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../services/apiService";

// Adding addSocietyDetailsDetail
export const addSocietyDetailsDetail = createAsyncThunk(
  "carbonCal/addSocietyDetailslDetail",
  async (data, { rejectWithValue }) => {
    console.log(data)
    try {
      const response = await apiService.post(
        `community/society_Details/`,
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

// Viewing SocietyDetailsDetail
export const viewSocietyDetailsDetail = createAsyncThunk(
  "carbonCal/viewSocietyDetailsDetail",
  async () => {
    try {
      const response = await apiService.get(
        `community/society_Details/`
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

const SocietyDetailsSlice = createSlice({
  name: "SocietyDetailDetails",
  initialState: {
    success: "",
    error: "",
    loading: false,
    data: [],
    viewReport: "",
    count: [],
    total_page: [],
  },
  reducers: {
    clearSocietyDetailsSuccessMessage: (state) => {
      state.success = "";
    },
    clearSocietyDetailsErrorMessage: (state) => {
      state.error = "";
    },
    clearStates: (state) => {
      state.data = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addSocietyDetailsDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addSocietyDetailsDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addSocietyDetailsDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewSocietyDetailsDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewSocietyDetailsDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewSocietyDetailsDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {
  clearSocietyDetailsSuccessMessage,
  clearSocietyDetailsErrorMessage,
  clearStates,
} = SocietyDetailsSlice.actions;
export default SocietyDetailsSlice.reducer;
