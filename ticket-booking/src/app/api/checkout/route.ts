import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { pool } from "../../../../utils/dbConnect";

const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: "2024-06-20", // Adjust to your Stripe API version
});

export async function POST(req: NextRequest) {
  try {
    const { amount, id, bookingIds } = await req.json();
    console.log(amount, id, bookingIds);
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      description: "Book Seat",
      payment_method: id,
      confirm: true,
      return_url: "https://yourwebsite.com/success",
    });

    await Promise.all(
      bookingIds.map(async (ids: string) => {
        await pool.query(
          `UPDATE journey SET paymentid = $1, payment_status = $2 WHERE id = $3`,
          [payment.id, true, ids]
        );
      })
    );
    return NextResponse.json({
      message: "Payment Successful",
      payment: payment.id,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}
