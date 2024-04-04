import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('/api/v1/bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  @Get()
  async findAll() {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const booking = await this.bookingsService.findOne(+id);
      return booking;
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          statusCode: error.getStatus(),
          message: error.message,
        };
      }
      throw error;
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    try {
      return await this.bookingsService.update(+id, updateBookingDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          statusCode: error.getStatus(),
          message: error.message,
        };
      }
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.bookingsService.remove(+id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          statusCode: error.getStatus(),
          message: error.message,
        };
      }
      throw error;
    }
  }
}
