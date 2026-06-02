import type { GasolineRequestStatusValue } from './gasoline-request.repository.interface';

export type GasolineReportFilters = {
  readonly companyId?: number;
  readonly startDate?: Date;
  readonly endDate?: Date;
  readonly status?: GasolineRequestStatusValue;
  readonly plate?: string;
};

export type GasolineReportRequestRow = {
  readonly id: number;
  readonly userId: number;
  readonly plate: string;
  readonly currentMileageKm: number;
  readonly requestedAmount: number;
  readonly distanceKm: number;
  readonly status: GasolineRequestStatusValue;
  readonly approvedAt: Date | null;
  readonly disbursedAt: Date | null;
  readonly createdAt: Date;
  readonly user: { readonly name: string; readonly email: string };
  readonly company: { readonly name: string };
  readonly card: { readonly cardNumber: string };
  readonly approver: {
    readonly name: string;
    readonly email: string;
  } | null;
  readonly disbursedBy: {
    readonly name: string;
    readonly email: string;
  } | null;
  readonly odometerPhotoCount: number;
};

export type GasolineReportHistoryRow = {
  readonly id: number;
  readonly plate: string;
  readonly currentMileageKm: number;
  readonly requestedAmount: number;
  readonly distanceKm: number;
  readonly createdAt: Date;
};

export interface GasolineReportRepository {
  findFilteredRequests(
    filters: GasolineReportFilters,
  ): Promise<readonly GasolineReportRequestRow[]>;
  findHistoryByPlates(
    plates: readonly string[],
  ): Promise<readonly GasolineReportHistoryRow[]>;
}
