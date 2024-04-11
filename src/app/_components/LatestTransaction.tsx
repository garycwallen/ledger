import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { currencyFormatter } from "@/lib/utils";

export default async function LatestTransaction() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestTransaction = await api.transcation.getLatest();

  return (
    <div className="w-full max-w-xs">
      {latestTransaction ? (
        <p>
          Most recent transaction:{" "}
          <span
            className={`text-${latestTransaction.type === "Expense" ? "red" : "green"}-500`}
          >
            {latestTransaction.type}
          </span>{" "}
          {currencyFormatter(latestTransaction.amount)} at{" "}
          {latestTransaction.location} on{" "}
          {new Date(latestTransaction.createdAt).toLocaleDateString()}
        </p>
      ) : (
        <p>You have no expenses yet.</p>
      )}
    </div>
  );
}
