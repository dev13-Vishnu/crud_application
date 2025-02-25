
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/authSlice';

const Login = () => {
    const [email, setEmail] =useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {userToken,loading, error} = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({email, password}))
    };
    useEffect(() => {
        if(userToken) {
            navigate("/home");
        }
    },[userToken, navigate])
    
  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
        <div className="w-50 border bg-secondary text-white p-5">
            <h3>Login</h3>
            {error && <p style = {{color: "red"}}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">Email:</label>
                    <input
                     type="email"
                     className='form-control'
                     placeholder='Enter Email'
                     value={email}
                     onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="">Password:</label>
                    <input
                     type="password"
                     className='form-control'
                     placeholder='Enter Password'
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <br />
                <button className="btn btn-info" disabled = {loading}>
                    {loading? "Logging in...":"Login"}
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login
