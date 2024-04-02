import Link from "next/link";

import { getServerAuthSession } from "@/server/auth";
import CreateTranscation from "@/app/_components/CreateTranscation";
import LatestTranscation from "@/app/_components/LatestTranscation";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <>
      <main className="flex min-h-screen flex-col items-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Family <span className="text-[hsl(280,100%,70%)]">Ledger</span>
          </h1>
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col items-center justify-center gap-4">
              {session ? (
                <>
                  <Link
                    href="/transcations"
                    className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
                  >
                    View All Transcations
                  </Link>
                  <LatestTranscation />
                  <CreateTranscation />
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold">
                    Welcome to Family Ledger! →
                  </h3>
                  <div className="text-lg">
                    Your one stop destination for all your family needs! Family
                    budgeting, shopping lists, event coordination, and more!
                  </div>
                  <Link
                    href="/api/auth/signin"
                    className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
