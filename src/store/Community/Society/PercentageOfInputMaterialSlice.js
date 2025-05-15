import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../services/apiService";

// Adding ExportDetail
export const addPercentageOfInputMaterialDetail = createAsyncThunk(
  "carbonCal/postAddPercentageOfInputMaterialDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `community/percentage_of_input_material/`,
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
export const viewPercentageOfInputMaterialDetail = createAsyncThunk(
  "carbonCal/viewPercentageOfInputMaterialDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `community/percentage_of_input_material/?page=${page}&page_size=${page_size}`
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
export const editPercentageOfInputMaterialDetail = createAsyncThunk(
  "carbonCal/putEditPercentageOfInputMaterialDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `community/percentage_of_input_material/${id}/`,
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
export const deletePercentageOfInputMaterialDetail = createAsyncThunk(
  "carbonCal/deletePercentageOfInputMaterialDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `community/percentage_of_input_material/${id}/`
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


const PercentageOfInputMaterialSlice = createSlice({
  name: "PercentageOfInputMaterialDetails",
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
    builder.addCase(addPercentageOfInputMaterialDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addPercentageOfInputMaterialDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addPercentageOfInputMaterialDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });


    builder.addCase(viewPercentageOfInputMaterialDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewPercentageOfInputMaterialDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewPercentageOfInputMaterialDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editPercentageOfInputMaterialDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editPercentageOfInputMaterialDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editPercentageOfInputMaterialDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deletePercentageOfInputMaterialDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deletePercentageOfInputMaterialDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.viewReport = {
          ...state.viewReport,
          data: state.viewReport.data.filter(
            (item) => item.id !== action.payload.id
          ),
        };
        state.success = "Data deleted successfully";
    });
    builder.addCase(deletePercentageOfInputMaterialDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error);
    });


      
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
  PercentageOfInputMaterialSlice.actions;
export default PercentageOfInputMaterialSlice.reducer;

