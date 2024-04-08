import Link from "next/link";
import TotalBalance from "@/app/_components/TotalBalance";
import TranscationsTable from "@/app/_components/TranscationsTable";

export default function TranscationsPage() {
  return (
    <main className="container mx-auto max-w-2xl px-6">
      <section>
        <TotalBalance />
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[4rem]">
            All <span className="text-[hsl(280,100%,70%)]">Transcations</span>
          </h1>
        </div>
      </section>
      <section>
        <Link
          href="/"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
          New Transcation
        </Link>
      </section>
      <section className="min-h-screen px-0 text-gray-600 antialiased">
        <div className="flex h-full flex-col justify-center py-6">
          <div className="mx-auto w-full max-w-2xl rounded-lg border border-gray-200 bg-white py-6 shadow-lg">
            <header className="border-b border-gray-100 px-5">
              <h2 className="font-semibold text-gray-800">All Transcations</h2>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto border">
                <TranscationsTable />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
