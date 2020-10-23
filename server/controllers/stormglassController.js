const axios = require('axios')
const { DateTime, Settings } = require('luxon')
const { STORMGLASS_API_KEY_1, STORMGLASS_API_KEY_2, STORMGLASS_API_KEY_3, STORMGLASS_API_KEY_4 } = process.env
const getTimezoneInfo = require('./GetTimezoneFunction')



let counter = 0
let counterTwo = 0
let counterThree = 0
let counterFour = 0

function convertToLocal(resTime, offsetZone) {
  Settings.defaultZoneName = 'utc'

  const time = resTime
  const offset = offsetZone

  const now = DateTime.fromISO(time).setZone(offset)

  return now.toLocaleString(DateTime.DATETIME_MED)
}

function convertToLocalTime(offsetZone) {
  Settings.defaultZoneName = 'utc'

  const time = DateTime.local()
  const offset = offsetZone

  const now = DateTime.fromISO(time).setZone(offset)
  let newTime = now.ts
  return newTime.toString().split('').slice(0, -3).join('')
}

module.exports = {
  getTides: async (req, res) => {
    const { lat, lng, offset } = req.query
    let dataArray = []
    if (counter <= 50) {
      await axios.get(`https://api.stormglass.io/v2/tide/extremes/point?lat=${lat}&lng=${lng}`, {
        headers: {
          'Authorization': STORMGLASS_API_KEY_1
        }
      }).then((res) => {
        counter = res.data.meta.requestCount
        for (let i = 0; i < 5; i++) {
          let tideObj = res.data.data[i]
          let time = convertToLocal(tideObj.time, offset)
          const dataObj = {
            height: (tideObj.height * 3.281).toFixed(2),
            time: time,
            type: tideObj.type
          }
          dataArray.push(dataObj)
        }
      }).catch(async (err) => {
        await axios.get(`https://api.stormglass.io/v2/tide/extremes/point?lat=${lat}&lng=${lng}`, {
          headers: {
            'Authorization': STORMGLASS_API_KEY_2
          }
        }).then((res) => {
          if (res.data.meta.requestCount === 50) {
            counter = 0
          } else {
            counterTwo = res.data.meta.requestCount
            counter = 50
          }

          for (let i = 0; i < 5; i++) {
            let tideObj = res.data.data[i]
            let time = convertToLocal(tideObj.time, offset)
            const dataObj = {
              height: (tideObj.height * 3.281).toFixed(2),
              time: time,
              type: tideObj.type
            }
            dataArray.push(dataObj)
          }
        })
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
          let time = convertToLocal(tideObj.time, offset)
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
    const { lat, lng } = req.query
    const params = 'waveHeight,waterTemperature,swellDirection,swellHeight,swellPeriod'

    let timeData = await getTimezoneInfo.getTimezoneInfo(lat, lng)

    const start = convertToLocalTime(timeData.timeZoneId)
    const end = convertToLocalTime(timeData.timeZoneId)
    let dataArray = []

    if (counterTwo <= 50) {
      await axios.get(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&start=${start}&end=${end}`, {
        headers: {
          'Authorization': STORMGLASS_API_KEY_3
        }
      }).then((res) => {
        counterThree = res.data.meta.requestCount
        const { swellDirection, swellHeight, swellPeriod, waterTemperature, waveHeight } = res.data.hours
        const data = {
          swellDirection: swellDirection.noaa,
          swellHeight: (swellHeight.noaa * 3.281).toFixed(2),
          swellPeriod: swellPeriod.noaa,
          waterTemperature: (~~(waterTemperature.noaa * (9 / 5)) + 32),
          waveHeight: (waveHeight.noaa * 3.281).toFixed(2)
        }
        dataArray.push(data)
      }).catch(async (err) => {
        console.log(err)
        // if (err === 429){
        await axios.get(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&start=${start}&end=${end}`, {
          headers: {
            'Authorization': STORMGLASS_API_KEY_4
          }
        }).then((res) => {
          const { swellDirection, swellHeight, swellPeriod, waterTemperature, waveHeight } = res.data.hours[0]
          if (res.data.meta.requestCount === 50) {
            counterThree = 0
          } else {
            counterThree = 50
            counterFour = res.data.meta.requestCount
          }
          const data = {
            swellDirection: swellDirection.noaa,
            swellHeight: (swellHeight.noaa * 3.281).toFixed(2),
            swellPeriod: swellPeriod.noaa,
            waterTemperature: (~~(waterTemperature.noaa * (9 / 5)) + 32),
            waveHeight: (waveHeight.noaa * 3.281).toFixed(2)
          }
          dataArray.push(data)
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
        const data = {
          swellDirection: swellDirection.noaa,
          swellHeight: (swellHeight.noaa * 3.281).toFixed(2),
          swellPeriod: swellPeriod.noaa,
          waterTemperature: (~~(waterTemperature.noaa * (9 / 5)) + 32),
          waveHeight: (waveHeight.noaa * 3.281).toFixed(2)
        }
        dataArray.push(data)
      }).catch((err) => console.log(err))
    }
    res.status(200).send(dataArray)
    console.log(counter, counterTwo, counterThree, counterFour)
  }
}