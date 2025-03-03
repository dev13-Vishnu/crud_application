import React, { useState } from 'react'
import { addUser } from './redux/AdminReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [name,setName] = useState('');
    const [email,setEmai] = useState('');
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit =  (event) => {
        try {
            event.preventDefault();
        dispatch(addUser({ name, email, password})) .unwrap();
        navigate('/dashboard')
        } catch (error) {
            console.error("Error:",error);
            alert(error);
        }
    }
  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-dark text-light">
        <div className="w-50  rounded shadow bg-secondary  p-5">
            <h3 className='text-center text-info'>Add New User</h3>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="name" className='form-label'>Name:</label>
                    <input
                     type="text" 
                     name='name'
                     className = 'form-control'
                     placeholder='Enter name...'
                     onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor="email" className='form-label'>Email:</label>
                    <input
                     type="email"
                     name='email'
                     className="form-control"
                     placeholder='Enter Email'
                     onChange={(e)=> setEmai(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor="password" className='form-label'>Password:</label>
                    <input
                     type="password"
                     name='password'
                     className='form-control'
                     placeholder='Enter Password'
                     onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <br />
                <button className='btn btn-primary w-100'
                >Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Create
