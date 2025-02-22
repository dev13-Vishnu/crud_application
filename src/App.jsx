
import './App.css'
import Create from './Create';
import Home from './Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Update from './Update';


function App() {

  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element = {<Home/>}/>
      <Route path='/create' element= {<Create/>}/>
      <Route path='/edit' element= {<Update/>} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
