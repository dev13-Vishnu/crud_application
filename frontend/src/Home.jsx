import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Home = () => {
    const {user} = useSelector((state) => state.auth)
    // console.log("User Data:",user);
    const profilePicUrl = user?.profilePic ?`http://localhost:5000/${user.profilePic}` : "avatar-1577909_1280.png"
  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{background:"#121212"}}>
        <div className="card p-4 text-center text-light shadow-lg" style={{background:"#1E1E1E", borderRadius: "10px"}}>
            <div className="profile-picture mb-3">
                <img src={profilePicUrl} alt="Profile"
                    className='rounded-circle border border-3'
                    width="150"
                    height="150"
                    style={{borderColor: "#00BFFF"}}
                />
            </div>
            <h2 style={{color: "#00BFFF"}}>Welcome, {user?.name}</h2>
            <p className='text-secondary'>Email: {user?.email}</p>

            <div className="mt-3">
                <Link to={`/edit-profile/`}        
                 className='btn me-2'
                 style={{background:"#00BFFF",color: "#121212"}}
                >
                    Edit Profile
                </Link>
                {user?.isAdmin && (
                    <Link to="/dashboard"
                     className='btn' 
                     style={{background:"#28A745", color:"#fff"}}
                    >
                        Dashboard
                    </Link>
                )}
            </div>
        </div>
    </div>
  )
}

export default Home
