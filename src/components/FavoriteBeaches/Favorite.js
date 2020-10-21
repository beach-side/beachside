import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FavoriteModal from './FavoriteModal'

function Favorite(props) {
  const [data, setDate] = useState({})
  const [modal, setModal] = useState(false)

  useEffect(() => {
    axios.get(`/api/weather?lat=${props.lat}&lng=${props.lng}`,).then(res => {
      setDate(res.data)
      console.log(res.data)
    })
  }, [])

  const { condition, icon, sunrise, sunset, temperature, wind, timezone } = data

  return (
    <div>
      <h2>{temperature} °F</h2>
      <img src={icon} alt='weather' />
      <p>{condition}</p>
      <button onClick={() => setModal(true)}></button>
      {modal === true && <FavoriteModal setModal={setModal} lat={props.lat} lng={props.lng} timezone={timezone} />}
    </div>
  )
}

export default Favorite
