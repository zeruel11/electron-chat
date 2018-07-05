const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('pusher-chatkit-server')

const chatkit = new Chatkit.default({
    instanceLocator: 'v1:us1:777da375-f9f3-4cb5-b8de-c5e458668c35',
    key: '93637821-1e2a-4488-91e1-e864756d9849:sbXFwwSN5BVm0Utdxo5b+VEcgvi5Y5GQr42IntNK/1Y='
})
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
    const { username } = req.body
    const user = { name: username, id: username }
    chatkit
        .createUser(user)
        .then(() => {
            console.log('Created user ', user.name) // eslint-disable-line no-console
            res.status(201).json(user)
        })
        .catch(error => {
            if (error.error === 'services/chatkit/user_already_exists') {
                console.log('User already exists ', user.name) // eslint-disable-line no-console
                res.status(201).json(user)
            } else {
                console.error(error) // eslint-disable-line no-console
                res.status(error.status).json(error)
            }
        })
})

app.listen(3001)
console.log('Running on port 3001') // eslint-disable-line no-console