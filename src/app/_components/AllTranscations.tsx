import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

export default async function AllTranscations() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const allTransactions = await api.transcation.getAll();
  return (
    <div className="mx-5 mt-5 grid grid-cols-4 gap-2">
      <div className="px-2">
        <h1>All Transcations</h1>
        <ul className="list-disc">
          {allTransactions?.map((transcation) => (
            <li key={transcation.id}>
              {transcation.type} {transcation.amount} {transcation.location}{" "}
              {transcation.createdAt.toDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
