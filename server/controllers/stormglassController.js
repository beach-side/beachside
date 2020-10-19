const axios = require('axios')
const { STORMGLASS_API_KEY_1, STORMGLASS_API_KEY_2 } = process.env
const { STORMGLASS_API_KEY_3, STORMGLASS_API_KEY_4 } = process.env
let counter = 0
let counterTwo = 0

module.exports = {
  getTides: async (req, res) => {
    console.log('Hit')
    const { lat, lng } = req.body
    let dataArray = []

    if (counter < 50) {
      await axios.get(`https://api.stormglass.io/v2/tide/extremes/point?lat=${lat}&lng=${lng}`, {
        headers: {
          'Authorization': STORMGLASS_API_KEY_1
        }
      }).then((res) => {
        counter = res.data.meta.requestCount
        dataArray = res.data
      }).catch(async (err) => {
        console.log(err)
        // if(err === 429){
        await axios.get(`https://api.stormglass.io/v2/tide/extremes/point?lat=${lat}&lng=${lng}`, {
          headers: {
            'Authorization': STORMGLASS_API_KEY_2
          }
        }).then((res) => {
          if (res.data.meta.requestCount === 100) {
            counter = 0
          } else {
            counterTwo = res.data.meta.requestCount
            counter = 50
          }
          dataArray = res.data
        })
      })
    } else {
      await axios.get(`https://api.stormglass.io/v2/tide/extremes/point?lat=${lat}&lng=${lng}`, {
        headers: {
          'Authorization': STORMGLASS_API_KEY_2
        }
      }).then((res) => {
        counterTwo = res.data.meta.requestCount
        dataArray = res.data
      }).catch((err) => {
        console.log(err)
      })
    }
    res.status(200).send(dataArray)
  },
  getWeather: async (req, res) => {

  }
}