import React, { useEffect, useState, useRef, useCallback } from 'react'
import InfoContent from './InfoContent'
import SearchBox from './SearchBox'
import './map.css'
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
const options = {
    disableDefaultUI: true,
    zoomControl: true,
}




function Map() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })

    const [markers, setMarkers] = useState([])
    const [selected, setSelected] = useState(null)

    const mapRef = useRef();

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, [])

    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng })
        mapRef.current.setZoom(14)
    }, [])

    if (loadError) return "Error loading maps"
    if (!isLoaded) return "Loading Maps"


    return (
        <div>
            <div className='search-box'>
                <SearchBox panTo={panTo} />
            </div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
                options={options}
                onClick={(e) => {
                    setMarkers(current => [...current, {
                        lat: e.latLng.lat(),
                        lng: e.latLng.lng()
                    }])
                }}
                onLoad={onMapLoad}
            >
                {markers.map((marker, i) => {
                    return <Marker
                        key={i}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        onClick={() => {
                            setSelected(null)
                            setSelected(marker)
                            console.log(selected)
                        }}
                    />
                })}

                {selected ? (<InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => setSelected(null)}>
                    <InfoContent lat={selected.lat} lng={selected.lng} />
                </InfoWindow>) : null}
            </GoogleMap>
        </div>
    )
}

export default Map