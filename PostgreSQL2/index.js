const express =  require("express");
const app = express();
const Pool = require("pg").Pool;
const path = require("path");
const PORT = 3000;
const ejs = require('ejs');

require("dotenv").config()

const pool = new Pool({
    user: process.env.USER_NAME,
    host: process.env.HOST_NAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT,
    port: process.env.PORT_NUMBER
})

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/static", express.static("static"))

app.use(express.urlencoded({extended: true}));
app.use(express.json())

pool.connect((err, client, release) => {
    if(err){
        return console.error("Error in connection", err.stack)
    }
    client.query("SELECT NOW()", (err, result) => {
        release();
        if(err){
            return console.error("Error executing query", err.stack);
        }
        console.log('Connected to database')
    })
})

app.get("/", async(req, res)=>{
    const data = await pool.query("SELECT * FROM book_list")
    res.render("index", {data: data.rows})
})

app.listen(PORT, ()=>{
    console.log(`Server started at port ${PORT}`)
})