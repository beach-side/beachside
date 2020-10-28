import React from 'react'
import { connect } from 'react-redux'
import { setUser, logoutUser } from '../../ducks/authReducer'
import { withRouter, } from 'react-router-dom'

function NavBar(props) {
    
    return (
        <div className='header'>

            <div className='left-side-links'>

                <a className='beachside-logo-link'
                    onClick={() => { props.history.push('/') }} >
                    <img src={require('../../assets/beachsidelogo.jpg')} height='10%' width='10%' />

                </a>

                <div className='nav-links'>
                    <a className='map-link'
                        onClick={() => { props.history.push('/beachmap') }}> Map </a>
                        
                    {/* Link below set up to only show if user is on session */}
                    { props.user && 
                    <a className='favorites-link'
                        onClick={() => { props.history.push('/favorites') }}> Favorites </a>
                        }
                </div>
            </div>

            <div className='right-side-links'>
                <p className='greeting'> { props.user && `Welcome, ${props.user.name}!` } </p>

                {/* logout button works if props.history.push stays */}
                <a className='logout-link' onClick={() => {
                    props.logoutUser()
                    props.history.push('/')
                }}> Logout </a>
            </div>
        </div>

    )
}

const mapStateToProps = (reduxState) => reduxState
export default connect(mapStateToProps, { setUser, logoutUser })(withRouter(NavBar))