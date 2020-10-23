import React, { useState, useEffect } from 'react'
import axios from 'axios'
const { DateTime } = require('luxon')

function FavoriteModal(props) {

  const [tide, setTide] = useState([])

  const dateTimeFromAPI = DateTime.fromISO('2020-10-30T15:59:00+00:00')
  const dateTimeInLocal = dateTimeFromAPI.setZone('local')


  useEffect(() => {
    console.log(dateTimeInLocal)

    axios.get(`/api/storm/tides?lat=${props.lat}&lng=${props.lng}&offset=${props.timezone}`)
      .then((res) => {
        console.log(res.data)
        setTide(res.data)
        // axios.get(`/api/storm/weather?lat=${props.lat}&lng=${props.lng}&localStart=${}&localEnd=${}`)
      })
    if (tide.data === true) {
      console.log(tide)
    }
  }, [])

  if (tide.data === true) {
    console.log(tide)
  }

  return (
    <div >
      {tide.map((element, index) => {
        const localTime = element.time
        return (
          <div key={index}>
            <h3>{element.height} feet</h3>
            <h3>{element.type}</h3>
            <h3>{element.time}</h3>
          </div>
        )
      })}

      <h3>Hi</h3>

    </div >
  )
  // return (
  //       <div>
  //         Loading...
  //       </div>
  //     )

}

export default FavoriteModal