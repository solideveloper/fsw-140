import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Employees from './components/Employees.js';
import AddEmployees from './components/AddEmployees';
import './App.css';

function App() {

  const [employees, setEmployees] = useState([])
  
  const getEmployees = (() => {
      axios.get("http://localhost:9000/get")
          .then(res => setEmployees(res.data))
          .catch(err => console.log(err))
  })

  const addEmployee = ((newEmployee) => {
    axios.post("http://localhost:9000/post", newEmployee)
        .then(res => {
            setEmployees(prevEmployees => [...prevEmployees, res.data])
        })
        .catch(err => console.log(err))
  })

  const deleteEmployee = ((employeeId) => {
    axios.delete(`http://localhost:9000/delete/${employeeId}`)
        .then(res => {
            setEmployees(prevEmployees => prevEmployees.filter(employee => employee.EmployeeID !== employeeId))
        })
        .catch(err => console.log(err))
  })

  const editEmployee = ((updates, employeeId) => {
    axios.put(`http://localhost:9000/edit/${employeeId}`, updates)
        .then(res => {
            setEmployees(prevEmployees => prevEmployees.map (employee => employee.EmployeeID !== employeeId ? employee : res.data))
        })
        .catch(err => console.log(err))
  })





useEffect(() => {
      getEmployees()
  }, [])


return (
    <div>
        <h1 className='title'>New Hire Badge Database</h1>
        <AddEmployees 
            submit={addEmployee}
            btnText="Add Employee"
        />
      {
        employees.map(employee => 
        {
          return <Employees
            {...employee}
            EmployeeID={employee.EmployeeID}
            EmpFirstName={employee.EmpFirstName}
            EmpLastName={employee.EmpLastName}
            EmpStreetAddress={employee.EmpStreetAddress}
            EmpCity={employee.EmpCity}
            EmpState={employee.EmpState}
            EmpPhoneNumber={employee.EmpPhoneNumber}
            EmpZipCode={employee.EmpZipCode}
            EmpAreaCode={employee.EmpAreaCode}
            deleteEmployee={deleteEmployee}
            editEmployee={editEmployee}
          />}) 
        }
    </div>
  )
}
 export default App;
