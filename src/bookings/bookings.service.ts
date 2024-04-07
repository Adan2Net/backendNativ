import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { User } from 'src/users/entities/user.entity';
import { Flight } from 'src/flights/entities/flight.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const user = await this.userRepository.findOneOrFail({
      where: { id: createBookingDto.userId },
    });
    const flight = await this.flightRepository.findOneOrFail({
      where: { id: createBookingDto.flightId },
    });

    const newBooking = new Booking();
    newBooking.reservation_date = createBookingDto.reservation_date;
    newBooking.status = createBookingDto.status;
    newBooking.paymentMethod = createBookingDto.paymentMethod;
    newBooking.user = user;
    newBooking.flight = flight;

    return this.bookingRepository.save(newBooking);
  }

  async findAll(): Promise<Booking[]> {
    return await this.bookingRepository.find();
  }

  async findOne(id: number): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: ['user', 'flight'],
    });
    if (!booking) {
      throw new NotFoundException(`Booking with id ${id} not found`);
    }
    return booking;
  }

  async update(
    id: number,
    updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    const booking = await this.findOne(id);
    this.bookingRepository.merge(booking, updateBookingDto);
    return await this.bookingRepository.save(booking);
  }

  async remove(id: number): Promise<string> {
    const booking = await this.findOne(id);
    await this.bookingRepository.delete(booking);
    return `Booking with id ${id} deleted successfully`;
  }
}
