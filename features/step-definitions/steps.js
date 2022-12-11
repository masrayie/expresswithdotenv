const { Given, When, Then, After, Before, BeforeAll, AfterAll } = require('@cucumber/cucumber')
const got = require('got')
const assert = require('assert')
const {appServer, port} = require('../../index')
const { timeout } = require('nodemon/lib/config')

var employeeName
var resStatusCode1
var resStatusCode2

BeforeAll(function() {
    appServer.listen(port, () => {
        console.log('Server is up on port', port)
    })
})

//// Scenario 1 /////
When(/^send GET request to "([^"]*)"$/, async function (url) {
    let res = await got.get(url)
    let json = JSON.parse(res.body)
    resStatusCode1 = res.statusCode
    console.log('SCENARIO 1 - STEP 1 - When send GET request to "http://localhost:5050/api/employee"')
    console.log('SCENARIO 1 - STEP 1 - OUTPUT -> GET SUCCESS')
});
Then('getEmployee result the status code should be {int}', function (expectedResponse) {
    assert.equal(resStatusCode1, expectedResponse)
    console.log('SCENARIO 1 - STEP 2 - Then getEmployee result the status code should be 200')
    console.log('SCENARIO 1 - STEP 2 - OUTPUT ->', resStatusCode1)
});

/// Scenario 2 ////
When(/^send POST request to "([^"]*)", the data is$/, async function (url, docString) {
    var bodyData = JSON.parse(docString)
    var data = {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
    }
    try {
        let res = await got.post(url, data)
        resStatusCode2 = res.statusCode
        console.log('When send POST request to "http://localhost:5050/api/employee/insert", the data is "{"employeeId":"2", "employeeName":"Rangga", "age":20 }"')
        console.log('SCENARIO 2 - STEP 1 - OUTPUT -> POST SUCCESS')
    } catch (e) {
        console.log('error', e)
    }
})
Then('insertEmployee result the status code should be {int}', function (expectedResponse) {
    assert.equal(resStatusCode2, expectedResponse)
    console.log('SCENARIO 2 - STEP 2 - Then insertEmployee result the status code should be 201')
    console.log('SCENARIO 2 - STEP 2 - OUTPUT ->', resStatusCode2)
})

/// Scenario 3 ///
When(/^send GET request with employeeId to "([^"]*)"$/, async function (url) {
    let res = await got.get(url)
    let dataResp= JSON.parse(res.body)
    employeeName = dataResp.employeeName
    console.log('SCENARIO 3 - STEP 1 - When send GET request with employeeId to "http://localhost:5050/api/employee/2"')
    console.log('SCENARIO 3 - STEP 1 - OUTPUT -> GET SUCCESS')
});
Then('the employeeName should be {string}', function (expectedResponse) {
    assert.equal(employeeName, expectedResponse)
    console.log('SCENARIO 3 - STEP 2 - Then the employeeName should be "Rangga"')
    console.log('SCENARIO 3 - STEP 2 - OUTPUT ->', employeeName)
});

/// END ///