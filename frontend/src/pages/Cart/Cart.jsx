import React, { useContext, useEffect } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Cart = () => {

    


  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url, token } = useContext(StoreContext);

  const navigate = useNavigate();

  const handleCheckout = (e) => {
    if (!token) {
      e.preventDefault();
      toast.warning("Debe iniciar sesión para realizar pedidos");
    } else if (getTotalCartAmount() === 0) {
      e.preventDefault();
      toast.warning("Elija al menos un producto");
    } else {
      navigate('/order');
    }
  };

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className='cart-items-title cart-items-item'>
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick = {()=>removeFromCart(item._id)} className = "cross">x</p>
                </div>
                <hr />
              </div>

            )
          }
        })}

      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Total de compar</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Costo de envio</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button onClick={handleCheckout}>PAGAR</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>Ingresar código promocional</p>
            <div className = 'cart-promocode-input'>
              <input type="text" placeholder = 'Código promocional'/>
              <button>Enviar</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
    
  )
}

export default Cart
