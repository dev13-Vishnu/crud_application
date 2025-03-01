import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Home = () => {
    const {user} = useSelector((state) => state.auth)
    // console.log("User Data:",user);
    const profilePicUrl = user?.profilePic ?`http://localhost:5000/${user.profilePic}` : "avatar-1577909_1280.png"
  return (
    <div className="container mt-5 text-center">
        <div className="card p-4 shadow-sm w-50 mx-auto">
            <div className="profile-picture mb-3">
                <img src={profilePicUrl} alt="Profile"
                    className='rounded-circle'
                    width="150"
                    height="150"
                />
            </div>
            <h2>Welcome, {user?.name}</h2>
            <p>Email: {user?.email}</p>

            <div className="mt-3">
                <Link to={`/edit-profile/`} className='btn btn-primary me-2'>
                    Edit Profile
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Home
