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

export interface TravelRequestRepository {
  findUserById(userId: number): Promise<UserLookupRecord | null>;
  findAreaById(areaId: number): Promise<AreaLookupRecord | null>;
  findFuelCardById(cardId: number): Promise<CardLookupRecord | null>;
  findFormDataByUserId(userId: number): Promise<TravelRequestFormUserRecord | null>;
  createTravelRequest(
    input: CreateTravelRequestRepositoryInput,
  ): Promise<CreatedTravelRequestRecord>;
}
