import type { Booking } from "@/types/booking";

export const initialBookings: Booking[] = [
  { id: "1", desk: "Desk-01", floor: "Floor 1", date: "2026-10-05", active: true },
  { id: "2", desk: "Desk-02", floor: "Floor 1", date: "2026-10-06", active: false },
  { id: "3", desk: "Desk-03", floor: "Floor 2", date: "2026-10-07", active: true },
];