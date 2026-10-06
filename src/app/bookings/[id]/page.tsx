import Link from "next/link";
import { initialBookings } from "@/data/bookings";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BookingDetailPage({ params }: PageProps) {
  const { id } = await params;
  const booking = initialBookings.find((b) => b.id === id);

  if (!booking) {
    return (
      <main className="page">
        <h1>Booking not found</h1>
        <p className="detail-message">
          This desk booking does not exist or has been removed.
        </p>
        <Link href="/" className="back-link">
          Back to all bookings
        </Link>
      </main>
    );
  }

  return (
    <main className="page">
      <Link href="/" className="back-link">
        Back to all bookings
      </Link>
      <h1>{booking.desk}</h1>
      <dl className="detail-list">
        <dt>Floor</dt>
        <dd>{booking.floor}</dd>
        <dt>Date</dt>
        <dd>{booking.date}</dd>
        <dt>Status</dt>
        <dd>{booking.active ? "Active" : "Cancelled"}</dd>
      </dl>
    </main>
  );
}
