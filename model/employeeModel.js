const { ExplainVerbosity } = require('mongodb')
const mongoose = require('mongoose')
const {employeedbconn} = require('../db/connection')

const employeeSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        trim: true,
        unique: true
    },
    employeeName: {
        type: String,
        trim: true
    },
    age: {
        type: Number
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

const Employee = employeedbconn.model('Employee', employeeSchema, 'employee')

module.exports = Employee