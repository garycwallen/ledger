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
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4">
            <ul className="list-disc">
              {allTransactions?.map((transcation) => (
                <li key={transcation.id}>
                  {transcation.type} {transcation.amount} {transcation.location}{" "}
                  {transcation.createdAt.toDateString()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
