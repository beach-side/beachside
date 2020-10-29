import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FavoriteModal from './FavoriteModal'
import { getZipCode } from 'use-places-autocomplete'
import { RiFahrenheitLine } from 'react-icons/ri';
import { WiDegrees } from 'react-icons/wi';
import { FaWind } from 'react-icons/fa';
import { FiSunrise, FiSunset } from 'react-icons/fi';
import { GiWaveSurfer } from 'react-icons/gi'
import './favorite.css'

function Favorite(props) {
  const [favoritesList, setFavoritesList] = useState({})
  const [data, setData] = useState({})
  const [modal, setModal] = useState(false)


  useEffect(() => {
    setFavoritesList(props.data)
    axios.get(`/api/weather?lat=${props.data.lat}&lng=${props.data.lng}`,).then(res => {
      setData(res.data)
    })

  }, [])

  const { condition, icon, sunrise, sunset, temperature, wind } = data


  return (
    <div className='favorites-weather-container'>
      {/* <button onClick={() => props.deleteBeach(props.data.id)}>Delete Beach</button> */}
      <div className='favorites-left-container'>
        <h1 className='favorites-beach-name'>{props.data.beach_name}</h1>

        <div className='favorites-weather-wind-container'>
          <div className='favorite-title-container'>
            <h1 className='favorite-water-name-title'>
              Weather</h1>
            <h1 className='favorite-wind-name-title'>
              Wind<FaWind />
            </h1>
          </div>
          <div className='favorites-weather-box'>
            <div className='weather-api-container'>
              <div className='weather-name-icon-container'>
                <img src={icon} alt='weather' />
              </div>
              <div className='temp-condition-container'>
                <h2>{temperature}°F </h2>
                <h3>{condition}</h3>
              </div>
            </div>
            <div className='favorites-wind-container'>

              {wind &&
                <div className='favorites-wind-div-container'>
                  {wind.speed &&
                    <p>{wind.speed} MPH </p>
                  }
                  {wind.deg &&
                    <p>{wind.deg}°</p>
                  }
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      <div className='favorite-middle-container'>
        <div className='favorite-sunrise'>
          <h2><FiSunrise /> {sunrise}AM</h2>
        </div>
        <div className='favorite-sunset'>
          <h2><FiSunset /> {sunset} PM</h2>
        </div>
      </div>
      <div className='tide-request-container'>
        {modal === false && <button onClick={() => setModal(true)}> <GiWaveSurfer /> Tide Request</button>}
        {modal === true && <FavoriteModal setModal={setModal} lat={props.data.lat} lng={props.data.lng} />}
      </div>
    </div >
  )
}

export default Favorite
