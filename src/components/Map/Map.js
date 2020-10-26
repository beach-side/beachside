import React, { useEffect, useState, useRef, useCallback } from 'react'
import InfoContent from './InfoContent'
import SearchBox from './SearchBox'
import './map.css'
import NavBar from '../NavBar/NavBar'
import Locate from './Locate'
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from '@react-google-maps/api'
import Axios from 'axios'

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

    const [beaches, setBeaches] = useState([])
    const [selected, setSelected] = useState(null)


    const mapRef = useRef();

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
        console.log(mapRef)
    }, [])

    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng })
        mapRef.current.setZoom(10)
    }, [])

    const getBeaches = (lat, lng) => {
        setBeaches([])
        Axios.get(`/api/beaches?lat=${lat}&lng=${lng}`).then(res => {
            setBeaches(res.data)
        })
    }



    if (loadError) return "Error loading maps"
    if (!isLoaded) return "Loading Maps"

    return (
        <div>
            <div className='search-box'>
                <SearchBox
                    panTo={panTo}
                    getBeaches={getBeaches}
                />
            </div>
            <NavBar />

            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={center}
                options={options}
                // onClick={(e) => {
                //     setMarkers(current => [...current, {
                //         lat: e.latLng.lat(),
                //         lng: e.latLng.lng()
                //     }])
                // }}
                onLoad={onMapLoad}
            >
                {beaches.map((beach, i) => {
                    return <Marker
                        key={i}
                        position={{ lat: beach.geometry.location.lat, lng: beach.geometry.location.lng }}
                        onClick={() => {
                            setSelected(null)
                            setSelected(beach)
                            panTo({ lat: beach.geometry.location.lat, lng: beach.geometry.location.lng })
                        }}
                    />
                })}

                {selected ? (
                    <InfoWindow position={{ lat: selected.geometry.location.lat, lng: selected.geometry.location.lng }} onCloseClick={() => setSelected(null)}>
                        <InfoContent
                            lat={selected.geometry.location.lat}
                            lng={selected.geometry.location.lng}
                            name={selected.name}
                            rating={selected.rating}
                        />
                    </InfoWindow>) : null}
            </GoogleMap>
            <Locate panTo={panTo} />
            <button onClick={() => getBeaches(mapRef.current.center.lat(), mapRef.current.center.lng())}>load beaches</button>
        </div>
    )
}

export default Map