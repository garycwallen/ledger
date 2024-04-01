import AllTranscations from "../_components/AllTranscations";

export default function TranscationsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <AllTranscations />
      </div>
    </main>
  );
}
