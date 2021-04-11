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
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { RouteService } from './route.service';

@Controller('route')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Post()
  create(
    @Body()
    routeData: CreateRouteDto,
  ) {
    const {
      departmentDate,
      destinationCity,
      originCity,
      distance,
      estimatedRevenue,
      routeStatusId,
      neededTransportTypeId,
      fulfillmentDate,
      transportId,
    } = routeData;
    return this.routeService.create({
      departmentDate,
      destinationCity,
      originCity,
      distance,
      estimatedRevenue,
      fulfillmentDate,
      routeStatus: { connect: { id: Number(routeStatusId) } },
      ...(neededTransportTypeId
        ? {
            neededTransportType: {
              connect: {
                id: Number(neededTransportTypeId),
              },
            },
          }
        : {}),
      ...(transportId
        ? {
            transport: {
              connect: { id: Number(transportId) },
            },
          }
        : {}),
    });
  }

  @Get('statuses')
  getRouteStatuses() {
    return this.routeService.getRouteStatuses();
  }

  @Get()
  findAll(
    @Query('skip') skip?,
    @Query('take') take?,
    @Query('orderBy') orderBy?,
  ) {
    let parsedOrderBy;
    try {
      parsedOrderBy = JSON.parse(orderBy);
    } catch (err) {
      parsedOrderBy = {};
    }

    return this.routeService.findAll({
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      orderBy: parsedOrderBy,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routeService.findOne({ id: Number(id) });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() routeData: UpdateRouteDto) {
    const {
      departmentDate,
      destinationCity,
      originCity,
      distance,
      estimatedRevenue,
      routeStatusId,
      neededTransportTypeId,
      transportId,
      fulfillmentDate,
    } = routeData;

    return this.routeService.update({
      where: { id: Number(id) },
      data: {
        departmentDate,
        destinationCity,
        originCity,
        distance,
        estimatedRevenue,
        fulfillmentDate,
        routeStatusId: Number(routeStatusId),
        neededTransportTypeId: neededTransportTypeId
          ? Number(neededTransportTypeId)
          : null,
        transportId: transportId ? Number(transportId) : null,
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routeService.remove({ id: Number(id) });
  }
}
