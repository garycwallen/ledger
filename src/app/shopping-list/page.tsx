import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import CreateShoppingItem from "@/app/_components/CreateShoppingItem";
import PathName from "@/app/_components/PathName";

export default async function ShoppingList() {
  const session = await getServerAuthSession();

  if (!session?.user) return null;

  const shoppingItem = await api.shoppingItem.getAll();

  return (
    <>
      <main className="mx-auto my-12 max-w-3xl">
        <div className="flex justify-between">
          <PathName />
          <button
            type="button"
            className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
          >
            Add Shopping Item
          </button>
        </div>

        <ul className="pl-5 list-disc py-5">
          {shoppingItem.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
        <CreateShoppingItem />
      </main>
    </>
  );
}
