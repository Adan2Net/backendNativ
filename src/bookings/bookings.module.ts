import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { Booking } from './entities/booking.entity';
import { User } from 'src/users/entities/user.entity';
import { Flight } from 'src/flights/entities/flight.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, User, Flight])],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
