const express = require('express')
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

app.get('/', (req, res) => res.json({ info: 'Node.js, Express, and Postgres API' }));

app.get('/users', db.getUsers)

app.get('/auth', (req, res) => {
    const { phoneOrEmail, password } = req.body
    db.findUser(phoneOrEmail, password, res);
})

// for local dev
// app.listen(port, () => {
//     console.log(`App running on port ${port}.`)
// })

// export 'app' for prod
module.exports = app