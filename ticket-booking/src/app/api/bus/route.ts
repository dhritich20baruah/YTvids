import { pool } from "../../../../utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response){
    try {
        const result = await pool.query(`SELECT * FROM buses`)
        const buses = result.rows
        return NextResponse.json(buses) 
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "Internal server error"})
    }
}