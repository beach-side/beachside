import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import axios from 'axios'

function InfoContent(props) {
    const [data, setDate] = useState({})
    const [modal, setModal] = useState(false)
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
            <button onClick={() => setModal(true)}>Surf Details</button>
            {!modal ? null : <Modal setModal={setModal} lat={props.lat} lng={props.lng} />}
        </div>
    )
}

export default InfoContent