import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Booking } from 'src/bookings/entities/booking.entity';

@Entity({ name: 'flights' })
export class Flight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  origin: string;

  @Column()
  destination: string;

  @Column()
  airline: string;

  @Column()
  departureTime: string;

  @Column()
  arrivalTime: string;

  @Column()
  flightNumber: string;

  @Column()
  aircraftType: string;

  @Column()
  duration: number;

  @Column()
  date: Date;

  @Column()
  capacity: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column()
  status: string;

  @OneToMany(() => Booking, (booking) => booking.flight)
  bookings: Booking[];
}
