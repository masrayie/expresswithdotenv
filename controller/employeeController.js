const mongoose = require('mongoose')
const Employee = require('../model/employeeModel')
require('../db/connection')

const insertEmployee = async (req, res) => {
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    try {
        const existsEmpl = await Employee.findOne({employeeId: data.employeeId})
        if (existsEmpl !== undefined) {
            await Employee.deleteOne({employeeId: data.employeeId})
        }
        const employee = new Employee({
            ...data
        })
        await employee.save()
        res.status(201).send(employee)
    } catch (e) {
        res.status(400).send(e.message)
    }
}

const getAllEmployee = async (req, res) => {
    try {
        const employee = await Employee.find()
        res.status(200).send(employee)
    } catch (e) {
        res.status(400).send(e)
    }
}

const getEmployeeById = async (req, res) => {
    const employeeId = req.params.id
    try {
        const employee = await Employee.findOne({'employeeId': employeeId})
        res.status(200).send(employee)
    } catch (e) {
        res.status(400).send(e)
    }
}

module.exports = {
    getAllEmployee: getAllEmployee,
    getEmployeeById: getEmployeeById,
    insertEmployee: insertEmployee
}