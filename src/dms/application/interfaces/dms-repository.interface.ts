export type DmsTripFileRecord = {
  readonly id: number;
  readonly tripId: number;
  readonly fileType: string;
  readonly filePath: string;
  readonly fileName: string | null;
  readonly mimeType: string | null;
  readonly createdAt: Date;
};

export type DmsTripOwnershipRecord = {
  readonly tripId: number;
  readonly travelRequestId: number;
};

export interface DmsRepository {
  existsTripForUser(tripId: number, userId: number): Promise<boolean>;
  findTripOwnershipForUser(
    tripId: number,
    userId: number,
  ): Promise<DmsTripOwnershipRecord | null>;
  createTripFile(input: {
    tripId: number;
    fileType: string;
    filePath: string;
    fileName: string;
    mimeType: string;
  }): Promise<DmsTripFileRecord>;
  findDuplicateTripFile(input: {
    tripId: number;
    fileName: string;
    mimeType: string;
    createdAfter: Date;
  }): Promise<DmsTripFileRecord | null>;
  listTripFilesForUser(
    tripId: number,
    userId: number,
  ): Promise<readonly DmsTripFileRecord[]>;
  findTripFileForUser(fileId: number, userId: number): Promise<DmsTripFileRecord | null>;
}
