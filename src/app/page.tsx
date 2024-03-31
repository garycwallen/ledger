import Link from "next/link";

import { CreateTranscation } from "@/app/_components/create-transcation";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import Navbar from "@/app/_components/Navbar";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Family <span className="text-[hsl(280,100%,70%)]">Ledger</span>
          </h1>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white"></p>

            <div className="flex flex-col items-center justify-center gap-4">
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                {session ? "Sign out" : "Sign in"}
              </Link>
            </div>
          </div>

          <CrudShowcase />
        </div>
      </main>
    </>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestTranscation = await api.transcation.getLatest();

  const purchase =
    // @ts-expect-error: Object is possibly 'null'.
    latestTranscation.type +
    " $" +
    // @ts-expect-error: Object is possibly 'null'.
    latestTranscation.amount +
    " at " +
    // @ts-expect-error: Object is possibly 'null'.
    latestTranscation.location;

  return (
    <div className="w-full max-w-xs">
      {latestTranscation ? (
        <p>Most recent transcation: {purchase}</p>
      ) : (
        <p>You have no expenses yet.</p>
      )}

      <CreateTranscation />
    </div>
  );
}
