import { pool } from "@/utils/dbConnect";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import { NextResponse } from "next/server";

const JWT_SECRET = "secret_11235";

export async function POST(req, res) {
  if (req.method !== "POST") {
    return NextResponse.json({ status: 405 });
  }
  const { adminName, email, password } = await req.json();

  console.log(adminName, email, password);
  try {
    const admin = await pool.query("SELECT * FROM admin where email = $1", [
      email,
    ]);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await pool.query(
      `INSERT INTO admin (adminName, email, password) VALUES ($1, $2, $3) RETURNING *`,
      [adminName, email, hashedPassword]
    );
  

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        message: "Error",
        err,
      },
      {
        status: 500,
      }
    );
  }
}
