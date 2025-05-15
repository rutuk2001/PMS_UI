import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../../services/apiService";

// Adding ExportDetail
export const addDisciplinaryActAgainstForCuptionDetail = createAsyncThunk(
  "carbonCal/postAddDisciplinaryActAgainstForCuptionDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `workplace/policies_and_penalties/disciplinary_Action_Against_For_curruption/`,
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
export const viewDisciplinaryActAgainstForCuptionDetail = createAsyncThunk(
  "carbonCal/viewDisciplinaryActAgainstForCuptionDetail",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `workplace/policies_and_penalties/disciplinary_Action_Against_For_curruption/?page=${page}&page_size=${page_size}`
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
export const editDisciplinaryActAgainstForCuptionDetail = createAsyncThunk(
  "carbonCal/putEditDisciplinaryActAgainstForCuptionDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `workplace/policies_and_penalties/disciplinary_Action_Against_For_curruption/${id}/`,
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
export const deleteDisciplinaryActAgainstForCuptionDetail = createAsyncThunk(
  "carbonCal/deleteDisciplinaryActAgainstForCuptionDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `workplace/policies_and_penalties/disciplinary_Action_Against_For_curruption/${id}/`
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


const DisciplinaryActionAgainstForCorruptionSlice = createSlice({
  name: "DisciplinaryActionAgainstForCorruptionDetails",
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
    builder.addCase(addDisciplinaryActAgainstForCuptionDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addDisciplinaryActAgainstForCuptionDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addDisciplinaryActAgainstForCuptionDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });


    builder.addCase(viewDisciplinaryActAgainstForCuptionDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewDisciplinaryActAgainstForCuptionDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewDisciplinaryActAgainstForCuptionDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editDisciplinaryActAgainstForCuptionDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editDisciplinaryActAgainstForCuptionDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editDisciplinaryActAgainstForCuptionDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteDisciplinaryActAgainstForCuptionDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deleteDisciplinaryActAgainstForCuptionDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
  
        state.success = "Data deleted successfully";
    });
    builder.addCase(deleteDisciplinaryActAgainstForCuptionDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error);
    });


      
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
  DisciplinaryActionAgainstForCorruptionSlice.actions;
export default DisciplinaryActionAgainstForCorruptionSlice.reducer;

