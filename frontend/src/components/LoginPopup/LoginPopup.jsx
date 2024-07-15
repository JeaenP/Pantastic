import React, { useState, useContext, useEffect } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

const LoginPopup = ({ setShowLogin }) => {

    const {url, setToken} = useContext(StoreContext)


    const [currState, setCurrState] = useState("Login")
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data, [name]:value}))
    } 

    const onLogin = async (event) => {
        event.preventDefault()
        let newUrl = url;
        if (currState==="Login") {
            newUrl += "/api/user/login"
        } else {
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl, data);

        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);

        } else {
            alert(response.data.message);
        }
    } 


    useEffect(() => {
        const getScrollbarWidth = () => {
            return window.innerWidth - document.documentElement.clientWidth;
        };

        const scrollbarWidth = getScrollbarWidth();
        
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;

        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, []);

    

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />

                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder="Nombre" required />}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Correo Electronico" required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder="Contraseña" required />

                </div>
                <button type="submit">{currState === "Sign Up" ? "Unirse" : "Ingresar"}</button>
                <div className="login-popup-condition">

                    {currState === "Login"
                        ? " "
                        : (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input type="checkbox" required />
                                <p style={{ margin: '0 0 0 10px' }}>Al continuar, acepto los términos de uso & política de privacidad.</p>
                            </div>
                        )
                    }

                </div>
                {currState === "Login"
                    ? <p>Registrarse en Pantastic <span onClick={() => setCurrState("Sign Up")}>Click aqui</span></p>
                    : <p>¿Ya esta registrado? <span onClick={() => setCurrState("Login")}>Ingresar aqui</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
