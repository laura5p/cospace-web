"use client";

import { useState, type FormEvent } from "react";
import type { NewBooking } from "@/types/booking";

interface RegistrationFormProps {
  onAdd: (booking: NewBooking) => void;
}

type Field = "desk" | "floor" | "date";
type FieldErrors = Partial<Record<Field, string>>;

export default function RegistrationForm({ onAdd }: RegistrationFormProps) {
  const [desk, setDesk] = useState("");
  const [floor, setFloor] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const found: FieldErrors = {};
    if (!desk.trim()) found.desk = "Enter a desk name, for example Desk-05.";
    if (!floor.trim()) found.floor = "Enter a floor, for example Floor 2.";
    if (!date) found.date = "Choose a date for the booking.";

    setErrors(found);
    if (Object.keys(found).length > 0) return;

    onAdd({ desk: desk.trim(), floor: floor.trim(), date, active: true });
    setDesk("");
    setFloor("");
    setDate("");
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate>
      {Object.keys(errors).length > 0 && (
        <p className="form-error" role="alert">Fix the highlighted fields to create the booking.</p>
      )}

      <label htmlFor="desk">Desk</label>
      <input
        id="desk"
        value={desk}
        onChange={(e) => setDesk(e.target.value)}
        aria-invalid={errors.desk ? true : undefined}
        aria-describedby={errors.desk ? "desk-error" : undefined}
      />
      {errors.desk && <p id="desk-error" className="field-error">{errors.desk}</p>}

      <label htmlFor="floor">Floor</label>
      <input
        id="floor"
        value={floor}
        onChange={(e) => setFloor(e.target.value)}
        aria-invalid={errors.floor ? true : undefined}
        aria-describedby={errors.floor ? "floor-error" : undefined}
      />
      {errors.floor && <p id="floor-error" className="field-error">{errors.floor}</p>}

      <label htmlFor="date">Date</label>
      <input
        id="date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        aria-invalid={errors.date ? true : undefined}
        aria-describedby={errors.date ? "date-error" : undefined}
      />
      {errors.date && <p id="date-error" className="field-error">{errors.date}</p>}

      <button type="submit" className="button">Create booking</button>
    </form>
  );
}