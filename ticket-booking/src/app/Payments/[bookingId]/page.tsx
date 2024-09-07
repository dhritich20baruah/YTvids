import PaymentForm from "./PaymentForm";
import { pool } from "../../../../utils/dbConnect";

export default async function Payments({params}:{params: { bookingId: string }}) {
  // const bookings = params;
  const bookingIds = decodeURIComponent(params.bookingId).split(',');
  let result: any = []
  await Promise.all( bookingIds.map(async (i) => {
  let res = await pool.query(`SELECT * FROM journey WHERE id = $1`, [i])
  result.push(res.rows[0])
  }))
  return (
   <main>
    <PaymentForm formData={result} bookingIds={bookingIds}/>
   </main>
  );
}
