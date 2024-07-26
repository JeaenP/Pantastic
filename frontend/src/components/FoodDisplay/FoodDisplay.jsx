import React, {useContext} from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import { assets } from '../../assets/assets'

const FoodDisplay = ({category, showTitles = true }) => {   

    const {food_list} = useContext(StoreContext);

  return (
    <div className = 'food-display' id='food-display'>
        {showTitles ? (
        <>
          
          <div className="title">
          <img src={assets.separatorLeft} alt="" />
            <h2>Menú</h2>
          <img src={assets.separatorRight} alt="" />
          </div>
        </>
      ) : (
        <>
          <h3>Productos relacionados</h3> <br />
          <p>Por tus compras en productos relacionados consigue puntos de club y llena tu barra de progreso para conseguir cupones y descuentos.</p>
        </>
      )}
        <div className="food-display-list">
            {food_list.map((item, index)=>{
                if(category ==="All" || category === item.category){
                  return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>     
                }

                
                
            })}
        </div>
    </div>
  )
}

export default FoodDisplay
