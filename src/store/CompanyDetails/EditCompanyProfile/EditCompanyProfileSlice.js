import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../services/apiService";

// Adding ExportDetail
export const addCompanyProfileDetail = createAsyncThunk(
  "carbonCal/postaddCompanyProfileDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `company_details/company_profile/`,
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

// List of countries
export const registerlistofCountriesDetail = createAsyncThunk(
  "carbonCal/registerlistofCountriesDetail",
  async () => {
    try {
      const response = await apiService.get(
        `company_details/company_profile/countries_list/countries/`
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
// List of states
export const registerlistofStatesDetail = createAsyncThunk(
  "carbonCal/registerlistofStatesDetail",
  async (country) => {
    try {
      const response = await apiService.get(
        `company_details/company_profile/states_list/states/?country=${country}`
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
// List of Cities
export const registerlistofCitiesDetail = createAsyncThunk(
  "carbonCal/registerlistofCitiesDetail",
  async (state) => {
    try {
      const response = await apiService.get(
        `company_details/company_profile/cities_list/cities/?state=${state}`
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

// List of countries
export const corporatelistofCountriesDetail = createAsyncThunk(
  "carbonCal/corporatelistofCountriesDetail",
  async () => {
    try {
      const response = await apiService.get(
        `company_details/company_profile/countries_list/countries/`
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
// List of states
export const corporatelistofStatesDetail = createAsyncThunk(
  "carbonCal/corporatelistofStatesDetail",
  async (country) => {
    try {
      const response = await apiService.get(
        `company_details/company_profile/states_list/states/?country=${country}`
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
// List of Cities
export const corporatelistofCitiesDetail = createAsyncThunk(
  "carbonCal/corporatelistofCitiesDetail",
  async (state) => {
    try {
      const response = await apiService.get(
        `company_details/company_profile/cities_list/cities/?state=${state}`
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

// Viewing ExportDetail
export const viewCompanyProfileDetail = createAsyncThunk(
  "carbonCal/viewCompanyProfileDetail",
  async () => {
    try {
      const response = await apiService.get(`company_details/company_profile/`);

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
export const editCompanyProfileDetail = createAsyncThunk(
  "carbonCal/putEditCompanyProfileDetail",
  async ({ Company_Name, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `company_details/company_profile/${Company_Name}/`,
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

// List of Reporting Boundries
export const viewReportingBoundaryList = createAsyncThunk(
  "carbonCal/reportingBoundaryList",
  async () => {
    try {
      const response = await apiService.get(
        `company_details/reporting_boundary_list/`
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

// List of Type Of Assurance List
export const viewTypeofAssurancesList = createAsyncThunk(
  "carbonCal/typeofAssurancesList",
  async () => {
    try {
      const response = await apiService.get(
        `company_details/type_of_assurance_list/`
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

const EditCompanyProfileSlice = createSlice({
  name: "EditCompanyProfileSliceDetails",
  initialState: {
    success: "",
    error: "",
    loading: false,
    data: [],
    viewRegisterCountriesDetail: [],
    viewRegisterStatesDetail: [],
    viewRegisterCitiesDetail: [],
    viewCorporateCountriesDetail: [],
    viewCorporateStatesDetail: [],
    viewCorporateCitiesDetail: [],
    viewCompanyProfile: [],
    viewBoundaryList: [],
    ViewTypeAssurance: [],
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
    builder.addCase(addCompanyProfileDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addCompanyProfileDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = "Data Added Successfully";
    });
    builder.addCase(addCompanyProfileDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(registerlistofCountriesDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });

    builder.addCase(
      registerlistofCountriesDetail.fulfilled,
      (state, action) => {
        state.loading = false;
        state.viewRegisterCountriesDetail = action.payload;
        state.total_page = action.payload.count;
      }
    );
    builder.addCase(registerlistofCountriesDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(registerlistofStatesDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });

    builder.addCase(registerlistofStatesDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewRegisterStatesDetail = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(registerlistofStatesDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(registerlistofCitiesDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });

    builder.addCase(registerlistofCitiesDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewRegisterCitiesDetail = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(registerlistofCitiesDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(corporatelistofCountriesDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });

    builder.addCase(
      corporatelistofCountriesDetail.fulfilled,
      (state, action) => {
        state.loading = false;
        state.viewCorporateCountriesDetail = action.payload;
        state.total_page = action.payload.count;
      }
    );
    builder.addCase(
      corporatelistofCountriesDetail.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );

    builder.addCase(corporatelistofStatesDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });

    builder.addCase(corporatelistofStatesDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewCorporateStatesDetail = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(corporatelistofStatesDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(corporatelistofCitiesDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });

    builder.addCase(corporatelistofCitiesDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewCorporateCitiesDetail = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(corporatelistofCitiesDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewCompanyProfileDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });

    builder.addCase(viewCompanyProfileDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewCompanyProfile = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewCompanyProfileDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editCompanyProfileDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editCompanyProfileDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = "Data Updated Successfully";
    });
    builder.addCase(editCompanyProfileDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewReportingBoundaryList.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });

    builder.addCase(viewReportingBoundaryList.fulfilled, (state, action) => {
      state.loading = false;
      state.viewBoundaryList = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewReportingBoundaryList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewTypeofAssurancesList.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });

    builder.addCase(viewTypeofAssurancesList.fulfilled, (state, action) => {
      state.loading = false;
      state.ViewTypeAssurance = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewTypeofAssurancesList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
  EditCompanyProfileSlice.actions;
export default EditCompanyProfileSlice.reducer;
