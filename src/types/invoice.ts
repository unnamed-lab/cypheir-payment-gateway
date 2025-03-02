import { User } from "./user";

export interface Wallet {
  id: string;
  address: string;
  type: string;
  user: User;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: string;
  user: User;
  userId: string;
  invoice?: Invoice;
  invoiceId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Invoice {
  id: string;
  title: string;
  description?: string | null;
  amount: number;
  currency: string;
  status: string;
  recipientEmail: string;
  dueDate?: Date;
  merchantPublicKey: string;
  user: User;
  userId: string;
  transactions: Transaction[];
  milestones: Milestone[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Milestone {
  id: string;
  title: string;
  description?: string;
  amount: number;
  dueDate?: Date;
  status: string;
  invoice: Invoice;
  invoiceId: string;
  createdAt: Date;
  updatedAt: Date;
}
