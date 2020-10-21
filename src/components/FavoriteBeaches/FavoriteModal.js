import React, { useState, useEffect } from 'react'
import axios from 'axios'

function FavoriteModal(props) {

  const [tide, setTide] = useState({})

  useEffect(() => {
    axios.get('/api/storm/tides', {
      lat: props.lat,
      lng: props.lng
    }).then((res) => {
      setTide(res.data)
      axios.get('/api/storm/weather', {

      })
    })
  }, [])


  return (
    <div>

    </div>
  )
}

export default FavoriteModal