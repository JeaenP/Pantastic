import React, { useState, useEffect } from 'react';
import './OrderHistory.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const OrderHistory = ({ url }) => {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [monthlyTotal, setMonthlyTotal] = useState(0);

  const fetchCompletedOrders = async () => {
    const response = await axios.get(url + "/api/order/listCompletedOrders");
    if (response.data.success) {
      const orders = response.data.data;
      setCompletedOrders(orders);
      calculateMonthlyTotal(orders);
    } else {
      toast.error("Error al obtener el historial de pedidos");
    }
  };

  const calculateMonthlyTotal = (orders) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const total = orders.reduce((sum, order) => {
      const orderDate = new Date(order.date);
      if (orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear) {
        return sum + order.amount;
      }
      return sum;
    }, 0);
    setMonthlyTotal(total);
  };

  useEffect(() => {
    fetchCompletedOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Historial de Pedidos</h3>
      <p>Total vendido este mes: ${monthlyTotal}</p>
      <div className="order-list">
        {completedOrders.map((order, index) => (
          <div key={index} className="order-item">
            <div className="order-item-main">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className='order-item-food'>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " X " + item.quantity;
                    } else {
                      return item.name + " X " + item.quantity + ", ";
                    }
                  })}
                </p>
                <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>Productos: {order.items.length} </p>
              <p>$ {order.amount} </p>
              <p><span>&#x25cf; </span><b>{order.status}</b></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
