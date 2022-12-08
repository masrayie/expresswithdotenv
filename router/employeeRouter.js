const express = require('express')
const {getAllEmployee, getEmployeeById, insertEmployee} = require('../controller/employeeController')
const router = express.Router()
const path = require('path')

router.use(express.json())

//GET
router.route('/employee').get(getAllEmployee)
router.route('/employee/:id').get(getEmployeeById)

//POST
router.route('/employee/insert').post(insertEmployee)

module.exports = router