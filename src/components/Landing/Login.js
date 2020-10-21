import React, {useState} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {setUser} from '../../ducks/authReducer'
import Landing from './Landing'
/*
//todo - write function to log us in (axios request)
//todo - connect axios request to onClick of button
//todo - {connect} component to redux store
//todo - import setUser() from reducer
//todo - inside of .then() call props.setUser()
*/

function Login(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    

    return (
        <div className='landing'> 
            Login

            <div className='login-view'>
                
                <div>
                    <input className='email-input' placeholder={'email'} value={email}
                    onChange={(e) => {setEmail(e.target.value)}} />
                    
                    <input className='password-input' type='password' placeholder={'password'} value={email}
                    onChange={(e) => {setPassword(e.target.value)}} />
                </div>

                <div>
                    <button className='login-button'
                    onClick={() => {
                        axios.post('/api/auth/login', {email, password}).then((res) => {
                            props.setUser(res.data)
                            history.push('/favorites')
                        })
                    }}> Login </button>
                </div>

            </div>



        </div>
    )
}

export default connect(null, {setUser})(Login)