import React from 'react'
import { connect } from 'react-redux'
import {setUser, logoutUser} from '../ducks/authReducer'
import {withRouter} from 'react-router-dom'

function NavBar(props) {
    return (
        <div className='header'>
            
            <div className='nav-links'>

                <a className='beachside-logo-link'
                    onClick={ () => {props.history.push('/')}} >
                        {/* IMG tag here wrapped as link */}
                    BeachSide
                </a>

            <div className='all-links'>
                <div className='nav-links'>

                    <a className='favorites-link' 
                        onClick={ () => {props.history.push('/favorites')} }> Favorites </a>

                    <a className='map-link' 
                        onClick={ () => {props.history.push('/beachmap')} }> Map </a>
                </div>
            </div>
            {/* NEED TO TEST props.user BELOW AND ENSURE USER DATA IS
            CONSISTENT WITH BACKEND AND PULLS CORRECTLY */}
            {props.user && props.user.first}

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
export default connect(mapStateToProps, {setUser, logoutUser})(withRouter(NavBar))