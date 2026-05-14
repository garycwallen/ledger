import Link from "next/link";
import TotalBalance from "@/app/_components/TotalBalance";
import TransactionsTableWrapper from "@/app/_components/TransactionsTableWrapper";

export default async function TransactionsPage({
  searchParams,
}: {
  searchParams: Promise<{ pageSize?: string }>;
}) {
  const params = await searchParams;
  const pageSizeParam = params.pageSize;
  const pageSize =
    pageSizeParam === "all"
      ? undefined
      : parseInt(pageSizeParam ?? "100") || 100;

  return (
    <main className="container mx-auto max-w-2xl px-6">
      <section>
        <TotalBalance />
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[4rem]">
            All <span className="text-[hsl(280,100%,70%)]">Transactions</span>
          </h1>
        </div>
      </section>
      <section>
        <Link
          href="/"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
          New Transaction
        </Link>
      </section>
      <section className="min-h-screen px-0 text-gray-600 antialiased">
        <div className="flex h-full flex-col justify-center py-6">
          <TransactionsTableWrapper pageSize={pageSize} />
        </div>
      </section>
    </main>
  );
}
