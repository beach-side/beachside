import React, {useState} from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import { setUser } from '../../ducks/authReducer'
import Login from './Login'
import Register from './Register'
import {FaSearchLocation} from 'react-icons/fa'


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
        <div className='landing-view'> 

            <div className='landing-div'>

                <div className='nav-to-map-div'>
                    <button className='nav-to-map-button'
                        onClick={() => {props.history.push('/beachmap')}}>
                        <p className='search-beaches-btn'>
                            Search For Beaches
                        </p> 
                        <span>
                            <FaSearchLocation  style={{ paddingLeft: 15 }}/>
                        </span>
                         
                    </button>
                </div>
            
                <div className='login-links'>
                    { !props.user ? 
                    <button className='login-link'
                        onClick={() => {handleShowLogin()}}>
                        Login
                    </button> 
                    : <p className='logged-in-message'> Click above to get started! </p> }

                    { !props.user && 
                    <div className='create-acct-area'>
                        <button className='register-link'
                            onClick={() => {handleShowRegister()}}>
                            Create An Account
                        </button>
                        
                        <p className='register-reason'> to view saved locations </p>
                    </div> }
                </div>
            
                <div className='input-box-area'>
                    {showLogin && <div>
                    <Login hideAll={hideAll} />
                    </div>}
                    
                    {showRegister && <div>
                    <Register hideAll={hideAll} />
                    </div>}
                </div>
            
                <div className='description-div'>
                    <p className='website-description'> Get live weather, tide, and swell height from beaches around the world. </p>
                </div>
                
            </div>

            <div className='footer'>
                <p className='powered-by'>
                    powered by DevMountain students
                </p>
            </div>

        </div>
    )
}

const mapStateToProps = (reduxState) => reduxState
export default connect(mapStateToProps, { setUser })(withRouter(Landing))