import {Pool} from "pg";

export const pool = new Pool({
    user: process.env.USER_NAME,
    host: process.env.HOST_NAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.PORT_NUMBER? parseInt(process.env.PORT_NUMBER) : undefined
})

export default async function dbConnect(){
    await pool.connect((error, client,release)=>{
        if(error){
            return console.error("Error in connecting Database", error.stack)
        }
    })
}