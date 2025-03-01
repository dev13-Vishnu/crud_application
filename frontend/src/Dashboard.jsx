import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { fetchUsers,deleteUser } from './redux/UserReducer';


const Dashboard = () => {
    const {users, loading, error} = useSelector((state) => state.users)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers()); 
    },[dispatch])

    const handleDelete = (id) => {
        if(window.confirm("Are you sure you want to deletee this user?")){
            console.log("Deleting User ID:", id);
        dispatch(deleteUser(id))
        }
    };
    if(loading) return <p>Loading...</p>
    if(error) return <p>Error: {error}</p>
    
  return (
    <div className="container">
        <h2>Admin Dashboard</h2>
        <Link to="/create" className="btn btn-success my-3">Create +</Link>
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) =>(
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                            
                            <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-danger ms-2">Delete</button>
                        </td>
                    </tr>
                ) )}
            </tbody>
        </table>
    </div>
  )
}

export default Dashboard
