import { configureStore } from "@reduxjs/toolkit";
import { employeeDetailApi } from "./employeeApi";
import {logiDetail} from "./login"
import { attendanceDetailApi } from "./attendance";
import { workDetailApi } from "./employeeworck";
import { bankDetailApi  } from "./employeeBank";
import { policyApi } from "./policy";
import { leaveApi } from "./leaveApi";
import { notificationApi } from "./notification";
<<<<<<< HEAD
import { payroleApi } from "./payroleApi";
=======
import { docDetailApi } from "./employeeDoc";
>>>>>>> bb206d77491a9c26131ebdb75969212b5c5034a6
export const store = configureStore({
    reducer: {
        [employeeDetailApi.reducerPath]: employeeDetailApi.reducer,
        [logiDetail.reducerPath]:logiDetail.reducer,
        [attendanceDetailApi.reducerPath] :attendanceDetailApi.reducer,
        [workDetailApi.reducerPath]:workDetailApi.reducer,
        [bankDetailApi.reducerPath]:bankDetailApi.reducer,
        [policyApi.reducerPath]:policyApi.reducer,
        [leaveApi.reducerPath]:leaveApi.reducer,
        [notificationApi.reducerPath]:notificationApi.reducer,
<<<<<<< HEAD
        [payroleApi.reducerPath]:payroleApi.reducer,
=======
        [docDetailApi.reducerPath]:docDetailApi.reducer,
>>>>>>> bb206d77491a9c26131ebdb75969212b5c5034a6
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(employeeDetailApi.middleware,
            logiDetail.middleware,attendanceDetailApi.middleware,
            workDetailApi.middleware,bankDetailApi.middleware,
            policyApi.middleware,leaveApi.middleware,
            notificationApi.middleware, 
<<<<<<< HEAD
            payroleApi.middleware,
=======
            docDetailApi.middleware,
>>>>>>> bb206d77491a9c26131ebdb75969212b5c5034a6
        ),     
});
