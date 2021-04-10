-- CreateTable
CREATE TABLE "TransportType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TransportStatus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Transport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "licensePlate" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "transportTypeId" INTEGER,
    "purchaseDate" DATETIME NOT NULL,
    "mileage" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,
    FOREIGN KEY ("transportTypeId") REFERENCES "TransportType" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("statusId") REFERENCES "TransportStatus" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RouteStatus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Route" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "originCity" TEXT NOT NULL,
    "destinationCity" TEXT NOT NULL,
    "distance" REAL NOT NULL,
    "departmentDate" DATETIME NOT NULL,
    "neededTransportTypeId" INTEGER,
    "estimatedRevenue" REAL NOT NULL,
    "transportId" INTEGER,
    "routeStatusId" INTEGER NOT NULL,
    "fulfillmentDate" DATETIME,
    FOREIGN KEY ("neededTransportTypeId") REFERENCES "TransportType" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("transportId") REFERENCES "Transport" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("routeStatusId") REFERENCES "RouteStatus" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Transport.licensePlate_unique" ON "Transport"("licensePlate");

-- CreateIndex
CREATE UNIQUE INDEX "Route_transportId_unique" ON "Route"("transportId");
