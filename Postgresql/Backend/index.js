const express = require('express');
const app = express();
const Pool = require('pg').Pool;
const path = require('path')
const PORT = 5000;
const ejs = require('ejs')
const cors = require('cors')

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

app.use(cors())
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
        console.log(result)
        res.redirect('/')
    }
    catch(error){
        console.error('Error inserting student:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get('/students', async (req, res)=>{
    const data =  await pool.query('select * from student')
    res.render('students', {data: data.rows})
})

app.get('/edit/:id', async (req, res)=>{
    const id = req.params.id;
    const data = await pool.query('SELECT * FROM student WHERE id = $1', [id])
    res.render('edit', {data: data.rows})
})

app.post('/update/:id', async (req, res)=>{
    const id = req.params.id;
    const { name, email, gender, field1, field2 } = req.body;

    try{
        await pool.query(`UPDATE student SET student_name = $1, email = $2, gender = $3, field1 = $4, field2 = $5 WHERE id = $6`, [name, email, gender, field1, field2, id])
        res.redirect('/students')
    }
    catch(error){
        console.error('Error inserting student:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get('/delete/:id', async (req, res)=>{
    const id = req.params.id
    await pool.query('DELETE FROM student WHERE id = $1', [id])
    res.redirect('/students')
})  

// NOTES ENDPOINTS
app.post('/createNote', async(req,res)=>{
    const { note, writtenBy } = await req.body;

    try{
        const newNote = await pool.query('INSERT INTO notes (note, written_by) VALUES ($1, $2) RETURNING *', [note, writtenBy])
        res.status(200).json({message: 'OK'})
        console.log(newNote.rows[0])
    }
    catch(error){
        console.log(error)
        res.status(500).json({ error: "Internal server error"})
    }
})

app.get('/getNotes', async(req, res)=>{
    const data = await pool.query('SELECT * FROM notes')
    res.json(data.rows)
})

app.delete('/deleteNote/:id', async(req,res)=>{
    const id = req.params.id
    await pool.query('DELETE FROM notes WHERE id= $1', [id])
    res.status(200).json({message: 'Note Deleted'})
})

app.put('/updateNote/:id', async (req, res)=>{
    const id = await req.params.id;
    const { note, writtenBy } = req.body;

    try{
        const updatedNote = await pool.query(`UPDATE notes SET note = $1, written_by = $2 WHERE id = $3`, [note, writtenBy, id])
        res.status(200).json({message: 'OK'})
    }
    catch(error){
        console.error('Error updating note:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.listen(PORT, ()=>{console.log(`Server started at port ${PORT}`)} )