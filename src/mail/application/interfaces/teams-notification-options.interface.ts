export interface SendExpenseRequestTeamsNotificationInput {
  id: number;
  user: {
    name: string;
    lastName: string;
    email: string;
    company: { name: string };
    branch: { name: string };
  };
  totalAmount: number;
  travelReason: string;
  departureDate: Date;
  returnDate: Date;
  disbursementDate: Date;
  managerEmail?: string;
  managerName?: string;
}

export interface SendApprovalTeamsNotificationInput {
  requestId: number;
  userName: string;
  userEmail: string;
  managerName: string;
  managerEmail: string;
  totalAmount: number;
  company: string;
  branch: string;
  comment?: string;
}

export interface SendRejectionTeamsNotificationInput {
  requestId: number;
  userName: string;
  userEmail: string;
  managerName: string;
  managerEmail: string;
  totalAmount: number;
  company: string;
  branch: string;
  comment?: string;
}

export interface SendDispersalTeamsNotificationInput {
  requestId: number;
  userName: string;
  userEmail: string;
  totalAmount: number;
  company: string;
  branch: string;
  selectedCard: string;
}

export interface SendTreasurerTeamsNotificationInput {
  requestId: number;
  userName: string;
  userEmail: string;
  totalAmount: number;
  company: string;
  branch: string;
  selectedCard?: string;
}

export interface SendSentTeamsNotificationInput {
  requestId: number;
  userName: string;
  userEmail: string;
  totalAmount: number;
  company: string;
  branch: string;
  managerEmail?: string;
  managerName?: string;
}
