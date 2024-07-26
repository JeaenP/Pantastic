import React, { useState, useCallback } from 'react';
import './AddEvent.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { assets } from '../../assets/assets';

const AddEvent = ({ url }) => {
  const [data, setData] = useState({
    name: '',
    description: '',
    date: '',
    clubName: 'Pan',
  });
  const [markerPosition, setMarkerPosition] = useState(null);
  const [image, setImage] = useState(null);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const onMapClick = useCallback((event) => {
    const newMarkerPosition = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    setMarkerPosition(newMarkerPosition);
  }, []);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!markerPosition) {
      toast.error('Por favor selecciona una ubicación en el mapa.');
      return;
    }
    if (!image) {
      toast.error('Por favor selecciona una imagen.');
      return;
    }

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('date', data.date);
    formData.append('clubName', data.clubName);
    formData.append('location', JSON.stringify(markerPosition));
    formData.append('image', image);

    try {
      const response = await axios.post(`${url}/api/event/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        setData({
          name: '',
          description: '',
          date: '',
          clubName: 'Pan',
        });
        setMarkerPosition(null);
        setImage(null);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error adding event:', error);
      toast.error('Error al agregar el evento.');
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-product-name flex-col">
          <p>Nombre del evento</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Escribir Aquí"
            required
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Descripción del evento</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Escribir la descripción aquí"
            required
          ></textarea>
        </div>
        <div className="add-product-name flex-col">
          <p>Fecha del evento</p>
          <input onChange={onChangeHandler} value={data.date} type="date" name="date" required />
        </div>
        <div className="add-category-price flex-col">
          <p>Club</p>
          <select onChange={onChangeHandler} value={data.clubName} name="clubName" required>
            <option value="Pan">Pan</option>
            <option value="Vino">Vino</option>
            <option value="Café">Café</option>
            <option value="Aderezos">Aderezos</option>
            <option value="Frutos">Frutos</option>
            <option value="Quesos">Quesos</option>
          </select>
        </div>
        <div className="add-product-location flex-col">
          <p>Ubicación</p>
          <LoadScript googleMapsApiKey="AIzaSyAWcxXZO36iZusfLvs4CZeOLplPir5DlvY">
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '400px' }}
              center={{ lat: -3.9982899501384948, lng: -79.20573850602356 }}
              zoom={15}
              onClick={onMapClick}
            >
              {markerPosition && <Marker position={markerPosition} />}
            </GoogleMap>
          </LoadScript>
        </div>
        <div className="add-img-upload flex-col">
          <p>Imagen del evento</p>
          <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input type="file" onChange={onFileChange} required/>
        </div>
        <button type="submit" className="add-btn">
          Agregar Evento
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
