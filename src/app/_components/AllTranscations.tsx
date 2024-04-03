import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

export default async function AllTranscations() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const allTransactions = await api.transcation.getAll();
  return (
    <section className="px-4 text-gray-600 antialiased">
      <div className="flex h-full flex-col justify-center">
        <div className="mx-auto w-full max-w-2xl rounded-lg border border-gray-200 bg-white shadow-lg">
          <header className="border-b border-gray-100 px-5 py-4">
            <h2 className="font-semibold text-gray-800">All Transcations</h2>
          </header>
          <div className="p-3">
            <div className="overflow-x-auto border">
              <table className="w-full table-auto">
                <thead className="bg-gray-200 text-xs font-semibold uppercase text-gray-400">
                  <tr>
                    <th className="whitespace-nowrap p-2">
                      <div className="text-left font-semibold">Amount</div>
                    </th>
                    <th className="whitespace-nowrap p-2">
                      <div className="text-left font-semibold">Location</div>
                    </th>
                    <th className="whitespace-nowrap p-2">
                      <div className="text-left font-semibold">Date</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {allTransactions?.map((transcation) => (
                    <>
                      <tr
                        key={transcation.id}
                        className="hover:bg-gray-100 dark:hover:bg-gray-200"
                      >
                        <td className="whitespace-nowrap p-2">
                          {transcation.type === "Expense" ? (
                            <div className="text-left font-medium text-red-500">
                              {"-"}$
                              {Number(transcation?.amount).toLocaleString()}
                            </div>
                          ) : (
                            <div className="text-left font-medium text-green-500">
                              {"+"}$
                              {Number(transcation?.amount).toLocaleString()}
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
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
