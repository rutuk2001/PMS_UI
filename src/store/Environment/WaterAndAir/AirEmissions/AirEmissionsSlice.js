import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";

// Adding ExportDetail
export const addAirEmissionsDetail = createAsyncThunk(
  "carbonCal/postAddAirEmissionsDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `environment/water/air_emissions/`,
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
export const viewAirEmissionsDetail = createAsyncThunk(
  "carbonCal/viewAirEmissionsDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `environment/water/air_emissions/?page=${page}&page_size=${page_size}`
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
export const editAirEmissionsDetail = createAsyncThunk(
  "carbonCal/putEditAirEmissionsDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `environment/water/air_emissions/${id}/`,
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
export const deleteAirEmissionsDetail = createAsyncThunk(
  "carbonCal/deleteAirEmissionsDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `environment/water/air_emissions/${id}/`
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

//  Parameter List
export const fetchParameterList = createAsyncThunk(
  "carbonCal/fetchParameterList",
  async () => {
    try {
      const response = await apiService.get(
        `environment/water/parameter_list/`
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
// Unit

export const filteredUnitLDetails = createAsyncThunk(
  "carbonCal/filteredUnitLDetails",
  async (Parameter) => {
    try {
      const response = await apiService.get(
        `environment/water/unit_list/?parameter=${Parameter}`
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
export const filterAirEmission = createAsyncThunk(
  "carbonCal/filterAirEmission",
  async ({ Facility, page, page_size }) => {
    try {
      console.log(Facility, "from slice");
      const response = await apiService.get(
        `environment/water/air_emissions/?Facility=${Facility}&page=${page}&page_size=${page_size}`
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

const AirEmissionsSlice = createSlice({
  name: "AirEmissionsDetails",
  initialState: {
    success: "",
    error: "",
    loading: false,
    data: [],
    viewReport: [],
    ParameterList: [],
    unitList: [],
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
    builder.addCase(addAirEmissionsDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addAirEmissionsDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addAirEmissionsDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewAirEmissionsDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewAirEmissionsDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewAirEmissionsDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editAirEmissionsDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editAirEmissionsDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editAirEmissionsDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteAirEmissionsDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deleteAirEmissionsDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;

      state.success = "Data deleted successfully";
    });
    builder.addCase(deleteAirEmissionsDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error);
    });
    builder.addCase(fetchParameterList.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(fetchParameterList.fulfilled, (state, action) => {
      state.loading = false;
      state.ParameterList = action.payload;
    });
    builder.addCase(fetchParameterList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(filteredUnitLDetails.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });

    builder.addCase(filteredUnitLDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.unitList = action.payload;
      state.total_page = action.payload.count;
      console.log(state.unitList, "UUUUUUUUUUUUUUUUUUUUU");
    });
    builder.addCase(filteredUnitLDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(filterAirEmission.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });

    builder.addCase(filterAirEmission.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(filterAirEmission.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
  AirEmissionsSlice.actions;
export default AirEmissionsSlice.reducer;
