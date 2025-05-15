import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../services/apiService";

//Financial year

export const fetchFinancialYear = createAsyncThunk(
  "carbonCal/fetchFinancialYear",
  async () => {
    try {
      const response = await apiService.get(
        `company_details/financial_year_list/`
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
//Financial year

export const fetchProcessEmissionGasType = createAsyncThunk(
  "carbonCal/fetchProcessEmissionGasType",
  async () => {
    try {
      const response = await apiService.get(
        `environment/energy/others/process_emissions/gas_type/`
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

export const fetchBusinessActivityList = createAsyncThunk(
  "carbonCal/fetchBusinessActivityList",
  async () => {
    try {
      const response = await apiService.get(
        `company_details/business_activity/business_activity_list/`
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

export const fetchReclaimMaterialList = createAsyncThunk(
  "carbonCal/fetchReclaimMaterialList",
  async () => {
    try {
      const response = await apiService.get(
        `environment/life_cycle/reclaim/material/`
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

export const fetchReclaimTypeList = createAsyncThunk(
  "carbonCal/fetchReclaimTypeList",
  async () => {
    try {
      const response = await apiService.get(
        `environment/life_cycle/reclaim/reclaim_type/`
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
export const fetchWasteDisposedCategoryList = createAsyncThunk(
  "carbonCal/fetchWasteDisposedCategoryList",
  async () => {
    try {
      const response = await apiService.get(
        `environment/waste/disposed_category/`
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

export const fetchGetproductsServicesList = createAsyncThunk(
  "carbonCal/fetchGetproductsServicesList",
  async () => {
    try {
      const response = await apiService.get(
        `company_details/business_activity/products_services_list/`
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
export const fetchGetDestinationList = createAsyncThunk(
  "carbonCal/fetchGetDestinationList",
  async () => {
    try {
      const response = await apiService.get(
        `environment/water/destination_list_without_treatment/`
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

// type of facility Office/Plant
export const fetchTypeOfFacilityListApi = createAsyncThunk(
  "carbonCal/fetchTypeOfFacilityList",
  async () => {
    try {
      const response = await apiService.get(
        `company_details/operations/type_of_facility_list/`
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

export const FetchIndianStatesList = createAsyncThunk(
  "carbonCal/FetchIndianStatesListService",
  async () => {
    try {
      const response = await apiService.get(
        `company_details/operations/indian_states_list/`
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

export const fetchHoldingLists = createAsyncThunk(
  "carbonCal/fetchHoldingListsService",
  async () => {
    try {
      const response = await apiService.get(
        `company_details/operations/type_of_holding_list/`
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

export const fetchMonthLists = createAsyncThunk(
  "carbonCal/fetchMonthListsService",
  async () => {
    try {
      const response = await apiService.get(
        `environment/energy/others/refrigerant_losses/months/`
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
export const fetchTypeLists = createAsyncThunk(
  "carbonCal/fetchTypeListsService",
  async () => {
    try {
      const response = await apiService.get(
        `environment/energy/others/refrigerant_losses/type/`
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

//facility based on plant location
export const fetchTypeOfPlantFacilityListApi = createAsyncThunk(
  "carbonCal/fetchTypeOfPlantFacilityListApi",
  async () => {
    try {
      const response = await apiService.get(
        `company_details/operations/facility_list/`
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

//source list(Water)
export const fetchSourceListApi = createAsyncThunk(
  "carbonCal/fetchSourceListApi",
  async () => {
    try {
      const response = await apiService.get(`environment/water/source_list/`);

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

//source list(Electricity)
export const fetchElectricitySourceListApi = createAsyncThunk(
  "carbonCal/fetchElectricitySourceListApi",
  async () => {
    try {
      const response = await apiService.get(
        `environment/energy/electricity/source/`
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

export const fetchAgencyList = createAsyncThunk(
  "carbonCal/fetchAgencyList",
  async () => {
    try {
      const response = await apiService.get(
        `environment/water/overall/agency_type/`
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
export const fetchEnergyList = createAsyncThunk(
  "carbonCal/fetchEnergyList",
  async () => {
    try {
      const response = await apiService.get(
        `environment/energy/overall/agency_type/`
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

export const fetchFuelTypeList = createAsyncThunk(
  "carbonCal/fetchFuelTypeList",
  async () => {
    try {
      const response = await apiService.get(
        `environment/energy/fuel_combustion/onsite_combustion/fuel_type_list/`
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

export const fetchFuelUnitTypeList = createAsyncThunk(
  "carbonCal/fetchFuelUnitTypeList",
  async ({ fuel_type }) => {
    console.log(fuel_type, "fuel type from common slice");
    try {
      const response = await apiService.get(
        `environment/energy/fuel_combustion/onsite_combustion/fuel_unit_list/?fuel_type=${fuel_type}`
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

export const fetchOnsiteVehicalFuelTypeList = createAsyncThunk(
  "carbonCal/fetchOnsiteVehicalFuelTypeList",
  async () => {
    try {
      const response = await apiService.get(
        `environment/energy/fuel_combustion/onsite_vehicles/fuel_type/`
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

export const fetchOwnerShipData = createAsyncThunk(
  "carbonCal/fetchOwnerShipData",
  async () => {
    try {
      const response = await apiService.get(
        `environment/energy/fuel_combustion/onsite_vehicles/ownership/`
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

export const fetchWorkforceGenderlistData = createAsyncThunk(
  "carbonCal/fetchWorkforceGenderlistData",
  async () => {
    try {
      const response = await apiService.get(
        `workplace/workforce/employees/genderlist/`
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

export const fetchWorkforceTypeData = createAsyncThunk(
  "carbonCal/fetchWorkforceTypeData",
  async () => {
    try {
      const response = await apiService.get(
        `workplace/workforce/employees/typelist/`
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

export const fetchSegmentList = createAsyncThunk(
  "carbonCal/fetchSegmentList",
  async () => {
    try {
      const response = await apiService.get(
        `workplace/training/ingeneral/segmentlist/`
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

export const fetchWorkforceWagesSegmentList = createAsyncThunk(
  "carbonCal/fetchWorkforceWagesSegmentList",
  async () => {
    try {
      const response = await apiService.get(
        `workplace/workforce/wages/segmentlist/`
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

export const fetchDeductedAndDepositedList = createAsyncThunk(
  "carbonCal/fetchDeductedAndDepositedList",
  async () => {
    try {
      const response = await apiService.get(
        `workplace/health_and_safety/deposited_deducted/`
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

export const fetchPoliciesPenaltiesMonetaryTypeList = createAsyncThunk(
  "carbonCal/fetchPoliciesPenaltiesMonetaryTypeList",
  async () => {
    try {
      const response = await apiService.get(
        `workplace/policies_and_penalties/monetarytypelist/`
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

export const fetchPoliciesPenaltiesNonMonetaryTypeList = createAsyncThunk(
  "carbonCal/fetchPoliciesPenaltiesNonMonetaryTypeList",
  async () => {
    try {
      const response = await apiService.get(
        `workplace/policies_and_penalties/nonmonetarytypelist/`
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

export const ConsumerComplaintsTypeList = createAsyncThunk(
  "carbonCal/ConsumerComplaintsTypeList",
  async () => {
    try {
      const response = await apiService.get(
        `community/type_Consumer_Complaints_List/`
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

export const CommunityRecalTypelList = createAsyncThunk(
  "carbonCal/CommunityRecalTypelList",
  async () => {
    try {
      const response = await apiService.get(`community/recall_List/`);

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

export const fetchFrequencyEngagement = createAsyncThunk(
  "carbonCal/fetchFrequencyEngagement",
  async () => {
    try {
      const response = await apiService.get(
        `community/frequency_of_engagement/`
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

export const fetchAppeal = createAsyncThunk(
  "carbonCal/fetchAppeal",
  async () => {
    try {
      const response = await apiService.get(
        `workplace/policies_and_penalties/OptionsList/`
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

export const fetchRemarks = createAsyncThunk(
  "carbonCal/fetchRemarks",
  async (financialYear) => {
    try {
      const response = await apiService.get(
        `api/recommendation/?financial_year=${financialYear}`
      );

      if (
        response.status === 400 ||
        response.status === 404 ||
        response.status === 500
      ) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      return await response.json();
    } catch (error) {
      console.error("Fetch error while fetching the user location:", error);
      throw error;
    }
  }
);

export const addRemark = createAsyncThunk(
  "carbonCal/addRemark",
  async (data) => {
    try {
      const { section, ...rest } = data;
      const response = await apiService.post(`api/recommendation/`, rest);

      if (
        response.status === 400 ||
        response.status === 404 ||
        response.status === 500
      ) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      const result = await response.json();
      return { section, ...result };
    } catch (error) {
      throw error;
    }
  }
);

export const CurrencyTypeList = createAsyncThunk(
  "carbonCal/CurrencyTypeList",
  async () => {
    try {
      const response = await apiService.get(
        `company_details/operations/paid_up_capital_unit/`
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

const CommonApiSlice = createSlice({
  name: "CommonApiDetailSlice",
  initialState: {
    success: "",
    error: "",
    loading: false,
    data: [],
    finalYear: [],
    businessActivityList: [],
    reclaimMaterialList: [],
    reclaimTypeList: [],
    productServiceList: [],
    productServiceList: [],
    wasteDisposedCategory: [],
    destinationServiceList: [],
    indianStatesList: [],
    typeofFacilityList: [],
    holdingList: [],
    monthList: [],
    typeList: [],
    plantFacilityList: [],
    sourceList: [],
    agencyList: [],
    processEmissionGasType: [],
    energyList: [],
    fuelTypeList: [],
    fuelUnitList: [],
    fetchOnSiteFuelList: [],
    fetchOwnerShipList: [],
    elctricitySourceList: [],
    workforceGenderList: [],
    workforceTypeList: [],
    segmentList: [],
    wagesSegmentList: [],
    deducted_DepositedList: [],
    policiePenaltiesMonetaryTypelist: [],
    policiePenaltiesNonMonetaryTypelist: [],
    complaintsTypeList: [],
    communityRecallList: [],
    frequencyEngagementList: [],
    appealList: [],
    remarkData: [],
    currencyUnitTypeList: [],
    section: "",
  },
  reducers: {
    clearMessage: (state) => {
      state.success = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFinancialYear.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(fetchFinancialYear.fulfilled, (state, action) => {
      state.loading = false;
      state.finalYear = action.payload;
    });
    builder.addCase(fetchFinancialYear.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchProcessEmissionGasType.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(fetchProcessEmissionGasType.fulfilled, (state, action) => {
      state.loading = false;
      state.processEmissionGasType = action.payload;
    });
    builder.addCase(fetchProcessEmissionGasType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchBusinessActivityList.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(fetchBusinessActivityList.fulfilled, (state, action) => {
      state.loading = false;
      state.businessActivityList = action.payload;
    });
    builder.addCase(fetchBusinessActivityList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchReclaimMaterialList.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(fetchReclaimMaterialList.fulfilled, (state, action) => {
      state.loading = false;
      state.reclaimMaterialList = action.payload;
    });
    builder.addCase(fetchReclaimMaterialList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchReclaimTypeList.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(fetchReclaimTypeList.fulfilled, (state, action) => {
      state.loading = false;
      state.reclaimTypeList = action.payload;
    });
    builder.addCase(fetchReclaimTypeList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchWasteDisposedCategoryList.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(
      fetchWasteDisposedCategoryList.fulfilled,
      (state, action) => {
        state.loading = false;
        state.wasteDisposedCategory = action.payload;
      }
    );
    builder.addCase(
      fetchWasteDisposedCategoryList.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );

    builder.addCase(fetchGetproductsServicesList.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(fetchGetproductsServicesList.fulfilled, (state, action) => {
      state.loading = false;
      state.productServiceList = action.payload;
    });
    builder.addCase(fetchGetproductsServicesList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchGetDestinationList.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(fetchGetDestinationList.fulfilled, (state, action) => {
      state.loading = false;
      state.destinationServiceList = action.payload;
    });
    builder.addCase(fetchGetDestinationList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchTypeOfFacilityListApi.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(fetchTypeOfFacilityListApi.fulfilled, (state, action) => {
      state.loading = false;
      state.typeofFacilityList = action.payload;
    });
    builder.addCase(fetchTypeOfFacilityListApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(FetchIndianStatesList.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(FetchIndianStatesList.fulfilled, (state, action) => {
      state.loading = false;
      state.indianStatesList = action.payload;
    });
    builder.addCase(FetchIndianStatesList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchHoldingLists.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(fetchHoldingLists.fulfilled, (state, action) => {
      state.loading = false;
      state.holdingList = action.payload;
    });
    builder.addCase(fetchHoldingLists.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchMonthLists.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(fetchMonthLists.fulfilled, (state, action) => {
      state.loading = false;
      state.monthList = action.payload;
    });
    builder.addCase(fetchMonthLists.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchTypeLists.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(fetchTypeLists.fulfilled, (state, action) => {
      state.loading = false;
      state.typeList = action.payload;
    });
    builder.addCase(fetchTypeLists.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchTypeOfPlantFacilityListApi.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(
      fetchTypeOfPlantFacilityListApi.fulfilled,
      (state, action) => {
        state.loading = false;
        state.plantFacilityList = action.payload;
      }
    );
    builder.addCase(
      fetchTypeOfPlantFacilityListApi.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );

    builder.addCase(fetchSourceListApi.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(fetchSourceListApi.fulfilled, (state, action) => {
      state.loading = false;
      state.sourceList = action.payload;
    });
    builder.addCase(fetchSourceListApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchElectricitySourceListApi.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(
      fetchElectricitySourceListApi.fulfilled,
      (state, action) => {
        state.loading = false;
        state.elctricitySourceList = action.payload;
      }
    );
    builder.addCase(fetchElectricitySourceListApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchAgencyList.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(fetchAgencyList.fulfilled, (state, action) => {
      state.loading = false;
      state.agencyList = action.payload;
    });
    builder.addCase(fetchAgencyList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchEnergyList.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(fetchEnergyList.fulfilled, (state, action) => {
      state.loading = false;
      state.energyList = action.payload;
    });
    builder.addCase(fetchEnergyList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchFuelTypeList.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(fetchFuelTypeList.fulfilled, (state, action) => {
      state.loading = false;
      state.fuelTypeList = action.payload;
    });
    builder.addCase(fetchFuelTypeList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchFuelUnitTypeList.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(fetchFuelUnitTypeList.fulfilled, (state, action) => {
      state.loading = false;
      state.fuelUnitList = action.payload;
    });
    builder.addCase(fetchFuelUnitTypeList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchOnsiteVehicalFuelTypeList.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(
      fetchOnsiteVehicalFuelTypeList.fulfilled,
      (state, action) => {
        state.loading = false;
        state.fetchOnSiteFuelList = action.payload;
      }
    );
    builder.addCase(
      fetchOnsiteVehicalFuelTypeList.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );

    builder.addCase(fetchOwnerShipData.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(fetchOwnerShipData.fulfilled, (state, action) => {
      state.loading = false;
      state.fetchOwnerShipList = action.payload;
    });
    builder.addCase(fetchOwnerShipData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchWorkforceGenderlistData.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(fetchWorkforceGenderlistData.fulfilled, (state, action) => {
      state.loading = false;
      state.workforceGenderList = action.payload;
    });
    builder.addCase(fetchWorkforceGenderlistData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchWorkforceTypeData.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(fetchWorkforceTypeData.fulfilled, (state, action) => {
      state.loading = false;
      state.workforceTypeList = action.payload;
    });
    builder.addCase(fetchWorkforceTypeData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchSegmentList.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(fetchSegmentList.fulfilled, (state, action) => {
      state.loading = false;
      state.segmentList = action.payload;
    });
    builder.addCase(fetchSegmentList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchWorkforceWagesSegmentList.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(
      fetchWorkforceWagesSegmentList.fulfilled,
      (state, action) => {
        state.loading = false;
        state.wagesSegmentList = action.payload;
      }
    );
    builder.addCase(
      fetchWorkforceWagesSegmentList.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );

    builder.addCase(fetchDeductedAndDepositedList.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(
      fetchDeductedAndDepositedList.fulfilled,
      (state, action) => {
        state.loading = false;
        state.deducted_DepositedList = action.payload;
      }
    );
    builder.addCase(fetchDeductedAndDepositedList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchPoliciesPenaltiesMonetaryTypeList.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(
      fetchPoliciesPenaltiesMonetaryTypeList.fulfilled,
      (state, action) => {
        state.loading = false;
        state.policiePenaltiesMonetaryTypelist = action.payload;
      }
    );
    builder.addCase(
      fetchPoliciesPenaltiesMonetaryTypeList.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );

    builder.addCase(
      fetchPoliciesPenaltiesNonMonetaryTypeList.pending,
      (state) => {
        state.loading = true;
        state.error = "";
        state.success = "";
      }
    );
    builder.addCase(
      fetchPoliciesPenaltiesNonMonetaryTypeList.fulfilled,
      (state, action) => {
        state.loading = false;
        state.policiePenaltiesNonMonetaryTypelist = action.payload;
      }
    );
    builder.addCase(
      fetchPoliciesPenaltiesNonMonetaryTypeList.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );

    builder.addCase(ConsumerComplaintsTypeList.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(ConsumerComplaintsTypeList.fulfilled, (state, action) => {
      state.loading = false;
      state.complaintsTypeList = action.payload;
    });
    builder.addCase(ConsumerComplaintsTypeList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(CommunityRecalTypelList.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(CommunityRecalTypelList.fulfilled, (state, action) => {
      state.loading = false;
      state.communityRecallList = action.payload;
    });
    builder.addCase(CommunityRecalTypelList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchFrequencyEngagement.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(fetchFrequencyEngagement.fulfilled, (state, action) => {
      state.loading = false;
      state.frequencyEngagementList = action.payload;
    });
    builder.addCase(fetchFrequencyEngagement.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchAppeal.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(fetchAppeal.fulfilled, (state, action) => {
      state.loading = false;
      state.appealList = action.payload;
    });
    builder.addCase(fetchAppeal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchRemarks.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(fetchRemarks.fulfilled, (state, action) => {
      state.loading = false;
      state.remarkData = action.payload.data;
    });
    builder.addCase(fetchRemarks.rejected, (state, action) => {
      state.loading = false;
      // state.error = action.error.message;
    });
    builder.addCase(addRemark.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addRemark.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
      state.section = action.payload.section;
    });
    builder.addCase(addRemark.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(CurrencyTypeList.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(CurrencyTypeList.fulfilled, (state, action) => {
      state.loading = false;
      state.currencyUnitTypeList = action.payload;
    });
    builder.addCase(CurrencyTypeList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearMessage } = CommonApiSlice.actions;
export default CommonApiSlice.reducer;
