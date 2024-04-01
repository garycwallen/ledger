import Link from "next/link";

import { getServerAuthSession } from "@/server/auth";
import Navbar from "@/app/_components/Navbar";
import CreateTranscation from "@/app/_components/CreateTranscation";
import LatestTranscation from "@/app/_components/LatestTranscation";

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

          <LatestTranscation />
          <CreateTranscation />
        </div>
      </main>
    </>
  );
}
