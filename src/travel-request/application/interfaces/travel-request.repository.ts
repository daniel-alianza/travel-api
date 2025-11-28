import { PaginationInput } from './pagination.input';

export interface TravelDetail {
  id: number;
  travelRequestId: number;
  concept: string;
  amount: number;
}

export interface CreateTravelDetailInput {
  concept: string;
  amount: number;
}

export interface TravelRequest {
  id: number;
  userId: number;
  statusId: number;
  cardId: number;
  totalAmount: number;
  travelReason: string;
  travelObjectives: string;
  departureDate: Date;
  returnDate: Date;
  disbursementDate: Date | null;
  approvalDate: Date | null;
  approverId: number | null;
  disburserId: number | null;
  comment: string | null;
  user: {
    id: number;
    name: string;
    paternalSurname: string;
    maternalSurname: string;
    email: string;
  };
  status: {
    id: number;
    name: string;
  };
  approver: {
    id: number;
    name: string;
    email: string;
  } | null;
  disburser: {
    id: number;
    name: string;
    email: string;
  } | null;
  card: {
    id: number;
    cardNumber: string;
  };
  details: TravelDetail[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTravelRequestInput {
  userId: number;
  statusId: number;
  cardId: number;
  totalAmount: number;
  travelReason: string;
  travelObjectives: string;
  departureDate: Date;
  returnDate: Date;
  details: CreateTravelDetailInput[];
}

export interface UpdateTravelRequestStatusInput {
  statusId: number;
  approverId: number;
  comment?: string | null;
}

export interface TravelRequestRepository {
  findAll(input: PaginationInput): Promise<TravelRequest[]>;
  count(input: PaginationInput): Promise<number>;
  create(input: CreateTravelRequestInput): Promise<TravelRequest>;
  findById(id: number): Promise<TravelRequest | null>;
  updateStatus(
    id: number,
    input: UpdateTravelRequestStatusInput,
  ): Promise<TravelRequest>;
  getDisbursements(input?: PaginationInput): Promise<TravelRequest[]>;
}
