"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import type { NewBooking } from "@/types/booking";

interface CreateBookingFormProps {
  onCreate: (booking: NewBooking) => void;
}

interface FormValues {
  desk: string;
  floor: string;
  date: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY_VALUES: FormValues = { desk: "", floor: "", date: "" };

function todayAsIsoDate(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function validateBooking(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (values.desk.trim().length < 3) {
    errors.desk = "Desk name must be at least 3 characters.";
  }

  if (values.floor.trim().length < 5) {
    errors.floor = "Floor must be at least 5 characters, for example Floor 2.";
  }

  if (!values.date || Number.isNaN(Date.parse(values.date))) {
    errors.date = "Choose a valid date.";
  } else if (values.date < todayAsIsoDate()) {
    errors.date = "The date cannot be in the past.";
  }

  return errors;
}

export default function CreateBookingForm({
  onCreate,
}: CreateBookingFormProps) {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const deskRef = useRef<HTMLInputElement>(null);
  const floorRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setSuccessMessage("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;

    const found = validateBooking(values);
    setErrors(found);
    setSuccessMessage("");

    if (found.desk) {
      deskRef.current?.focus();
      return;
    }
    if (found.floor) {
      floorRef.current?.focus();
      return;
    }
    if (found.date) {
      dateRef.current?.focus();
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const desk = values.desk.trim();
    onCreate({
      desk,
      floor: values.floor.trim(),
      date: values.date,
      active: true,
    });

    setValues(EMPTY_VALUES);
    setIsLoading(false);
    setSuccessMessage(`Booking for ${desk} created.`);
    deskRef.current?.focus();
  };

  return (
    <form
      className="booking-form"
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isLoading}
    >
      <label htmlFor="desk">Desk</label>
      <input
        ref={deskRef}
        id="desk"
        name="desk"
        value={values.desk}
        onChange={handleChange}
        placeholder="Desk-05"
        className={errors.desk ? "input input--error" : "input"}
        aria-invalid={errors.desk ? true : undefined}
        aria-describedby={errors.desk ? "desk-error" : undefined}
      />
      {errors.desk && (
        <p id="desk-error" className="field-error" role="alert">
          {errors.desk}
        </p>
      )}

      <label htmlFor="floor">Floor</label>
      <input
        ref={floorRef}
        id="floor"
        name="floor"
        value={values.floor}
        onChange={handleChange}
        placeholder="Floor 2"
        className={errors.floor ? "input input--error" : "input"}
        aria-invalid={errors.floor ? true : undefined}
        aria-describedby={errors.floor ? "floor-error" : undefined}
      />
      {errors.floor && (
        <p id="floor-error" className="field-error" role="alert">
          {errors.floor}
        </p>
      )}

      <label htmlFor="date">Date</label>
      <input
        ref={dateRef}
        id="date"
        name="date"
        type="date"
        value={values.date}
        onChange={handleChange}
        className={errors.date ? "input input--error" : "input"}
        aria-invalid={errors.date ? true : undefined}
        aria-describedby={errors.date ? "date-error" : undefined}
      />
      {errors.date && (
        <p id="date-error" className="field-error" role="alert">
          {errors.date}
        </p>
      )}

      <p className="form-success" role="status">
        {successMessage}
      </p>

      <button type="submit" className="button" disabled={isLoading}>
        {isLoading ? "Creating booking…" : "Create booking"}
      </button>
    </form>
  );
}
