import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../redux/authSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
  return (
    <nav className="navbar navbar-dark bg-dark">
        <Link to='/' className='navbar-brand'>
            CRUD App
        </Link>
        <div>
            {user ? (
            <>
                <span className="text-white me-3">Welcome, {user.name}!</span>
                <button className="btn btn-danger" onClick={() => dispatch(logoutUser())}>
                    Logout
                </button>
            </>
            ): (
                <Link to="/login" className ="btn btn-success">
                    Login
                </Link>
            )}
        </div>
    </nav>
  )
}

export default Navbar
