export type GasolineRequestStatusValue =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'dispersed';

export type GasolineRequestCardRecord = {
  readonly id: number;
  readonly cardNumberMasked: string;
  readonly fuelName: string | null;
  readonly fuelCardKind: string | null;
};

export type GasolineRequestSummaryRecord = {
  readonly id: number;
  readonly userId: number;
  readonly companyId: number;
  readonly branchId: number | null;
  readonly areaId: number | null;
  readonly plate: string;
  readonly currentMileageKm: number;
  readonly requestedAmount: number;
  readonly distanceKm: number;
  readonly routeToTake: string;
  readonly applicantComments: string | null;
  readonly status: GasolineRequestStatusValue;
  readonly approverId: number | null;
  readonly approverComment: string | null;
  readonly approvedAt: Date | null;
  readonly disbursedById: number | null;
  readonly disbursedComment: string | null;
  readonly disbursedAt: Date | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly user: { readonly id: number; readonly name: string };
  readonly company: { readonly id: number; readonly name: string };
  readonly branch: { readonly id: number; readonly name: string } | null;
  readonly area: { readonly id: number; readonly name: string } | null;
  readonly card: GasolineRequestCardRecord;
  readonly approver: { readonly id: number; readonly name: string } | null;
  readonly disbursedBy: { readonly id: number; readonly name: string } | null;
};

export type GasolineRequestDetailRecord = GasolineRequestSummaryRecord & {
  readonly odometerPhotos: readonly {
    readonly id: number;
    readonly photoBase64: string;
  }[];
};

export type CreateGasolineRequestRepositoryInput = {
  readonly userId: number;
  readonly companyId: number;
  readonly branchId: number | null;
  readonly areaId: number | null;
  readonly cardId: number;
  readonly plate: string;
  readonly currentMileageKm: number;
  readonly requestedAmount: number;
  readonly distanceKm: number;
  readonly routeToTake: string;
  readonly applicantComments: string | null;
  readonly odometerPhoto: Buffer;
};

export interface GasolineRequestRepository {
  create(
    input: CreateGasolineRequestRepositoryInput,
  ): Promise<GasolineRequestSummaryRecord>;
  findById(requestId: number): Promise<GasolineRequestDetailRecord | null>;
  findPending(
    companyId: number | undefined,
    applicantUserIds: readonly number[] | undefined,
  ): Promise<readonly GasolineRequestSummaryRecord[]>;
  findApproved(
    companyId: number | undefined,
  ): Promise<readonly GasolineRequestSummaryRecord[]>;
  findHistoryByUser(
    userId: number,
  ): Promise<readonly GasolineRequestSummaryRecord[]>;
  findForDisbursement(requestId: number): Promise<{
    readonly id: number;
    readonly status: GasolineRequestStatusValue;
    readonly companyId: number;
    readonly companyName: string;
    readonly requestedAmount: number;
    readonly plate: string;
    readonly areaName: string | null;
    readonly branchName: string | null;
    readonly approverEmail: string | null;
    readonly approverName: string | null;
    readonly cardNumber: string;
    readonly fuelCardKind: string | null;
  } | null>;
  approve(input: {
    readonly requestId: number;
    readonly approverId: number;
    readonly comment: string | null;
  }): Promise<GasolineRequestSummaryRecord | null>;
  reject(input: {
    readonly requestId: number;
    readonly approverId: number;
    readonly comment: string | null;
  }): Promise<GasolineRequestSummaryRecord | null>;
  cancelApproved(input: {
    readonly requestId: number;
    readonly cancelledById: number;
    readonly comment: string;
  }): Promise<GasolineRequestSummaryRecord | null>;
  markDisbursed(input: {
    readonly requestId: number;
    readonly disbursedById: number;
    readonly comment: string | null;
  }): Promise<GasolineRequestSummaryRecord | null>;
  findSubordinateUserIds(managerId: number): Promise<readonly number[]>;
  findUserApprovalContext(userId: number): Promise<{
    readonly id: number;
    readonly email: string;
    readonly managerId: number | null;
  } | null>;
  findApprover(userId: number): Promise<{
    readonly id: number;
    readonly email: string;
    readonly name: string;
  } | null>;
}
