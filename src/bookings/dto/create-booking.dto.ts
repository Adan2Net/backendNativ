export class CreateBookingDto {
  reservation_date: Date;
  status: string;
  paymentMethod: string;
  userId: number;
  flightId: number;
}
