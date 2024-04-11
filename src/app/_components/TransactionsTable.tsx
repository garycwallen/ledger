import { api } from "@/trpc/server";
import { currencyFormatter } from "@/lib/utils";
import Link from "next/link";

export default async function TransactionsTable() {
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
        {allTransactions?.map((transcation) => (
          <tr
            className="hover:bg-gray-100 dark:hover:bg-gray-200"
            key={transcation.id}
          >
            <td className="whitespace-nowrap p-2">
              {transcation.type === "Expense" ? (
                <div className="text-left font-medium text-red-500">
                  {currencyFormatter(transcation.amount)}
                </div>
              ) : (
                <div className="text-left font-medium text-green-500">
                  {currencyFormatter(transcation.amount)}
                </div>
              )}
            </td>
            <td className="whitespace-nowrap p-2">
              <Link href={`transcations/${transcation.location}`}>
                {transcation.location}
              </Link>
            </td>
            <td className="whitespace-nowrap p-2">
              {transcation.createdAt.toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}