import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";

import CommonApiSlice from "./CommonApi/CommonApiSlice";

import usersListSlice from "./Users/UserList/usersListSlice";

import activityLogSlice from "./Users/activityLog/activityLogSlice";
import patientSlice from "./patient/patientSlice";

const store = configureStore({
  reducer: {
    authDetails: authSlice,
    CommonApiDetailSlice: CommonApiSlice,

    UserSliceDetails: usersListSlice,

    UserActivityDetails: activityLogSlice,
    patientDetails: patientSlice,
  },
});
export default store;
