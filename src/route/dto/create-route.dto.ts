export class CreateRouteDto {
  departmentDate: Date;
  destinationCity: string;
  originCity: string;
  distance: number;
  estimatedRevenue: number;
  routeStatusId: string;
  neededTransportTypeId?: string;
  transportId?: string;
  fulfillmentDate?: Date;
}
