
import './App.css'
import Create from './Create';
import Dashboard from './Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Update from './Update';
import Login from './components/Login';
import PrivateRoute from './PrivateRoute';
import Home from './Home';
import EditProfile from './EditProfile';
import Signup from './Signup';
import Navbar from './components/Navbar';
import { useSelector } from 'react-redux';


function App() {
  const {user} = useSelector((state) => state.auth);

  return (
  <BrowserRouter>
  <Navbar/>
    <Routes>
      <Route path='/' element= {user? <Navigate to ='/home'/>:<Login/>}/>
      <Route path = '/register' element = {<Signup/>}/>
      <Route path='/login' element = {<Login/>} />
      <Route path = "/home" element = {<PrivateRoute><Home/></PrivateRoute>} />
      <Route path='/dashboard' element =  {<PrivateRoute adminOnly ={true}><Dashboard/></PrivateRoute>}/>
      
      <Route path='/create' element= {<PrivateRoute adminOnly={true}><Create/></PrivateRoute>}/>
      {/* <Route path='/edit/:id' element = {<PrivateRoute adminOnly = {true}><Update/></PrivateRoute>}/> */}
      <Route path= "/edit-profile/" element ={<PrivateRoute><EditProfile/></PrivateRoute>}/>
      <Route path= "*" element = {<Navigate to = "/"/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
