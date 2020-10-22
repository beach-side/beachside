const axios = require('axios')
const { STORMGLASS_API_KEY_1, STORMGLASS_API_KEY_2 } = process.env
const { STORMGLASS_API_KEY_3, STORMGLASS_API_KEY_4 } = process.env
let counter = 0
let counterTwo = 0
let counterThree = 0
let counterFour = 0

module.exports = {
  getTides: async (req, res) => {
    const { lat, lng } = req.query
    let dataArray = []

    if (counter <= 50) {
      await axios.get(`https://api.stormglass.io/v2/tide/extremes/point?lat=${lat}&lng=${lng}`, {
        headers: {
          'Authorization': STORMGLASS_API_KEY_1
        }
      }).then((res) => {
        counter = res.data.meta.requestCount
        console.log(res.data)
        for (let i = 0; i < 5; i++) {
          let tideObj = res.data.data[i]
          let time = tideObj.time.split('').splice(11, 8).join('')
          const dataObj = {
            height: (tideObj.height * 3.281).toFixed(2),
            time: time,
            type: tideObj.type
          }
          dataArray.push(dataObj)
        }
      }).catch(async (err) => {
        // console.log(err)
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

          for (let i = 0; i < 5; i++) {
            let tideObj = res.data.data[i]
            let time = tideObj.time.split('').splice(11, 8).join('')
            const dataObj = {
              height: (tideObj.height * 3.281).toFixed(2),
              time: time,
              type: tideObj.type
            }
            dataArray.push(dataObj)
          }
        })
        // .catch((err) => console.log(err))
      })
    } else {
      await axios.get(`https://api.stormglass.io/v2/tide/extremes/point?lat=${lat}&lng=${lng}`, {
        headers: {
          'Authorization': STORMGLASS_API_KEY_2
        }
      }).then((res) => {
        counterTwo = res.data.meta.requestCount
        for (let i = 0; i < 5; i++) {
          let tideObj = res.data.data[i]
          let time = tideObj.time.split('').splice(11, 8).join('')
          const dataObj = {
            height: (tideObj.height * 3.281).toFixed(2),
            time: time,
            type: tideObj.type
          }
          dataArray.push(dataObj)
        }
      }).catch((err) => console.log(err))
    }
    res.status(200).send(dataArray)
    console.log(counter, counterTwo, counterThree, counterFour)
  },
  getWeather: async (req, res) => {
    const { lat, lng, localStart, localEnd } = req.query
    const params = 'waveHeight,waterTemperature,swellDirection,swellHeight,swellPeriod'
    const start = localStart
    const end = localEnd
    let data = {}

    if (counterTwo <= 50) {
      await axios.get(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&start=${start}&end=${end}`, {
        headers: {
          'Authorization': STORMGLASS_API_KEY_3
        }
      }).then((res) => {
        counterThree = res.data.meta.requestCount
        const { swellDirection, swellHeight, swellPeriod, waterTemperature, waveHeight } = res.data.hours[0]
        data = {
          swellDirection: swellDirection.noaa,
          swellHeight: (swellHeight.noaa * 3.281).toFixed(2),
          swellPeriod: swellPeriod.noaa,
          waterTemperature: (~~(waterTemperature.noaa * (9 / 5)) + 32),
          waveHeight: (waveHeight.noaa * 3.281).toFixed(2)
        }
      }).catch(async (err) => {
        console.log(err)
        // if (err === 429){
        await axios.get(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&start=${start}&end=${end}`, {
          headers: {
            'Authorization': STORMGLASS_API_KEY_4
          }
        }).then((res) => {
          const { swellDirection, swellHeight, swellPeriod, waterTemperature, waveHeight } = res.data.hours[0]
          if (res.data.meta.requestCount === 100) {
            counterThree = 0
          } else {
            counterThree = 50
            counterFour = res.data.meta.requestCount
          }
          data = {
            swellDirection: swellDirection.noaa,
            swellHeight: (swellHeight.noaa * 3.281).toFixed(2),
            swellPeriod: swellPeriod.noaa,
            waterTemperature: (~~(waterTemperature.noaa * (9 / 5)) + 32),
            waveHeight: (waveHeight.noaa * 3.281).toFixed(2)
          }
          // }
        })
      })
    } else {
      await axios.get(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&start=${start}&end=${end}`, {
        headers: {
          'Authorization': STORMGLASS_API_KEY_4
        }
      }).then((res) => {
        counterFour = res.data.meta.requestCount
        const { swellDirection, swellHeight, swellPeriod, waterTemperature, waveHeight } = res.data.hours[0]
        data = {
          swellDirection: swellDirection.noaa,
          swellHeight: (swellHeight.noaa * 3.281).toFixed(2),
          swellPeriod: swellPeriod.noaa,
          waterTemperature: (~~(waterTemperature.noaa * (9 / 5)) + 32),
          waveHeight: (waveHeight.noaa * 3.281).toFixed(2)
        }
      }).catch((err) => console.log(err))
    }
    res.status(200).send(data)
    console.log(counter, counterTwo, counterThree, counterFour)
  }
}