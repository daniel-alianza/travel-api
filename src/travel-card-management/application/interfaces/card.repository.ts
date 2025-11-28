import { Card } from '../../domain/entities/card.entity';
import { CardAssignment } from '../../domain/entities/card-assignment.entity';
import { PaginationInput } from './pagination.input';

export type { Card, CardAssignment };

export interface CreateCardInput {
  cardNumber: string;
  companyId: number;
}

export interface UpdateCardInput {
  cardNumber?: string;
  isActive?: boolean;
}

export interface AssignCardInput {
  cardId: number;
  userId: number;
}

export interface CardRepository {
  findAll(input?: PaginationInput): Promise<Card[]>;
  findById(id: number): Promise<Card | null>;
  findByCardNumber(cardNumber: string): Promise<Card | null>;
  findByCompanyId(companyId: number, input?: PaginationInput): Promise<Card[]>;
  create(input: CreateCardInput): Promise<Card>;
  update(id: number, input: UpdateCardInput): Promise<Card>;
  existsByCardNumber(cardNumber: string, excludeId?: number): Promise<boolean>;
  assignCard(input: AssignCardInput): Promise<CardAssignment>;
  unassignCard(cardId: number, userId: number): Promise<void>;
  getActiveAssignmentByCardId(cardId: number): Promise<CardAssignment | null>;
  getActiveAssignmentByUserId(userId: number): Promise<CardAssignment | null>;
  countActiveAssignmentsByUserId(userId: number): Promise<number>;
  getAssignmentsByCardId(
    cardId: number,
    input?: PaginationInput,
  ): Promise<CardAssignment[]>;
  getAssignmentsByUserId(
    userId: number,
    input?: PaginationInput,
  ): Promise<CardAssignment[]>;
  getAssignmentsByUserIds(
    userIds: number[],
    input?: PaginationInput,
  ): Promise<CardAssignment[]>;
}
