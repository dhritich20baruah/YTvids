import cron from "node-cron";
import { pool } from "./dbConnect";

const PAYMENT_TIMEOUT_MINUTES = 15;

async function deleteUnpaidBookings() {
  try {
    const result = await pool.query(
      `DELETE FROM journey WHERE payment_status = false AND now() - created_at >= interval '${PAYMENT_TIMEOUT_MINUTES} minutes' RETURNING *`
    );

    if ((result?.rowCount ?? 0) > 0) {
      console.log(`Deleted ${result.rowCount} unpaid bookings.`);
    } else {
      console.log("No unpaid bookings to delete.");
    }
  } catch (error) {
    console.error("Error deleting unpaid bookings:", error);
  }
}

// Schedule the cron job to run every 15 minutes
export function startCronJob() {
  cron.schedule("*/15 * * * *", () => {
    console.log("Running scheduled task to delete unpaid bookings...");
    deleteUnpaidBookings();
  });
  console.log("Cron job scheduled to delete unpaid bookings every 15 minutes.");
}
