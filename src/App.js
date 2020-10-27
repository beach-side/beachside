import React from 'react';
// import Map from './components/Map/Map'
import './App.css';
//routes below links all views in routes.js
import routes from './routes'
import NavBar from './components/NavBar/NavBar'
import { withRouter } from 'react-router-dom'

function App(props) {
  return (
    <div className="App">
      <NavBar />
      {routes}

    </div>
  );
}

export default withRouter(App);
