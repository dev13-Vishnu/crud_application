import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const API_URL = "http://localhost:5000/api/users";

//Async actions for all API calls

//Fetch all users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async(_,{ rejectWithValue,getState}) => {
    try {
        const token = getState().auth.userToken;
        // console.log("Token in fetchUsers:", token);
        if(!token) return rejectWithValue("Unauthorized: No token found");
        const response = await axios.get(`${API_URL}/`,{
            headers: {Authorization:`Bearer ${token}`},
        });
        return response.data;
    } catch (error) {
        // console.log("Fetch Users Error:",error.response?.data?.message);
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

export const updateLoggedInUser = createAsyncThunk("auth/updateUser", async(userData, {rejectWithValue}) => {
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

//Delete user
export const deleteUser = createAsyncThunk("users/deleteUser", async(id,{rejectWithValue}) => {
    try {
        const token = localStorage.getItem("userToken");
        console.log(`Sending DELETE request to : ${API_URL} /${id}`);
        const response = await  axios.delete(`${API_URL}/${id}`,{
            headers: {Authorization : `Bearer ${token}`}
        });
        return id;
    } catch (error) {
        console.error("Delete User Error:", error.response?.data?.message || "Error deleting user");
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
        // state.error = action.error.message;
        state.error = action.payload;
        console.error("Fetch Users Error",action.payload)
    })
    
    //Add User
    .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
    })
    .addCase(updateLoggedInUser.fulfilled,(state, action) => {
        state.user= {...state.user, ...action.payload};
        state.error = null;
    })
    .addCase(updateLoggedInUser.rejected, (state, action) => {
        state.error = action.payload || "update failed";
    })
    //delete user
    .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
    })
    .addCase(deleteUser.rejected, (state, action) => {
        state.error =action.payload;
    });
  },
});


export default userSlice.reducer;
