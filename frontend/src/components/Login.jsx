
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
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
    <div
     className="d-flex vh-100 justify-content-center align-items-center"
     style={{background:"#121212"}}
    >
        <div
         className="p-5  text-light shadow-lg"
         style={{background:"#1E1E1E", borderRadius: "10px", width: "400px"}} 
        >
             <h3 className='text-center' style={{color: "#00BFFF"}}>Login</h3>
            {error && <p className='text-danger'>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label
                     htmlFor=""
                     className='form-label'
                    >
                        Email:
                    </label>
                    <input
                     type="email"
                     className='form-control text-light'
                     style={{background: '#333', border:'1px solid #00BFFF'}}
                     placeholder='Enter Email'
                     value={email}
                     onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label
                     htmlFor=""
                     className='form-label'
                    >
                        Password:
                    </label>
                    <input
                     type="password"
                     className='form-control text-light'
                     style={{background:"#333", border: "1px solid #00BFFF"}}
                     placeholder='Enter Password'
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <br />
                <button
                 className="btn w-100" 
                 style={{background:"#00BFFF", color: "#121212"}}
                 disabled = {loading}
                >
                    {loading? "Logging in...":"Login"}
                </button>
            </form>
            <br/>
            <p className='text-center'>Don't have an Account?<Link to='/signup' style={{ color: "#00BFFF"}}>Sign Up</Link> </p>
        </div>
    </div>
  )
}

export default Login
