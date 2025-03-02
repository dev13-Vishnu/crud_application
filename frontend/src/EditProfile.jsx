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
    <div
     className="d-flex vh-100 justify-content-center align-items-center"
     style={{background: "#121212"}}
    >
        <div
         className=" p-4 text-light shadow-lg"
        style={{background: "#1E1E1E", borderRadius: "10px", width: "400px"}} 
        >
            <h2
             className="text-center"
             style={{color:"#00BFFF"}}
            >
                 Edit Profile
            </h2>
            <form onSubmit={handleUpdate}>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Name:</label>
                    <input
                     type="text"
                     className="form-control text-light"
                     style={{background:"#333", border:"1px solid #00BFFF"}} 
                     value={name}
                     onChange ={(e) => setName(e.target.value)}
                     required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Email:</label>
                    <input
                     type="email"
                     className="form-control text-light" 
                     style={{background:"#333", border:"1px solid #00BFFF"}} 
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                     />
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Profile Picture:</label>
                    <input
                     type="file"
                     className="form-control text-light" 
                     style={{background:"#333", border:"1px solid #00BFFF"}} 
                     accept='image/*'
                     onChange= {handleFileChange}
                     />
                </div>
                <button
                 className="btn w-100"
                 style={{background: "#00BFFF", color:"#121212"
                 }}
                >
                    Update Profile
                </button>
            </form>
        </div>
    </div>
  )
}

export default EditProfile
