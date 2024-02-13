var exp = require('express');
var mysql = require('mysql2');
var cors = require('cors');
var bp = require('body-parser');

var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "root",
    database : "prav"
});

var app = exp();
app.use(cors());
app.use(bp.json());


con.connect(function(err){
    if(!err)
       console.log("DB Connected");
    else
       console.log("DB Failed");
});

app.listen(9000,()=>{
    console.log("exp - REST server - 9000");
});


app.post('/login', function(req, res) {
    console.log("Login request received");
    const email = req.body.email;
    console.log(email)
    const password = req.body.password;
    console.log(password)
    const query = "SELECT * FROM user1 WHERE email = ?";
    con.query(query, [email], function(err, result) {
        //alert(result);
console.log(result);
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }

        if (result.length > 0) {
            if (result[0].password === password) {
                res.send("success");
            } else {
                res.status(401).json({ message: "Invalid Password" });
            }
        } else {
            res.status(404).json({ message: "Username not found" });
        }
    });
});


app.post('/submit-form',(req,res)=>{
    console.log("req received");
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var phone = req.body.phone;
    
    
    var query = "insert into user1(name,email,password,phone) values(?,?,?,?)";
    con.query(query, [name,email,password,phone], (err)=> {
        if(!err) {
            res.send("success")
        } else {
            console.error("Error inserting data:", err);
            res.send("failure");
        }
    });
});


app.all('*',function(req,res) {
    res.send("Wrong URL....");
});