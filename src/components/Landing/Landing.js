import React, {useState} from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import Login from './Login'
import Register from './Register'


function Landing(props) {

    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)

    function hideAll() {
        setShowLogin(false)
        setShowRegister(false)
    }

    function handleShowLogin() {
        setShowLogin(true)
        setShowRegister(false)
    }

    function handleShowRegister() {
        setShowLogin(false)
        setShowRegister(true)
    }
    

    return (
        <div className='landing'> 

            <NavBar />

            <div className='nav-to-map-div'>
                <button className='nav-to-map-button'
                    onClick={() => {props.history.push('/beachmap')}}>
                    Search For Beaches
                </button>
            </div>

            <div className='login-links'>
                <button className='login-link'
                onClick={() => {handleShowLogin()}}>
                    Login
                </button>
                <div className='create-acct-area'>
                    <button className='register-link'
                    onClick={() => {handleShowRegister()}}>
                        Create An Account
                    </button>
                    <p className='register-reason'> to view saved locations </p>
                </div>
            </div>

            <div className='input-box-area'>
                
                {showLogin && <div>
                    <Login hideAll={hideAll} />
                </div>}

                {showRegister && <div>
                    <Register hideAll={hideAll} />
                </div>}

            </div>

        </div>
    )
}

export default (withRouter(Landing))