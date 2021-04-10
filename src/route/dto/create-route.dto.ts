export class CreateRouteDto {
  departmentDate: Date;
  destinationCity: string;
  originCity: string;
  distance: number;
  estimatedRevenue: number;
  routeStatusId: number;
  neededTransportTypeId?: number;
  transportId?: number;
}
