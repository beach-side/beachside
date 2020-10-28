import React from 'react'
import usePlacesAutoComplete, {
    getGeocode,
    getLatLng
} from 'use-places-autocomplete'
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption
} from '@reach/combobox'
import '@reach/combobox/styles.css'


function SearchBox(props) {
    const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutoComplete({
        requestOptions: {
            location: {
                lat: () => 40.297119,
                lng: () => -111.695007
            },
            radius: 20 * 1069.34,
        },
    })
    return (
        <div className='search-box'>
            <Combobox onSelect={async (address) => {
                setValue(address, false)
                clearSuggestions()
                try {
                    const result = await getGeocode({ address })
                    const { lat, lng } = await getLatLng(result[0])
                    await props.getBeaches(lat, lng)
                    props.panTo({ lat, lng })
                } catch (error) {
                    console.log('error')
                }
            }}>
                <ComboboxInput
                    value={value}
                    onChange={(e) => { setValue(e.target.value) }}
                    disabled={!ready}
                    placeholder='Enter city or Beach name...'
                />
                <ComboboxPopover style={{ borderRadius: "15px" }}>
                    <ComboboxList style={{ fontSize: "25px" }}>
                        {status === 'OK' && data.map(({ id, description }) =>
                            <ComboboxOption key={id} value={description} />
                        )}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div >
    )
}

export default SearchBox