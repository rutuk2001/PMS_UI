import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../services/apiService";

export const loginApi = createAsyncThunk(
  "carbonCal/loginApi",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.post(`userLogin`, data);
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

const authSlice = createSlice({
  name: "authDetails",
  initialState: {
    success: "",
    error: "",
    loading: false,
    data: [],
    isAuth: false,
    token: "",
  },
  reducers: {
    getToken: (state) => {
      const authtoken = localStorage.getItem("authToken");
      return authtoken;
    },
    removeToken: (state) => {
      state.token = "";
      localStorage.removeItem("authToken");
      state.isAuth = false;
    },
    clearSuccessMessage: (state) => {
      state.success = "";
    },
    clearErrorMessage: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginApi.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(loginApi.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
      console.log(action.payload);
      state.token = action.payload.token;
      localStorage.setItem("authToken", action.payload.token);
      localStorage.setItem("name", action.payload.userName);
      state.isAuth = true;
    });
    builder.addCase(loginApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearSuccessMessage, clearErrorMessage, getToken, removeToken } =
  authSlice.actions;
export default authSlice.reducer;
