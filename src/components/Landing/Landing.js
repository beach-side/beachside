import React, {useState} from 'react'

function Landing() {

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
            Landing 

            <div className='nav-to-map-button'>
                <button>
                    Search For Beaches
                </button>
            </div>

            <div className='login-links'>
                <button className='login-link'>
                    Login
                </button>
                <div className='create-acct-area'>
                    <button className='register-link'>
                        Create An Account
                    </button>
                    <p className='register-reason'> to view saved locations </p>
                </div>
            </div>

            <div className='input-box-area'>
                input box area 
                render 2 components here
            </div>

        </div>
    )
}

export default Landing