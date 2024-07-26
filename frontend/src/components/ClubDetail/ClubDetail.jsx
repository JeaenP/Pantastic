import React, { useState, useEffect, useContext } from 'react';
import './ClubDetail.css';
import { useParams, Link, useNavigate } from 'react-router-dom';
import FoodDisplay from '../FoodDisplay/FoodDisplay';
import ProgressBar from '../ProgressBar/ProgressBar';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { assets } from '../../assets/assets';

const ClubDetail = () => {
  const { clubName } = useParams();
  const [club, setClub] = useState(null);
  const [view, setView] = useState('productos');
  const [progress, setProgress] = useState(70);
  const { user, url } = useContext(StoreContext);
  const navigate = useNavigate();
  const [isMember, setIsMember] = useState(false);
  const [events, setEvents] = useState([]);
  const [visibleMapIndex, setVisibleMapIndex] = useState(null);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get(`${url}/api/club/list`);
        const clubs = response.data.clubs;
        const selectedClub = clubs.find(club => club.name.toLowerCase() === clubName);
        setClub(selectedClub);
      } catch (error) {
        console.error('Error fetching clubs:', error);
      }
    };
    fetchClubs();
  }, [clubName, url]);

  useEffect(() => {
    if (user && club) {
      const checkMembership = async () => {
        try {
          const response = await axios.get(`${url}/api/club/user/${user._id}`);
          const clubs = response.data;
          const member = clubs.some(c => c.club.name.toLowerCase() === clubName);
          setIsMember(member);
        } catch (error) {
          console.error('Error checking membership:', error);
        }
      };
      checkMembership();
    }
  }, [user, clubName, url, club]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (!club || !club._id) {
          console.error('Club ID is undefined');
          return;
        }
        const response = await axios.get(`${url}/api/event/list/${club._id}`);
        setEvents(response.data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    if (club) {
      fetchEvents();
    }
  }, [club, url]);

  const handleJoinClub = async () => {
    if (!user) {
      console.error('User is not logged in');
      return;
    }

    try {
      const response = await axios.post(`${url}/api/club/join`, { userId: user._id, clubName: club.name });
      if (response.data.message === 'Joined club successfully') {
        setIsMember(true);
        console.log('User joined the club');
      }
    } catch (error) {
      console.error('Error joining club:', error);
    }
  };

  const toggleMapVisibility = (index) => {
    if (visibleMapIndex === index) {
      setVisibleMapIndex(null);
    } else {
      setVisibleMapIndex(index);
    }
  };

  if (!club) {
    return <div>Loading...</div>;
  }

  return (
    <div className="club-detail">
      <a type="button" className='arrow-left' onClick={() => navigate('/clubs')}>
        <FaArrowLeft />
      </a>
      <div className="club-detail-title">
          <img src={assets.separatorLeft} alt="" />
          <h2>{club.name}</h2>
          <img src={assets.separatorRight} alt="" />

      </div>
      <div className="join">
        <button
          className={`join-btn ${isMember ? 'joined' : ''}`}
          onClick={!isMember ? handleJoinClub : null}
          disabled={isMember}
        >
          {isMember ? (
            <>
              <b>Miembro </b> <FaCheckCircle color="green" />
            </>
          ) : (
            'Unirse al Club'
          )}
        </button>
        <p><b>Miembros: </b> {club.members?.length || 0} </p>
      </div>
      <div>
        
      </div>
      <div className="club-description">
        <p>El espacio ideal para los entusiastas del {club.name.toLowerCase()}, revisa eventos y productos relacionados a tus intereses, acumula puntos y gana cupones y descuentos en tus compras.</p>
      </div>
      <div className="club-info">
        <div className="club-menu">
          <button onClick={() => setView('eventos')} className={view === 'eventos' ? 'active' : ''}>Eventos</button>
          <button onClick={() => setView('productos')} className={view === 'productos' ? 'active' : ''}>Productos</button>
        </div>
        <div className="club-progress">
          <ProgressBar progress={progress} />
          <img src={assets.point} alt="" />
        </div>
      </div>
      <div className="club-content">
        {view === 'productos' ? (
          <FoodDisplay category={club.name} showTitles={false} />
        ) : (
          <div className="events-list">
            {events.length > 0 ? (
              events.map((event, index) => (
                <div key={event._id} className="event-item">
                  <div className="event-title">
                  <h3>{event.name}</h3>
                  <img src={event.image} alt={event.name} className="event-image" />
                  </div>
                  
                  <div className="event-item-content">
                    <p>{event.description}</p>
                    <p><b>Fecha:</b> {new Date(event.date).toLocaleDateString()}</p>
                    <button onClick={() => toggleMapVisibility(index)} >
                      {visibleMapIndex === index ? 'Ocultar Ubicación' : 'Mostrar Ubicación'}
                    </button>
                    {visibleMapIndex === index && (
                      <LoadScript googleMapsApiKey="AIzaSyAWcxXZO36iZusfLvs4CZeOLplPir5DlvY">
                        <GoogleMap
                          mapContainerStyle={{ width: '100%', height: '400px' }}
                          center={{ lat: event.location.lat, lng: event.location.lng }}
                          zoom={15}
                        >
                          <Marker position={{ lat: event.location.lat, lng: event.location.lng }} />
                        </GoogleMap>
                      </LoadScript>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No hay eventos disponibles</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubDetail;
