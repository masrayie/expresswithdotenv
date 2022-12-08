const mongoose = require('mongoose')
require('dotenv').config()

const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT

console.log(DB_USERNAME, DB_PASSWORD, DB_NAME)

const connectionURL = 'mongodb://' + DB_USERNAME + ':' + DB_PASSWORD + '@' + DB_HOST + ':' + DB_PORT + '/' + DB_NAME

const employeedbconn = mongoose.createConnection(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = {
    employeedbconn: employeedbconn
}