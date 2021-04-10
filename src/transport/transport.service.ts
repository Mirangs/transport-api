import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { Transport } from './entities/transport.entity';

@Injectable()
export class TransportService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TransportCreateInput): Promise<Transport> {
    return this.prisma.transport.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TransportWhereUniqueInput;
    where?: Prisma.TransportWhereInput;
    orderBy?: Prisma.TransportOrderByInput;
  }): Promise<Transport[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.transport.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        status: true,
        transportType: true,
      },
    });
  }

  async findOne(
    where: Prisma.TransportWhereUniqueInput,
  ): Promise<Transport | null> {
    return this.prisma.transport.findUnique({ where });
  }

  async update(params: {
    where: Prisma.TransportWhereUniqueInput;
    data: Prisma.TransportUpdateInput;
  }): Promise<Transport> {
    const { where, data } = params;
    return this.prisma.transport.update({
      where,
      data,
    });
  }

  async remove(where: Prisma.TransportWhereUniqueInput): Promise<Transport> {
    return this.prisma.transport.delete({ where });
  }

  async getTransportStatuses() {
    return this.prisma.transportStatus.findMany();
  }

  async getTransportTypes() {
    return this.prisma.transportType.findMany();
  }
}
