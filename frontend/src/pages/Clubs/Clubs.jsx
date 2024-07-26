import React from 'react';
import './Clubs.css';
import { Link } from 'react-router-dom';
import { menu_list, assets } from '../../assets/assets'; // Asegúrate de importar assets si no lo has hecho


const Clubs = () => {
  return (
    <div className="clubs">
      <div className="title">
        <img src={assets.separatorLeft} alt="" />
        <h2>Clubes</h2>
        <img src={assets.separatorRight} alt="" />


      </div>
      <div className="tutorial">
        <div className="tutorial-box">
          <div className="promos-list">
            <div className="promo">
              <img src={assets.point} alt="" /> <br />
              <b>Puntos por cada compra:</b>  Gana puntos por cada dólar que gastas. Cuanto más disfrutas, más ganas.
            </div>
            <div className="promo">
              <img src={assets.desc} alt="" /> <br />
              <b>Descuentos por tus compras:</b>   Disfruta de descuentos exclusivos al acumular puntos de compra.
            </div>

            <div className="promo">
              <img src={assets.heart} alt="" /> <br />
              <b>Ofertas personalizadas:</b> Recibe ofertas diseñadas especialmente para tus gustos y preferencias.
            </div>
            <div className="promo">
              <img src={assets.gift} alt="" /> <br />
              <b>Bonos en fechas especiales:</b>  Celebra las fechas especiales con regalos y promociones de nuestra parte.
            </div>
            <div className="promo">
              <img src={assets.diamond} alt="" /> <br />
              <b>Eventos exclusivos:</b> Acceso prioritario a eventos especiales y degustaciones solo para miembros del club.
            </div>
            <div className="promo">
              <img src={assets.deliver} alt="" /> <br />
              <b>Entregas gratuitas:</b>  Gana cupones en nuestro servicio de entregas a domicilio.
            </div>
          </div>
        </div>
      </div>
      <div className="separator">
        <div className="separator-content">
          <img src={assets.separator} alt="" />
        </div>

      </div>

      <div className="clubs-list">
        {menu_list.map((club, index) => (
          <div className="club-group">
            <div key={index} className="club-item">
              <img src={club.club_image} alt={club.menu_name} className="club-image" />
              <div className="club-overlay">
                <h3>{club.menu_name}</h3>
                <Link to={`/clubs/${club.menu_name.toLowerCase()}`} className="join-link">Continuar</Link>
              </div>
            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Clubs;