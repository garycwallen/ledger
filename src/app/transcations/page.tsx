import Link from "next/link";
import AllTranscations from "../_components/AllTranscations";

export default function TranscationsPage() {
  return (
    <>
      <main className="flex flex-col items-center text-white">
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
        </div>
      </main>
      <AllTranscations />
    </>
  );
}
