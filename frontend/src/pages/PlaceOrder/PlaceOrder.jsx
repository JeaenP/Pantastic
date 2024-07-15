import React, { useContext, useEffect, useState, useCallback, useRef } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCheckCircle } from 'react-icons/fa';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [data, setData] = useState({ firstName: "", lastName: "", phone: "" });
  const [markerPosition, setMarkerPosition] = useState(null);
  const [isLocationSelected, setIsLocationSelected] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: -3.9982899501384948, lng: -79.20573850602356 });
  const [isAddressSaved, setIsAddressSaved] = useState(false);
  const mapRef = useRef(null);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onMapClick = useCallback((event) => {
    const newMarkerPosition = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    setMarkerPosition(newMarkerPosition);
    setIsLocationSelected(true);
    setIsAddressSaved(true); // Actualiza el estado para mostrar el mensaje
  }, []);

  const placeOrder = async (event) => {
    event.preventDefault();
    if (!data.firstName || !data.lastName || !data.phone || !isLocationSelected) {
      toast.error("Completa todos los campos antes de proceder con el pago");
      return;
    }

    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: { 
        firstName: data.firstName, 
        lastName: data.lastName, 
        phone: data.phone, 
        location: markerPosition 
      },
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    console.log("Order data:", orderData);
    try {
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        toast.error("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Error placing order");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Información de entrega</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='Nombre' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Apellido' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Número Telefónico' />
        <div className="address-header">
          <p>Seleccionar dirección:</p>
          {isAddressSaved && (
            <span className="address-saved">
              <FaCheckCircle color="green" /> Dirección guardada
            </span>
          )}
        </div>
        <LoadScript googleMapsApiKey="AIzaSyAWcxXZO36iZusfLvs4CZeOLplPir5DlvY">
          <GoogleMap
            ref={mapRef}
            mapContainerStyle={{ width: '100%', height: '400px' }}
            center={mapCenter}
            zoom={15}
            onClick={onMapClick}
            options={{ disableDefaultUI: true, zoomControl: true }}
            className="google-map"
          >
            {markerPosition && <Marker position={markerPosition} />}
          </GoogleMap>
        </LoadScript>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Total de la compra</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Costo de envio</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type="submit">PROCEDER CON EL PAGO</button>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};

export default PlaceOrder;
