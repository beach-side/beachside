import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import axios from 'axios'
import { FiSunrise, FiSunset } from 'react-icons/fi';

function InfoContent(props) {
    const [data, setDate] = useState({})
    const [modal, setModal] = useState(false)
    const [saved, setSaved] = useState(false)
    const [max, setMax] = useState(false)




    useEffect(() => {
        axios.get(`/api/weather?lat=${props.lat}&lng=${props.lng}`,).then(res => {
            setDate(res.data)
        })

        axios.get(`/api/users/${props.userid}/favorites`).then(res => {
            if (res.data.length >= 5) {
                setMax(true)
            }
            let isSaved = res.data.some((beach) => {
                return beach.lng == props.lng
            })
            setSaved(isSaved)

        })

        // if (props.savedBeaches.length >= 5) {
        //     setMax(true)
        // }

        // const isSaved = props.savedBeaches.some((beach) => {
        //     return beach.lng == props.lng
        // })

        // setSaved(isSaved)
    }, [])



    const saveBeach = () => {
        axios.post(`/api/users/${props.userid}/favorites`, {
            beachName: props.name,
            lat: props.lat,
            lng: props.lng
        }).then(res => {
            setSaved(true)
        })

    }

    const { condition, icon, sunrise, sunset, temperature, wind, timezone } = data
    console.log(wind)
    return (
        <div className='info-content'>
            <h1>{props.name}</h1>
            <div className='weather-info'>
                <div>
                    <h2>{temperature} °F</h2>
                    <p>{condition}</p>
                </div>
                <img src={icon} alt='weather' />
            </div>
            <div className='time'>
                <p> <FiSunrise /> {sunrise}</p>
                <p> <FiSunset /> {sunset}</p>
            </div>
            <div>

            </div>
            {!modal ? <button onClick={() => setModal(true)}>Surf Details</button> : null}
            {props.userid ?
                !max ?
                    !saved ? <button onClick={() => saveBeach()}>save beach</button>
                        :
                        <div>Saved!</div>
                    : <div>Max beaches saved</div>
                : null}
            {!modal ? null : <Modal setModal={setModal} lat={props.lat} lng={props.lng} />}
        </div>
    )
}

export default InfoContent