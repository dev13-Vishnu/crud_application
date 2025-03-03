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
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState('');

    const validate = () => {
        let errors = {};
        if(!name.trim()) {
            errors.name = "Name is reqruired";
        }
        if(!email.trim()) {
            errors.email = "Email is required";
        } else if(!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Invalid email format";
        }
        if (!password) {
            errors.password =  "Password is required";
        } else if(password.length< 6){
            errors.password = "Password must be at least 6 charecters";
        }
        if(password !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit =  (e) => {
        e.preventDefault();
        if(validate()) {
            dispatch(registerUser({name, email, password}));
            navigate('/home')
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
                     
                    />
                    {errors.name && <p className='text-danger'>{errors.name}</p>}
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
                     {errors.email && <p className='text-danger'>{errors.email}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">
                        Password:
                    </label>
                    <input
                     type="password"
                     className="form-control bg-dark text-light border-0" 
                     style={{borderBottom : "2px solid #00BFFF"}}
                     placeholder='Enter password...'
                     value={password}
                     onChange={(e)  => setPassword(e.target.value)}
                    
                    />
                    {errors.password && <p className='text-danger'>{errors.password}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">
                        Confirm Password:
                    </label>
                    <input
                     type="password"
                     className="form-control bg-dark text-light border-0" 
                     style={{borderBottom : "2px solid #00BFFF"}}
                     placeholder='Confim password...'
                     value={confirmPassword}
                     onChange={(e)  => setConfirmPassword(e.target.value)}
                    
                    />
                    {errors.confirmPassword && <p className='text-danger'>{errors.confirmPassword}</p>}
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
