import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { registerUser } from './redux/authSlice';

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { name, email, password };

        const result = await dispatch(registerUser(userData));

        if (!result.error) {
            navigate("/home"); // Redirect to Dashboard
        }
    };
  return (
    <div className="container mt-5">
        <div className="card p-4 shadow-sm w-50 mx-auto">
            <h2 className="text-center">
                SignUP
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">
                        Name:
                    </label>
                    <input
                     type="text" className="form-control" 
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">
                        Email:
                    </label>
                    <input
                     type="email" className="form-control" 
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     />
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">
                        Password:
                    </label>
                    <input
                     type="password"
                     className="form-control"
                     value={password}
                     onChange={(e)  => setPassword(e.target.value)}
                    required
                    />
                </div>
                <button className="btn btn-primary w-100">
                    Sign Up
                </button>
            </form>
        </div>
    </div>
  )
}

export default Signup
