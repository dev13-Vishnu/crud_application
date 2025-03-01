import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

const token = localStorage.getItem("userToken");
const userData = JSON.parse(localStorage.getItem("userData")) || null;

export const registerUser = createAsyncThunk(
    "auth/registerUser" ,
    async(userData, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${API_URL}/register`, userData);
            console.log("API Response:", response.data);

            const formattedResponse = {
                token : response.data.token,
                user: {
                    id: response.data.id,
                    name: response.data.name,
                    email: response.data.email
                }
            }
            localStorage.setItem("userToken", response.data.token);
            localStorage.setItem("userData",JSON.stringify(formattedResponse.user))
            return formattedResponse;              
        } catch (error) {
            console.error("Signup Error:", error.response?.data);
            return rejectWithValue(error.response?.data?.message || "Registration failed")
        }
    }
)

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
        .addCase(registerUser.pending,(state) => {
            state.loading = true;
        })
        .addCase(registerUser.fulfilled,(state, action) => {
            state.loading = false;
            state.user = action.payload?.user;
            state.userToken = action.payload?.token;
            state.error = null;
        })
        .addCase(registerUser.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload || "Signup failed"; 
        })
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
        });
    }
});

export default authSlice.reducer;