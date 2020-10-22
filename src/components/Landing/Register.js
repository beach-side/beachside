import React, { Component } from 'react'
import axios from 'axios'
import {setUser} from '../../ducks/authReducer'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import Landing from './Landing'

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
      .post('/api/auth/register', { email, password })
      .then((res) => {
        this.props.setUser(res.data)
        this.props.history.push('/beachmap')
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  render(props) {
    return (
      <div className="app-body">
        <div className="input-container">
          <div className="flex-horizontal inputs">
            <div className="flex-vertical">
              <input
                input type="email"
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
          <button className='cancel-button'
                    onClick={() => {this.props.hideAll()}}>
                        Cancel
                    </button>
            {/* <span>Login </span> */}
            <Link className="input-container-button" to="/">
              Login
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { setUser })(withRouter(Register))