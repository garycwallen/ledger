import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { currencyFormatter } from "@/lib/utils";

export default async function TotalBalance() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const totals = await api.transcation.getAll();

  const totalBalance = totals.reduce((sum, total) => {
    if (total.type === "Income") {
      return sum + total.amount;
    } else if (total.type === "Expense") {
      return sum - total.amount;
    } else {
      return sum;
    }
  }, 0);

  return (
    <section>
      <small className="text-md text-gray-400">Our Balance</small>
      <h2 className="text-4xl font-bold">{currencyFormatter(totalBalance)}</h2>
    </section>
  );
}
