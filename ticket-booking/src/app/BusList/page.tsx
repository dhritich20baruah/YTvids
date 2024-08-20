import Buses from "./Buses";
import { pool } from "../../../utils/dbConnect";

export default async function BusList(){
  const data = await pool.query(`SELECT * FROM buses`)
  const buses = data.rows
  console.log(buses)
  return(
    <main>
        <Buses buses={buses}/>
    </main>
  )
}