import Link from "next/link";

interface BookingCardProps {
  id: string;
  desk: string;
  floor: string;
  date: string;
  active: boolean;
}

export default function BookingCard({ id, desk, floor, date, active }: BookingCardProps) {
  return (
    <Link href={`/bookings/${id}`} className="booking-card-link">
      <article className={`booking-card ${active ? "booking-card--active" : "booking-card--inactive"}`}>
        <h3>{desk}</h3>
        <p>{floor}</p>
        <p>{date}</p>
        <p className="booking-status">{active ? "Active" : "Cancelled"}</p>
      </article>
    </Link>
  );
}