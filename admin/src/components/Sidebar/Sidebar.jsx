import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className = "sidebar">
        <div className="sidebar-options">
            <NavLink to='/add' className="sidebar-option"> 
                <img src={assets.add_icon} alt="" />
                <p>Añadir items</p>
            </NavLink>
            <NavLink to='/List' className="sidebar-option">
                <img src={assets.list} alt="" />
                <p>Listar Items</p>
            </NavLink>
            <NavLink to='/Orders' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Pedidos</p>
            </NavLink>
            <NavLink to='/OrderHistory' className="sidebar-option">
                <img src={assets.history} alt="" />
                <p>Historial</p>
            </NavLink>
            <NavLink to='/AddEvent' className="sidebar-option">
                <img src={assets.event} alt="" />
                <p>Eventos</p>
            </NavLink>
        </div>
      
    </div>
  )
}

export default Sidebar
