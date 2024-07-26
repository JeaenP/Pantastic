import React, { useState, useContext } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");

    const { getTotalCartAmount, token, setToken, profileImageUrl } = useContext(StoreContext);
  
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("profileImageUrl");
        setToken("");
        navigate("/");
    };

    return (  
        <div className='navbar'>
            <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
            <ul className="navbar-menu">
                <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Inicio</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menú</a>
                <a href='#footer' onClick={() => setMenu("sobre-nosotros")} className={menu === "sobre-nosotros" ? "active" : ""}>Sobre Nosotros</a>
                <Link to="/clubs"  onClick={() => setMenu("Clubes y Eventos")} className={menu === "Clubes y Eventos" ? "active" : ""}>Clubes/Eventos</Link>
            </ul>
            <div className="navbar-right">
                
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.shopping_cart_icon} alt=""/></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {!token ? (
                    <button onClick={() => setShowLogin(true)}>Iniciar Sesión</button>
                ) : (
                    <div className="navbar-profile">
                        <div className="profile-image">
                        <img src={profileImageUrl || assets.profile_icon} alt=""/>
                        </div>
                        <ul className="nav-profile-dropdown">
                            <li onClick={() => navigate('/myorders')}>  <img src={assets.shopping_cart_dropdown_icon} alt=""/> <p>Pedidos</p> </li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} alt=""/> <p>Salir</p></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
