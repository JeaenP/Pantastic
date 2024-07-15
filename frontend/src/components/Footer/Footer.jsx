import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" className="logo" />
                    <p>Desde nuestra plataforma
digital, te brindamos acceso a experiencias gastronómicas personalizadas,
productos exclusivos y la posibilidad de contribuir al impacto ambiental positivo
mediante la sostenibilidad y la economía circular.</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} className="icon" />
                        <img src={assets.instagram_icon} className="icon" />
                        <img src={assets.x_icon} className="icon" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>Emprendimiento</h2>
                    <ul>
                        <li>Inicio</li>
                        <li>Sobre Nosotros</li>
                        <li>Entrega a domicilio</li>
                        <li>Politica de privacidad</li>
                    </ul>

                </div>
                <div className="footer-content-right">
                    <h2>Contacto</h2>
                    <ul>
                        <li>+593 960 139 074</li>
                        <li>pantastic@gmail.com</li>
                    </ul>

                </div>
            </div>
            <hr />
            <p className="footer-copyright">Copyright 2024 © Pantastic.com - All Right Reserved.</p>



        </div>
    )
}

export default Footer
