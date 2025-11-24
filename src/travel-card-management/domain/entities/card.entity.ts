export interface Card {
  id: number;
  cardNumber: string;
  companyId: number;
  isActive: boolean;
  company: {
    id: number;
    name: string;
  };
  createdAt: Date;
}

