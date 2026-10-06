"use client";

import { useState } from "react";
import BookingCard from "./BookingCard";
import RegistrationForm from "./RegistrationForm";
import type { Booking, NewBooking } from "@/types/booking";
import { initialBookings } from "@/data/bookings";

export default function BookingList() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();
  const visibleBookings = bookings.filter(
    (booking) =>
      booking.desk.toLowerCase().includes(query) ||
      booking.floor.toLowerCase().includes(query),
  );

  const handleAdd = (newBooking: NewBooking) => {
    setBookings((prev) => [...prev, { id: crypto.randomUUID(), ...newBooking }]);
  };

  return (
    <div className="dashboard">
      <section aria-labelledby="bookings-heading">
        <h2 id="bookings-heading">Bookings</h2>

        <label htmlFor="search">Search by desk or floor</label>
        <input
          id="search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Desk-01 or Floor 2"
        />

        {visibleBookings.length === 0 ? (
          <p className="empty">No bookings match your search.</p>
        ) : (
          <ul className="booking-list">
            {visibleBookings.map((booking) => (
              <li key={booking.id}>
                <BookingCard
                  desk={booking.desk}
                  floor={booking.floor}
                  date={booking.date}
                  active={booking.active}
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      <aside className="sidebar">
        <RegistrationForm onAdd={handleAdd} />
      </aside>
    </div>
  );
}