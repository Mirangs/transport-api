import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
      transportId,
    } = routeData;
    return this.routeService.create({
      departmentDate,
      destinationCity,
      originCity,
      distance,
      estimatedRevenue,
      routeStatus: { connect: { id: routeStatusId } },
      neededTransportType: { connect: { id: neededTransportTypeId } },
      transport: { connect: { id: transportId } },
    });
  }

  @Get()
  findAll() {
    const params = {};
    return this.routeService.findAll(params);
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
    } = routeData;
    return this.routeService.update({
      where: { id: Number(id) },
      data: {
        departmentDate,
        destinationCity,
        originCity,
        distance,
        estimatedRevenue,
        routeStatus: { connect: { id: routeStatusId } },
        neededTransportType: { connect: { id: neededTransportTypeId } },
        transport: { connect: { id: transportId } },
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routeService.remove({ id: Number(id) });
  }
}
