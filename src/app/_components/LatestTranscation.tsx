import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { currencyFormatter } from "@/lib/utils";

export default async function LatestTranscation() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestTranscation = await api.transcation.getLatest();

  return (
    <div className="w-full max-w-xs">
      {latestTranscation ? (
        <p>
          Most recent transcation:{" "}
          {latestTranscation.type === "Expense" ? (
            <span className="text-red-500">{latestTranscation?.type}</span>
          ) : (
            <span className="text-green-500">{latestTranscation?.type}</span>
          )}{" "}
          {currencyFormatter(latestTranscation?.amount)} at{" "}
          {latestTranscation?.location} on{" "}
          {latestTranscation?.createdAt.toLocaleDateString()}
        </p>
      ) : (
        <p>You have no expenses yet.</p>
      )}
    </div>
  );
}
