
import './App.css'
import Create from './Create';
import Home from './Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Update from './Update';
import Login from './components/Login';
import PrivateRoute from './PrivateRoute';


function App() {

  return (
  <BrowserRouter>
    <Routes>
      {/* <Route path='/' element = {<Home/>}/>
      <Route path='/create' element= {<Create/>}/>
      <Route path='/edit/:id' element= {<Update/>} /> */}
      <Route path='/login' element = {<Login/>} />
      <Route path='/' element =  {<PrivateRoute><Home/></PrivateRoute>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
