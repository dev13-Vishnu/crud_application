import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers, deleteUser } from './redux/UserReducer';

const Dashboard = () => {
    const { users, loading, error } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            console.log("Deleting User ID:", id);
            dispatch(deleteUser(id));
        }
    };

    if (loading) return <p className="text-light text-center">Loading...</p>;
    if (error) return <p className="text-danger text-center">Error: {error}</p>;

    const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-dark text-light">
            <div className="container mt-5 text-light" >
            <h2 className="text-center" style={{ color: "#00BFFF" }}>Admin Dashboard</h2>
            
            
            <div className="mb-3">
                <input type="text"
                 className='form-control w-50 mx-auto'
                 placeholder='Search by name or email...'
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="d-flex justify-content-end">
                <Link to="/create" className="btn btn-primary mb-3">Create +</Link>
            </div>

            <div className="table-responsive">
                <table className="table table-dark table-striped">
                    <thead>
                        <tr className="text-info">
                            <th>Sl.No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr> 
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="btn btn-sm btn-danger ms-2"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                        )) : (<tr>
                            <td colSpan='4' className='text-center danger' style={{color:"red"}}>No users found</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;
