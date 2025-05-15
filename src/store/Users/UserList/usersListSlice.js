import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../services/apiService";

// Adding User
export const addUser = createAsyncThunk(
  "carbonCal/addUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(`user/user_signup/`, data);
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

// getting all roleList
export const viewRoleList = createAsyncThunk(
  "carbonCal/viewRoleList",
  async () => {
    try {
      const response = await apiService.get(`user/roles/`);

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

// Viewing all User
export const viewUser = createAsyncThunk(
  "carbonCal/viewUser",
  async ({ page, page_size }) => {
    try {
      const response = await apiService.get(
        `user/user_signup/?page=${page}&page_size=${page_size}`
      );

      if (response.status === 400) {
        throw new Error("Request failed: " + response.statusText);
      }

      return await response.json();
    } catch (error) {
      console.log(error, "error");
      console.error("Fetch error while fetching the user location:", error);
      throw error;
    }
  }
);

// Editing User
export const editUser = createAsyncThunk(
  "carbonCal/editUser",
  async ({ data, email }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `user/user_signup/?email=${email}`,
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

// Deleting User
export const deleteUser = createAsyncThunk(
  "carbonCal/deleteUser",
  async (email, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(
        `user/user_signup/?email=${email}`
      );
      if (
        response.status === 400 ||
        response.status === 500 ||
        response.status === 404
      ) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      } else if (response.status === 204) {
        return { email };
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// //filterFacilityUser

// export const filterFacilityUser = createAsyncThunk(
//   "carbonCal/filterFacilityUser",
//   async ({ Facility, page, page_size }) => {
//     try {
//       const response = await apiService.get(
//         `environment/water/water_consumption/?Facility=${Facility}&page=${page}&page_size=${page_size}`
//       );

//       if (response.status === 400) {
//         throw new Error("Request failed: " + response.statusText);
//       }

//       return await response.json();
//     } catch (error) {
//       console.error("Fetch error while fetching the user location:", error);
//       throw error;
//     }
//   }
// );

const UserSlice = createSlice({
  name: "UserSliceDetails",
  initialState: {
    success: "",
    error: "",
    loading: false,
    data: [],
    roleList: [],
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
    builder.addCase(addUser.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(viewUser.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewUser.fulfilled, (state, action) => {
      state.loading = false;
      state.viewReport = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(editUser.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = action.payload.message;
    });
    builder.addCase(editUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = "Data deleted successfully";
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error);
    });

    // builder.addCase(filterFacilityUser.pending, (state) => {
    //   state.loading = true;
    //   state.error = "";
    //   state.success = "";
    // });
    // builder.addCase(filterFacilityUser.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.viewReport = action.payload;
    // });
    // builder.addCase(filterFacilityUser.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // });

    builder.addCase(viewRoleList.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(viewRoleList.fulfilled, (state, action) => {
      state.loading = false;
      state.roleList = action.payload;
      state.total_page = action.payload.count;
    });
    builder.addCase(viewRoleList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearSuccessMessage, clearErrorMessage, clearStates } =
  UserSlice.actions;
export default UserSlice.reducer;
