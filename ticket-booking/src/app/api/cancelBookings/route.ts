import { pool } from "../../../../utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Correctly parse the JSON request body
    console.log(body)
    await Promise.all(body.map(async (id: any) => {
     const result =  await pool.query(
          `DELETE FROM journey WHERE id = $1`,
          [ id ]
        );
        console.log("deleted")
      })
    );
    return NextResponse.json({ status: "OK" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
