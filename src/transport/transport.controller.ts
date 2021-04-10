import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateTransportDto } from './dto/create-transport.dto';
import { UpdateTransportDto } from './dto/update-transport.dto';
import { TransportService } from './transport.service';

@Controller('transport')
export class TransportController {
  constructor(private readonly transportService: TransportService) {}

  @Post()
  create(
    @Body()
    transportData: CreateTransportDto,
  ) {
    const {
      licensePlate,
      mileage,
      transportTypeId,
      model,
      purchaseDate,
      statusId,
    } = transportData;
    return this.transportService.create({
      licensePlate,
      mileage,
      transportType: {
        connect: { id: transportTypeId },
      },
      model,
      purchaseDate,
      status: {
        connect: {
          id: statusId,
        },
      },
    });
  }

  @Get()
  findAll() {
    const params = {};
    return this.transportService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transportService.findOne({ id: Number(id) });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() transportData: UpdateTransportDto) {
    return this.transportService.update({
      where: { id: Number(id) },
      data: transportData,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transportService.remove({ id: Number(id) });
  }
}
