import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

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

app.listen(port, () => {console.log(`[server]: Server is running at port ${port}`)});