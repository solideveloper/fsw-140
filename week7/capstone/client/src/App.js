import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/page/Navbar";
import Employees from "./components/employees/Employees.js";
import AddEmployees from "./components/employees/AddEmployees";
import Home from "./components/page/Home";
import Flavors from "./components/flavors/Flavors";
import AddFlavors from "./components/flavors/AddFlavors";

import Footer from "./components/page/Footer";

import "./App.css";

function App() {
  const [employees, setEmployees, flavors, setFlavors] = useState([]);

  const getEmployees = () => {
    axios
      .get("http://localhost:9000/getemployees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.log(err));
  };

  const addEmployee = (newEmployee) => {
    axios
      .post("http://localhost:9000/postemployee", newEmployee)
      .then((res) => {
        setEmployees((prevEmployees) => [...prevEmployees, res.data]);
      })
      .catch((err) => console.log(err));
  };

  const deleteEmployee = (employeeId) => {
    axios
      .delete(`http://localhost:9000/delete/${employeeId}`)
      .then((res) => {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.EmployeeID !== employeeId)
        );
      })
      .catch((err) => console.log(err));
  };

  const editEmployee = (updates, employeeId) => {
    axios
      .put(`http://localhost:9000/edit/${employeeId}`, updates)
      .then((res) => {
        setEmployees((prevEmployees) =>
          prevEmployees.map((employee) =>
            employee.EmployeeID !== employeeId ? employee : res.data
          )
        );
      })
      .catch((err) => console.log(err));
  };

  const getFlavors = () => {
    axios
      .get("http://localhost:9000/getflavors")
      .then((res) => setFlavors(res.data))
      .catch((err) => console.log(err));
  };

  const addFlavor = (newFlavor) => {
    axios
      .post("http://localhost:9000/postflavors", newFlavor)
      .then((res) => {
        setFlavors((prevFlavors) => [...prevFlavors, res.data]);
      })
      .catch((err) => console.log(err));
  };

  const deleteFlavor = (flavorId) => {
    axios
      .delete(`http://localhost:9000/deleteflavors/${flavorId}`)
      .then((res) => {
        setFlavors((prevFlavors) =>
          prevFlavors.filter((flavor) => flavor._id !== flavorId)
        );
      })
      .catch((err) => console.log(err));
  };

  const editFlavor = (updates, flavorId) => {
    axios
      .put(`http://localhost:9000/flavors/${flavorId}`, updates)
      .then((res) => {
        setFlavors((prevFlavors) =>
          prevFlavors.map((flavor) =>
            flavor._id !== flavorId ? flavor : res.data
          )
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getFlavors();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getEmployees();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Navbar />
      <Home />
      <h1 className="title">Elderberry Infused Sea Moss Gel</h1>
      <img
        src="https://user-images.githubusercontent.com/72266712/99827766-0f481300-2b28-11eb-8b07-700f65358317.jpg"
        alt="mainimage"
        className="mainimage"
      ></img>

    <AddFlavors submit={addFlavor} btnText="Add Flavor" />
      {flavors.map((flavor) => {
        return (
          <Flavors
            {...flavor}
            __v={flavor.__v}
            _id={flavor._id}
            name={flavor.name}
            price={flavor.price}
            image={flavor.image}
            available={flavor.available}
            deleteFlavor={deleteFlavor}
            editFlavor={editFlavor}
          />
        );
      })}
      
      <AddEmployees submit={addEmployee} btnText="Add Employee" />
      {employees.map((employee) => {
        return (
          
          <Employees
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
          />
        );
      })}

      <Footer />
    </div>
  );
}
export default App;
