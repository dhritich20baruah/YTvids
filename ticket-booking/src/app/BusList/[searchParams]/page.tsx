import { pool } from "../../../../utils/dbConnect";
import Buses from "./Buses";
import { addHours, format } from "date-fns";

export default async function BusList({
  params,
}: {
  params: { searchParams: string };
}) {
  const searchArgs = params.searchParams;
  // Decode the URL-encoded string
  const decodedOrigin = decodeURIComponent(searchArgs); // This will convert "%26" to "&"

  //Split the string on the "&" character
  const [origin, destination, doj] = decodedOrigin.split("&");

  const data = await pool.query(
    `SELECT * FROM buses WHERE stoppages @> ARRAY[$1, $2]::text[] AND array_position(stoppages, $1) < array_position(stoppages, $2)`,
    [origin, destination]
    
  );

  if (data.rows.length === 0) {
    // Handle no bus found
    return (
      <main>
        <p>No buses found.</p>
      </main>
    );
  }

  const buses = data.rows;

  let route_name = data.rows[0].routes;

  const distance = await pool.query(`
    WITH stop_data AS (
       SELECT 
         route_name,
         ROW_NUMBER() OVER () AS stop_index, 
         (stop_data).name AS stop_name,
         (stop_data).distance_from_last AS distance_from_last
       FROM bus_routes, 
       UNNEST(distance) AS stop_data
     )
     SELECT SUM(distance_from_last) AS total_distance
     FROM stop_data
     WHERE stop_index > (
         SELECT stop_index 
         FROM stop_data 
         WHERE stop_name = $1 
         AND route_name = $3
         LIMIT 1
       )
       AND stop_index <= (
         SELECT stop_index 
         FROM stop_data 
         WHERE stop_name = $2 
         AND route_name = $3
         LIMIT 1
       )
       AND route_name = $3
   `, [origin, destination, route_name]);

   const total_distance = distance.rows[0].total_distance

   buses.forEach((bus)=>{
    const total_fare = parseFloat(bus.fare) * total_distance;

    const travel_time_hrs = total_distance / bus.speed;
    const hours = Math.floor(travel_time_hrs);
    const minutes = Math.round((travel_time_hrs - hours) * 60);
    const formatted_duration = `${hours}h ${minutes}m`;

    const startTime = new Date(`${doj}T${bus.start_time}`);
    const duration_ms = travel_time_hrs * 60 * 60 * 1000; // Convert hours to milliseconds

    const arrivalDate = new Date(startTime.getTime() + duration_ms);

    const estimated_arrival_time = addHours(startTime, travel_time_hrs);
    const formatted_arrival_time = format(estimated_arrival_time, "HH:mm:ss");
    const formatted_arrival_date = format(arrivalDate, 'dd/MM/yyyy');

    bus.total_fare = total_fare.toFixed(2);
    bus.estimated_arrival = formatted_arrival_time;
    bus.arrival_date = formatted_arrival_date;
    bus.duration = formatted_duration;
    bus.origin = origin;
    bus.destination = destination;
    bus.doj = doj;
   })

   
  return (
    <main>
      <Buses buses={buses} />
    </main>
  );
}
