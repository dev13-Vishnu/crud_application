
import './App.css'
import Create from './Create';
import Dashboard from './Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Update from './Update';
import Login from './components/Login';
import PrivateRoute from './PrivateRoute';
import Home from './Home';
import EditProfile from './EditProfile';


function App() {

  return (
  <BrowserRouter>
    <Routes>
      {/* <Route path='/' element = {<Dashboard/>}/>
      <Route path='/create' element= {<Create/>}/>
      <Route path='/edit/:id' element= {<Update/>} /> */}
      <Route path='/login' element = {<Login/>} />
      <Route path = "/home" element = {<PrivateRoute><Home/></PrivateRoute>} />
      <Route path='/dashboard' element =  {<PrivateRoute adminOnly ={true}><Dashboard/></PrivateRoute>}/>
      <Route path='/edit/:id' element = {<PrivateRoute adminOnly = {true}><Update/></PrivateRoute>}/>
      <Route path= "/edit-profile/:id" element ={<PrivateRoute><EditProfile/></PrivateRoute>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
