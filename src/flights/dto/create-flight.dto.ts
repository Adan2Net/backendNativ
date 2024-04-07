export class CreateFlightDto {
  origin: string;
  destination: string;
  airline: string;
  date: Date;
  departureTime: string;
  arrivalTime: string;
  flightNumber: string;
  aircraftType: string;
  duration: number;
  capacity: number;
  price: number;
  status: string;
}
