export interface DatabaseTransaction {
  id: string;
  type: string;
  amount: number;
  location: string;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
}

export interface Transaction {
  id: string;
  type: "Expense" | "Income";
  amount: number;
  location: string;
  createdAt: Date;
}
