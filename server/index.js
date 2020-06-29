const express = require('express')
const app = express()
const path = require('path')
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
var spells = require('./routes/spells')
var characters = require('./routes/characters')
var user = require('./routes/user')

mongoose.set("useCreateIndex", true)
mongoose.set("useUnifiedTopology", true)
mongoose.set("useNewUrlParser", true)
mongoose.connect(process.env.DATABSE_URL).then(() => {
    console.log("Connected to database")
})
const port = 5000
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/spells', spells)
app.use('/characters',characters)
app.use('/user',user)
app.listen(port, () => console.log("Listening on port " + port))