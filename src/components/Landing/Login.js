import React, {useState} from 'react'

function Landing() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    

    return (
        <div className='landing'> 
            Login

            <div className='login-view'>
                
                <input className='email-input' placeholder={'email'} value={email}
                onChange={(e) => {setEmail(e.target.value)}} />
                <input className='password-input' type='password' placeholder={'password'} value={email}
                onChange={(e) => {setPassword(e.target.value)}} />

            </div>

        </div>
    )
}

export default Landing