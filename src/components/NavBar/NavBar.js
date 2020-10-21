import React from 'react'
import { connect } from 'react-redux'
import {setUser, logoutUser} from '../../ducks/authReducer'
import {withRouter, useHistory} from 'react-router-dom'

function NavBar(props) {
    return (
        <div className='header'>
            
            <div className='left-side-links'>

                <a className='beachside-logo-link'
                    onClick={ () => {props.history.push('/')}} >
                        {/* REPLACE src LINK BELOW WITH UPLOADED BEACHSIDE LOGO */}
                        <img src={"https://i.pinimg.com/originals/14/f4/2b/14f42b4fc9e92dd812cf7126d0cb784b.gif"} height='150px' width='190px' />
                    
                </a>

                <div className='nav-links'>
                    <a className='favorites-link' 
                        onClick={ () => {props.history.push('/favorites')} }> Favorites </a>

                    <a className='map-link' 
                        onClick={ () => {props.history.push('/beachmap')} }> Map </a>
                </div>
            </div>
            
            <div className='right-side-links'>
                {/* NEED TO TEST props.user BELOW AND ENSURE USER DATA IS
                CONSISTENT WITH BACKEND AND PULLS CORRECTLY */}
                {/* <p className='greeting'>
                 {props.user && `Welcome, ${props.user.email}!`} </p> */}
                
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