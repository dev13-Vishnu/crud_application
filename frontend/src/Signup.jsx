import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
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
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
        <div className="card p-4 shadow-lg text-light" style={{width: "400px", background:"#121212"}} >
            <h2 className="text-center" style={{color: "#00BFFF"}}>
                Sign Up
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">
                        Name:
                    </label>
                    <input
                     type="text" className="form-control bg-dark text-light border-0" 
                     style={{borderBottom : "2px solid #00BFFF"}}
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
                     type="email" className="form-control bg-dark text-light border-0" 
                     style={{borderBottom : "2px solid #00BFFF"}} 
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
                     className="form-control bg-dark text-light border-0" 
                     style={{borderBottom : "2px solid #00BFFF"}}
                     value={password}
                     onChange={(e)  => setPassword(e.target.value)}
                    required
                    />
                </div>
                <button
                 className="btn w-100"
                 style={{background:"#00BFFF", color: "#121212"}}
                 >
                    Sign Up
                </button>
                <div className="mt-3 text-center">
                    <Link to="/login" style={{color:"#00BFFF"}} >Already have an account? Login</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup
