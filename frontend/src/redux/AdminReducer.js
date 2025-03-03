import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

 
 const API_URL = "http://localhost:5000/api/admin";

 export const addUser = createAsyncThunk("users/adduUser", async (user, {rejectWithValue})=> {
    try {
        const token = localStorage.getItem("userToken");
        if(!token) return rejectWithValue("Unauthorized: No token found");

        const response = await axios.post(`${API_URL}/create`, user, {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json"},
        });
        return response.data;        
    } catch (error) {
        console.error("Add user Error:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data?.message || "Error adding user");
    }
})

const adminSlice  = createSlice({
    name: "admin",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extrareducers: (builder) => {
        builder
            .addCase(addUser.pending,(state) => {
                state.loading = true;
            })
            .addCase(addUser.fulfilled,(state,action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(addUser.rejected,(state,action) => {
                state.loadin = false;
                state.error = action.payload;
            });
    },
})

export default adminSlice.reducer;