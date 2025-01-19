import { api } from "@/trpc/server";
import { currencyFormatter } from "@/lib/utils";
import DeleteTransaction from "./DeleteTransaction";
import Link from "next/link";
import type { DatabaseTransaction, Transaction } from "./types";

export default async function TransactionsTable() {
  const transcationscolumns = ["Amount", "Location", "Date", "Actions"];
  const allTransactions = await api.transcation.getAll();

  // Helper function to transform database transaction to component transaction
  const transformTransaction = (
    dbTransaction: DatabaseTransaction,
  ): Transaction => {
    return {
      id: dbTransaction.id,
      type: dbTransaction.type as "Expense" | "Income",
      amount: dbTransaction.amount,
      location: dbTransaction.location,
      createdAt: dbTransaction.createdAt,
    };
  };

  return (
    <table className="w-full table-auto">
      <thead className="bg-gray-200 text-xs font-semibold uppercase text-gray-400">
        <tr>
          {transcationscolumns.map((column) => (
            <th className="whitespace-nowrap p-2" key={column}>
              <div className="text-left font-semibold">{column}</div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 text-sm">
        {allTransactions?.map((transaction) => {
          const transformedTransaction = transformTransaction(transaction);
          return (
            <tr
              className="hover:bg-gray-100 dark:hover:bg-gray-200"
              key={transaction.id}
            >
              <td className="whitespace-nowrap p-2">
                {transformedTransaction.type === "Expense" ? (
                  <div className="text-left font-medium text-red-500">
                    {currencyFormatter(transformedTransaction.amount)}
                  </div>
                ) : (
                  <div className="text-left font-medium text-green-500">
                    {currencyFormatter(transformedTransaction.amount)}
                  </div>
                )}
              </td>
              <td className="whitespace-nowrap p-2">
                <Link href={`transactions/${transformedTransaction.location}`}>
                  {transformedTransaction.location}
                </Link>
              </td>
              <td className="whitespace-nowrap p-2">
                {transformedTransaction.createdAt.toLocaleDateString()}
              </td>
              <td className="whitespace-nowrap p-2">
                <DeleteTransaction transaction={transformedTransaction} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
