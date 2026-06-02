import { maskCardNumber } from '../../common/security/mask-card-number';
import type {
  GasolineRequestDetailRecord,
  GasolineRequestSummaryRecord,
} from '../application/interfaces/gasoline-request.repository.interface';

type GasolineRequestDbRecord = {
  readonly id: number;
  readonly userId: number;
  readonly companyId: number;
  readonly branchId: number | null;
  readonly areaId: number | null;
  readonly plate: string;
  readonly currentMileageKm: { toNumber(): number } | number;
  readonly requestedAmount: { toNumber(): number } | number;
  readonly distanceKm: { toNumber(): number } | number;
  readonly routeToTake: string;
  readonly applicantComments: string | null;
  readonly status: 'pending' | 'approved' | 'rejected' | 'dispersed';
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
  readonly card: {
    readonly id: number;
    readonly cardNumber: string;
    readonly fuelName: string | null;
    readonly fuelCardKind: string | null;
  };
  readonly approver: { readonly id: number; readonly name: string } | null;
  readonly disbursedBy: { readonly id: number; readonly name: string } | null;
};

function decimalToNumber(
  value: { toNumber(): number } | number,
): number {
  return typeof value === 'number' ? value : value.toNumber();
}

export function mapGasolineRequestSummary(
  record: GasolineRequestDbRecord,
): GasolineRequestSummaryRecord {
  return {
    id: record.id,
    userId: record.userId,
    companyId: record.companyId,
    branchId: record.branchId,
    areaId: record.areaId,
    plate: record.plate,
    currentMileageKm: decimalToNumber(record.currentMileageKm),
    requestedAmount: decimalToNumber(record.requestedAmount),
    distanceKm: decimalToNumber(record.distanceKm),
    routeToTake: record.routeToTake,
    applicantComments: record.applicantComments,
    status: record.status,
    approverId: record.approverId,
    approverComment: record.approverComment,
    approvedAt: record.approvedAt,
    disbursedById: record.disbursedById,
    disbursedComment: record.disbursedComment,
    disbursedAt: record.disbursedAt,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    user: record.user,
    company: record.company,
    branch: record.branch,
    area: record.area,
    card: {
      id: record.card.id,
      cardNumberMasked: maskCardNumber(record.card.cardNumber),
      fuelName: record.card.fuelName,
      fuelCardKind: record.card.fuelCardKind,
    },
    approver: record.approver,
    disbursedBy: record.disbursedBy,
  };
}

type OdometerPhotoDbRecord = {
  readonly id: number;
  readonly photo: Buffer | Uint8Array;
};

export function mapGasolineRequestDetail(
  record: GasolineRequestDbRecord & {
    readonly odometerPhotos: readonly OdometerPhotoDbRecord[];
  },
): GasolineRequestDetailRecord {
  return {
    ...mapGasolineRequestSummary(record),
    odometerPhotos: record.odometerPhotos.map((photo) => ({
      id: photo.id,
      photoBase64: Buffer.from(photo.photo).toString('base64'),
    })),
  };
}

export const gasolineRequestInclude = {
  user: { select: { id: true, name: true } },
  company: { select: { id: true, name: true } },
  branch: { select: { id: true, name: true } },
  area: { select: { id: true, name: true } },
  card: {
    select: {
      id: true,
      cardNumber: true,
      fuelName: true,
      fuelCardKind: true,
    },
  },
  approver: { select: { id: true, name: true } },
  disbursedBy: { select: { id: true, name: true } },
} as const;
