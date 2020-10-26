import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { setUser } from '../../ducks/authReducer'
import { withRouter, useHistory } from 'react-router-dom'

function Modal(props) {
    const [tide, setTide] = useState([])
    const [noTide, setNoTide] = useState(null)
    const [weatherInfo, setWeatherInfo] = useState([])

    useEffect(() => {
        axios.get(`/api/storm/tides?lat=${props.lat}&lng=${props.lng}`)
            .then((res) => {
                setTide(res.data)
            })
        axios.get(`/api/storm/weather?lat=${props.lat}&lng=${props.lng}`)
            .then((res) => {
                setWeatherInfo(res.data)

            }).catch(err => console.log(err.message))
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
            { weatherInfo ? weatherInfo.map((element, index) => {
                return (
                    <div key={index}>
                        <h3>SwellDirection: {element.swellDirection} Degrees</h3>
                        <h3>SwellHeight:{element.swellHeight} Feet</h3>
                        <h3>Swellperiod: {element.swellPeriod} Seconds</h3>
                        <h3>WaterTemperature: {element.waterTemperature}F</h3>
                        <h3>WaveHeight: {element.waveHeight}Feet</h3>
                    </div>
                )
            }) : <div>No swell information available</div>}
        </div >
    )
}

const mapStateToProps = (store) => store.authReducer
export default connect(mapStateToProps, { setUser })(withRouter(Modal))