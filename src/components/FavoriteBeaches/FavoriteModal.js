import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ImArrowLeft, ImArrowRight } from 'react-icons/im'

import './favorite.css'

function FavoriteModal(props) {

  const [tide, setTide] = useState([])
  const [weatherInfo, setWeatherInfo] = useState([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    axios.get(`/api/storm/tides?lat=${props.lat}&lng=${props.lng}`)
      .then((res) => {
        setTide(res.data)
      })
    axios.get(`/api/storm/weather?lat=${props.lat}&lng=${props.lng}`)
      .then((res) => {
        setWeatherInfo(res.data)
      })
  }, [])

  function next() {
    if (count === 4) {
      setCount(0)
    } else {
      setCount(count + 1)
    }
  }

  function prev() {
    if (count === 0) {
      setCount(4)
    } else {
      setCount(count - 1)
    }
  }

  const mappedTide = tide.map((element, index) => {
    return (
      <div className='mappedTide-container' key={index}>
        <h3>Tide Height:{element.height}ft</h3>
        <h3>{element.type}tide</h3>
        <h3>{element.time}</h3>
      </div>
    )
  })

  const mappedSwell = weatherInfo.map((element, index) => {
    return (
      <div className='swell-info-container' key={index}>
        <div className='favorite-swell-first-information' >
          <h2>Swell:</h2>
          <h3>{element.swellHeight}ft at {element.swellPeriod}s {element.swellDirection}°</h3>
        </div>
        <div className='favorite-swell-information'>
          <h2>Surf Height</h2>
          <h3>{element.waveHeight}</h3>
        </div>
        <div className='favorite-swell-information'>
          <h2>Water Temp:</h2>
          <h3>{element.waterTemperature}°F</h3>
        </div>
      </div>
    )
  })


  return (
    <div className='stormglass-container'>

      {mappedSwell}

      <div className='tide-info-container'>
        <h2>Tide Info</h2>
        {mappedTide[count]}
        <div className='favorite-button-container'>
          <button onClick={() => prev()}><ImArrowLeft /></button>
          <h3>{count + 1}/5</h3>
          <button onClick={() => next()}><ImArrowRight /></button>
        </div>
      </div>
    </div>
  )
}

export default FavoriteModal