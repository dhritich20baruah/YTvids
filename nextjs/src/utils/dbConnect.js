import { Pool } from "pg";

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '81708',
    port: 5432,
    database: 'tests'
})

export default async function dbConnect(){
    await pool.connect((error, client, release)=>{
        if(error){
            return console.error("error in connection", error.stack)
        }
        client.query("SELECT NOW()", (error, result)=>{
            release()
            if(error){
                return console.error("error in query execution", error.stack)
            }
        })
    })
}