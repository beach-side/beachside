import React, { useState, useEffect } from 'react'
import axios from 'axios'

function FavoriteModal(props) {

  const [tide, setTide] = useState([])

  useEffect(() => {
    console.log(props)
    console.log(props.lat)
    axios.get(`/api/storm/tides?lat=${props.lat}&lng=${props.lng}`)
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