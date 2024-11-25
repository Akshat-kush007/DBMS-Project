import express from "express";
import mysql from "mysql";

const app= express();
const PORT=3000;

app.use(express.json())

const db= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"mysqlroot",
    database:"backend"
})


app.get('/',(req,res)=>{
    res.json("Backend is working!")
})

app.get('/user',(req,res)=>{
    const query = "SELECT * FROM user";
    db.query(query,(error,data)=>{
        if(error){
            console.log('Error at get /user:');
            console.log(error);
            return res.status(500).json({
                id:"-1"
            });
        }else{
            return res.status(200).json(data);
        }
    })
})

app.post('/user',(req,res)=>{
    const query = 'INSERT INTO user (username,password) VALUES (?)'
    const values =[
        req.body.username,
        req.body.password
    ]
    db.query(query,[values],(error,value)=>{
        if(error){
            console.log('Error at post /user:');
            console.log(error);
            return res.status(500).json(error);
        }else{
            return res.status(200).json(value);
        }
    })
})

app.get('/products',(req,res)=>{
    const query = "SELECT * FROM products";
    db.query(query,(error,data)=>{
        if(error){
            console.log('Error at get /user:');
            console.log(error);
            return res.status(500).json({
                id:"-1"
            });
        }else{
            return res.status(200).json(data);
        }
    })
})

app.listen(PORT,()=>{
    console.log(`DBMS Project Backend is running on ${PORT}`)
})