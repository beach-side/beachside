const axios = require('axios')
const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env

module.exports = {
    getTimezone: async (req, res) => {
        const { lat, lng } = req.query
        let ts = Math.round((new Date()).getTime() / 1000);
        let data = {}
        await axios.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${ts}&key=${REACT_APP_GOOGLE_MAPS_API_KEY}`)
            .then(res => {
                data = res.data
            }).catch(err => console.log(err.message))
        res.status(200).send(data)
    }
}