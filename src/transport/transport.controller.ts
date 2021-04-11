import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateTransportDto } from './dto/create-transport.dto';
import { UpdateTransportDto } from './dto/update-transport.dto';
import { TransportService } from './transport.service';

@Controller('transport')
export class TransportController {
  constructor(private readonly transportService: TransportService) {}

  @Get('/statuses')
  getTransportStatuses() {
    return this.transportService.getTransportStatuses();
  }

  @Get('/types')
  getTransportTypes() {
    return this.transportService.getTransportTypes();
  }

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

  @Post('/busy/:id')
  makeTransportBusy(@Param('id') id: string) {
    return this.transportService.makeTransportBusy(Number(id));
  }

  @Get()
  findAll(
    @Query('skip') skip?,
    @Query('take') take?,
    @Query('orderBy') orderBy?,
    @Query('where') where?,
  ) {
    let parsedOrderBy;
    let parsedWhere;

    try {
      parsedOrderBy = JSON.parse(orderBy);
    } catch (err) {
      parsedOrderBy = {};
    }
    try {
      parsedWhere = JSON.parse(where);
    } catch (err) {
      parsedWhere = {};
    }
    return this.transportService.findAll({
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      orderBy: parsedOrderBy,
      where: parsedWhere,
    });
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
