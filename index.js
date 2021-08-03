require('dotenv').config();
const express = require('express')
const path = require('path')
const dbconnection = require('./config/dbconnection')
const userRoutes = require('./routes/userRoutes')
const claimsRoutes = require('./routes/claimRoutes')

const app = express()
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.resolve(__dirname, './assets/')))

app.use("/api/user",userRoutes)
app.use("/api/claims",claimsRoutes)
app.get("*", (req,res) => {
    res.json({message:"Invalid URL"}).status(404)
})

dbconnection.then((data,err) => {
    if(err){
        console.log("Failed to connect with mongo db");
    }else{
        console.log("Connected to database");
        app.listen(port, () => {console.log(`Application started at port ${port}`);})
    }
})