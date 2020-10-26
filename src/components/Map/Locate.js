import React from 'react'

function Locate(props) {
    return (
        <button onClick={() =>
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log(position)
                    props.panTo({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    })
                },
                (error) => {
                    alert('Could not get current location')
                })
        }>My Location</button>
    )
}

export default Locate