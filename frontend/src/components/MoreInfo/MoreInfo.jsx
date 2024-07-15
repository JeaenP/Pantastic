import React from 'react'
import './MoreInfo.css'
import { assets } from "../../assets/assets";
const MoreInfo = () => {
  return (
    <div className='app-download' id='app-download'>
        <div className="app-content">
            <div className="app-title">
                Conecta con lo que te gusta <br />
            </div>
            
            <div className="app-info">
                En pantastic puedes ser parte de un club de acuerdo a tus preferencias,
                explora y asiste a eventos de los productos que más te gusten
            </div>
            <button className="start-button">Comenzar</button>
        </div>
    </div>
  )
}

export default MoreInfo
