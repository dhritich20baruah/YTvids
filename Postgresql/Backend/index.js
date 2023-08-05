const express = require('express');
const app = express();
const Pool = require('pg').Pool;
const PORT = 5000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'test',
    password: '81708',
    dialect: 'postgres',
    port: 5432
})

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

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

app.get('/testData', (req, res, next)=>{
    console.log('Test data: ');
    pool.query('select * from car')
    .then(testData=>{
        res.send(testData.rows);
    })
})

app.listen(PORT, ()=>{console.log(`Server started at port ${PORT}`)} )