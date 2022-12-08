Feature: Employee API
    Scenario: Get Employee Data
        When send GET request to "http://localhost:5050/api/employee"
        Then getEmployee result the status code should be 200
    
    Scenario: Insert Employee Data
        When send POST request to "http://localhost:5050/api/employee/insert", the data is 
            """
            {
            "employeeId":"2",
            "employeeName":"Budi",
            "age":20
            }
            """
        Then insertEmployee result the status code should be 201
    
    Scenario: Get Employee By employeeId
        When send GET request with employeeId to "http://localhost:5050/api/employee/2"
        Then the employeeName should be "Rangga"