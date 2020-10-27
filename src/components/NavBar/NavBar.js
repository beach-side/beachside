import React from 'react'
import { connect } from 'react-redux'
import { setUser, logoutUser } from '../../ducks/authReducer'
import { withRouter, } from 'react-router-dom'

function NavBar(props) {
    console.log('props for greeting', props)
    return (
        <div className='header'>

            <div className='left-side-links'>

                <a className='beachside-logo-link'
                    onClick={() => { props.history.push('/') }} >
                    <img src={require('../../assets/beachsidelogo copy.jpg')} height='30%' width='30%' />

                </a>

                {/* Needs to not display if no user logged */}
                <div className='nav-links'>
                    <a className='favorites-link'
                        onClick={() => { props.history.push('/favorites') }}> Favorites </a>

                    <a className='map-link'
                        onClick={() => { props.history.push('/beachmap') }}> Map </a>
                </div>
            </div>

            <div className='right-side-links'>

                {/* NEED TO TEST props.user BELOW AND ENSURE USER DATA IS
                CONSISTENT WITH BACKEND AND PULLS CORRECTLY */}
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