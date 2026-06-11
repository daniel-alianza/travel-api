export type DispersedTripForCheckRecord = {
  readonly id: number;
  readonly tripOrder: number;
  readonly destination: string;
  readonly purpose: string;
  readonly tripApprovalStatus: string;
  readonly departureDate: Date;
  readonly returnDate: Date;
  readonly disbursementDate: Date;
  readonly estimatedTotal: number;
  readonly expenses: ExpenseTripExpenseAmountsRecord | null;
};

export type DispersedTravelRequestForCheckRecord = {
  readonly id: number;
  readonly status: string;
  readonly employeeName: string;
  readonly corporateCardNumber: string | null;
  readonly dispersedAt: Date | null;
  readonly dispersedTotal: number | null;
  readonly userId: number;
  readonly user: {
    readonly id: number;
    readonly name: string;
    readonly email: string;
  };
  readonly company: { readonly id: number; readonly name: string };
  readonly branch: { readonly id: number; readonly name: string };
  readonly area: { readonly id: number; readonly name: string };
  readonly trips: readonly DispersedTripForCheckRecord[];
  /** Compañía cuyos catálogos (ViaticCategory / VAT) y moneda SAP aplican a la tarjeta corporativa. */
  readonly expenseCatalogCompanyId: number;
};

export type ExpenseTripExpenseAmountsRecord = {
  readonly transport: number;
  readonly tolls: number;
  readonly lodging: number;
  readonly food: number;
  readonly freight: number;
  readonly tools: number;
  readonly shipping: number;
  readonly miscellaneous: number;
};

export type DispersedExpenseTripListRecord = {
  readonly id: number;
  readonly tripOrder: number;
  readonly destination: string;
  readonly purpose: string;
  readonly departureDate: Date;
  readonly returnDate: Date;
  readonly disbursementDate: Date;
  readonly estimatedTotal: number;
  readonly approvedAt: Date | null;
  readonly travelRequest: {
    readonly id: number;
    readonly corporateCardNumber: string | null;
    readonly dispersedAt: Date | null;
    readonly approvedAt: Date | null;
    readonly employeeName: string;
    readonly user: { readonly email: string };
    readonly company: { readonly name: string };
    readonly hasVerifiedReconciliation: boolean;
  };
  readonly expenses: ExpenseTripExpenseAmountsRecord | null;
};

export type DispersedExpenseTripMovementsSourceRecord = {
  readonly id: number;
  readonly destination: string;
  readonly disbursementDate: Date;
  readonly travelRequest: {
    readonly corporateCardNumber: string | null;
  };
  readonly expenses: ExpenseTripExpenseAmountsRecord | null;
};

export type ExpenseTripMovementContextRecord = {
  readonly tripId: number;
  readonly destination: string;
  readonly departureDate: Date;
  readonly returnDate: Date;
  readonly companyId: number;
  readonly corporateCardNumber: string | null;
  readonly accountCodes: readonly string[];
};

export type ReconciliationTripOwnershipRecord = {
  readonly tripId: number;
  readonly travelRequestId: number;
  readonly companyName: string;
  readonly employeeName: string;
};

export type TravelRequestReconciliationRecord = {
  readonly id: number;
  readonly travelRequestId: number;
  readonly requestedByUserId: number;
  readonly status: 'pending' | 'rejected' | 'approved' | 'verified';
  readonly verificationCodeHash: string;
  readonly codeExpiresAt: Date;
  readonly decidedByUserId: number | null;
  readonly decidedAt: Date | null;
  readonly rejectionReason: string | null;
  readonly codeVerifiedAt: Date | null;
  readonly createdAt: Date;
};

export type PendingTravelRequestReconciliationRecord = {
  readonly id: number;
  readonly travelRequestId: number;
  readonly status: 'pending' | 'rejected' | 'approved' | 'verified';
  readonly verificationCode: string;
  readonly codeExpiresAt: Date;
  readonly createdAt: Date;
  readonly employeeName: string;
  readonly companyName: string;
  readonly requestedBy: {
    readonly id: number;
    readonly name: string;
    readonly email: string;
  };
};

export type TripMovementProofStatusRecord =
  | 'submitted'
  | 'approved'
  | 'rejected';

export type TripMovementProofCfdiXmlFileRoleRecord =
  | 'invoice_xml'
  | 'invoice_xml_outbound'
  | 'invoice_xml_return';

export type TripMovementProofInvoiceCfdiRecordInput = {
  readonly tripFileId: number;
  readonly cfdiUuid: string;
  readonly fechaEmision: Date;
  readonly xmlFileRole: TripMovementProofCfdiXmlFileRoleRecord;
};

export type TripMovementProofInvoiceCfdiPersistInput = {
  readonly cfdiPdfCrosscheckPassed: boolean;
  readonly cfdiPdfCrosscheckAt: Date;
  readonly cfdiRecords: readonly TripMovementProofInvoiceCfdiRecordInput[];
};

export type TripFileForProofValidationRecord = {
  readonly id: number;
  readonly fileUrl: string;
  readonly fileRole:
    | 'ticket'
    | 'invoice_xml'
    | 'invoice_pdf'
    | 'invoice_xml_outbound'
    | 'invoice_pdf_outbound'
    | 'invoice_xml_return'
    | 'invoice_pdf_return'
    | null;
};

export type TripMovementProofRecord = {
  readonly id: number;
  readonly tripId: number;
  readonly movementSequence: number;
  readonly movementDate?: Date;
  readonly movementAmount: number;
  readonly movementMemo?: string | null;
  readonly comment?: string | null;
  readonly status: TripMovementProofStatusRecord;
  readonly proofType: 'ticket' | 'invoice';
};

export type TripMovementProofAccountingSnapshot = {
  readonly id: number;
  readonly tripId: number;
  readonly movementSequence: number;
  readonly status: TripMovementProofStatusRecord;
  readonly proofType: 'ticket' | 'invoice';
  readonly companyId: number;
  readonly corporateCardNumber: string | null;
  readonly movementMemo: string | null;
  readonly proofComment: string | null;
};

export interface TravelChecksRepository {
  resolveExpenseCatalogCompanyId(
    corporateCardNumber: string | null,
    travelRequestCompanyId: number,
  ): Promise<number>;
  findDispersedTravelRequestsWithDispersedTrips(): Promise<
    readonly DispersedTravelRequestForCheckRecord[]
  >;
  listViaticDistributionRules(): Promise<
    readonly {
      id: number;
      code: string;
      name: string;
      companyName: string;
    }[]
  >;
  findDispersedExpenseTripsForUser(
    userId: number,
  ): Promise<readonly DispersedExpenseTripListRecord[]>;
  findDispersedExpenseTripMovementsSource(
    tripId: number,
    userId: number,
  ): Promise<DispersedExpenseTripMovementsSourceRecord | null>;
  findExpenseTripMovementContext(
    tripId: number,
    userId: number,
  ): Promise<ExpenseTripMovementContextRecord | null>;
  findReconciliationTripOwnership(
    tripId: number,
    userId: number,
  ): Promise<ReconciliationTripOwnershipRecord | null>;
  countTripFilesForUser(tripId: number, userId: number): Promise<number>;
  countReconciliationAttempts(
    travelRequestId: number,
    requestedByUserId: number,
  ): Promise<number>;
  createTravelRequestReconciliation(input: {
    travelRequestId: number;
    requestedByUserId: number;
    verificationCodeHash: string;
    codeExpiresAt: Date;
  }): Promise<TravelRequestReconciliationRecord>;
  findLatestTravelRequestReconciliation(
    travelRequestId: number,
    requestedByUserId: number,
  ): Promise<TravelRequestReconciliationRecord | null>;
  markTravelRequestReconciliationVerified(
    reconciliationId: number,
  ): Promise<void>;
  listPendingTravelRequestReconciliations(): Promise<
    readonly PendingTravelRequestReconciliationRecord[]
  >;
  decideTravelRequestReconciliation(input: {
    reconciliationId: number;
    decidedByUserId: number;
    approve: boolean;
    rejectionReason: string | null;
  }): Promise<TravelRequestReconciliationRecord | null>;
  findTripMovementProofAccountingSnapshot(
    proofId: number,
  ): Promise<TripMovementProofAccountingSnapshot | null>;
  markTripMovementProofApprovedIfSubmitted(proofId: number): Promise<boolean>;
  listTripMovementProofsByTripId(
    tripId: number,
  ): Promise<readonly TripMovementProofRecord[]>;
  listVatByCompanyId(companyId: number): Promise<
    readonly {
      id: number;
      code: string;
      name: string;
    }[]
  >;
  listViaticCategoriesByCompanyId(companyId: number): Promise<
    readonly {
      id: number;
      code: string;
      name: string;
    }[]
  >;
  findTripMovementProofXmlFile(input: {
    tripId: number;
    movementSequence: number;
  }): Promise<{
    filePath: string;
    fileName: string | null;
  } | null>;
  findTripMovementProofPdfFile(input: {
    tripId: number;
    movementSequence: number;
  }): Promise<{
    filePath: string;
    fileName: string | null;
  } | null>;
  areTripFilesOwnedByUser(input: {
    tripId: number;
    userId: number;
    fileIds: readonly number[];
  }): Promise<boolean>;
  findTripFilesForProofByIds(input: {
    tripId: number;
    userId: number;
    fileIds: readonly number[];
  }): Promise<readonly TripFileForProofValidationRecord[]>;
  findTripMovementProofIdByTripAndSequence(input: {
    tripId: number;
    movementSequence: number;
  }): Promise<number | null>;
  hasTripMovementProofCfdiUuidConflict(input: {
    cfdiUuid: string;
    excludeTripMovementProofId: number | null;
  }): Promise<boolean>;
  createTripMovementProof(input: {
    tripId: number;
    movementSequence: number;
    movementDate: Date;
    movementAmount: number;
    movementMemo: string;
    proofType: 'ticket' | 'invoice';
    createdByUserId: number;
    comment: string | null;
    files: readonly {
      tripFileId: number;
      fileRole:
        | 'ticket'
        | 'invoice_xml'
        | 'invoice_pdf'
        | 'invoice_xml_outbound'
        | 'invoice_pdf_outbound'
        | 'invoice_xml_return'
        | 'invoice_pdf_return';
    }[];
    invoiceCfdi: TripMovementProofInvoiceCfdiPersistInput | null;
  }): Promise<TripMovementProofRecord>;
  resolveAccountingIndicatorsScope(input: {
    readonly userId: number;
    readonly consolidated: boolean;
  }): Promise<{
    readonly companies: readonly {
      readonly id: number;
      readonly name: string;
    }[];
  }>;
  getAccountingMonthIndicatorsByCompanies(input: {
    readonly companyIds: readonly number[];
    readonly rangeStart: Date;
    readonly rangeEnd: Date;
  }): Promise<
    readonly {
      readonly companyId: number;
      readonly totalDispersadoMes: number;
      readonly totalComprobadoMes: number;
      readonly pendienteAutorizarContable: number;
      readonly solicitudesAbiertas: number;
    }[]
  >;
  findAccountingExpensesReconciliation(input: {
    readonly companyIds: readonly number[];
    readonly rangeStart: Date;
    readonly rangeEnd: Date;
    readonly timeZone: string;
  }): Promise<AccountingExpensesReconciliationDataRecord>;
}

export type AccountingExpensesReconciliationComprobacionDiaRecord = {
  readonly fechaIso: string;
  readonly monto: number;
};

export type AccountingExpensesReconciliationSolicitudRecord = {
  readonly travelRequestId: number;
  readonly dispersedAt: Date;
  readonly dispersedTotal: number;
  readonly userId: number;
  readonly employeeName: string;
  readonly employeeEmail: string;
  readonly companyId: number;
  readonly companyName: string;
  readonly totalComprobado: number;
  readonly pendienteAutorizarContable: number;
  readonly movimientosComprobados: number;
  readonly movimientosPendientes: number;
  readonly ultimaComprobacionAt: Date | null;
  readonly comprobacionesPorDia: readonly AccountingExpensesReconciliationComprobacionDiaRecord[];
};

export type AccountingExpensesReconciliationUserRecord = {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly companyId: number;
};

export type AccountingExpensesReconciliationDataRecord = {
  readonly solicitudes: readonly AccountingExpensesReconciliationSolicitudRecord[];
  readonly users: readonly AccountingExpensesReconciliationUserRecord[];
};
