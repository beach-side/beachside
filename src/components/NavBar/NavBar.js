// this is a test hi guys!import React from 'react'
import React from 'react'

import {withRouter} from 'react-router-dom'

function NavBar(props) {
    return (
        <div className='header'>
            
            <div className='logo-home-link'>
                <a className='beachside-logo-link'
                    onClick={ () => {props.history.push('/')}} >
                    BeachSide
                </a>
            </div>

            <div className='all-links'>
                <div className='nav-links'>
                    <a className='favorites-link' 
                        onClick={ () => {props.history.push('/favorites')} }>
                        Favorites
                    </a>
                    <a className='map-link' 
                        onClick={ () => {props.history.push('/beachmap')} }>
                        Map
                    </a>
                </div>

                <a className='logout-link' onClick={() => {}}>
                    Logout
                </a>
            </div>
        </div>
    )
}

export default (withRouter(NavBar))