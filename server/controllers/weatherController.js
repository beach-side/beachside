const axios = require('axios')
const { WEATHER_API_KEY } = process.env

// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
function secondsToTime(unix) {
    let date = new Date(unix * 1000);
    // Hours part from the timestamp
    let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    let seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime
}

module.exports = {
    getWeather: async (req, res) => {
        const { lat, lng } = req.query
        let data = {}
        await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=imperial`)
            .then(res => {
                const { weather, main, wind, sys } = res.data
                data = {
                    condition: weather[0].description,
                    temperature: main.temp,
                    feelsLike: main.feels_like,
                    icon: `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
                    sunrise: secondsToTime(sys.sunrise),
                    sunset: secondsToTime(sys.sunset),
                    wind: wind
                }
                // console.log(data)
            }).catch(err => {
                res.status(200).send('Oops')
            })
        res.status(200).send(data)
    }
}
