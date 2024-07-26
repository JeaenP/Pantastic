import React from 'react';
import './Header.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importa los estilos del carrusel
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Header = () => {
    return (
        <div className='header'>
            <Carousel
                showArrows={true}
                showThumbs={false}
                showStatus={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={5000}
                stopOnHover={true}
            >
                <div className="carousel-slide">
                    <div className="header-contents">
                        <h2>Somos un <b>DELICATESSEN </b> de gastronómia artesanal</h2>
                        <p> En Pantastic te ofrecemos no solo productos
                            artesanales de delicatessen de alta gama, sino también la oportunidad de
                            formar parte de una comunidad gastronómica única.
                            ¡Bienvenido a nuestra comunidad Pantastic!
                        </p>
                        <button><a href="#food-display">Ver menú</a> </button>
                    </div>
                    <img src="/header_image2.png" alt="Imagen 1" />
                </div>
                <div className="carousel-slide">
                    <div className="header-contents">
                        <h2>Únete a nuestros <b>CLUBES</b>  y participa en <b>EVENTOS</b>  </h2>
                        <p>En PANTASTIC, te invitamos a unirte a nuestros clubes y participar en eventos exclusivos para nuestros miembros. ¡Forma parte de nuestra comunidad y disfruta de experiencias únicas!</p>
                        <button><Link to="/clubs">Unirse al Club</Link></button>
                    </div>
                    <img src="/header_image3.png" alt="Imagen 2" /> {/* Asegúrate de usar la ruta correcta a la imagen */}
                </div>
                <div className="carousel-slide">
                    <div className="header-contents">
                        <h2>Gana fantasticos <b>DESCUENTOS</b> en tus compras </h2>
                        <p>Aprovecha nuestro plan de recompensas y acumula puntos por tus compras. <br /> ¡Empieza a ganar y disfruta de descuentos exclusivos!</p>
                        <button><Link to="/clubs">Empezar</Link></button>
                    </div>
                    <img src="/header_image4.png" alt="Imagen 3" /> {/* Asegúrate de usar la ruta correcta a la imagen */}
                </div>
                <div className="carousel-slide">
                    <div className="header-contents">
                        <h2>¡Mas <b>FÁCIL</b> ! <br /> Paga con <b>ahorita!</b></h2>
                        <p>Realiza tus compras de manera fácil y sencilla. <br /> Simplemente escanea el codigo o accede al enlace de compra y listo. </p>
                        <button><Link to="/cart">Comprar ahora</Link></button>
                    </div>
                    <img src="/header_image5.png" alt="Imagen 3" /> {/* Asegúrate de usar la ruta correcta a la imagen */}
                </div>
                
            </Carousel>
            
        </div>
        
    );
}

export default Header;
