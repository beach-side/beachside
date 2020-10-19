require('dotenv').config()
const express = require('express')
const massive = require('massive')
const express = require('express-session')
const app = express()
const authCtrl = ('./controllers/authController.js')
const profileCtrl = ('./controllers/profileController.js')
const weatherCtrl = ('./controllers/weatherController.js')

app.use(express.json())

//* Auth Contollers
app.post('/api/auth/register', authCtrl.register)
app.post('/api/auth/login', authCtrl.login)
app.post('/api/auth/logout', authCtrl.logout)
app.get('/api/auth/getUser', authCtrl.getUser)

//* Profile Controllers
app.post('/api/users/:userid/favorites', profileCtrl.addBeach)
app.delete('/api/users/:userid/favorites/:favoriteid', profileCtrl.deleteBeach)
app.get('/api/users/:userid/favorites/', profileCtrl.getFavoriteBeaches)

//* Weather Contoller
app.get('/api/weather', weatherCtrl.getWeather)
