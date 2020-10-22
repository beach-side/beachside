const axios = require('axios')
const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env

module.exports = {
    getBeaches: async (req, res) => {
        const { lat, lng } = req.query
        let data = []
        await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=32186.9&type=park&keyword=beach&key=${REACT_APP_GOOGLE_MAPS_API_KEY}`)
            .then(res => {
                data = res.data.results
            }).catch(err => res.status(404).send('No Beaches found'))
        res.status(200).send(data)
    }
}