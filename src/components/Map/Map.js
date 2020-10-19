import React from 'react'
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from '@react-google-maps/api'

const libraries = ["places"]
const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
}
const center = {
    lat: 40.297119,
    lng: -111.695007
}


function Map() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })

    if (loadError) return "Error loading maps"
    if (!isLoaded) return "Loading Maps"


    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
            >
            </GoogleMap>
        </div>
    )
}

export default Map