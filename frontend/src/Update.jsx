import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { updateUser } from './redux/UserReducer';

function Update() {
    const {id} = useParams();
    const users = useSelector((state) => state.users.users);
    const existingUser = users.find(f=> f._id === id);

    const {name ='', email =''} = existingUser || {};

    const [uname, setUname] = useState( existingUser?.name || "");
    const [uemail, setUemail] = useState(existingUser?.email || "");

    useEffect(() => {
        if(existingUser) {
            setUname(existingUser.name);
            setUemail(existingUser.email);
        }
    },[existingUser])

    const dispatch  = useDispatch();
    
    const navigate = useNavigate();

    const handleUpdate = (event) => {
        event.preventDefault();

        if(!uname || !uemail) {
            alert("Please fill in all fields.");
            return;
        }
        dispatch(updateUser({
             id,
             name: uname,
             email: uemail
            })
        )
        
        navigate('/dashboard')
    }

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
        <div className="w-50 border bg-secondary text-white p-5">
            <h3>Update User</h3>
            <form onSubmit={handleUpdate}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                     type="text" 
                     name='name'
                     className = 'form-control'
                     placeholder='Enter name...'
                     value={uname}
                     onChange={(e) => setUname(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                     type="email"
                     name='email'
                     className="form-control"
                     placeholder='Enter Email'
                     value={uemail}
                     onChange={(e)=> setUemail(e.target.value)}
                    />
                </div><br />
                <button className='btn btn-info'>Update</button>
            </form>
        </div>
    </div>
  )
}

export default Update
