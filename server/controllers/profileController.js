module.exports = {
    addBeach: async (req, res) => {
        const db = req.app.get('db')
        const { beachName, lat, lng } = req.body
        const { userid } = req.params

        await db.add_beach([beachName, lat, lng, userid])

        res.sendStatus(200)
    },
    deleteBeach: async (req, res) => {
        const db = req.app.get('db')
        const { favoriteid, userid } = req.params

        await db.delete_beach([favoriteid, userid])
        console.log('hit')
        console.log(favoriteid, userid)
        res.sendStatus(200)
    },
    getFavoriteBeaches: async (req, res) => {
        const db = req.app.get('db')
        const { userid } = req.params
        console.log(userid)
        const beaches = await db.get_beaches([userid])

        res.status(200).send(beaches)
    },
}