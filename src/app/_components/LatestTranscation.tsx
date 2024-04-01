import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

export default async function LatestTranscation() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestTranscation = await api.transcation.getLatest();

  const purchase =
    // @ts-expect-error: Object is possibly 'null'.
    latestTranscation.type +
    " $" +
    // @ts-expect-error: Object is possibly 'null'.
    Number(latestTranscation.amount).toLocaleString() +
    " at " +
    // @ts-expect-error: Object is possibly 'null'.
    latestTranscation.location +
    " on " +
    latestTranscation?.createdAt.toDateString();

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
