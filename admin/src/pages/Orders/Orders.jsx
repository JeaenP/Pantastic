import React, { useState, useEffect } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [visibleMapIndex, setVisibleMapIndex] = useState(null);
  const [visibleImageIndex, setVisibleImageIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const fetchPendingOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/pending");
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error al cargar los pedidos pendientes");
      }
    } catch (error) {
      console.error("Error fetching pending orders:", error);
      toast.error("Error al cargar los pedidos pendientes");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value
      });
      if (response.data.success) {
        await fetchPendingOrders();
      } else {
        toast.error("Error al actualizar el estado del pedido");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Error al actualizar el estado del pedido");
    }
  };

  const completeOrder = async () => {
    try {
      const response = await axios.post(url + "/api/order/complete", { orderId: selectedOrderId });
      if (response.data.success) {
        await fetchPendingOrders();
        toast.success("Pedido completado con éxito");
      } else {
        toast.error("Error al completar el pedido");
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error completing order:", error);
      toast.error("Error al completar el pedido");
      setShowModal(false);
    }
  };

  const toggleMapVisibility = (index) => {
    if (visibleMapIndex === index) {
      setVisibleMapIndex(null);
    } else {
      setVisibleMapIndex(index);
    }
  };

  const toggleImageVisibility = (index) => {
    if (visibleImageIndex === index) {
      setVisibleImageIndex(null);
    } else {
      setVisibleImageIndex(index);
    }
  };

  const handleCompleteClick = (orderId) => {
    setSelectedOrderId(orderId);
    setShowModal(true);
  };

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Órdenes Pendientes</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <div className="order-item-main">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className='order-item-food'>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " X " + item.quantity;
                    } else {
                      return item.name + " X " + item.quantity + ",";
                    }
                  })}
                </p>
                <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
                <p className="order-item-phone">{order.address.phone}</p>
                <button onClick={() => toggleMapVisibility(index)}>Ubicación</button>
                {order.paymentMethod === 'ahorita' && (
                  <button onClick={() => toggleImageVisibility(index)}>Pago</button>
                )}
                <button onClick={() => handleCompleteClick(order._id)}>Completar</button>
              </div>
              <p>Productos: {order.items.length} </p>
              <p>$ {order.amount} </p>
              <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                <option value="Verificando Pago">Verificando Pago</option>
                <option value="Preparando pedido">Preparando pedido</option>
                <option value="Enviado">Enviado</option>
              </select>
            </div>
            {visibleMapIndex === index && (
              <div className="order-item-map">
                <LoadScript googleMapsApiKey="AIzaSyAWcxXZO36iZusfLvs4CZeOLplPir5DlvY">
                  <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '400px' }}
                    center={{ lat: order.address.location.lat, lng: order.address.location.lng }}
                    zoom={15}
                    options={{ disableDefaultUI: true, zoomControl: true }}
                  >
                    <Marker position={{ lat: order.address.location.lat, lng: order.address.location.lng }} />
                  </GoogleMap>
                </LoadScript>
              </div>
            )}
            {visibleImageIndex === index && (
              <div className="order-item-image">
                <img src={order.paymentImage} alt="Comprobante de Pago"  />
              </div>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <p>¿Estás seguro de que quieres completar este pedido?</p>
            </div>
            <div className="modal-actions">
              <button className="modal-button" onClick={completeOrder}>Confirmar</button>
              <button className="modal-button" onClick={() => setShowModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
