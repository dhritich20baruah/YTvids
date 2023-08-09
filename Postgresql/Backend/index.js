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

app.post('/newStudent', async (req, res)=>{
    const { name, email, gender, field1, field2 } = req.body;
   
    try{
        const result = await pool.query(`INSERT INTO student (student_name, email, gender, field1, field2) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [name, email, gender, field1, field2])
        res.redirect('/')
    }
    catch(error){
        console.error('Error inserting student:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get('/students', async (req, res, next)=>{
    const data =  await pool.query('select * from student')
    res.render('students', {data: data.rows})
})

app.listen(PORT, ()=>{console.log(`Server started at port ${PORT}`)} )