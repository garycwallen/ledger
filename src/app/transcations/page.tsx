import AllTranscations from "@/app/_components/AllTranscations";
import TotalBalance from "@/app/_components/TotalBalance";

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
        <button className="btn btn-primary">New Transcation</button>
      </section>
      <AllTranscations />
    </main>
  );
}