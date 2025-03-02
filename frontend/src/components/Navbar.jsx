import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logoutUser } from '../redux/authSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const location = useLocation(); // Get current route

    return (
        <nav className="navbar navbar-dark bg-dark">
            <Link to="/" className="navbar-brand ms-3">
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
                ) : (
                    location.pathname === "/login" ? (
                        <Link to="/register" className="btn btn-primary">
                            Sign Up
                        </Link>
                    ) : location.pathname === "/register" ? (
                        <Link to="/login" className="btn btn-success">
                            Login
                        </Link>
                    ) : (
                        <Link to="/login" className="btn btn-success">
                            Login
                        </Link>
                    )
                )}
            </div>
        </nav>
    );
};

export default Navbar;
