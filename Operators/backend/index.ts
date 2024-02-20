import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/Users';

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

app.post('/newUser', async (req: Request, res: Response)=>{
    try{
        const {name, country, city, age, email, phone, company, height} = req.body

        const newUser = new User({
            name, country, city, age, email, phone, company, height
        })

        await newUser.save();
        res.status(200).json({ status: 'OK User saved'})
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: "User not saved"})
    }
})

app.listen(port, () => {console.log(`[server]: Server is running at port ${port}`)});