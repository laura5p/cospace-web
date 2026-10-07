export interface Booking {
  id: string;
  desk: string;
  floor: string;
  date: string;
  active: boolean;
}

export type NewBooking = Omit<Booking, "id">;