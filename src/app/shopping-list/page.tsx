import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import CreateShoppingItem from "@/app/_components/CreateShoppingItem";

export default async function ShoppingList() {
  const session = await getServerAuthSession();

  if (!session?.user) return null;

  const shoppingItem = await api.shoppingItem.getAll();

  return (
    <>
      <main className="mx-auto my-12 max-w-3xl">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">Our Shopping List</h2>
          <button
            type="button"
            className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
          >
            Add Shopping Item
          </button>
        </div>

        <ul className="mt-4 list-disc">
          {shoppingItem.map((item) => (
            <li key={item.id} className="flex items-center justify-between">
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
        <CreateShoppingItem />
      </main>
    </>
  );
}
