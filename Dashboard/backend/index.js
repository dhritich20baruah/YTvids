const express = require('express')
const app = express(); //make it executable
const mongoose = require('mongoose')
const PORT = 5000;

app.get("/", (req, res)=>{
    res.send("App is working")
})

app.listen(PORT, ()=>{console.log(`Server running at port ${PORT}`)})
