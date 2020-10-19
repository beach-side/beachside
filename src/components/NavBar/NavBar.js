// this is a test hi guys!import React from 'react'

import react from 'react'

function NavBar() {
    return (
        <div className='header'>
            
            <div className='logo-home-link'>
                BeachSide Home Link
            </div>

            <div className='all-links'>
                <div className='nav-links'>
                    <a className='favorites-link' onClick={() => {}}>
                    Favorites
                    </a>
                    <a className='map-link' onClick={() => {}}>
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

export default NavBar