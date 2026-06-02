export type TravelRequestExpenseInput = {
  readonly transporte: number;
  readonly peajes: number;
  readonly hospedaje: number;
  readonly alimentos: number;
  readonly fletes: number;
  readonly herramientas: number;
  readonly envios: number;
  readonly miscelaneos: number;
};

export type TravelRequestGasolineInput = {
  readonly necesitaGasolina: boolean;
  readonly cardId: number | null;
  readonly placa: string | null;
  readonly kilometrajeActualKm: number | null;
  readonly montoSolicitado: number | null;
  readonly distanciaKm: number | null;
  readonly comentarios: string | null;
};

export type TravelRequestTagInput = {
  readonly necesitaTag: boolean;
  readonly montoSolicitado: number | null;
  readonly comentarios: string | null;
};

export type TravelRequestTripInput = {
  readonly ordenViaje: number;
  readonly destinoViaje: string;
  readonly motivoViaje: string;
  readonly fechaSalida: Date;
  readonly fechaRegreso: Date;
  readonly fechaDispersion: Date;
  readonly totalEstimado: number;
  readonly gastos: TravelRequestExpenseInput;
  readonly objetivos: readonly string[];
  readonly gasolina: TravelRequestGasolineInput;
  readonly tag: TravelRequestTagInput;
};

export type CreateTravelRequestRepositoryInput = {
  readonly userId: number;
  readonly companyId: number;
  readonly branchId: number;
  readonly areaId: number;
  readonly approverId: number | null;
  readonly employeeName: string;
  readonly corporateCardNumber: string | null;
  readonly trips: readonly TravelRequestTripInput[];
};

export type CreatedTravelRequestRecord = {
  readonly id: number;
  readonly status: string;
  readonly createdAt: Date;
};

export type UserLookupRecord = {
  readonly id: number;
  readonly name: string;
  readonly areaId: number;
  readonly managerId: number | null;
};

export type AreaLookupRecord = {
  readonly id: number;
  readonly name: string;
};

export type CardLookupRecord = {
  readonly id: number;
  readonly type: 'VIATIC' | 'FUEL';
  readonly isActive: boolean;
};

export type TravelRequestFormUserRecord = {
  readonly id: number;
  readonly name: string;
  readonly company: {
    readonly id: number;
    readonly name: string;
  };
  readonly branch: {
    readonly id: number;
    readonly name: string;
  };
  readonly area: {
    readonly id: number;
    readonly name: string;
  };
  readonly cards: readonly {
    readonly id: number;
    readonly cardNumber: string;
    readonly type: 'VIATIC' | 'FUEL';
    readonly isActive: boolean;
  }[];
};

export type ApprovalRequestRecord = {
  readonly id: number;
  readonly employeeName: string;
  readonly corporateCardNumber: string | null;
  readonly status: string;
  readonly approverComment: string | null;
  readonly createdAt: Date;
  readonly approvedAt: Date | null;
  readonly rejectedAt: Date | null;
  readonly user: {
    readonly email: string;
  };
  readonly company: {
    readonly name: string;
  };
  readonly area: {
    readonly name: string;
  };
  readonly approver: {
    readonly name: string;
  } | null;
  readonly dispersedBy: {
    readonly name: string;
  } | null;
  readonly trips: readonly {
    readonly id: number;
    readonly tripOrder: number;
    readonly tripApprovalStatus: string;
    readonly approverComment: string | null;
    readonly approvedBy: {
      readonly name: string;
    } | null;
    readonly destination: string;
    readonly purpose: string;
    readonly departureDate: Date;
    readonly returnDate: Date;
    readonly disbursementDate: Date;
    readonly estimatedTotal: number;
    readonly expenses: {
      readonly transport: number;
      readonly tolls: number;
      readonly lodging: number;
      readonly food: number;
      readonly freight: number;
      readonly tools: number;
      readonly shipping: number;
      readonly miscellaneous: number;
    } | null;
    readonly gasoline: {
      readonly requiresGasoline: boolean;
      readonly requestedAmount: number | null;
    } | null;
    readonly tag: {
      readonly requiresTag: boolean;
      readonly requestedAmount: number | null;
    } | null;
  }[];
};

export type ApprovalFilterCatalogRecord = {
  readonly areas: readonly { readonly id: number; readonly name: string }[];
  readonly companies: readonly { readonly id: number; readonly name: string }[];
};

export type RequestFormCatalogRecord = {
  readonly areas: readonly { readonly id: number; readonly name: string }[];
  readonly companies: readonly { readonly id: number; readonly name: string }[];
  readonly branches: readonly {
    readonly id: number;
    readonly name: string;
    readonly companyId: number | null;
  }[];
};

export type ResolveTravelRequestTripRepositoryInput = {
  readonly tripId: number;
  readonly resolution: 'approve' | 'reject';
  readonly comment: string | null;
  readonly actorUserId: number;
};

export type TripResolutionResult = 'ok' | 'not_found' | 'invalid_status';

export type ConfirmTravelRequestDispersionResult =
  | 'ok'
  | 'not_found'
  | 'invalid_status';

export type MyTravelRequestTripListRecord = {
  readonly id: number;
  readonly tripOrder: number;
  readonly destination: string;
  readonly tripApprovalStatus: string;
  readonly approverComment: string | null;
  readonly approvedAt: Date | null;
  readonly rejectedAt: Date | null;
};

export type MyTravelRequestListRecord = {
  readonly id: number;
  readonly status: string;
  readonly createdAt: Date;
  readonly trips: readonly MyTravelRequestTripListRecord[];
};

export type TravelRequestDetailTripRecord = {
  readonly id: number;
  readonly tripOrder: number;
  readonly tripApprovalStatus: string;
  readonly destination: string;
  readonly purpose: string;
  readonly departureDate: Date;
  readonly returnDate: Date;
  readonly disbursementDate: Date;
  readonly estimatedTotal: number;
  readonly objectives: readonly { readonly description: string }[];
  readonly expenses: {
    readonly transport: number;
    readonly tolls: number;
    readonly lodging: number;
    readonly food: number;
    readonly freight: number;
    readonly tools: number;
    readonly shipping: number;
    readonly miscellaneous: number;
  } | null;
  readonly gasoline: {
    readonly requiresGasoline: boolean;
    readonly cardId: number | null;
    readonly cardNumber: string | null;
    readonly plate: string | null;
    readonly currentMileageKm: number | null;
    readonly requestedAmount: number | null;
    readonly distanceKm: number | null;
    readonly comments: string | null;
  } | null;
  readonly tag: {
    readonly requiresTag: boolean;
    readonly requestedAmount: number | null;
    readonly comments: string | null;
  } | null;
};

export type TravelRequestDetailForUserRecord = {
  readonly id: number;
  readonly status: string;
  readonly employeeName: string;
  readonly corporateCardNumber: string | null;
  readonly company: { readonly id: number; readonly name: string };
  readonly branch: { readonly id: number; readonly name: string };
  readonly area: { readonly id: number; readonly name: string };
  readonly trips: readonly TravelRequestDetailTripRecord[];
};

export type CorrectRejectedTripRepositoryResult =
  | 'ok'
  | 'not_found'
  | 'forbidden'
  | 'invalid_status';

export interface TravelRequestRepository {
  findUserById(userId: number): Promise<UserLookupRecord | null>;
  findAreaById(areaId: number): Promise<AreaLookupRecord | null>;
  findFuelCardById(cardId: number): Promise<CardLookupRecord | null>;
  findFormDataByUserId(
    userId: number,
  ): Promise<TravelRequestFormUserRecord | null>;
  findApprovalRequests(): Promise<readonly ApprovalRequestRecord[]>;
  findDispersionPendingRequests(): Promise<readonly ApprovalRequestRecord[]>;
  findDispersedRequestsInDateRange(input: {
    readonly dispersedFrom: Date;
    readonly dispersedTo: Date;
  }): Promise<readonly ApprovalRequestRecord[]>;
  confirmTravelRequestDispersion(input: {
    readonly travelRequestId: number;
    readonly dispersedTotal: number;
    readonly dispersionComment: string | null;
    readonly dispersedByUserId: number;
  }): Promise<ConfirmTravelRequestDispersionResult>;
  findApprovalFilterCatalog(): Promise<ApprovalFilterCatalogRecord>;
  findRequestFormCatalog(): Promise<RequestFormCatalogRecord>;
  createTravelRequest(
    input: CreateTravelRequestRepositoryInput,
  ): Promise<CreatedTravelRequestRecord>;
  resolveTravelRequestTripResolution(
    input: ResolveTravelRequestTripRepositoryInput,
  ): Promise<TripResolutionResult>;
  findTravelRequestsByUserId(
    userId: number,
  ): Promise<readonly MyTravelRequestListRecord[]>;
  findTravelRequestDetailForUser(
    travelRequestId: number,
    userId: number,
  ): Promise<TravelRequestDetailForUserRecord | null>;
  findTravelRequestDetailByTripForUser(
    tripId: number,
    userId: number,
  ): Promise<TravelRequestDetailForUserRecord | null>;
  correctRejectedTrip(
    userId: number,
    tripId: number,
    trip: TravelRequestTripInput,
  ): Promise<CorrectRejectedTripRepositoryResult>;
}
