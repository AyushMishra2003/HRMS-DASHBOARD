import { configureStore } from "@reduxjs/toolkit";
import { employeeDetailApi } from "./employeeApi";
import {logiDetail} from "./login"
import { attendanceDetailApi } from "./attendance";
import { workDetailApi } from "./employeeworck";
import { bankDetailApi  } from "./employeeBank";
import { policyApi } from "./policy";
import { leaveApi } from "./leaveApi";
export const store = configureStore({
    reducer: {
        [employeeDetailApi.reducerPath]: employeeDetailApi.reducer,
        [logiDetail.reducerPath]:logiDetail.reducer,
        [attendanceDetailApi.reducerPath] :attendanceDetailApi.reducer,
        [workDetailApi.reducerPath]:workDetailApi.reducer,
        [bankDetailApi.reducerPath]:bankDetailApi.reducer,
        [policyApi.reducerPath]:policyApi.reducer,
        [leaveApi.reducerPath]:leaveApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(employeeDetailApi.middleware,
            logiDetail.middleware,attendanceDetailApi.middleware,
            workDetailApi.middleware,bankDetailApi.middleware,
            policyApi.middleware,leaveApi.middleware
        ),     
});
