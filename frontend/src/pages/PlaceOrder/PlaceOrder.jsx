import React, { useContext, useEffect, useState, useCallback, useRef } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';
import { assets } from '../../assets/assets';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url, clearCart } = useContext(StoreContext);
  const [data, setData] = useState({ firstName: "", lastName: "", phone: "" });
  const [markerPosition, setMarkerPosition] = useState(null);
  const [isLocationSelected, setIsLocationSelected] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: -3.9982899501384948, lng: -79.20573850602356 });
  const [isAddressSaved, setIsAddressSaved] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [image, setImage] = useState(null);
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
    setIsAddressSaved(true);
  }, []);

  const placeOrder = async (event) => {
    event.preventDefault();
    if (!isLocationSelected) {
        toast.warning("Selecciona la ubicación de envio");
        return;
    }
    if (paymentMethod === 'ahorita' && !image) {
        toast.warning("Debe adjuntar la captura del pago con Ahorita");
        return;
    }

    let orderItems = [];
    food_list.forEach((item) => {
        if (cartItems[item._id] > 0) {
            let itemInfo = { ...item, quantity: cartItems[item._id] };
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
        paymentMethod: paymentMethod,
    };

    try {
        let response;
        if (paymentMethod === 'ahorita') {
            const formData = new FormData();
            formData.append('userId', token);
            formData.append('address', JSON.stringify(orderData.address));
            formData.append('items', JSON.stringify(orderData.items));
            formData.append('amount', orderData.amount);
            formData.append('paymentMethod', orderData.paymentMethod);
            formData.append('paymentImage', image);

            response = await axios.post(url + "/api/order/place", formData, { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` } });
        } else {
            response = await axios.post(url + "/api/order/place", orderData, { headers: { Authorization: `Bearer ${token}` } });
        }
      
        if (response.data.success) {
            if (paymentMethod === 'tarjeta') {
                const { session_url } = response.data;
                window.location.replace(session_url);
            } else {
                clearCart(); // Limpiar el carrito
                toast.success("Pedido creado con éxito.");

                setTimeout(() => {
                  navigate('/myOrders'); // Redirigir a myOrders después de 2 segundos
                }, 1000); // Redirigir a myOrders
                
            }
        } else {
            toast.error("Error: " + response.data.message);
        }
    } catch (error) {
        console.error("Error placing order:", error);
        toast.error("Error placing order");
    }
};


  const handlePaymentMethod = (paymentMethod) => {
    setPaymentMethod(paymentMethod);
    if (paymentMethod === 'ahorita') {
      setShowQR(true);
    } else {
      setShowQR(false);
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

  const handleBackButton = () => {
    setShowQR(false);
  };

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
          <h2>Proceder con el pago</h2>
          {!showQR ? (
            <div className="payment-options">
              <div className="payment-option">
                <img src={assets.card} alt="Tarjeta de crédito" />
                <button type="submit" onClick={() => handlePaymentMethod('tarjeta')}>Tarjeta</button>
              </div>
              <div className="payment-option">
                <img src={assets.bl} alt="Ahorita" />
                <button type="button" onClick={() => handlePaymentMethod('ahorita')}>Ahorita!</button>
              </div>
            </div>
          ) : (
            <div className="ahorita">
              <div className="back-buttom">
                <a type="button" className='arrow-left' onClick={handleBackButton}>
                  <FaArrowLeft />
                </a>
              </div>
              <div className="ahorita-container">
                <div className="ahorita-qr">
                  <p>Escanea el codigo QR o usa el enlace de pago</p>
                  <div className="qr">
                    <img src={assets.ahorita} alt="QR Code for Ahorita Payment" />
                  </div>
                  <div className="ahorita-link">
                    <a href="https://ahorita.bancodeloja.fin.ec/pay?CC5EDDC7057C4340AA62DBDC696BBE593DFBD25C">Continuar a la aplicación Banco de Loja <FaArrowRight /></a>
                  </div>
                </div>
                <hr />
                <div className="upload">
                  <p>Subir captura del pago con ahorita</p>
                  <div className="add-img-upload flex-col">
                    <label htmlFor="image">
                      <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="Upload area" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden></input>
                  </div>
                </div>
              </div>
              <button type="submit">Enviar</button>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};

export default PlaceOrder;
