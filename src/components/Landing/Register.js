import React, { Component } from 'react'
import axios from 'axios'
import { setUser } from '../../ducks/authReducer'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


class Register extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleRegister = () => {
    const { name, email, password, confirmPassword } = this.state

    if (password !== confirmPassword) {
      alert('Passwords do not match. Please re-enter your information to register.')
    } else {
      axios.post('/api/auth/register', { name, email, password })
      .then((res) => {
        this.props.setUser(res.data)
        this.props.history.push('/beachmap')
        
      })
      .catch((err) => {
        alert(err.message)
      })
    }
    this.setState({name: '', email: '', password: '', confirmPassword: ''})
  }

  render(props) {
    return (
      <div className='register'>
        
            <div className='register-inputs'>

              <input
                  input type="name"
                  maxLength="65"
                  placeholder="Enter Surfer's Name"
                  name="name"
                  value={this.state.name}
                  onChange={(e) => {
                    this.handleInput(e)
                  }}
                />

                <input
                  input type="email"
                  maxLength="100"
                  placeholder="Enter Email"
                  name="email"
                  value={this.state.email}
                  onChange={(e) => {
                    this.handleInput(e)
                  }}
                />

                <input
                  type="password"
                  maxLength="20"
                  placeholder="Enter Password"
                  name="password"
                  value={this.state.password}
                  onChange={(e) => {
                    this.handleInput(e)
                  }}
                />
                <input
                  type="password"
                  maxLength="20"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={this.state.confirmPassword}
                  onChange={(e) => {
                    this.handleInput(e)
                  }}
                />

            </div>

            <div className='register-buttons'>
              <button className='cancel-button'
                onClick={() => { this.props.hideAll() }}>
                Cancel
              </button>

              <button className='create-acct-button'
                onClick={() => {
                  this.handleRegister()
                }}
                >
                Create Account
              </button>
            </div>
        
      </div>
    )
  }
}

export default connect(null, { setUser })(withRouter(Register))
