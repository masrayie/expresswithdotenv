const express = require("express")
const cors = require("cors")
const employeeRouter = require('./router/employeeRouter')

const app = express()

require('dotenv').config();

const port = process.env.PORT

app.use(cors())

app.use('/api', employeeRouter)

app.listen(port, () => {
    console.log('Server is up on port', port)
})
