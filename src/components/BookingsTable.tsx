import Link from "next/link";
import type { Booking } from "@/types/booking";

interface BookingsTableProps {
  bookings: Booking[];
}

export default function BookingsTable({ bookings }: BookingsTableProps) {
  return (
    <div className="table-wrapper">
      <table className="bookings-table">
        <caption>Upcoming desk bookings</caption>
        <thead>
          <tr>
            <th scope="col">Desk</th>
            <th scope="col">Floor</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>
                <Link href={`/bookings/${booking.id}`}>{booking.desk}</Link>
              </td>
              <td>{booking.floor}</td>
              <td>{booking.date}</td>
              <td>
                <span className={booking.active ? "status status--active" : "status status--inactive"}>
                  {booking.active ? "Active" : "Cancelled"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}