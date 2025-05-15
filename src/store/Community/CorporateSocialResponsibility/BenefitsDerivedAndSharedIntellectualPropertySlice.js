import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../services/apiService";


// Adding ExportDetail
export const addBenefitsDerivedSharedInteDetail = createAsyncThunk(
  "carbonCal/postAddBenefitsDerivedSharedInteDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `community/benefits_Derived_And_Shared_From_Intellectual_Property/`,
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
export const viewBenefitsDerivedSharedInteDetail = createAsyncThunk(
  "carbonCal/viewBenefitsDerivedSharedInteDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `community/benefits_Derived_And_Shared_From_Intellectual_Property/?page=${page}&page_size=${page_size}`
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
export const editBenefitsDerivedSharedInteDetail = createAsyncThunk(
  "carbonCal/putEditBenefitsDerivedSharedInteDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `community/benefits_Derived_And_Shared_From_Intellectual_Property/${id}/`,
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
export const deleteBenefitsDerivedSharedInteDetail = createAsyncThunk(
  "carbonCal/deleteBenefitsDerivedSharedInteDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `community/benefits_Derived_And_Shared_From_Intellectual_Property/${id}/`
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


const BenefitsDerivedAndSharedIntellectualPropertySlice = createSlice({
  name: "BenefitsDerivedAndSharedIntellectualPropertyDetails",
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
    builder.addCase(addBenefitsDerivedSharedInteDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addBenefitsDerivedSharedInteDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addBenefitsDerivedSharedInteDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });


    builder.addCase(viewBenefitsDerivedSharedInteDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewBenefitsDerivedSharedInteDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewBenefitsDerivedSharedInteDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editBenefitsDerivedSharedInteDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editBenefitsDerivedSharedInteDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editBenefitsDerivedSharedInteDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteBenefitsDerivedSharedInteDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deleteBenefitsDerivedSharedInteDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.viewReport = {
          ...state.viewReport,
          data: state.viewReport.data.filter(
            (item) => item.id !== action.payload.id
          ),
        };
        state.success = "Data deleted successfully";
    });
    builder.addCase(deleteBenefitsDerivedSharedInteDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error);
    });


      
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
  BenefitsDerivedAndSharedIntellectualPropertySlice.actions;
export default BenefitsDerivedAndSharedIntellectualPropertySlice.reducer;

