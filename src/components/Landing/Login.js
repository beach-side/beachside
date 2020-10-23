import React, {useState} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {setUser} from '../../ducks/authReducer'
import Landing from './Landing'


function Login(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const resetFields = () => {
        setEmail('')
        setPassword('')
        
    }
    

    return (
        <div className='landing'> 

            <div className='login-view'>
                
                <div>
                    <input className='email-input' placeholder={'email'} value={email}
                    onChange={(e) => {setEmail(e.target.value)}} />
                    
                    <input className='password-input' type='password' placeholder={'password'} value={password}
                    onChange={(e) => {setPassword(e.target.value)}} />
                </div>

                <div className='login-view-buttons'>
                    <button className='cancel-button'
                    onClick={() => {props.hideAll()}}>
                        Cancel
                    </button>

                    <button className='login-button'
                    onClick={() => {
                        axios.post('/api/auth/login', {email, password}).then((res) => {
                            props.setUser(res.data)
                            props.history.push('/favorites')
                        }).catch((e) => {alert('Email or Password does not match. Please try again.')})
                        resetFields()
                    }}> Login </button>
                </div>

            </div>



        </div>
    )
}

export default connect(null, {setUser})(withRouter(Login))