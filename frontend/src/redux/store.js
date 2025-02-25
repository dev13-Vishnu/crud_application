import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserReducer";
import authReducer from './authSlice';

const store = configureStore({
    reducer: {
        users: UserReducer,
        auth: authReducer
    },
});

export default store