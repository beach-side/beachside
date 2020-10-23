import React, { useState, useEffect } from 'react'
import axios from 'axios'

function FavoriteModal(props) {

  const [tide, setTide] = useState([])
  const [weatherInfo, setWeatherInfo] = useState([])

  useEffect(() => {
    axios.get(`/api/storm/tides?lat=${props.lat}&lng=${props.lng}&offset=${props.timeInfo.timeZoneId}`)
      .then((res) => {
        setTide(res.data)
      })
    axios.get(`/api/storm/weather?lat=${props.lat}&lng=${props.lng}`)
      .then((res) => {
        setWeatherInfo(res.data)
      })
  }, [])

  return (
    <div >
      {tide.map((element, index) => {
        return (
          <div key={index}>
            <h3>Tide Height:{element.height} feet</h3>
            <h3>{element.type}tide</h3>
            <h3>{element.time}</h3>
          </div>
        )
      })}
      {weatherInfo.map((element, index) => {
        return (
          <div key={index}>
            <h3>SwellDirection: {element.swellDirection} Degrees</h3>
            <h3>SwellHeight:{element.swellHeight} Feet</h3>
            <h3>Swellperiod: {element.swellPeriod} Seconds</h3>
            <h3>WaterTemperature: {element.waterTemperature}F</h3>
            <h3>WaveHeight: {element.waveHeight}Feet</h3>
          </div>
        )
      })}
    </div >
  )
}

export default FavoriteModal