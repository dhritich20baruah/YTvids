const express = require('express')
const app = express()
const Pool = require('pg').Pool
const path = require('path')
const PORT = 5000
const ejs = require('ejs')
require('dotenv').config()

const pool = new Pool({
    user: process.env.USER_NAME,
    host: process.env.HOST_NAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT,
    port: process.env.PORT_NUMBER
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

pool.connect((err, client, release) => {
    if(err){
        return console.error(
            'ERROR IN CONNECTION', err.stack
        )
    }
    client.query('SELECT NOW()', (err, result)=>{
        release()
        if(err){
            return console.error(
                'Error executing query', err.stack
            )
        }
        console.log('Connected to database')
    })
})

app.get('/', async (req, res)=>{
    const data = await pool.query(`SELECT * FROM royal_enfield`)
    res.render('index', {data: data.rows})
})

app.get('/saleMonthly/:month', async (req, res)=>{
    const month = req.params.month
    const data = await pool.query(`SELECT model, units_sold from royal_enfield where month = $1`, [month])
    console.log(data.rows)
    res.json({data: data.rows})
})

app.listen(PORT, ()=>{console.log(`Server started at post ${PORT}`)})