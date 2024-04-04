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
import { FlightsService } from './flights.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
@Controller('/api/v1/flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Post()
  async create(@Body() createFlightDto: CreateFlightDto) {
    return this.flightsService.create(createFlightDto);
  }

  @Get()
  async findAll() {
    return this.flightsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const flight = await this.flightsService.findOne(+id);
      return flight;
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
    @Body() updateFlightDto: UpdateFlightDto,
  ) {
    try {
      return await this.flightsService.update(+id, updateFlightDto);
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
      return await this.flightsService.remove(+id);
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
