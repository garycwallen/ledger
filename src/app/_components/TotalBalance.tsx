import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { currencyFormatter } from "@/lib/utils";

export default async function TotalBalance() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const totalIncome = await api.transcation.getTotalIncome();
  const totalExpense = await api.transcation.getTotalExpense();

  // Sum All Income
  const sumTotalIncome = totalIncome.reduce(
    (accumulator, current) => accumulator + current.amount,
    0,
  );

  // Sum All Expenses
  const sumTotalExpense = totalExpense.reduce(
    (accumulator, current) => accumulator + current.amount,
    0,
  );

  return <>{currencyFormatter(sumTotalIncome - sumTotalExpense)}</>;
}