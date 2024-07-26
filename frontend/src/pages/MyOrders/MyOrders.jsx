import React, { useContext, useState, useEffect } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { io } from 'socket.io-client';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [pendingOrders, setPendingOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { Authorization: `Bearer ${token}` } });
            if (response.data.success) {
                setPendingOrders(response.data.data.pendingOrders);
                setCompletedOrders(response.data.data.limitedCompletedOrders);
            } else {
                console.error("Error fetching orders:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();

            const socket = io(url);
            socket.on('orderStatusUpdated', (updatedOrder) => {
                fetchOrders(); // Actualiza la lista de pedidos cuando se recibe una actualización
            });

            return () => {
                socket.disconnect();
            };
        }
    }, [token]);

    return (
        <div className='my-orders'>
            <h2>Pedidos pendientes</h2>
            <div className="container">
                {pendingOrders.map((order, index) => (
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>
                            {order.items.map((item, index) => {
                                if (index === order.items.length - 1) {
                                    return `${item.name} X ${item.quantity}`;
                                } else {
                                    return `${item.name} X ${item.quantity}, `;
                                }
                            })}
                        </p>
                        <p>${order.amount}</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf; </span><b>{order.status}</b></p>
                        
                    </div>
                ))}
            </div>
            
            <h2>Historial (últimos 5)</h2>
            <div className="container">
                {completedOrders.map((order, index) => (
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>
                            {order.items.map((item, index) => {
                                if (index === order.items.length - 1) {
                                    return `${item.name} X ${item.quantity}`;
                                } else {
                                    return `${item.name} X ${item.quantity}, `;
                                }
                            })}
                        </p>
                        <p>${order.amount}</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf; </span><b>{order.status}</b></p>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;