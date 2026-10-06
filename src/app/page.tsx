import BookingList from "@/components/BookingList";

export default function Home() {
  return (
    <>
      <header className="site-header">
        <p className="logo">CoSpace</p>
      </header>
      <main className="page">
        <h1>Desk bookings</h1>
        <BookingList />
      </main>
    </>
  );
}