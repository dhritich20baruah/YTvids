import { pool } from "@/utils/dbConnect";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import { NextResponse } from "next/server";

const JWT_SECRET = "secret_11235";

export const POST = async (req, res) => {
  if (req.method !== "POST") {
    return NextResponse.json({ status: 405 });
  }
  const { email, password } = await req.json();

  try {
    const admin = await pool.query(`SELECT * FROM admin WHERE email = $1`, [
      email,
    ]);

    if (admin.rows.length === 0) {
      return NextResponse.json({
        status: "Unauthorized",
        message: "Invalid email or password",
      });
    }

    const hashedPassword = admin.rows[0].password;
    const validation = await bcrypt.compare(password, hashedPassword);

    if (validation) {
      const token = jwt.sign(
        {
          name: admin.rows[0].adminNameame,
          id: admin.rows[0].id,
          email: admin.rows[0].email,
        },
        JWT_SECRET
      );

      return NextResponse.json({ status: "OK", token });
    } else {
      return NextResponse.json({ status: "Invalid Password" });
    }
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
};

