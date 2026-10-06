"use client";

import { useState, type FormEvent } from "react";
import type { NewBooking } from "@/types/booking";

interface RegistrationFormProps {
  onAdd: (booking: NewBooking) => void;
}

export default function RegistrationForm({ onAdd }: RegistrationFormProps) {
  const [desk, setDesk] = useState("");
  const [floor, setFloor] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!desk.trim() || !floor.trim() || !date) {
      setError("Fill in the desk, floor and date.");
      return;
    }

    onAdd({ desk: desk.trim(), floor: floor.trim(), date, active: true });
    setDesk("");
    setFloor("");
    setDate("");
    setError("");
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate>
      <h2>Add a booking</h2>

      <label htmlFor="desk">Desk</label>
      <input id="desk" value={desk} onChange={(e) => setDesk(e.target.value)} placeholder="Desk-05" />

      <label htmlFor="floor">Floor</label>
      <input id="floor" value={floor} onChange={(e) => setFloor(e.target.value)} placeholder="Floor 2" />

      <label htmlFor="date">Date</label>
      <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />

      {error && <p className="form-error" role="alert">{error}</p>}

      <button type="submit" className="button">Add booking</button>
    </form>
  );
}