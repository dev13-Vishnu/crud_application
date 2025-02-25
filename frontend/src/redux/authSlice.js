import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

const token = localStorage.getItem("userToken");

//Login Action
export const loginUser = createAsyncThunk("auth/loginUser", async (credentials, { rejectWithValue } ) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        localStorage.setItem("userToken", response.data.token);
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Login failed");
    }
});

//Logout Action
export const logoutUser = createAsyncThunk("auth/logoutUser", async() => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    return null;
});

//Auth Slice
const authSlice = createSlice({
    name:"auth",
    initialState: {
        user: JSON.parse(localStorage.getItem("userData")) || null,
        userToken: token || null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
            state.userToken = null;
        });
    }
});

export default authSlice.reducer;