import React, { useState } from 'react';
import AddEmployees from './AddEmployees';
import './employees.css';

function Employees(props){

    const { EmployeeID, EmpFirstName, EmpLastName, EmpStreetAddress, EmpCity, EmpState, EmpPhoneNumber, EmpZipCode, EmpAreaCode} = props;
    
    const [editToggle, setEditToggle] = useState(false);


    return (
        <div>
        <div>
        <h1 className="badge-title">Badge:</h1>
        </div>
        <div className="container">
        { !editToggle ?
        <> 
            <p className="badge-text"> Employee ID: { EmployeeID }</p>
            <p className="badge-text"> Full Name: { EmpFirstName } { EmpLastName }</p>
            <p className="badge-text"> Address: { EmpStreetAddress } { EmpCity } { EmpState } {EmpZipCode}</p>
            <p className="badge-text"> Phone Number: {EmpAreaCode} { EmpPhoneNumber }</p>

            <img src={"https://www.osiwa.org/wp-content/uploads/2019/02/Blank-Person.png"} alt=""/>
            <div>
            <button
                className="delete-btn"
                onClick={() => props.deleteEmployee(EmployeeID)}>
                Delete
            </button>
            <button
                className="edit-btn"
                onClick={() => setEditToggle(prevToggle => !prevToggle)}>
                Edit
            </button>
            </div>
        </>
        :
        <>
            <AddEmployees
                EmployeeID={EmployeeID}
                EmpFirstName={EmpFirstName}
                EmpLastName={EmpLastName}
                EmpStreetAddress={EmpStreetAddress}
                EmpCity={EmpCity}
                EmpState={EmpState}
                EmpPhoneNumber={EmpPhoneNumber}
                EmpZipCode={EmpZipCode}
                EmpAreaCode={EmpAreaCode}
                btnText="Submit Edit" 
                submit={props.editEmployee}
            />
            <button
                className="delete-btn"
                onClick={() => setEditToggle(prevToggle => !prevToggle)}>
                Close
            </button>
        </>
        }
        </div>
        </div>
    )
}
export default Employees;