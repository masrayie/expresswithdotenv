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
});
Then('getEmployee result the status code should be {int}', function (expectedResponse) {
    // console.log('halo',resStatusCode)
    assert.equal(resStatusCode1, expectedResponse)
});

/// Scenario 2 ////
When(/^send POST request to "([^"]*)", the data is$/, async function (url, docString) {
    console.log('hei',docString)
    var bodyData = JSON.parse(docString)
    var data = {
        headers: { 'Content-Type': 'application/json' },
        // json: docString,
        body: JSON.stringify(bodyData)
    }
    console.log('coy', data)
    try {
        let res = await got.post(url, data)
        resStatusCode2 = res.statusCode
        console.log('hayia', resStatusCode2)
    } catch (e) {
        console.log('error', e)
    }
})
Then('insertEmployee result the status code should be {int}', function (expectedResponse) {
    console.log('halo',resStatusCode2)
    assert.equal(resStatusCode2, expectedResponse)
})

/// Scenario 3 ///
When(/^send GET request with employeeId to "([^"]*)"$/, async function (url) {
    let res = await got.get(url)
    let dataResp= JSON.parse(res.body)
    employeeName = dataResp.employeeName
    console.log('nama', employeeName)
});
Then('the employeeName should be {string}', function (expectedResponse) {
    console.log('empName', employeeName)
    assert.equal(employeeName, expectedResponse)
});