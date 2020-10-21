import React from 'react'
import { connect } from 'react-redux'
import {setUser} from '../../ducks/authReducer'
import {withRouter, useHistory} from 'react-router-dom'

function Modal(props) {
    return (
        <div className='header'>
            
             
        </div>
    )
}

const mapStateToProps = (store) => store.authReducer
export default connect(mapStateToProps, {setUser})(withRouter(Modal))