import { Invoice, Transaction, Wallet } from "./invoice";

export interface User {
  id: string;
  name?: string;
  email?: string;
  emailVerified?: Date;
  image?: string;
  dateOfBirth?: Date;
  accounts: Account[];
  sessions: Session[];
  wallets: Wallet[];
  transactions: Transaction[];
  invoices: Invoice[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Account {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}

export interface Session {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface VerificationToken {
  id: string;
  identifier: string;
  token: string;
  expires: Date;
}
