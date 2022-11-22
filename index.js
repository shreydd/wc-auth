const express = require('express')
const cors = require('cors')
const app = express()

const bodyParser = require('body-parser')
const port = 9000;

const db = require('./query');

app.use(bodyParser.json())

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.use(cors())

app.get('/', (req, res) => res.json({ info: 'Auth app for wc assignment' }));

app.post('/auth' , (req, res) => {
    const { phoneOrEmail, password } = req.body
    db.findUser(phoneOrEmail, password, res);
})

// for local dev
// app.listen(port, () => {
//     console.log(`App running on port ${port}.`)
// })

// export 'app' for prod
module.exports = app