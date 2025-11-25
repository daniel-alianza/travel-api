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
export interface TravelRequestRepository {
  findAll(input?: PaginationInput): Promise<TravelRequest[]>;
  create(input: CreateTravelRequestInput): Promise<TravelRequest>;
}
