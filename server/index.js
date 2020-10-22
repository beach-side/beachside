require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const authCtrl = require('./controllers/authController')
const profileCtrl = require('./controllers/profileController')
const weatherCtrl = require('./controllers/weatherController.js')
const stormCtrl = require('./controllers/stormglassController')
const beachCtrl = require('./controllers/beachesController')

const app = express()
const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env

app.use(express.json())

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 }
}))

//* Auth Controllers
app.post('/api/auth/register', authCtrl.register)
app.post('/api/auth/login', authCtrl.login)
app.post('/api/auth/logout', authCtrl.logout)
app.get('/api/auth/getUser', authCtrl.getUser)

//* Profile Controllers
app.post('/api/users/:userid/favorites', profileCtrl.addBeach)
app.delete('/api/users/:userid/favorites/:favoriteid', profileCtrl.deleteBeach)
app.get('/api/users/:userid/favorites', profileCtrl.getFavoriteBeaches)

//* Weather Controller
app.get('/api/weather', weatherCtrl.getWeather)

//* StormGlass Controller
app.get('/api/storm/tides', stormCtrl.getTides)
app.get('/api/storm/weather', stormCtrl.getWeather)

//*Nearby Beaches
app.get('/api/beaches', beachCtrl.getBeaches)

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then(dbInstance => {
  app.set('db', dbInstance)
  console.log('DB is alive!')
  app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} is alive!`))
})