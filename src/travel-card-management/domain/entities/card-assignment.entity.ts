export interface CardAssignment {
  id: number;
  cardId: number;
  userId: number;
  assignedAt: Date;
  unassignedAt: Date | null;
  card: {
    id: number;
    cardNumber: string;
  };
  user: {
    id: number;
    name: string;
    email: string;
  };
}

