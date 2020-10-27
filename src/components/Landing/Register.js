import React, { Component } from 'react'
import axios from 'axios'
import { setUser } from '../../ducks/authReducer'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


class Register extends Component {
  constructor() {
    super()
    this.state = {
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
    const { email, password, confirmPassword } = this.state

    if (password !== confirmPassword) {
      alert('Passwords do not match. Please re-enter your information to register.')
    } else {
      axios.post('/api/auth/register', { email, password })
        .then((res) => {
          this.props.setUser(res.data)
          this.props.history.push('/beachmap')

        })
        .catch((err) => {
          alert(err.message)
        })
    }
    this.setState({ email: '', password: '', confirmPassword: '' })
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
              onClick={() => { this.props.hideAll() }}>
              Cancel
            </button>

          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { setUser })(withRouter(Register))
