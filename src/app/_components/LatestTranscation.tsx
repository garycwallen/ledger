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
          Most recent transaction:{" "}
          <span
            className={`text-${latestTranscation.type === "Expense" ? "red" : "green"}-500`}
          >
            {latestTranscation.type}
          </span>{" "}
          {currencyFormatter(latestTranscation.amount)} at{" "}
          {latestTranscation.location} on{" "}
          {new Date(latestTranscation.createdAt).toLocaleDateString()}
        </p>
      ) : (
        <p>You have no expenses yet.</p>
      )}
    </div>
  );
}
