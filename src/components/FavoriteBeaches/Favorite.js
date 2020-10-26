import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FavoriteModal from './FavoriteModal'
import { getZipCode } from 'use-places-autocomplete'

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
    <div>
      <h1>{props.data.beach_name}</h1>
      <button onClick={() => props.deleteBeach(props.data.id)}>Delete Beach</button>
      <h2>{temperature} °F</h2>
      <img src={icon} alt='weather' />
      <p>{condition}</p>
      <button onClick={() => setModal(true)}>Tide Request</button>
      {modal === true && <FavoriteModal setModal={setModal} lat={props.data.lat} lng={props.data.lng} />}
    </div>
  )
}

export default Favorite
