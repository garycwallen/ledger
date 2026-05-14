import { api } from "@/trpc/server";
import { currencyFormatter } from "@/lib/utils";
import DeleteTransaction from "./DeleteTransaction";
import Link from "next/link";
import type { DatabaseTransaction, Transaction } from "./types";
import PaginationControls from "./PaginationControls";
import { Suspense } from "react";

const transformTransaction = (dbTransaction: DatabaseTransaction): Transaction => ({
  id: dbTransaction.id,
  type: dbTransaction.type as "Expense" | "Income",
  amount: dbTransaction.amount,
  location: dbTransaction.location,
  createdAt: dbTransaction.createdAt,
});

const columns = ["Amount", "Location", "Date", "Actions"];

export default async function TransactionsTableWrapper({
  pageSize,
}: {
  pageSize?: number;
} = {}) {
  const allTransactions = await api.transcation.getAll(
    pageSize !== undefined ? { skip: 0, take: pageSize } : undefined
  );
  const totalCount = await api.transcation.getCount();

  return (
    <div className="mx-auto w-full max-w-2xl rounded-lg border border-gray-200 bg-white py-6 shadow-lg">
      <header className="border-b border-gray-100 px-5">
        <h2 className="font-semibold text-gray-800">All Transactions</h2>
      </header>
      <div className="p-3">
        <div className="overflow-x-auto border">
          <table className="w-full table-auto">
            <thead className="bg-gray-200 text-xs font-semibold uppercase text-gray-400">
              <tr>
                {columns.map((column) => (
                  <th className="whitespace-nowrap p-2" key={column}>
                    <div className="text-left font-semibold">{column}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {allTransactions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                allTransactions.map((transaction) => {
                  const t = transformTransaction(transaction);
                  return (
                    <tr
                      className="hover:bg-gray-100 dark:hover:bg-gray-200"
                      key={transaction.id}
                    >
                      <td className="whitespace-nowrap p-2">
                        <div
                          className={`text-left font-medium ${t.type === "Expense" ? "text-red-500" : "text-green-500"}`}
                        >
                          {currencyFormatter(t.amount)}
                        </div>
                      </td>
                      <td className="whitespace-nowrap p-2">
                        <Link href={`transactions/${t.location}`}>
                          {t.location}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap p-2">
                        {t.createdAt.toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap p-2">
                        <DeleteTransaction transaction={t} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Suspense>
        <PaginationControls totalItems={totalCount} />
      </Suspense>
    </div>
  );
}
