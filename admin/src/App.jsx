import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {Routes, Route} from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import OrderHistory from './pages/OrderHistory/OrderHistory'
import AddEvent from './pages/AddEvent/AddEvent'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const url = "https://pantastic-backend.onrender.com"
  return (
    <div>
        <ToastContainer/>
        <Navbar/>
        <hr />
        <div className = "app-content">
          <Sidebar/>
          <Routes>
            <Route path="/add" element={<Add url={url}/>}/>
            <Route path="/list" element={<List url={url}/>}/>
            <Route path="/orders" element={<Orders url={url}/>}/>
            <Route path="/OrderHistory" element={<OrderHistory url={url}/>}/>
            <Route path="/AddEvent" element={<AddEvent url={url}/>}/>
          </Routes>
        </div>
    </div>
  )
}

export default App
