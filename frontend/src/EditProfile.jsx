import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
// import { updateUser } from './redux/UserReducer';
import { updateLoggedInUser } from './redux/UserReducer';
const EditProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state) =>state.auth);

    const [name, setName] = useState(user?.name|| "");
    const [email, setEmail] = useState(user?.email || "");
    const [profilePic, setProfilePic] = useState(null);

    const handleFileChange = (e) => {
        setProfilePic(e.target.files[0]);
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        if(profilePic) {
            formData.append('profilePic', profilePic);
        }
        try {
            const response = await axios.put(`http://localhost:5000/api/users/profile`,formData, {
                headers:{
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            });

            const updatedUser = response.data;
            updatedUser.profilePic += `?t= ${new Date().getTime()}`;
            dispatch(updateLoggedInUser(updatedUser));

            
            localStorage.setItem("userData", JSON.stringify(response.data));
            
            navigate('/home');
        } catch (error) {
            console.error('Update failed:',error.response?.data?.message || error.message);
        }
    }
  return (
    <div className="container mt-5">
        <div className="card p-4 shadow-sm w-50 mx-auto">
            <h2 className="text-center"> Edit Profile</h2>
            <form onSubmit={handleUpdate}>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Name:</label>
                    <input
                     type="text"
                     className="form-control" 
                     value={name}
                     onChange ={(e) => setName(e.target.value)}
                     required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Email:</label>
                    <input
                     type="email"
                     className="form-control" 
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                     />
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Profile Picture:</label>
                    <input
                     type="file"
                     className="form-control" 
                     accept='image/*'
                     onChange= {handleFileChange}
                     />
                </div>
                <button className="btn btn-success w-100">Update Profile</button>
            </form>
        </div>
    </div>
  )
}

export default EditProfile
