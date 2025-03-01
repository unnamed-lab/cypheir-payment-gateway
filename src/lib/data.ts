// This is a mock data file. In a real application, this would be replaced with actual database queries.

export interface Merchant {
  id: string
  name: string
  email: string
  walletAddress: string
}

export interface Invoice {
  id: string
  title: string
  description: string | null
  amount: string
  currency: string
  status: "pending" | "paid" | "failed"
  recipientEmail: string
  dueDate: string | null
  createdAt: string
  merchant: Merchant
}

// Mock data
const merchants: Merchant[] = [
  {
    id: "merchant-1",
    name: "Acme Inc",
    email: "payments@acme.com",
    walletAddress: "8xj45...9fGh",
  },
]

const invoices: Invoice[] = [
  {
    id: "INV-001",
    title: "Website Development",
    description: "Full payment for website development services",
    amount: "1500.00",
    currency: "USDC",
    status: "pending",
    recipientEmail: "client@example.com",
    dueDate: "2023-12-31",
    createdAt: "2023-12-01",
    merchant: merchants[0],
  },
  {
    id: "INV-002",
    title: "Logo Design",
    description: "Logo design and branding package",
    amount: "500.00",
    currency: "USDC",
    status: "paid",
    recipientEmail: "client2@example.com",
    dueDate: null,
    createdAt: "2023-11-15",
    merchant: merchants[0],
  },
]

// Mock functions to simulate database queries
export async function getInvoiceById(id: string): Promise<Invoice | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const invoice = invoices.find((inv) => inv.id === id)
  return invoice || null
}

export async function getAllInvoices(): Promise<Invoice[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return invoices
}

export async function createInvoice(data: Omit<Invoice, "id" | "createdAt" | "merchant" | "status">): Promise<Invoice> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const newInvoice: Invoice = {
    id: `INV-${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`,
    ...data,
    status: "pending",
    createdAt: new Date().toISOString(),
    merchant: merchants[0],
  }

  invoices.push(newInvoice)
  return newInvoice
}

export const recentSales = [
  {
    id: "1",
    customer: {
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      avatarUrl: "/avatars/01.png",
    },
    amount: 1999.99,
    currency: "USD",
    date: "2023-05-20",
  },
  {
    id: "2",
    customer: {
      name: "Jackson Lee",
      email: "jackson.lee@email.com",
      avatarUrl: "/avatars/02.png",
    },
    amount: 39.99,
    currency: "USD",
    date: "2023-05-19",
  },
  {
    id: "3",
    customer: {
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      avatarUrl: "/avatars/03.png",
    },
    amount: 299.99,
    currency: "USD",
    date: "2023-05-18",
  },
  {
    id: "4",
    customer: {
      name: "William Chen",
      email: "william.chen@email.com",
      avatarUrl: "/avatars/04.png",
    },
    amount: 99.99,
    currency: "USD",
    date: "2023-05-17",
  },
  {
    id: "5",
    customer: {
      name: "Sofia Rodriguez",
      email: "sofia.rodriguez@email.com",
      avatarUrl: "/avatars/05.png",
    },
    amount: 499.99,
    currency: "USD",
    date: "2023-05-16",
  },
];
