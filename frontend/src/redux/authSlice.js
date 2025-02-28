import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

const token = localStorage.getItem("userToken");
const userData = JSON.parse(localStorage.getItem("userData")) || null;

//Login Action
export const loginUser = createAsyncThunk("auth/loginUser", async (credentials, { rejectWithValue } ) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        const {token, user} = response.data;

        //store in localStorage
        localStorage.setItem("userToken", token);
        localStorage.setItem("userData", JSON.stringify(user));
        return {token, user}
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

//Update Logged in User Action
export const updateLoggedInUser = createAsyncThunk("auth/updateUser", async(userDAta, {rejectWithValue}) => {
    try {
        const response = await axios.put(`${API_URL}/${userData.id}`, userData, {
            headers: {
                Authorization: `Bearer ${ocalStorage.getItem("userToken")}`,
            },
        });
        localStorage.setItem("userData", JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Update failed");
    }
})



//Auth Slice
const authSlice = createSlice({
    name:"auth",
    initialState: {
        user: userData,
        userToken: token || null,
        isAdmin: userData?.isAdmin || false,
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
            state.user = action.payload.user;
            state.userToken = action.payload.token;
            state.isAdmin = action.payload.user.isAdmin;
            state.error = null;
        })
        .addCase(loginUser.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload || "Login failed";
        })
        .addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
            state.userToken = null;
            state.isAdmin = false;
        })
        .addCase(updateLoggedInUser.fulfilled,(state, action) => {
            state.user= {...state.user, ...action.payload};
            state.error = null;
        })
        .addCase(updateLoggedInUser.rejected, (state, action) => {
            state.error = action.payload || "update failed";
        });
    }
});

export default authSlice.reducer;