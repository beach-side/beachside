// this is a test hi guys!import React from 'react'
import React from 'react'
import {withRouter} from 'react-router-dom'

function NavBar() {
    return (
        <div className='header'>
            
            <div className='logo-home-link'>
                BeachSide Home Link
            </div>

            <div className='all-links'>
                <div className='nav-links'>
                    <Link className='favorites-link' 
                        onClick={() => {}}>
                        <button >
                        Favorites
                        </button>
                    </Link>
                    <Link>
                        <button className='map-link' onClick={() => {}}>
                        Map
                        </button>
                    </Link>
                </div>

                <a className='logout-link' onClick={() => {}}>
                    Logout
                </a>
            </div>
        </div>
    )
}

export default (withRouter(NavBar))