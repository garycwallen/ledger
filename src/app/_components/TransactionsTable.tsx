import { api } from "@/trpc/server";
import { currencyFormatter } from "@/lib/utils";
import Link from "next/link";

export default async function TransactionsTable() {
  const transactionsColumns = ["Amount", "Location", "Date"];

  const allTransactions = await api.transcation.getAll();

  return (
    <table className="w-full table-auto">
      <thead className="bg-gray-200 text-xs font-semibold uppercase text-gray-400">
        <tr>
          {transactionsColumns.map((columns) => (
            <th className="whitespace-nowrap p-2" key="id">
              <div className="text-left font-semibold">{columns}</div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 text-sm">
        {allTransactions?.map((transaction) => (
          <tr
            className="hover:bg-gray-100 dark:hover:bg-gray-200"
            key={transaction.id}
          >
            <td className="whitespace-nowrap p-2">
              {transaction.type === "Expense" ? (
                <div className="text-left font-medium text-red-500">
                  {currencyFormatter(transaction.amount)}
                </div>
              ) : (
                <div className="text-left font-medium text-green-500">
                  {currencyFormatter(transaction.amount)}
                </div>
              )}
            </td>
            <td className="whitespace-nowrap p-2">
              <Link href={`transactions/${transaction.location}`}>
                {transaction.location}
              </Link>
            </td>
            <td className="whitespace-nowrap p-2">
              {transaction.createdAt.toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}