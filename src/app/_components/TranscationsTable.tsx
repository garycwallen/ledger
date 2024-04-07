import { api } from "@/trpc/server";
import { currencyFormatter } from "@/lib/utils";

export default async function TranscationsTable() {
  const transcationscolumns = ["Amount", "Location", "Date"];

  const allTransactions = await api.transcation.getAll();

  return (
    <table className="w-full table-auto">
      <thead className="bg-gray-200 text-xs font-semibold uppercase text-gray-400">
        <tr>
          {transcationscolumns.map((columns) => (
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
            <td
              className={`whitespace-nowrap p-2 text-left font-medium text-${transaction.type === "Expense" ? "red" : "green"}-500`}
            >
              {currencyFormatter(transaction.amount)}
            </td>
            <td className="whitespace-nowrap p-2">{transaction.location}</td>
            <td className="whitespace-nowrap p-2">
              {transaction.createdAt.toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
