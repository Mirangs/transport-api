import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { Route } from './entities/route.entity';

@Injectable()
export class RouteService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.RouteCreateInput): Promise<Route> {
    return this.prisma.route.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RouteWhereUniqueInput;
    where?: Prisma.RouteWhereInput;
    orderBy?: Prisma.RouteOrderByInput;
  }): Promise<Route[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.route.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        routeStatus: true,
        neededTransportType: true,
        transport: true,
      },
    });
  }

  async findOne(where: Prisma.RouteWhereUniqueInput): Promise<Route | null> {
    return this.prisma.route.findUnique({ where });
  }

  async update(params: {
    where: Prisma.RouteWhereUniqueInput;
    data: Prisma.RouteUpdateInput;
  }): Promise<Route> {
    const { where, data } = params;
    return this.prisma.route.update({
      where,
      data,
    });
  }

  async remove(where: Prisma.RouteWhereUniqueInput): Promise<Route> {
    return this.prisma.route.delete({ where });
  }

  async getRouteStatuses() {
    return this.prisma.routeStatus.findMany();
  }
}
