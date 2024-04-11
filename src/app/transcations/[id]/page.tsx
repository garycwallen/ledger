
import Link from "next/link";
import TotalBalance from "@/app/_components/TotalBalance";
import { currencyFormatter } from "@/lib/utils";
import { api } from "@/trpc/server";

export default async function Transaction({
  params,
}: {
  params: { id: string };
}) {
  // Extract location from params
  const { id: location } = params;

  // Call the getByLocation function with the location parameter
  const transcationsByLocation = await api.transcation.getByLocation({
    location,
  });

  // Total balance from location
  const totalBalanceByLocation = transcationsByLocation.reduce((sum, total) => {
    if (total.type === "Income") {
      return sum + total.amount;
    } else if (total.type === "Expense") {
      return sum - total.amount;
    } else {
      return sum;
    }
  }, 0);

  const transcationscolumns = ["Amount", "Location", "Date"];

  return (
    <main className="container mx-auto max-w-2xl px-6">
      <section>
        <TotalBalance />
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[4rem]">
            {params.id}{" "}
            <span className="text-[hsl(280,100%,70%)]">Transactions</span>
          </h1>
        </div>
      </section>
      <section>
        <Link
          href="/transcations"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
          Go Back
        </Link>
      </section>
      <section className="min-h-screen px-0 text-gray-600 antialiased">
        <div className="flex h-full flex-col justify-center py-6">
          <div className="mx-auto w-full max-w-2xl rounded-lg border border-gray-200 bg-white py-6 shadow-lg">
            <header className="border-b border-gray-100 px-5">
              <h2 className="font-semibold text-gray-800">{params.id}{" "} Transactions</h2>
              <h2 className="gap-2">{currencyFormatter(totalBalanceByLocation)}</h2>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto border">
                <table className="w-full table-auto">
                  <thead className="bg-gray-200 text-xs font-semibold uppercase text-gray-400">
                    <tr>
                      {transcationscolumns.map((columns) => (
                        <th className="whitespace-nowrap p-2" key="id">
                          <div className="text-left font-semibold">
                            {columns}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {transcationsByLocation?.map((transcation) => (
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
                          {transcation.location}
                        </td>
                        <td className="whitespace-nowrap p-2">
                          {transcation.createdAt.toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
