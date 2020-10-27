import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setUser, logoutUser } from '../../ducks/authReducer'
import { withRouter, useHistory } from 'react-router-dom'

function NavBar(props) {
    return (
        <div className='header'>

            <div className='left-side-links'>

                <a className='beachside-logo-link'
                    onClick={() => { props.history.push('/') }} >
                    <img src={require('../../assets/beachsidelogo.jpg')} height='10%' width='10%' />

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
                <p className='greeting'>
                    {props.user ? `Welcome, ${props.user.email}!` : 'greeting'} </p>

                {/* NEED TO TEST BELOW AFTER DUMMY USER DATA IS CREATED - KARA/BRAD 10/20 */}
                <a className='logout-link' onClick={() => {
                    props.logoutUser()
                    props.history.push('/')
                }}> Logout </a>
            </div>
        </div>

    )
}

const mapStateToProps = (store) => store.authReducer
export default connect(mapStateToProps, { setUser, logoutUser })(withRouter(NavBar))