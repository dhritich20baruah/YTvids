import { pool } from "../../../../utils/dbConnect";
import Buses from "./Buses";

export default async function BusList({ params } : {params: { searchParams: string };}) {
  const searchArgs = params.searchParams;
  // Decode the URL-encoded string
  const decodedOrigin = decodeURIComponent(searchArgs); // This will convert "%26" to "&"

  //Split the string on the "&" character
  const [origin, destination, doj] = decodedOrigin.split("&");

  console.log(origin);
  console.log(destination);
  console.log(doj);

  const data = await pool.query(
    `SELECT * FROM buses WHERE stoppages @> ARRAY[$1, $2]::text[] AND array_position(stoppages, $1) < array_position(stoppages, $2)`,
    [origin, destination]
  );
  const buses = data.rows;
  return (
    <main>
      <Buses buses={buses} />
    </main>
  );
}
