import AllTranscations from "@/app/_components/AllTranscations";
import TotalBalance from "@/app/_components/TotalBalance";
import Link from "next/link";

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
      <AllTranscations />
    </main>
  );
}