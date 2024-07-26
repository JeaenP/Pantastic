import React, {useState} from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = ({url}) => {

    
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        category: "Pan",
        price: ""
    })
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onSubmitHandler = async (event) =>{


        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);
        const response = await axios.post(`${url}/api/food/add`, formData);
        if(response.data.success){
            setData({
                name: "",
                description: "",
                category: "Pan",
                price: ""
            })
            setImage(false);
            toast.success(response.data.message)
        } else {

        }
    }

    
  return (
    <div className="add">
        <form className="flex-col" onSubmit={onSubmitHandler}>
            <div className="add-img-upload flex-col">
                <p>Subir Imagen - (360px * 280px recomendado) </p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" hidden required></input>
            </div>
            <div className="add-product-name flex-col">
                <p>Nombre del producto</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name = "name" palceholder="Escribir Aqui" />
            </div>
            <div className="add-product-description">
                <p>Descripcion del producto</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows ="6" placeholder = "Escribir la descripcion aqui" id=""></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Categoría del producto</p>
                    <select onChange={onChangeHandler} name="category" id="">
                        <option value="Pan">Pan</option>
                        <option value="Vino">Vino</option>
                        <option value="Café">Café</option>
                        <option value="Aderezos">Aderezos</option>
                        <option value="Frutos">Frutos</option>
                        <option value="Quesos">Quesos</option>
                    </select>
                </div>
                <div className="add-price">
                    <p>Precio del producto</p>
                    <input onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder="$..." />
                </div>

            </div>
            <button type="submit" className='add-btn'>AGREGAR</button>
        </form>
      
    </div>
  )
}

export default Add


