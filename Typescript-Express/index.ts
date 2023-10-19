import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Note from './models/Notes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json())

mongoose.connect('mongodb://0.0.0.0:27017/typeExpress')
.then(()=>console.log('DB Connected'))
.catch((err)=> console.log(err))

app.get('/', (req: Request, res: Response)=>{
    res.send('Express and Typescript server and will use mongodb');
})

app.post('/newNote', async (req: Request, res: Response)=>{
    try{
        const {title, note} = req.body

        const newNote = new Note({
            title, note
        })

        await newNote.save();
        res.status(200).json({ status: 'OK Note saved'})
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: "Note not saved"})
    }
})

app.get('/getNotes', async (req: Request, res: Response)=>{
    try{
        const notes = await Note.find({})
        res.status(200).json({notes})
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: "Notes not found"})  
    }
})

app.listen(port, () => {console.log(`[server]: Server is running at port ${port}`)});