const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database:"hotelbooking"
});
// var sql = "CREATE TABLE Customer (id int auto_increment,name VARCHAR(255),number varchar(10),checkIn VARCHAR(255), checkOut VARCHAR(255), rooms int, adults int, child int, primary key(id))";
// con.query(sql,function (err, result){
//   if(err){
//     console.log(err);
//   }
// })
// var sql = "CREATE TABLE admin (userName VARCHAR(255),password varchar(10))";
// con.query(sql,function (err, result){
//   if(err){
//     console.log(err);
//   }
// })
// var sql1 = "INSERT INTO admin (userName,password) VALUES ('admin','root');"
//   con.query(sql1,function(err,result){
    
//   });
app.get("/", function (req, res) {
  res.render("home",{sucess:"",fail:""});
});
app.post("/", function(req,res){
  var sql = "INSERT INTO customer (name,number,checkIn,checkOut,rooms,adults,child) VALUES ('" + req.body.name + "','"+ req.body.num +"','" + req.body.checkIn +"','"+ req.body.checkOut + "',"+req.body.room + ","+ req.body.adult+ ","+ req.body.child +");"
  con.query(sql,function(err,result){
    if(!err){
      res.render("home", {sucess:"Your booking created sucessfully!",fail:""})
    }if(err){
      res.render("home", {sucess:"",fail:"please try again"})
    }
  })
})


app.get("/wp-admin", function(req,res){
  res.render("admin",{err:""})
})
app.post("/wp-admin", function(req,res){
  let number;
  let length;
  con.query("SELECT * FROM admin", function (err, result, fields) {
    let string = Object.values(JSON.parse(JSON.stringify(result)));
    if(string[0].userName === req.body.name){
      if(string[0].password === req.body.pass){
        con.query("SELECT * FROM customer", function (err, result, fields) {
           number = Object.values(JSON.parse(JSON.stringify(result)));
           length = number.length
           res.render("kitchen",{orders:number,len:length});
        });
       
        
      }else{
        res.render("admin",{err:"invalid creditionals!!"})
      }
    }else{
      res.render("admin",{err:"invalid creditionals!!"})

    }
  });

})

app.listen(3000, function () {
  console.log("server is spin up in port 3000");
});
