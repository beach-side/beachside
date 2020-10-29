import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { setUser } from '../../ducks/authReducer'
import { connect } from 'react-redux'
import Favorite from './Favorite'
import './favorite.css'


function Favorites(props) {
  const [favoritesList, setFavoritesList] = useState([])

  useEffect(() => {
    axios.get('/api/auth/getUser').then((res) => {
      axios.get(`/api/users/${res.data.id}/favorites`).then((res) => {
        setFavoritesList(res.data)
      })
    }).catch((err) => {
      props.history.push('/')
    })
  }, [])

  function deleteBeach(favId) {
    axios.delete(`/api/users/${props.user.id}/favorites/${favId}`)
      .then(() => window.location.reload())
  }

  return (
    <div className='favorites-container'>

      {favoritesList.map((element, index) => {
        return (
          <div className='mapped-favorites-container'>
            <Favorite
              className='tide-request-container'
              key={index}
              data={element}
              deleteBeach={deleteBeach}
            />
          </div>
        )
      })}
    </div>
  )
}
const mapStateToProps = (reduxState) => reduxState
export default connect(mapStateToProps, { setUser })(withRouter(Favorites))