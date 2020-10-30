import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { setUser } from '../../ducks/authReducer'
import { withRouter, useHistory } from 'react-router-dom'
import { ImArrowRight, ImArrowLeft } from 'react-icons/im'
import { BounceLoader } from 'react-spinners/BounceLoader'

function Modal(props) {
    const [tide, setTide] = useState([])
    const [noTide, setNoTide] = useState(null)
    const [weatherInfo, setWeatherInfo] = useState([])
    const [count, setCount] = useState(0)


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

    const mappedTide = tide.map((element, index) => {
        return (
            <div key={index}>
                <h3>Tide Height:{element.height} feet</h3>
                <h3>{element.type}tide</h3>
                <h3>{element.time}</h3>
            </div>
        )
    })

    const next = () => {
        if (count === 4) {
            setCount(0)
        } else {
            setCount(count + 1)
        }
    }
    const prev = () => {
        if (count === 0) {
            setCount(4)
        } else {
            setCount(count - 1)
        }
    }
    return (
        <div className='tide-info'>
            {/* {tide.map((element, index) => {
                return (
                    <div key={index}>
                        <h3>Tide Height:{element.height} feet</h3>
                        <h3>{element.type}tide</h3>
                        <h3>{element.time}</h3>
                    </div>
                )
            })} */}
            { tide ? <div className='tides'>
                <h2>Tide info</h2>
                {mappedTide[count]}
                <div>
                    <button onClick={() => prev()}> <ImArrowLeft /></button>
                    <h3>{count + 1}/5</h3>
                    <button onClick={() => next()}><ImArrowRight /></button>
                </div>
            </div>
                :
                <div className='tides'>
                    <BounceLoader
                        size={100}
                        color={'#d16f2d'}
                        loading={!tide}
                    />
                </div>
            }
            { weatherInfo ? weatherInfo.map((element, index) => {
                return (
                    <div className='swell-info' key={index}>
                        <h2>Swell info</h2>
                        <h3>SwellDirection: {element.swellDirection}°</h3>
                        <h3>SwellHeight: {element.swellHeight} ft.</h3>
                        <h3>Swellperiod: {element.swellPeriod} Sec</h3>
                        <h3>Water Temp: {element.waterTemperature} °F</h3>
                        <h3>WaveHeight: {element.waveHeight} ft.</h3>
                    </div>
                )
            }) : <div>No swell information available</div>}
        </div >
    )
}

const mapStateToProps = (store) => store.authReducer
export default connect(mapStateToProps, { setUser })(withRouter(Modal))