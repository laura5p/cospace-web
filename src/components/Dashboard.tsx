"use client";

import { useState } from "react";
import BookingsTable from "./BookingsTable";
import BaseModal from "./BaseModal";
import { initialBookings } from "@/data/bookings";
import type { Booking, NewBooking } from "@/types/booking";
import CreateBookingForm from "./CreateBookingForm";

export default function Dashboard() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [isModalOpen, setIsModalOpen] = useState(false);

const handleAdd = (newBooking: NewBooking) => {
  setBookings((prev) => [...prev, { id: crypto.randomUUID(), ...newBooking }]);
};

  return (
    <>
      <div className="dashboard-header">
        <h1>Desk bookings</h1>
        <button type="button" className="button" onClick={() => setIsModalOpen(true)}>
          Create booking
        </button>
      </div>

      <BookingsTable bookings={bookings} />

      <BaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create booking">
        <CreateBookingForm onCreate={handleAdd} />
      </BaseModal>
    </>
  );
}