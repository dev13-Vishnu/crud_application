import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const API_URL = "http://localhost:5000/api/users";

//Async actions for all API calls

//Fetch all users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async(_,{ rejectWithValue}) => {
    try {
        const token = localStorage.getItem("userToken");
        if(!token) return rejectWithValue("Unauthorized: No token found");
        const response = await axios.get(API_URL,{
            headers: {Authorization:`Bearer ${token}`},
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Unauthorized")
    }
    
});

//Add a new User
export const addUser = createAsyncThunk("users/adduUser", async (user, {rejectWithValue})=> {
    try {
    const token = localStorage.getItem("userToken");
    if(!token) return rejectWithValue("Unauthorized: No token found");

    const response = await axios.post(API_URL, user, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json"},
    });
    return response.data;        
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Error adding user");
    }
})
//Update user
export const updateUser = createAsyncThunk("users/updateUser", async(user) => {
    try {
        const token = locaalStorage.getItem("userToken");
        if(!token) return rejectWithValue("Unauthorized: No token found");

        const response = await axios.put(`${API_URL}/${user.id}`,user,{
            headers: {Authorization: `Bearer ${token}`, "Content-Type": "application/json"},
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Error updating user");
    }
});

//Delete user
export const deleteUser = createAsyncThunk("users/deleteUser", async(id,{rejectWithValue}) => {
    try {
        const token = localStorage.getItem("userToken");
        if(!token) return rejectWithValue("Unauthorized: No token found");

        await axios.delete(`${API_URL}/${id}`, {
            headers: {Authorization: `Bearer ${token}`},
        });
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Error deleting user");
    }
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users:[],
    loading:false,
    error:null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    //Fetch users
    .addCase(fetchUsers.pending,(state) => {
        state.loading = true;
    })
    .addCase(fetchUsers.fulfilled,(state,action) => {
        state.loading = false;
        state.users =action.payload;
    })
    .addCase(fetchUsers.rejected,(state,action) => {
        state.loading = false;
        state.error = action.error.message;
    })
    
    //Add User
    .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
    })

    //Update user
    .addCase(updateUser.fulfilled,(state,action) => {
        const index = state.users.findIndex((u) =>u.id === action.payload.id);
        if(index !== -1) {
            state.users[index] = action.payload;
        }
    })
    .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
    });
  },
});


export default userSlice.reducer;
