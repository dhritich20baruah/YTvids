import { pool } from "../../../../utils/dbConnect";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { format } from "date-fns";

interface Stoppage {
  name: string;
  distance_from_last: number;
}

interface Bus {
  busName: string;
  details: string;
  total_seats: number;
  stoppages: Array<string>;
  fare: number;
  start_time: string;
  speed?: number;
  service: "day" | "night";
}

const stops: Stoppage[] = [
  {
    name: "Guwahati",
    distance_from_last: 0,
  },
  {
    name: "Nagaon",
    distance_from_last: 120,
  },
  {
    name: "Bokakhat",
    distance_from_last: 120,
  },
  {
    name: "Jorhat",
    distance_from_last: 68,
  },
  {
    name: "Sivsagar",
    distance_from_last: 57,
  },
  {
    name: "Moran",
    distance_from_last: 42,
  },
  {
    name: "Dibrugarh",
    distance_from_last: 38,
  },
  {
    name: "Tinsukia",
    distance_from_last: 47,
  },
];

function calculateTotalFare(origin: string, destination: string): number {
  const bus = busData.find(
    (bus) =>
      bus.stoppages.includes(origin) && bus.stoppages.includes(destination)
  );

  if (!bus) {
    return 0; // Bus not found for the given origin and destination
  }

  const originIndex = bus.stoppages.indexOf(origin);
  const destinationIndex = bus.stoppages.indexOf(destination);

  if (
    originIndex === -1 ||
    destinationIndex === -1 ||
    originIndex >= destinationIndex
  ) {
    return 0; // Invalid origin or destination
  }

  // Sum up distances between origin and destination
  let totalDistance = 0;
  for (let i = originIndex; i < destinationIndex; i++) {
    totalDistance +=
      stops.find((stop) => stop.name === bus.stoppages[i])
        ?.distance_from_last || 0;
  }

  return totalDistance;
}

export async function GET(req: NextRequest, res: NextResponse) {
  const searchParams = req.nextUrl.searchParams;
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const doj = searchParams.get("doj");

  const inputDoj = doj;
  const formattedDoj: any = inputDoj.replace(
    /^(\d{2})\/(\d{2})\/(\d{4})$/,
    "$3-$2-$1"
  );

  try {
    const result = await pool.query(`SELECT * FROM buses`);
    const busData = result.rows;
    return NextResponse.json(busData);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal server error" });
  }
}

interface TravelTime {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

interface BusWithTravelTime extends Bus {
  travelTime: TravelTime;
}

function searchBus(
  origin: string,
  destination: string,
  doj: string
): { buses: BusWithTravelTime[] } {
  const result: BusWithTravelTime[] = [];

  for (const bus of busData) {
    const originIndex = bus.stoppages.indexOf(origin);
    const destinationIndex = bus.stoppages.indexOf(destination);

    if (
      originIndex !== -1 &&
      destinationIndex !== -1 &&
      originIndex < destinationIndex
    ) {
      // Calculate total distance and time
      let totalDistance = 0;
      let totalTime = 0;

      let totalStartDistance = 0;
      let totalStartTime = 0;

      for (let i = 0; i <= destinationIndex; i++) {
        const stop = stops.find((s) => s.name === bus.stoppages[i]);

        if (!stop) {
          return { buses: [] }; // Stop not found
        }

        totalDistance += stop.distance_from_last;
        totalTime += (stop.distance_from_last / bus.speed!) * 60; // Convert distance to time in minutes
      }

      for (let i = 0; i <= originIndex; i++) {
        const stop = stops.find((s) => s.name === bus.stoppages[i]);

        if (!stop) {
          return { buses: [] }; // Stop not found
        }

        totalStartDistance += stop.distance_from_last;
        totalStartTime += (stop.distance_from_last / bus.speed!) * 60; // Convert distance to time in minutes
      }

      const startTime = new Date(`${doj}T${bus.start_time}`);
      const actualStartTime = new Date(
        startTime.getTime() + totalStartTime * 60 * 1000
      );
      const endTime = new Date(startTime.getTime() + totalTime * 60 * 1000); // Convert time back to milliseconds
      if (isNaN(endTime.getTime())) {
        return { buses: [] }; // Invalid time
      }

      const travelTime: TravelTime = {
        startDate: format(startTime, "yyyy-MM-dd"), // Format the date
        startTime: format(actualStartTime, "HH:mm"), // Format the time
        endDate: format(endTime, "yyyy-MM-dd"), // Format the date
        endTime: format(endTime, "HH:mm"), // Format the time
      };

      result.push({
        ...bus,
        travelTime,
      });
    }
  }

  return { buses: result };
}
