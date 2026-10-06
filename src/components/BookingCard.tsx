interface BookingCardProps {
  desk: string;
  floor: string;
  date: string;
  active: boolean;
}

export default function BookingCard({ desk, floor, date, active }: BookingCardProps) {
  return (
    <article className={`booking-card ${active ? "booking-card--active" : "booking-card--inactive"}`}>
      <h3>{desk}</h3>
      <p>{floor}</p>
      <p>{date}</p>
      <p className="booking-status">{active ? "Active" : "Cancelled"}</p>
    </article>
  );
}