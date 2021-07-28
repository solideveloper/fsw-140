//server.js
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const morgan = require('morgan');


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'soli',
  database: 'ammosoul'
});

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));


db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Successfully Connected to SQL Database")
})

app.get("/getemployees", (req, res) => {
  let sqlSelect = "SELECT * FROM ammosoul.employees;";
  db.query(sqlSelect, (err, result) => {
      if(err){
          throw (err);
      }
      console.log(result);
      return res.send(result);
  });
});

app.get("/getflavors", (req, res) => {
  let sqlFlavors = "SELECT * FROM ammosoul.flavors;";
  db.query(sqlFlavors, (err, result) => {
      if(err){
          throw (err);
      }
      console.log(result);
      return res.send(result);
  });
});


app.post("/postemployee", (req, res) => {
  let sql = "INSERT INTO ammosoul.employees SET ?";
  let post = {
      EmpFirstName: req.body.EmpFirstName,
      EmpLastName: req.body.EmpLastName,
      EmpStreetAddress: req.body.EmpStreetAddress,
      EmpCity: req.body.EmpCity,
      EmpState: req.body.EmpState,
      EmpPhoneNumber: req.body.EmpPhoneNumber,
      EmpZipCode: req.body.EmpZipCode,
      EmpAreaCode: req.body.EmpAreaCode
  };
  db.query(sql, post, (err, result) => {
      if(err){
          throw (err);
      }
      console.log(result);
      return res.send(result)
  });
});


app.post("/postflavor", (req, res) => {
  let sql = "INSERT INTO ammosoul.flavors SET ?";
  let post = {
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      available: req.body.available,
     
  };
  db.query(sql, post, (err, result) => {
      if(err){
          throw (err);
      }
      console.log(result);
      return res.send(result)
  });
});


app.delete("/delete/:employeeId", (req, res) => {
  let sql = `DELETE FROM ammosoul.employees WHERE EmployeeID = '${req.params.employeeId}'`
  db.query(sql, (err, result) => {
      if(err){
          throw (err);
      }
      console.log(result);
      return res.send("Employee Successfully Removed From Database!")
  });
});


app.delete("/delete/:nameId", (req, res) => {
  let sql = `DELETE FROM ammosoul.flavors WHERE name = '${req.params.name}'`
  db.query(sql, (err, result) => {
      if(err){
          throw (err);
      }
      console.log(result);
      return res.send("Successfully Removed From Database!")
  });
});


app.put("/edit/:name", (req, res) => {
  let updateName = req.body.name;
  let updatePrice = req.body.price;
  let updateImage = req.body.image;
  let updateAvailable = req.body.available;
  let sql = `UPDATE ammosoul.flavors SET 
  name = '${updateName}',
 price = '${updatePrice}',
  image = '${updateImage}',
  available = '${updateAvailable}',
  
      WHERE name = '${req.params.name}'`
  db.query(sql, (err, result) => {
      if(err){
          throw (err);
      }
      console.log(result);
      return res.send(result);
  });
});



app.put("/edit/:employeeId", (req, res) => {
  let updateEmpFirstName = req.body.EmpFirstName;
  let updateEmpLastName = req.body.EmpLastName;
  let updateEmpStreetAddress = req.body.EmpStreetAddress;
  let updateEmpCity = req.body.EmpCity;
  let updateEmpState = req.body.EmpState;
  let updateEmpPhoneNumber = req.body.EmpPhoneNumber;
  let updateEmpZipCode = req.body.EmpZipCode;
  let udpateEmpAreaCode = req.body.EmpAreaCode;
  let sql = `UPDATE ammosoul.employees SET 
  EmpFirstName = '${updateEmpFirstName}',
  EmpLastName = '${updateEmpLastName}',
  EmpStreetAddress = '${updateEmpStreetAddress}',
  EmpCity = '${updateEmpCity}',
  EmpState = '${updateEmpState}',
  EmpPhoneNumber = '${updateEmpPhoneNumber}',
  EmpZipCode = '${updateEmpZipCode}',
  EmpAreaCode = '${udpateEmpAreaCode}'
      WHERE EmployeeID = '${req.params.employeeId}'`
  db.query(sql, (err, result) => {
      if(err){
          throw (err);
      }
      console.log(result);
      return res.send(result);
  });
});

app.listen(9000, () => {
  console.log("Running on Port 9000")
})
