import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Favorite from './Favorite'


function Favorites(props) {
  const [favoritesList, setFavoritesList] = useState()

  useEffect(() => {
    axios.get(`/api/users/${props.user.id}/favorites`).then((res) => {
      setFavoritesList(res.data)
    })
  }, [])

  function deleteBeach(favId) {
    axios.delete(`/api/users/${props.user.id}/favorites/${favId}`)
    // .then(() => window.location.reload())
  }

  const List = favoritesList.map((element, index) => {
    return (
      <Favorite key={index} lat={element.lat} lng={element.lng} deleteBeach={deleteBeach} />
    )
  });

  return (
    <div>

      <NavBar />
      {List}
      CJ is kinda cool but only kinda

    </div>
  )
}
const mapStateToProps = (reduxState) => reduxState
export default connect(mapStateToProps)(withRouter(Favorites))