import React, { useState, useEffect } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [visibleMapIndex, setVisibleMapIndex] = useState(null);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data)
    } else {
      toast.error("Error")
    }
  }

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders();
    }
  }

  const toggleMapVisibility = (index) => {
    if (visibleMapIndex === index) {
      setVisibleMapIndex(null);
    } else {
      setVisibleMapIndex(index);
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <div className="order-item-main">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className='order-item-food'>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " X " + item.quantity
                    } else {
                      return item.name + " X " + item.quantity + ","
                    }
                  })}
                </p>
                <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
                <p className="order-item-phone">{order.address.phone}</p>
                <button onClick={() => toggleMapVisibility(index)}>Ubicación</button>
              </div>
              <p>Productos: {order.items.length} </p>
              <p>$ {order.amount} </p>
              <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                <option value="Preparando pedido">Preparando pedido</option>
                <option value="Esperando envio">Esperando envio</option>
                <option value="Entregado">Entregado</option>
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
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders;
