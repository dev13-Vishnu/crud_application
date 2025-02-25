
import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {

    const {user} = useSelector((state) => state.auth);
  return (
    <div>
      <h2>Welcome {user?.name}</h2>
      <p>Email:{user?.email}</p>
    </div>
  )
}

export default Home
