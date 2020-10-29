import React from 'react'
import { AiOutlineCompass } from 'react-icons/ai'

function Locate(props) {
    return (
        <button className='compass-btn' onClick={() =>
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    props.panTo({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    })
                },
                (error) => {
                    alert('Could not get current location')
                })
        }>
            <AiOutlineCompass />
        </button>
    )
}

export default Locate