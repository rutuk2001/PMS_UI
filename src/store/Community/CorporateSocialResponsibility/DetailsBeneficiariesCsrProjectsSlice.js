import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../services/apiService";

// Adding ExportDetail
export const addDetailsBeneficiariesCsrProjectsDetail = createAsyncThunk(
  "carbonCal/postAddDetailsBeneficiariesCsrProjectsDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `community/details_Of_Beneficiaries_Of_CSR_Projects/`,
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
export const viewDetailsBeneficiariesCsrProjectsDetail = createAsyncThunk(
  "carbonCal/viewDetailsBeneficiariesCsrProjectsDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `community/details_Of_Beneficiaries_Of_CSR_Projects/?page=${page}&page_size=${page_size}`
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
export const editDetailsBeneficiariesCsrProjectsDetail = createAsyncThunk(
  "carbonCal/putEditDetailsBeneficiariesCsrProjectsDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `community/details_Of_Beneficiaries_Of_CSR_Projects/${id}/`,
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
export const deleteDetailsBeneficiariesCsrProjectsDetail = createAsyncThunk(
  "carbonCal/deleteDetailsBeneficiariesCsrProjectsDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `community/details_Of_Beneficiaries_Of_CSR_Projects/${id}/`
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


const DetailsBeneficiariesCsrProjectsSlice = createSlice({
  name: "DetailsBeneficiariesCsrProjectsDetails",
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
    builder.addCase(addDetailsBeneficiariesCsrProjectsDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addDetailsBeneficiariesCsrProjectsDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addDetailsBeneficiariesCsrProjectsDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });


    builder.addCase(viewDetailsBeneficiariesCsrProjectsDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewDetailsBeneficiariesCsrProjectsDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewDetailsBeneficiariesCsrProjectsDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editDetailsBeneficiariesCsrProjectsDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editDetailsBeneficiariesCsrProjectsDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editDetailsBeneficiariesCsrProjectsDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteDetailsBeneficiariesCsrProjectsDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deleteDetailsBeneficiariesCsrProjectsDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.viewReport = {
          ...state.viewReport,
          data: state.viewReport.data.filter(
            (item) => item.id !== action.payload.id
          ),
        };
        state.success = "Data deleted successfully";
    });
    builder.addCase(deleteDetailsBeneficiariesCsrProjectsDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error);
    });


      
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
  DetailsBeneficiariesCsrProjectsSlice.actions;
export default DetailsBeneficiariesCsrProjectsSlice.reducer;

