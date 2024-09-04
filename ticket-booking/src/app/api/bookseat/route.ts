import { pool } from "../../../../utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const bookingID: any[] = []
  try {
    const body = await req.json(); // Correctly parse the JSON request body
    await Promise.all(body.map(async (data: any) => {
     const result =  await pool.query(
          `INSERT INTO journey (bus_name, origin, destination, doj, passenger_name, seat_no, mobile_no, email, stoppages, fare, start_time) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
          [
            data.busName,
            data.origin,
            data.destination,
            data.doj,
            data.passenger_name,
            data.seat_no,
            data.mobile_no,
            data.email,
            data.stoppages,
            data.fare,
            data.start_time,
          ]
        );
        bookingID.push(result.rows.map(item=>item.id))
      })
    );
    return NextResponse.json({ status: "OK", bookingID });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
