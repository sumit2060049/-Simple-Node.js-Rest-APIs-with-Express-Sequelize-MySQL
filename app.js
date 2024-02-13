const express=require('express');
const bodyParser= require('body-parser');
const appRoutes= require('./routes');

const mysql=require('mysql')
const connection=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Mrsumit45@",
    database:"table1"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    connection.query(`create table IF NOT EXISTS user(
        id INT,
        first VARCHAR(20),
        last VARCHAR(20)
    )`,(err, result)=> {
        if (err) throw err;
        console.log("Table altered");
      });
  });

 


const PORT=8087;

const app=express();
app.use(bodyParser.json());

app.use('/',appRoutes);



app.listen(PORT,() => {
    console.log("Application started")
})