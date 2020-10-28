import React, { useEffect, useState, useRef, useCallback } from 'react'
import InfoContent from './InfoContent'
import SearchBox from './SearchBox'
import './map.css'
import Locate from './Locate'
import { FaUmbrellaBeach } from 'react-icons/fa'
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
    height: '92vh'
}
const center = {
    lat: 39,
    lng: -98
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
    const [userSaved, setUserSaved] = useState([])
    const [userid, setUserid] = useState('')


    useEffect(() => {
        Axios.get('/api/auth/getUser').then((res) => {
            setUserid(res.data.id)

        }).catch(() => {

        })



    }, [])


    const mapRef = useRef();

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
        navigator.geolocation.getCurrentPosition(
            (position) => {
                panTo({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })
            },
            (error) => {
                panTo({
                    lat: 39,
                    lng: -98
                })
                mapRef.current.setZoom(5)
            })
        // console.log(mapRef)
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

                        }}
                        icon={<FaUmbrellaBeach />}


                    />
                })}

                {selected ? (
                    <InfoWindow position={{ lat: selected.geometry.location.lat, lng: selected.geometry.location.lng }} onCloseClick={() => setSelected(null)}>
                        <InfoContent

                            userid={userid}
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