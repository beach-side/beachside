import React, { useState, useEffect } from 'react'
import axios from 'axios'

function InfoContent(props) {
    const [data, setDate] = useState({})
    useEffect(() => {
        axios.get(`/api/weather?lat=${props.lat}&lng=${props.lng}`,).then(res => {
            setDate(res.data)
            console.log(res.data)
        })
    }, [])
    const { condition, icon, sunrise, sunset, temperature, wind } = data
    return (
        <div>
            <h2>{temperature} °F</h2>
            <img src={icon} alt='weather' />
            <p>{condition}</p>

        </div>
    )
}

export default InfoContent