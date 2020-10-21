import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Favorites from './components/FavoriteBeaches/Favorites'
import Map from './components/Map/Map'
import Modal from './components/Modal/Modal'


export default (
    <Switch>

        <Route exact path='/' component={Landing} />
        <Route path='/favorites' component={Favorites} />
        <Route path='/beachmap' component={Map} />
        <Route path='/modal' component={Modal} />

    </Switch>
)