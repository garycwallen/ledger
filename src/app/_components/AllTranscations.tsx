import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import Link from "next/link";

export default async function AllTranscations() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const allTransactions = await api.transcation.getAll();
  return (
    <main className="flex min-h-screen flex-col items-center text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <Link
          href="/"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
          Back Home
        </Link>
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          All <span className="text-[hsl(280,100%,70%)]">Transcations</span>
        </h1>
        <section className="py-3">
          <small className="text-md text-gray-400">Our Balance</small>
          <h2 className="text-4xl font-bold">TBD</h2>
        </section>
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative overflow-x-auto">
              <table className="w-full text-left rtl:text-right">
                <thead className="bg-white/10 px-10 py-3 font-semibold no-underline transition">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Type
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {allTransactions?.map((transcation) => (
                    <>
                      <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                        <th scope="row" className="whitespace-nowrap px-6 py-4">
                          ${Number(transcation?.amount).toLocaleString()}
                        </th>
                        <th scope="row" className="whitespace-nowrap px-6 py-4">
                          {transcation.location}
                        </th>
                        <th scope="row" className="whitespace-nowrap px-6 py-4">
                          {transcation.createdAt.toLocaleDateString()}
                        </th>
                        <th scope="row" className="whitespace-nowrap px-6 py-4">
                          {transcation.type}
                        </th>
                        <th key={transcation.id} />
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
