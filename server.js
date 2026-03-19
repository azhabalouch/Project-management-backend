const express = require("express")
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send("Get data for user")
})

app.post('/', (req, res) => {
    res.send("Got a POST request from user")
})

app.put('/', (req, res) => {
    res.send("Got a PUT request from user")
})

app.delete('/', (req, res) => {
    res.send("Got a DELETE request for user data")
})

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})