const bcrpyt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        const { name, email, password } = req.body

        const [userEmail] = await db.check_email([email])

        if (userEmail) {
            return res.status(409).send('Email already in use.')
        }

        const salt = bcrpyt.genSaltSync(10)
        const hash = bcrpyt.hashSync(password, salt)

        const [newUser] = await db.register([name, email, hash])

        req.session.user = newUser

        res.status(200).send(req.session.user)
    },
    login: async (req, res) => {
        const db = req.app.get('db')
        const { email, password } = req.body
        const [existingUser] = await db.check_user([email])

        if (!existingUser) {
            return res.status(404).send('Account not found.')
        }

        const isAuthenticated = bcrpyt.compareSync(password, existingUser.hash)

        if (!isAuthenticated) {
            return res.status(403).send('Incorrect password or email.')
        }

        delete existingUser.hash
        req.session.user = existingUser
        res.status(200).send(req.session.user)
    },
    logout: (req, res) => {
        req.session.destroy()
        return res.sendStatus(200)
    },
    getUser: (req, res) => {
        if (req.session.user) {
            res.status(200).send(req.session.user)
        } else {
            res.status(404).send('No user session found.')
        }
    }
}