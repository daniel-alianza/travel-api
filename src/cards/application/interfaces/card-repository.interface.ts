export type CardAssignmentUserRecord = {
  readonly id: number;
  readonly nombreCompleto: string;
  readonly correo: string;
  readonly compania: string;
  readonly area: string;
  readonly tarjetaViaticosEnmascarada: string | null;
  readonly tarjetaGasolinaEnmascarada: string | null;
};

export type CardAssignmentUsersQuery = {
  readonly page: number;
  readonly pageSize: number;
  readonly search: string;
  readonly compania: string;
  readonly area: string;
};

export type CardAssignmentUsersListRecord = {
  readonly items: readonly CardAssignmentUserRecord[];
  readonly total: number;
  readonly page: number;
  readonly pageSize: number;
  readonly totalPages: number;
};

export type AssignCardToUserInput = {
  readonly userId: number;
  readonly actorUserId?: number;
  readonly cardNumber: string;
  readonly companyName: string;
  readonly cardType: 'VIATIC' | 'FUEL';
  readonly fuelName?: string;
  readonly fuelCardKind?: 'physical' | 'virtual';
  readonly fuelAssignmentType?: 'NotAcumulative' | 'Acumulable';
  readonly fuelGroup?: string;
  readonly fuelStatus?: 'active' | 'inactive' | 'blocked' | 'cancelled';
};

export type AssignCardToUserResult =
  | 'ok'
  | 'user_not_found'
  | 'company_not_found'
  | 'gasoline_supplier_not_found'
  | 'card_in_use';

export type DeactivateUserCardInput = {
  readonly userId: number;
  readonly actorUserId?: number;
  readonly cardType: 'VIATIC' | 'FUEL';
};

export type DeactivateUserCardResult = 'ok' | 'user_not_found';

export interface CardRepository {
  findCardAssignmentUsers(
    query: CardAssignmentUsersQuery,
  ): Promise<CardAssignmentUsersListRecord>;
  findCardAssignmentFilterCatalog(): Promise<{
    readonly companies: readonly { readonly name: string }[];
    readonly areas: readonly { readonly name: string }[];
  }>;
  assignCardToUser(
    input: AssignCardToUserInput,
  ): Promise<AssignCardToUserResult>;
  deactivateUserCard(
    input: DeactivateUserCardInput,
  ): Promise<DeactivateUserCardResult>;
  findCardAssignmentUserById(
    userId: number,
  ): Promise<CardAssignmentUserRecord | null>;
}
