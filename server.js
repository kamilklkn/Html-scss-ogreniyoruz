const express = require('express')
const app = express()
const router = express.router()

app.use(express.static(_dirname + '/'))

app.get('/', function(reg, res) {
    res.sendFile(_dirname + '/index.html')
})

app.listen(1234)