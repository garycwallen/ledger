import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

export default async function LatestTranscation() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestTranscation = await api.transcation.getLatest();

  const purchase =
    latestTranscation?.type +
    " $" +
    latestTranscation?.amount +
    " at " +
    latestTranscation?.location +
    " on " +
    latestTranscation?.createdAt.toLocaleDateString();

  return (
    <div className="w-full max-w-xs">
      {latestTranscation ? (
        <p>Most recent transcation: {purchase}</p>
      ) : (
        <p>You have no expenses yet.</p>
      )}
    </div>
  );
}
