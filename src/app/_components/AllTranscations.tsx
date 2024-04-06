import { getServerAuthSession } from "@/server/auth";
import TranscationsTable from "@/app/_components/TranscationsTable";

export default async function AllTranscations() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  return (
    <section className="min-h-screen px-4 text-gray-600 antialiased">
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
  );
}
