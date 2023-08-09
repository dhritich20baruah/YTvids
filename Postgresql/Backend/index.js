const express = require('express');
const app = express();
const Pool = require('pg').Pool;
const path = require('path')
const PORT = 5000;
const ejs = require('ejs')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'test',
    password: '81708',
    dialect: 'postgres',
    port: 5432
})


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use('/static', express.static('static'))

app.use(express.urlencoded({extended: true}));
app.use(express.json())


pool.connect((err, client, release) => {
    if(err){
        return console.error(
            'Error in connection', err.stack
        )
    }
    client.query('SELECT NOW()', (err, result)=>{
        release()
        if(err){
            return console.error(
                'Error executing query', err.stack
            )
        }
        console.log("Connected to Database.")
    })
})


app.get('/', (req, res) => {
    res.render('index')
})

app.get('/testData', (req, res, next)=>{
    console.log('Test data: ');
    pool.query('select * from car')
    .then(testData=>{
        res.send(testData.rows);
    })
})

app.listen(PORT, ()=>{console.log(`Server started at port ${PORT}`)} )