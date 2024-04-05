import AllTranscations from "../_components/AllTranscations";
import TotalBalance from "../_components/TotalBalance";

export default function TranscationsPage() {
  return (
    <>
      <main className="flex flex-col items-center text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            All <span className="text-[hsl(280,100%,70%)]">Transcations</span>
          </h1>
          {/* Our Balance + SUM section */}
          <TotalBalance />
        </div>
      </main>
      {/* Table of All Transcation */}
      <AllTranscations />
    </>
  );
}
