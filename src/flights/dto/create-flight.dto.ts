export class CreateFlightDto {
  origin: string;
  destination: string;
  airline: string;
  date: Date;
  capacity: number;
  price: number;
}
