import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BookingsModule } from './bookings/bookings.module';
import { FlightsModule } from './flights/flights.module';

@Module({
  imports: [UsersModule, BookingsModule, FlightsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
