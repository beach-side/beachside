import React, { Component } from 'react'
import axios from 'axios'
// import { loginUser } from '../
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
    }
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleRegister = () => {
    const { email, password } = this.state
    axios
      .post('/auth/register', { email, password })
      .then((res) => {
        this.props.loginUser(res.data)
        // this.props.history.push('/dashboard')
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  render() {
    return (
      <div className="app-body">
        <div className="input-container">
          <div className="flex-horizontal inputs">
            <div className="flex-vertical">
              <input
                maxLength="100"
                placeholder="Enter Email"
                name="email"
                onChange={(e) => {
                  this.handleInput(e)
                }}
              />
              <input
                type="password"
                maxLength="20"
                placeholder="Enter Password"
                name="password"
                onChange={(e) => {
                  this.handleInput(e)
                }}
              />
            </div>
            <button
              onClick={() => {
                this.handleRegister()
              }}
              className="create-acct-area"
            >
              Create Account
            </button>
          </div>
          <div className="flex-horizontal link">
            <span>Login </span>
            <Link className="input-container-button" to="/">
              Login
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { loginUser })(Register)