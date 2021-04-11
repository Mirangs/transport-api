import { PrismaClient } from '@prisma/client';
import { initTransportTypes } from './data/transportTypes.json';
import { initTransportStatuses } from './data/transportStatuses.json';
import { initTransports } from './data/transports.json';
import { initRouteStatuses } from './data/routeStatuses.json';
import { initRoutes } from './data/routes.json';

const prisma = new PrismaClient();
const main = async () => {
  await prisma.transport.deleteMany();
  await prisma.transportType.deleteMany();
  await prisma.transportStatus.deleteMany();
  await prisma.route.deleteMany();
  await prisma.routeStatus.deleteMany();

  const transportTypesPromises = initTransportTypes.map(
    async (transportTypeName) => {
      await prisma.transportType.create({ data: { name: transportTypeName } });
    },
  );

  const transportStatusesPromises = initTransportStatuses.map(
    async (transportStatusName) => {
      await prisma.transportStatus.create({
        data: { name: transportStatusName },
      });
    },
  );
  const routeStatusesPromises = initRouteStatuses.map(
    async (routeStatusName) => {
      await prisma.routeStatus.create({
        data: { name: routeStatusName },
      });
    },
  );

  await Promise.all([
    ...transportTypesPromises,
    ...transportStatusesPromises,
    ...routeStatusesPromises,
  ]);
  console.log('Successfully initialized statuses');

  const freeStatus = await prisma.transportStatus.findFirst({
    where: { name: 'Free' },
  });
  const transportTypes = await prisma.transportType.findMany({
    where: {
      name: { in: initTransports.map(({ transportType }) => transportType) },
    },
  });
  await Promise.all(
    initTransports.map(
      async ({ licensePlate, model, transportType, mileage }) => {
        await prisma.transport.create({
          data: {
            licensePlate,
            model,
            transportType: {
              connect: {
                id: transportTypes.find(({ name }) => name === transportType)
                  .id,
              },
            },
            mileage,
            status: { connect: { id: freeStatus.id } },
            purchaseDate: new Date(),
          },
        });
      },
    ),
  );
  console.log('Successfully initialized transports');

  const idleRouteStatus = await prisma.routeStatus.findFirst({
    where: { name: 'Idle' },
  });
  await Promise.all(
    initRoutes.map(
      async ({ originCity, destinationCity, distance, estimatedRevenue }) => {
        await prisma.route.create({
          data: {
            originCity,
            destinationCity,
            distance,
            estimatedRevenue,
            departmentDate: new Date(),
            routeStatus: { connect: { id: idleRouteStatus.id } },
          },
        });
      },
    ),
  );
  console.log('Successfully initialized routes');
};

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
