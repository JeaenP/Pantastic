import React from 'react'
import { menu_list } from '../../assets/assets'
import './ExploreMenu.css'
const Exploremenu = ({category, setCategory}) => {
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explora nuestras opciones</h1>
            <p className='explore-menu-text'>Elije de entre nuestra gran variedad de productos segun tus preferencias. ¿Que vas a probar primero? </p>
            <div className="explore-menu-list">
                {menu_list.map((item,index)=>{
                    return (
                        <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)}  key={index} className='explore-menu-list-item'>
                            <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })}
            </div>
            <hr />

        </div>
    )
}

export default Exploremenu
